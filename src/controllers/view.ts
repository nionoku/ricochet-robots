import { Camera } from 'three';
import { CameraController } from './camera';
import { RendererController } from './renderer';
import { IScene } from '../scenes/types/scene';

class ViewController {
  private readonly renderer: RendererController;

  private readonly camera: CameraController;

  private readonly scene: IScene;

  constructor(private readonly root: HTMLElement, _Scene: new (camera: Camera, canvas: HTMLCanvasElement) => IScene) {
    this.renderer = new RendererController(root.clientWidth, root.clientHeight);
    this.camera = new CameraController(root.clientWidth, root.clientHeight);
    this.scene = new _Scene(this.camera, this.renderer.domElement);
  }

  private render() {
    this.scene.update();
    this.renderer.render(this.scene, this.camera);
  }

  get domElement() {
    return this.renderer.domElement;
  }

  resize() {
    this.camera.resize(this.root.clientWidth, this.root.clientHeight);
    this.renderer.resize(this.root.clientWidth, this.root.clientHeight);
  }

  animate() {
    this.renderer.setAnimationLoop(() => this.render());
  }
}

export {
  ViewController,
};