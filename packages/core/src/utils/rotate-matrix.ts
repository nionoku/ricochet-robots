import type { MapType } from '../models/types/map';

const rotateMatrix = (matrix: MapType, repeat = 1) => {
  let result = matrix;

  for (let i = 0; i < repeat; i++) {
    result = result[0].map((_, ci) => result.map((row) => row[ci]).reverse());
  }

  return result;
};

export {
  rotateMatrix,
};
