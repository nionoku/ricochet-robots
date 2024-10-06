/* eslint-disable @typescript-eslint/indent */
import { RobotInfo } from '../../models/types/robot';
import { RobotsPositions } from './robots-positions';

type GenerateRobotsPositions = {
  event: 'generate_robots_positions'
};

type SubmitRobotsPositions = {
  event: 'submit_robots_positions'
  data: Partial<RobotsPositions>
};

type ClickByRobot = {
  event: 'click_by_robot',
  name: RobotInfo['name']
};

type EventMessage = 
  GenerateRobotsPositions 
    | SubmitRobotsPositions
    | ClickByRobot;

export type {
  EventMessage,
};