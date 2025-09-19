import { Camera } from 'three';
import type { IScene } from '../scenes/types/scene';
import { GameController } from '../../controllers/game';
import { RendererController } from './renderer';
import { CameraController } from './camera';
import { NotationsRendererController } from './notations-renderer';

const BASE_FOV = 1.6;

class ViewController {
  private readonly notationsRenderer: NotationsRendererController;

  private readonly renderer: RendererController;

  private readonly camera: CameraController;

  private readonly scene: IScene;

  private readonly gc: GameController;

  constructor(private readonly root: HTMLElement, _GameController: new (root: HTMLCanvasElement, camera: Camera) => GameController, _Scene: new (gc: GameController) => IScene) {
    this.renderer = new RendererController(root.clientWidth, root.clientHeight);
    this.camera = new CameraController(root.clientWidth, root.clientHeight);
    this.notationsRenderer = new NotationsRendererController(root.clientWidth, root.clientHeight);

    this.gc = new _GameController(this.renderer.domElement, this.camera);
    this.scene = new _Scene(this.gc);

    this.camera.position.z = this.fov;
  }

  private render(): void {
    this.scene.update();
    this.renderer.render(this.scene, this.camera);
    this.notationsRenderer.render(this.scene, this.camera);
  }

  private animate(): void {
    this.renderer.setAnimationLoop(this.render.bind(this));
  }

  private notifyReady(): void {
    this.gc.notifyReady();
  }

  private get fov(): number {
    const aspectRatio = this.root.clientHeight / this.root.clientWidth;
    return BASE_FOV * Math.max(aspectRatio, 1);
  }

  get domElements(): [HTMLCanvasElement, HTMLElement] {
    return [
      this.renderer.domElement,
      this.notationsRenderer.domElement,
    ];
  }

  resize(): void {
    this.camera.resize(this.root.clientWidth, this.root.clientHeight);
    this.camera.position.z = this.fov;

    this.renderer.resize(this.root.clientWidth, this.root.clientHeight);
    this.notationsRenderer.resize(this.root.clientWidth, this.root.clientHeight);
  }

  run(): void {
    this.gc.attachInteractiveListeners();

    this.animate();

    this.notifyReady();
  }
}

export {
  ViewController,
};
