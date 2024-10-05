import { Object3D } from 'three';
import { Board } from '../models/board';
import { IController } from './types/controller';
import { BoardMap } from '../models/map';
import mapParts from '../assets/map.json';

class BoardController implements IController {
  private readonly board = new Board(new BoardMap(mapParts));
  
  get objects(): Object3D[] {
    return [
      this.board,
    ];
  }
}

export {
  BoardController,
};
