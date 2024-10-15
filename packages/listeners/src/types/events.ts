/* eslint-disable @typescript-eslint/indent */
import type { RobotInfo } from 'core/src/models/types/robot';
import { Direction } from 'core/src/constants/direction';
import type { RobotsCoords } from 'core/src/controllers/types/robots-coords';
import type { TokenInfo } from 'core/src/models/types/token';
import type { Vector2Tuple } from 'three';

type Ping = {
  event: 'ping'
};

type Status = {
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
  Status
    | Ping
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