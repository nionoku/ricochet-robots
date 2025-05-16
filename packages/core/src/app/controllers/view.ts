import type { IScene } from '../scenes/types/scene';
import { GameController } from '../../controllers/game';
import { IntersectionsController } from '../../controllers/intersections';
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

    const ic = new IntersectionsController(this.renderer.domElement, this.camera);
    const gc = new GameController(ic);

    this.scene = new _Scene(gc);

    this.camera.position.z = this.fov();
    this.camera.lookAt(0, 0, 0);
  }

  private render() {
    this.scene.update();
    this.renderer.render(this.scene, this.camera);
    this.notationsRenderer.render(this.scene, this.camera);
  }

  private fov(): number {
    const aspectRatio = this.root.clientHeight / this.root.clientWidth;

    if (!aspectRatio) {
      return BASE_FOV;
    }

    if (aspectRatio <= 1) {
      return BASE_FOV;
    }

    return BASE_FOV * aspectRatio;
  }

  get domElements(): [HTMLCanvasElement, HTMLElement] {
    return [
      this.renderer.domElement,
      this.notationsRenderer.domElement,
    ];
  }

  resize() {
    this.camera.resize(this.root.clientWidth, this.root.clientHeight);
    this.camera.position.z = this.fov();

    this.renderer.resize(this.root.clientWidth, this.root.clientHeight);
    this.notationsRenderer.resize(this.root.clientWidth, this.root.clientHeight);
  }

  animate() {
    this.renderer.setAnimationLoop(this.render.bind(this));
  }
}

export {
  ViewController,
};
