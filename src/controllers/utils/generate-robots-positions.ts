import { Vector2Like, MathUtils, Vector2 } from 'three';
import { BoardCoordsHelper } from '../../utils/coords-helper';

const generateRobotsCoords = (excludedCoords: Vector2[]): Vector2Like[] => {
  const map = BoardCoordsHelper.map();
  
  const cells = map.flatMap((column, ci) => {
    return column.reduce<Vector2Like[]>((records, cell, ri) => {
      const currentCoords = new Vector2(ci, ri);

      const isValid = [
        // cell not box wall
        cell !== 15,
        // exclude tokens positions
        excludedCoords.every((coords) => !coords.equals(currentCoords)),
      ].every(Boolean);
    
      if (isValid) {
        records.push(new Vector2(ci, ri));
      }
    
      return records;
    }, []);
  });

  return Array.from({ length: 5 }, () => {
    return cells.splice(MathUtils.randInt(0, cells.length - 1), 1)[0];
  });
};

export {
  generateRobotsCoords,
};