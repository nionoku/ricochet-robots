import { Direction } from '../constants/direction';
import { MAP_CELLS_COUNT } from '../models/constants/map';
import type { MapType } from '../models/types/map';

const mergeSides = (_map: MapType): MapType => {
  const map = structuredClone(_map);

  const size = MAP_CELLS_COUNT;
  const half = MAP_CELLS_COUNT / 2;

  for (let base = 0; base < size; base++) {
    // part by y for left side
    if ((map[base][half] & Direction.LEFT) === Direction.LEFT) {
      map[base][half - 1] |= Direction.RIGHT;
    }

    // part by y for right side
    if ((map[base][half - 1] & Direction.RIGHT) === Direction.RIGHT) {
      map[base][half] |= Direction.LEFT;
    }

    // part by x for top side
    if ((map[half][base] & Direction.UP) === Direction.UP) {
      map[half - 1][base] |= Direction.DOWN;
    }

    // part by x for bottom side
    if ((map[half - 1][base] & Direction.DOWN) === Direction.DOWN) {
      map[half][base] |= Direction.UP;
    }
  }

  return map;
};

export {
  mergeSides,
};