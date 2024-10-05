import { Group } from 'three';
import { BoardMap } from './map';

class Board extends Group {
  constructor(map: BoardMap) {
    super();

    this.name = 'board';
    // add map parts with walls on board
    this.add(map);
  }
}

export {
  Board,
};