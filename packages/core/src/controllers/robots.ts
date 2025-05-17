import robotsInfo from '../assets/robots.json';
import { Robot } from '../models/robot';
import type { RobotInfo } from '../models/types/robot';
import type { IController } from './types/controller';

class RobotsController implements IController {
  private readonly _robots: Robot[];

  private _selectedRobot: Robot | null = null;

  constructor() {
    const robots = robotsInfo.map((info) => {
      const robot = new Robot(info as RobotInfo);

      robot.visible = false;

      return robot;
    });

    this._robots = robots;
  }

  selectRobot(name: RobotInfo['name']): void {
    this.clearSelectedRobot();

    for (const robot of this._robots) {
      if (robot.userData.name === name) {
        this._selectedRobot = robot;

        robot.select();
      } else {
        robot.unselect();
      }
    }
  }

  clearSelectedRobot(): void {
    this._selectedRobot = null;
  }

  getRobotByName(name: RobotInfo['name']): Robot {
    const foundRobot = this._robots.find((robot) => robot.userData.name === name);

    if (foundRobot === undefined) {
      throw new Error(`Robot with name ${name} is undefined`);
    }

    return foundRobot;
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
