import { Vector2, Vector2Like, Vector3Like } from 'three';
import mapParts from '../assets/map.json';
import { rotateMatrix } from './rotate-matrix';
import { CELL_SIZE, MAP_SIZE, POSITION_SHIFT } from '../models/constants/map';
import { Robot } from '../models/robot';
import { Direction } from '../constants/direction';
import { rotateWalls } from './rotate-walls';
import { ROBOT_ON_CELL } from '../constants/robot';

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

    return result;
  })();

  static map(robots?: Robot[]): number[][] {
    const map = structuredClone(this._map);

    // apply "box wall" on robots positions
    robots?.forEach(({ coords: { x, y } }) => {
      map[y][x] = 15;
    });

    return map;
  }

  static getTargetPoint(selectedRobot: Robot, direction: Direction, robots: Robot[]): Vector2 {
    // selectedRobot shouldn't emit own position on map
    const otherRobots = robots.filter((robot) => robot.userData.name !== selectedRobot.userData.name);
    const map = this.map(otherRobots);

    // eslint-disable-next-line sonarjs/no-commented-code
    // console.log(map.map((it) => it.map((it) => it.toString().padStart(5)).join(' ')).join('\n'));
    
    switch (direction) {
      case Direction.LEFT: {
        const y = selectedRobot.coords.y;

        for (let x = selectedRobot.coords.x; x >= 0; x--) {
          const hasWall = (map[y][x] & Direction.LEFT) === Direction.LEFT;
          // there is no robot on the next left cell
          const hasRobot = map[y][x - 1] === ROBOT_ON_CELL;
          const isTarget = hasWall || hasRobot;
          
          // eslint-disable-next-line sonarjs/no-commented-code
          // console.log('left', x, y, map[y], map[y][x], hasWall, hasRobot);

          if (isTarget) {
            return new Vector2(x, y);
          }
        }

        throw new Error('Error when find destination position to left direction');
      }

      case Direction.RIGHT: {
        const y = selectedRobot.coords.y;

        for (let x = selectedRobot.coords.x; x < map[y].length; x++) {
          const hasWall = (map[y][x] & Direction.RIGHT) === Direction.RIGHT;
          // there is no robot on the next right cell
          const hasRobot = map[y][x + 1] === ROBOT_ON_CELL;
          const isTarget = hasWall || hasRobot;
          
          // eslint-disable-next-line sonarjs/no-commented-code
          // console.log('right', x, y, map[y], map[y][x], hasWall, hasRobot);

          if (isTarget) {
            return new Vector2(x, y);
          }
        }

        throw new Error('Error when find destination position to right direction');
      }

      case Direction.DOWN: {
        const x = selectedRobot.coords.x;
        const column = map.map((row) => row[x]);

        for (let y = selectedRobot.coords.y; y < column.length; y++) {
          // for right direction find wall on next cell
          const hasWall = (column[y] & Direction.DOWN) === Direction.DOWN;
          // there is no robot on the next down cell
          const hasRobot = map[y + 1] && (map[y + 1][x] === ROBOT_ON_CELL);
          const isTarget = hasWall || hasRobot;
          
          // eslint-disable-next-line sonarjs/no-commented-code
          // console.log('down', x, y, column, column[x], hasWall, hasRobot);

          if (isTarget) {
            return new Vector2(x, y);
          }
        }

        throw new Error('Error when find destination position to down direction');
      }

      case Direction.UP: {
        const x = selectedRobot.coords.x;
        const column = map.map((row) => row[x]);

        for (let y = selectedRobot.coords.y; y >= 0; y--) {
          const hasWall = (column[y] & Direction.UP) === Direction.UP;
          // there is no robot on the next up cell
          const hasRobot = map[y - 1] && (map[y - 1][x] === ROBOT_ON_CELL);
          const isTarget = hasWall || hasRobot;
          
          // eslint-disable-next-line sonarjs/no-commented-code
          // console.log('up', x, y, column, column[x], hasWall, hasRobot);

          if (isTarget) {
            return new Vector2(x, y);
          }
        }

        throw new Error('Error when find destination position to up direction');
      }
    }
  }

  static toPosition(coords: Vector2Like): Vector2 {
    return new Vector2(
      CELL_SIZE * (coords.x - POSITION_SHIFT),
      CELL_SIZE * (MAP_SIZE - coords.y - POSITION_SHIFT),
    );
  }

  static toCoords(position: Vector2Like | Vector3Like): Vector2 {
    return new Vector2(
      position.x / CELL_SIZE + POSITION_SHIFT,
      MAP_SIZE - (position.y / CELL_SIZE + POSITION_SHIFT),
    );
  }
}

export {
  BoardCoordsHelper,
};