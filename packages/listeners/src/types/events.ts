import type { RobotInfo } from 'core/src/models/types/robot';
import { Direction } from 'core/src/constants/direction';
import type { RobotsCoords } from 'core/src/controllers/types/robots-coords';
import type { TokenInfo } from 'core/src/models/types/token';
import type { Vector2Tuple } from 'three';

interface Ping {
  event: 'ping'
}

interface Status {
  event: 'ready'
}

interface GenerateRobotsCoords {
  event: 'generate_robots_coords'
}

interface SubmitRobotsCoords {
  event: 'submit_robots_coords'
  coords: Partial<RobotsCoords>
}

interface Prepare {
  event: 'prepare'
  // order of map parts
  schema: number[]
  // initial robots position
  robotsCoords: Partial<RobotsCoords>
}

interface Enable {
  event: 'enable'
}

interface Disable {
  event: 'disable'
}

interface SelectToken {
  event: 'select_token'
  token: TokenInfo['token']
}

interface SelectRobot {
  event: 'select_robot'
  name: RobotInfo['name']
}

interface MoveRobot {
  event: 'move_robot'
  direction: Direction
}

interface RobotMoved {
  event: 'robot_moved'
  robot: RobotInfo['name']
  from: Vector2Tuple
  to: Vector2Tuple
}

interface TokenAchieved {
  event: 'token_achieved'
}

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
