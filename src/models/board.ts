import { Group } from 'three';
import { BoardMap } from './map';

class Board extends Group {
  constructor() {
    super();

    this.name = 'board';
  }

  setMap(map: BoardMap) {
    this.clear();
    // add map parts with walls on board
    this.add(map);
  }
}

export {
  Board,
};