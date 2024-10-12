import { CameraController } from './camera';
import { RendererController } from './renderer';
import { IScene } from '../scenes/types/scene';
// eslint-disable-next-line import/extensions
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { GameController } from '../../controllers/game';
import { IntersectionsController } from '../../controllers/intersections';
import { NotationsRendererController } from './notations-renderer';

const BASE_FOV = 1.55;

class ViewController {
  private readonly notationsRenderer: NotationsRendererController;

  private readonly renderer: RendererController;

  private readonly camera: CameraController;

  private readonly controls: OrbitControls;

  private readonly scene: IScene;

  constructor(private readonly root: HTMLElement, _Scene: new (gc: GameController) => IScene) {
    this.renderer = new RendererController(root.clientWidth, root.clientHeight);
    this.camera = new CameraController(root.clientWidth, root.clientHeight);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.notationsRenderer = new NotationsRendererController(root.clientWidth, root.clientHeight);

    const ic = new IntersectionsController(this.renderer.domElement, this.camera);
    const gc = new GameController(ic);

    this.scene = new _Scene(gc);

    this.camera.position.z = this.fov();
    this.camera.lookAt(0, 0, 0);
  }

  private render() {
    this.scene.update();
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    this.notationsRenderer.render(this.scene, this.camera);
  }
  
  private fov(): number {
    const aspectRatio = this.root.clientHeight / this.root.clientWidth;

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
    this.camera.position.z = this.fov();

    this.camera.resize(this.root.clientWidth, this.root.clientHeight);
    this.renderer.resize(this.root.clientWidth, this.root.clientHeight);
    this.notationsRenderer.resize(this.root.clientWidth, this.root.clientHeight);
  }

  animate() {
    this.renderer.setAnimationLoop(() => this.render());
  }
}

export {
  ViewController,
};