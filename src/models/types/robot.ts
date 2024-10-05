import { Vector2 } from 'three';

type IRobot = {
  /**
   * Move robot to position
   * @param position position between [0, 15] for x and y
   */
  move(position: Vector2): void;

  /**
   * Select current robot
   */
  select(): void;

  /**
   * Remove select from current robot
   */
  unselect(): void;
};

export type {
  IRobot,
};