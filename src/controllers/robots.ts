import { Object3D } from 'three';
import robotsInfo from '../assets/robots.json';
import { Robot } from '../models/robot';
import { RobotInfo } from '../models/types/robot';
import { IController } from './types/controller';

class RobotsController implements IController {
  private readonly robots: Robot[];

  constructor() {
    const robots = robotsInfo.map((info) => new Robot(info as RobotInfo));
    this.robots = robots;
  }
  
  get objects(): Object3D[] {
    return this.robots;
  }
}

export {
  RobotsController,
};
