/* eslint-disable @typescript-eslint/indent */
import { RobotInfo } from '../../models/types/robot';
import { Direction } from '../../constants/direction';
import { RobotsPositions } from './robots-positions';
import { TokenInfo } from '../../models/types/token';

type GenerateRobotsCoords = {
  event: 'generate_robots_coords'
};

type SubmitRobotsCoords = {
  event: 'submit_robots_coords'
  robotsPositions: Partial<RobotsPositions>
};

type SelectToken = {
  event: 'select_token',
  token: TokenInfo['token']
};

type SelectRobot = {
  event: 'select_robot',
  name: RobotInfo['name']
};

type MoveRobot = {
  event: 'move_selected_robot',
  direction: Direction
};

type TokenAchieved = {
  event: 'token_achieved',
};

type EventMessage = 
  GenerateRobotsCoords 
    | SubmitRobotsCoords
    | SelectToken
    | SelectRobot
    | MoveRobot
    | TokenAchieved;

export type {
  EventMessage,
};