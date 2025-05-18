import type { RobotsCoords } from 'core/src/controllers/types/robots-coords';
import type { TokenName } from 'core/src/models/types/token';
import { RobotName } from 'core/src/models/types/robot';
import { Direction } from 'core/src/constants/direction';
import type { Vector2Tuple } from 'three';
import { CoreEvent } from '../events/core-event';
import { ICoreEventMessage } from './types/core-event';

type Ready = ICoreEventMessage<CoreEvent.Ready>;

type GenerateInitialRobotsCoords = ICoreEventMessage<CoreEvent.GenerateInitialRobotsCoords>;

type GetInitialRobotsCoords = ICoreEventMessage<CoreEvent.InitialRobotsCoords> & {
  coords: Partial<RobotsCoords>
};

type PrepareGame = ICoreEventMessage<CoreEvent.PrepareGame> & {
  // order of map parts
  order_map_parts: number[]
  // initial robots positions
  robots_coords: Partial<RobotsCoords>
};

type EnableMoveRobots = ICoreEventMessage<CoreEvent.EnableMoveRobots>;

type DisableMoveRobots = ICoreEventMessage<CoreEvent.DisableMoveRobots>;

type SetTargetToken = ICoreEventMessage<CoreEvent.SetTargetToken> & {
  token: TokenName
};

type SelectRobot = ICoreEventMessage<CoreEvent.SelectRobot> & {
  robot: RobotName
};

type MoveRobot = ICoreEventMessage<CoreEvent.MoveRobot> & {
  direction: Direction
};

type RobotWillMoved = ICoreEventMessage<CoreEvent.RobotMoved> & {
  robot: RobotName
  from: Vector2Tuple
  to: Vector2Tuple
};

type TokenAchieved = ICoreEventMessage<CoreEvent.TokenAchieved> & {
  token: TokenName
};

type CoreEventMessage = Ready
  | GenerateInitialRobotsCoords
  | GetInitialRobotsCoords
  | PrepareGame
  | SetTargetToken
  | EnableMoveRobots
  | DisableMoveRobots
  | SelectRobot
  | MoveRobot
  | RobotWillMoved
  | TokenAchieved;

export type {
  CoreEventMessage,
};
