import { Group } from 'three';
import { BoardMap } from './map';
// eslint-disable-next-line import/extensions
import { CSS2DObject } from 'three/examples/jsm/Addons.js';
import { MAP_CELLS_COUNT } from './constants/map';
import { MapHelper } from '../utils/map-helper';

const NOTATION_OFFSET = 0.04;

class Board extends Group {
  constructor() {
    super();

    this.name = 'board';
  }

  setMap(map: BoardMap) {
    this.clear();
    // add map parts with walls on board
    this.add(map);
    this.add(...this.makeBoardNotations());
  }

  private makeBoardNotations(): CSS2DObject[] {
    return Array.from({ length: MAP_CELLS_COUNT }).flatMap((_, idx) => {
      const letter = document.createElement('span');
      letter.innerText = String.fromCharCode(65 + idx);

      const letterObject = new CSS2DObject(letter);
      const letterCoords = MapHelper.toPosition({ x: idx, y: -1 });
      letterObject.position.set(letterCoords.x, letterCoords.y + NOTATION_OFFSET, 0);

      const index = document.createElement('span');
      index.innerText = String(idx + 1);

      const indexObject = new CSS2DObject(index);
      const indexCoords = MapHelper.toPosition({ x: -1, y: idx });
      indexObject.position.set(indexCoords.x - NOTATION_OFFSET, indexCoords.y, 0);

      return [letterObject, indexObject];
    });
  }
}

export {
  Board,
};