import { Group } from 'three';
import { CSS2DObject } from 'three/examples/jsm/Addons.js';
import { MapHelper } from '../utils/map-helper';
import { BoardMap } from './map';
import { MAP_CELLS_COUNT, NOTATION_OFFSET } from './constants/map';

class Board extends Group {
  constructor() {
    super();

    this.name = 'board';
  }

  setMap(map: BoardMap): void {
    this.clear();
    // add map parts with walls on board
    this.add(map);
    this.add(...this.makeBoardNotations());
  }

  private makeBoardNotations(): CSS2DObject[] {
    return Array.from({ length: MAP_CELLS_COUNT }).flatMap((_, idx) => {
      const letter = document.createElement('span');
      letter.textContent = String.fromCodePoint(65 + idx);

      const letterObject = new CSS2DObject(letter);
      const letterCoords = MapHelper.toPosition({
        x: idx,
        y: -1,
      });
      letterObject.position.set(letterCoords.x, letterCoords.y + NOTATION_OFFSET, 0);

      const index = document.createElement('span');
      index.textContent = String(idx + 1);

      const indexObject = new CSS2DObject(index);
      const indexCoords = MapHelper.toPosition({
        x: -1,
        y: idx,
      });
      indexObject.position.set(indexCoords.x - NOTATION_OFFSET, indexCoords.y, 0);

      return [letterObject, indexObject];
    });
  }
}

export {
  Board,
};
