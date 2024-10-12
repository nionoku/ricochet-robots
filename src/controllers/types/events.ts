/* eslint-disable @typescript-eslint/indent */
import { RobotInfo } from '../../models/types/robot';
import { Direction } from '../../constants/direction';
import { RobotsCoords } from './robots-coords';
import { TokenInfo } from '../../models/types/token';
import { Vector2Tuple } from 'three';

type Ready = {
  event: 'ready'
};

type GenerateRobotsCoords = {
  event: 'generate_robots_coords'
};

type SubmitRobotsCoords = {
  event: 'submit_robots_coords'
  coords: Partial<RobotsCoords>
};

type Prepare = {
  event: 'prepare'
  // order of map parts
  schema: number[]
  // initial robots position
  robotsCoords: Partial<RobotsCoords>
};

type Enable = {
  event: 'enable'
};

type Disable = {
  event: 'disable'
};

type SelectToken = {
  event: 'select_token'
  token: TokenInfo['token']
};

type SelectRobot = {
  event: 'select_robot'
  name: RobotInfo['name']
};

type MoveRobot = {
  event: 'move_robot'
  direction: Direction
};

type RobotMoved = {
  event: 'robot_moved'
  robot: RobotInfo['name']
  from: Vector2Tuple
  to: Vector2Tuple
};

type TokenAchieved = {
  event: 'token_achieved'
};

type EventMessage = 
  Ready
    | GenerateRobotsCoords 
    | SubmitRobotsCoords
    | Prepare
    | Enable
    | Disable
    | SelectToken
    | SelectRobot
    | MoveRobot
    | RobotMoved
    | TokenAchieved;

export type {
  EventMessage,
};