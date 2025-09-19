import { Group, Vector2Like } from 'three';
import { CSS2DObject } from 'three/examples/jsm/Addons.js';
import { MapHelper } from '../utils/map-helper';
import { MAP_CELLS_COUNT, NOTATION_OFFSET } from './constants/map';

class Notations extends Group {
  public readonly notations: CSS2DObject[] = [];

  constructor() {
    super();

    this.name = 'notations';
    this.notations = this.createBoardNotations();
    this.add(...this.notations);
  }

  private createBoardNotations(): CSS2DObject[] {
    return Array.from({ length: MAP_CELLS_COUNT }).flatMap((_, idx) => {
      const letterObject = this.createNotationObject(
        String.fromCodePoint(65 + idx),
        {
          x: idx,
          y: -1,
        },
        (coords) => ({
          x: coords.x,
          y: coords.y + NOTATION_OFFSET,
        }),
      );

      const indexObject = this.createNotationObject(
        String(idx + 1).padStart(2, '  '),
        {
          x: -1,
          y: idx,
        },
        (coords) => ({
          x: coords.x - NOTATION_OFFSET,
          y: coords.y,
        }),
      );

      return [letterObject, indexObject];
    });
  }

  private createNotationObject(
    text: string,
    coords: Vector2Like,
    positionMapper: (coords: Vector2Like) => {
      x: number
      y: number
    },
  ): CSS2DObject {
    const element = document.createElement('span');
    element.textContent = text;

    const object = new CSS2DObject(element);
    object.userData['coords'] = coords;

    const worldCoords = MapHelper.toPosition(coords);
    const position = positionMapper(worldCoords);
    object.position.set(position.x, position.y, 0);

    return object;
  }
}

export { Notations };
