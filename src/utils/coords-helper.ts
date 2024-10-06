import { Vector2, Vector2Like } from 'three';
import mapParts from '../assets/map.json';
import { rotateMatrix } from './rotate-matrix';
import { CELL_SIZE } from '../models/constants/map';

const POSITION_SHIFT = 7.5;

class BoardCoordsHelper {
  private static readonly _map = (() => {
    // right-bottom side, left-bottom side, left-top side, right-top side
    const [rb, lb, lt, rt] = mapParts.map(rotateMatrix);
    // bottom-side
    const bs = lb.map((row, i) => [...row, ...rb[i]]);
    // top-side
    const ts = lt.map((row, i) => [...row, ...rt[i]]);
    // complete map
    return [...ts, ...bs];
  })();

  static map(robotsPositions?: Vector2[]): number[][] {
    const map = [...this._map];

    // apply "box wall" on robots positions
    robotsPositions?.forEach(({ x, y }) => {
      map[y][x] = 15;
    });

    return map;
  }

  static toPosition(coords: Vector2Like): Vector2 {
    return new Vector2(
      CELL_SIZE * (coords.x - POSITION_SHIFT),
      CELL_SIZE * (coords.y - POSITION_SHIFT),
    );
  }

  static toCoords(position: Vector2Like): Vector2 {
    return new Vector2(
      position.x / CELL_SIZE + POSITION_SHIFT,
      position.y / CELL_SIZE + POSITION_SHIFT,
    );
  }
}

export {
  BoardCoordsHelper,
};