import robotsInfo from '../assets/robots.json';
import { Robot } from '../models/robot';
import { RobotInfo } from '../models/types/robot';
import { IController } from './types/controller';

class RobotsController implements IController {
  private readonly _robots: Robot[];

  private _selectedRobot: Robot | null = null;

  constructor() {
    const robots = robotsInfo.map((info) => {
      const robot = new Robot(info as RobotInfo);

      return robot;
    });
    this._robots = robots;
  }

  selectRobot(name: RobotInfo['name']) {
    this.clearSelectedRobot();

    this._robots.forEach((robot) => {
      if (robot.userData.name === name) {
        this._selectedRobot = robot;

        robot.select();
      } else {
        robot.deselect();
      }
    });
  }

  clearSelectedRobot() {
    this._selectedRobot = null;
  }

  getRobotByName(name: RobotInfo['name']): Robot | undefined {
    return this._robots.find((robot) => robot.userData.name === name);
  }
  
  get objects(): Robot[] {
    return this._robots;
  }

  get selectedRobot(): Robot | null {
    return this._selectedRobot;
  }
}

export {
  RobotsController,
};
