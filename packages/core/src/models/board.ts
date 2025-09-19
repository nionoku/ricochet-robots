import { Group } from 'three';
import { CSS2DObject } from 'three/examples/jsm/Addons.js';
import { BoardMap } from './map';

class Board extends Group {
  public readonly notations: CSS2DObject[] = [];

  constructor() {
    super();

    this.name = 'board';
  }

  setMap(map: BoardMap): void {
    this.clear();
    // add map parts with walls on board
    this.add(map);
  }
}

export {
  Board,
};
