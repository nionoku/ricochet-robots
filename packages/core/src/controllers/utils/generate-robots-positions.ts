import { type Vector2Like, MathUtils, Vector2 } from 'three';
import { MapHelper } from '../../utils/map-helper';
import { WALL } from '../../constants/wall';
import { ROBOTS_COUNT } from '../../constants/robots-count';

const generateRobotsCoords = (mapHelper: MapHelper, excludedCoords: Vector2[]): Vector2Like[] => {
  const map = mapHelper.prepareMap();

  const cells = map.flatMap((column, ci) => {
    return column.reduce<Vector2Like[]>((records, cell, ri) => {
      const currentCoords = new Vector2(ci, ri);

      const isValid = [
        // cell not box wall
        cell !== WALL,
        // exclude tokens positions
        excludedCoords.every((coords) => !coords.equals(currentCoords)),
      ].every(Boolean);

      if (isValid) {
        records.push(new Vector2(ci, ri));
      }

      return records;
    }, []);
  });

  return Array.from({ length: ROBOTS_COUNT }, () => {
    return cells.splice(MathUtils.randInt(0, cells.length - 1), 1)[0];
  });
};

export {
  generateRobotsCoords,
};
