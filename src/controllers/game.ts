import { RobotsController } from './robots';
import { TokensController } from './tokens';
import { RobotsPositions } from './types/robots-positions';
import { generateRobotsPositions } from './utils/generate-robots-positions';

class GameController {
  constructor(
    private readonly rc: RobotsController,
    private readonly tc: TokensController,
  ) {
    const robotsPositions = this.generateRobotsPositions();
    this.applyRobotsPositions(robotsPositions);
  }

  private generateRobotsPositions() {
    const positions = generateRobotsPositions(
      this.tc.objects.map((it) => it.coords),
    );
    
    const records = this.rc.objects.reduce<Partial<RobotsPositions>>((record, robot, index) => {
      record[robot.userData.name] = positions[index];

      return record;
    }, {});

    // TODO (2024.10.06): emit robots positions

    return records;
  }

  private applyRobotsPositions(positions: Partial<RobotsPositions>) {
    this.rc.objects.forEach((robot) => {
      const position = positions[robot.userData.name];

      if (!position) {
        throw new Error(`Undefined position for robot "${robot.userData.name}"`);
      }

      robot.move(position);
      robot.visible = true;
    });
  }
}

export {
  GameController,
};