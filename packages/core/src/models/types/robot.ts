import { type ColorRepresentation, Vector2 } from 'three';
import type { IModel } from './model';
import type { RobotColor } from './color';

interface RobotInfo {
  name: RobotColor
  color: ColorRepresentation
  tint: ColorRepresentation
}

type IRobot = {
  /**
   * Move robot to position
   * @param position position between [0, 15] for x and y
   */
  move(position: Vector2): void

  /**
   * Select current robot
   */
  select(): void

  /**
   * Remove select from current robot
   */
  deselect(): void
} & IModel;

export type {
  IRobot,
  RobotInfo,
};
