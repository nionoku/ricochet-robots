import { Vector2, Vector2Like } from 'three';
import mapParts from '../assets/map.json';
import { rotateMatrix } from './rotate-matrix';
import { CELL_SIZE } from '../models/constants/map';
import { Robot } from '../models/robot';
import { Direction } from '../types/direction';
import { rotateWalls } from './rotate-walls';

const POSITION_SHIFT = 7.5;

class BoardCoordsHelper {
  private static readonly _map = (() => {
    // right-bottom side, left-bottom side, left-top side, right-top side
    const [rb, lb, lt, rt] = mapParts
      .map(rotateWalls)
      .map(rotateMatrix);
    // bottom-side
    const bs = lb.map((row, i) => [...row, ...rb[i]]);
    // top-side
    const ts = lt.map((row, i) => [...row, ...rt[i]]);
    // complete map
    const result = [...ts, ...bs];

    console.log(result.map((it) => it.map((it) => it.toString().padStart(5)).join(' ')).join('\n'));

    return result;
  })();

  static map(robots?: Robot[]): number[][] {
    const map = [...this._map];

    // apply "box wall" on robots positions
    robots?.forEach(({ coords: { x, y } }) => {
      map[y][x] = 15;
    });

    return map;
  }

  static calculateDestinationPoint(selectedRobot: Robot, direction: Direction, robots: Robot[]): Vector2 {
    const map = this.map(robots);
    
    switch (direction) {
      case Direction.LEFT: {
        const y = selectedRobot.coords.y;

        console.log(selectedRobot.coords.x, y);
        console.log(map[y], map[y].slice(0, selectedRobot.coords.x));
        

        for (let x = selectedRobot.coords.x; x >= 0; x--) {
        }

        return;
      }

      case Direction.RIGHT: {
        const from = new Vector2(selectedRobot.position.x, selectedRobot.position.z);
        return;
      }
    }
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