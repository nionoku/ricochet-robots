import { Vector2Like } from 'three';
import { RobotInfo } from '../../models/types/robot';

type RobotsCoords = Record<RobotInfo['name'], Vector2Like>;

export type {
  RobotsCoords,
};