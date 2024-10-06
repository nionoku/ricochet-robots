import { Vector2Like } from 'three';
import { RobotInfo } from '../../models/types/robot';

type RobotsPositions = Record<RobotInfo['name'], Vector2Like>;

export type {
  RobotsPositions,
};