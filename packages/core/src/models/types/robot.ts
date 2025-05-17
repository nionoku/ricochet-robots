import { type ColorRepresentation, Vector2 } from 'three';
import type { IModel } from './model';

type RobotName = 'blue' | 'green' | 'yellow' | 'red' | 'grey';

interface RobotInfo {
  name: RobotName
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
  unselect(): void
} & IModel;

export type {
  IRobot,
  RobotInfo,
  RobotName,
};
