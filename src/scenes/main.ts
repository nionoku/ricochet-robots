import { Camera, Color, Scene } from 'three';
import { IScene } from './types/scene';
// eslint-disable-next-line import/extensions
import { MapControls } from 'three/examples/jsm/Addons.js';

class MainScene extends Scene implements IScene {
  private readonly controls: MapControls;

  constructor(camera: Camera, canvas: HTMLCanvasElement) {
    super();
    
    this.background = new Color('#D0D0D0');

    camera.position.z = 0.8;
    camera.position.y = 0.3;
    camera.position.x = -0.45;

    this.controls = new MapControls(camera, canvas);
    this.controls.target.set(-0.1, 0.25, 0);
    
    this.setupScene();
  }

  private setupScene() {
    throw new Error('Not implemented');
  }

  update() {
    this.controls.update();
  }
}

export {
  MainScene,
};