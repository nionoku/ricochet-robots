import { Camera, Color, Scene } from 'three';
import { IScene } from './types/scene';
import mapParts from '../assets/map.json';
// eslint-disable-next-line import/extensions
import { MapControls } from 'three/examples/jsm/Addons.js';
import { Board } from '../models/board';
import { BoardMap } from '../models/map';

class MainScene extends Scene implements IScene {
  private readonly controls: MapControls;

  constructor(camera: Camera, canvas: HTMLCanvasElement) {
    super();
    
    this.background = new Color('#D0D0D0');

    this.controls = new MapControls(camera, canvas);
    this.setupScene();
  }

  private setupScene() {
    const boardMap = new BoardMap(mapParts);
    const board = new Board(boardMap);

    board.rotation.x = 270 * (Math.PI / 180);

    this.add(board);
  }

  update() {
    this.controls.update();
  }
}

export {
  MainScene,
};