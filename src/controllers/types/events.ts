/* eslint-disable @typescript-eslint/indent */
import { RobotInfo } from '../../models/types/robot';
import { Direction } from '../../types/direction';
import { RobotsPositions } from './robots-positions';

type GenerateRobotsPositions = {
  event: 'generate_robots_positions'
};

type SubmitRobotsPositions = {
  event: 'submit_robots_positions'
  data: Partial<RobotsPositions>
};

type SelectRobot = {
  event: 'select_robot',
  name: RobotInfo['name']
};

type MoveRobot = {
  event: 'move_selected_robot',
  direction: Direction
};

type EventMessage = 
  GenerateRobotsPositions 
    | SubmitRobotsPositions
    | SelectRobot
    | MoveRobot;

export type {
  EventMessage,
};