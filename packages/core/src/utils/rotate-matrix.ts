import type { MapType } from '../models/types/map';

const rotateMatrix = (matrix: MapType, repeat = 1) => {
  let result = matrix;

  for (let i = 0; i < repeat; i++) {
    // eslint-disable-next-line @typescript-eslint/no-loop-func
    result = result[0].map((_, ci) => result.map((row) => row[ci]).reverse());
  }

  return result;
};

export {
  rotateMatrix,
};
