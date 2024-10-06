import robotsInfo from '../assets/robots.json';
import { Robot } from '../models/robot';
import { RobotInfo } from '../models/types/robot';
import { IController } from './types/controller';

class RobotsController implements IController {
  private readonly _robots: Robot[];

  constructor() {
    const robots = robotsInfo.map((info) => {
      const robot = new Robot(info as RobotInfo);

      // by default each robot is hidden
      robot.visible = false;

      return robot;
    });
    this._robots = robots;
  }

  selectRobot(name: RobotInfo['name']) {
    this._robots.forEach((robot) => {
      if (robot.userData.name === name) {
        robot.select();
      } else {
        robot.deselect();
      }
    });
  }
  
  get objects(): Robot[] {
    return this._robots;
  }
}

export {
  RobotsController,
};
