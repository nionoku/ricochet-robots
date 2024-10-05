import { Color, Scene } from 'three';
import { IScene } from './types/scene';
import mapParts from '../assets/map.json';
// eslint-disable-next-line import/extensions
import { Board } from '../models/board';
import { BoardMap } from '../models/map';

class MainScene extends Scene implements IScene {
  constructor() {
    super();
    
    this.background = new Color('#D0D0D0');
    this.setupScene();
  }

  private setupScene() {
    const boardMap = new BoardMap(mapParts);
    const board = new Board(boardMap);

    board.rotation.x = 270 * (Math.PI / 180);

    this.add(board);
  }

  update() {
    return;
  }
}

export {
  MainScene,
};