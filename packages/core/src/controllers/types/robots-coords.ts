import type { Vector2Tuple } from 'three';
import type { RobotInfo } from '../../models/types/robot';

type RobotsCoords = Record<RobotInfo['name'], Vector2Tuple>;

export type {
  RobotsCoords,
};
