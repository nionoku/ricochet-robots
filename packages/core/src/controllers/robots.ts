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
    const robot = this.getRobotByName(name);

    this.selectRobotAndUnselectOthers(robot);
  }

  selectPrevRobot(): void {
    const nextIndex = this.selectedRobotIndex - 1;

    const nextIndexValid = nextIndex < 0
      ? this._robots.length - 1
      : nextIndex;

    this.selectRobotAndUnselectOthers(this._robots[nextIndexValid]);
  }

  selectNextRobot(): void {
    const nextIndex = this.selectedRobotIndex + 1;

    const nextIndexValid = nextIndex >= this._robots.length
      ? 0
      : nextIndex;

    this.selectRobotAndUnselectOthers(this._robots[nextIndexValid]);
  }

  getRobotByName(name: RobotInfo['name']): Robot {
    const foundRobot = this._robots.find((robot) => robot.userData.name === name);

    if (foundRobot === undefined) {
      throw new Error(`Robot with name ${name} is undefined`);
    }

    return foundRobot;
  }

  private clearSelectedRobot(): void {
    this._selectedRobot?.unselect();
    this._selectedRobot = null;
  }

  private selectRobotAndUnselectOthers(selectedRobot: Robot): void {
    this.clearSelectedRobot();

    for (const robot of this._robots) {
      if (robot === selectedRobot) {
        this._selectedRobot = robot;

        robot.select();
      } else {
        robot.unselect();
      }
    }
  }

  get objects(): Robot[] {
    return this._robots;
  }

  get selectedRobot(): Robot | null {
    return this._selectedRobot;
  }

  private get selectedRobotIndex(): number {
    return this._selectedRobot
      ? this._robots.indexOf(this._selectedRobot)
      : -1;
  }
}

export {
  RobotsController,
};
