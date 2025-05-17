import type { IScene } from '../scenes/types/scene';
import { GameController } from '../../controllers/game';
import { IntersectionController } from '../../controllers/intersection';
import { RendererController } from './renderer';
import { CameraController } from './camera';
import { NotationsRendererController } from './notations-renderer';

const BASE_FOV = 1.6;

class ViewController {
  private readonly notationsRenderer: NotationsRendererController;

  private readonly renderer: RendererController;

  private readonly camera: CameraController;

  private readonly scene: IScene;

  constructor(private readonly root: HTMLElement, _Scene: new (gc: GameController) => IScene) {
    this.renderer = new RendererController(root.clientWidth, root.clientHeight);
    this.camera = new CameraController(root.clientWidth, root.clientHeight);
    this.notationsRenderer = new NotationsRendererController(root.clientWidth, root.clientHeight);

    const ic = new IntersectionController(this.renderer.domElement, this.camera);
    const gc = new GameController(ic);

    this.scene = new _Scene(gc);

    this.camera.position.z = this.fov();
    this.camera.lookAt(0, 0, 0);
  }

  private render(): void {
    this.scene.update();
    this.renderer.render(this.scene, this.camera);
    this.notationsRenderer.render(this.scene, this.camera);
  }

  private fov(): number {
    const aspectRatio = this.root.clientHeight / this.root.clientWidth;
    return Math.max(BASE_FOV, 1) * aspectRatio;
  }

  get domElements(): [HTMLCanvasElement, HTMLElement] {
    return [
      this.renderer.domElement,
      this.notationsRenderer.domElement,
    ];
  }

  resize(): void {
    this.camera.resize(this.root.clientWidth, this.root.clientHeight);
    this.camera.position.z = this.fov();

    this.renderer.resize(this.root.clientWidth, this.root.clientHeight);
    this.notationsRenderer.resize(this.root.clientWidth, this.root.clientHeight);
  }

  animate(): void {
    this.renderer.setAnimationLoop(this.render.bind(this));
  }
}

export {
  ViewController,
};
