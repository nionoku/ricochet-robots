import { ColorRepresentation, Vector2 } from 'three';
import { IModel } from './model';

type RobotInfo = {
  name: 'blue' | 'green' | 'yellow' | 'red' | 'grey'
  color: ColorRepresentation,
  tint: ColorRepresentation
};

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
} & IModel;

export type {
  IRobot,
  RobotInfo,
};