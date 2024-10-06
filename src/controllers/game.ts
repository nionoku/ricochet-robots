import { MathUtils, Vector2Like } from 'three';
import { BoardCoordsHelper } from '../utils/coords-helper';
import { RobotsController } from './robots';
import { TokensController } from './tokens';

class GameController {
  constructor(
    private readonly rc: RobotsController,
    private readonly tc: TokensController,
  ) {
    const robotsPositions = this.generateRobotsPositions();
    
    rc.objects.forEach((robot, index) => {
      robot.move(robotsPositions[index]);

      robot.visible = true;
    });
  }

  private reduceValidCell(records: Vector2Like[], cell: number, ri: number, ci: number) {
    const currentPosition = BoardCoordsHelper.toPosition({ x: ci, y: ri });

    const isValid = [
      // cell not box wall
      cell !== 15,
      // exclude tokens positions
      this.tc.positions.every((position) => !currentPosition.equals(position)),
    ].every(Boolean);

    if (isValid) {
      records.push(currentPosition);
    }

    return records;
  }

  private generateRobotsPositions(): Vector2Like[] {
    const map = BoardCoordsHelper.map();
    const cells = map.flatMap((column, ci) => {
      return column.reduce<Vector2Like[]>((records, cell, ri) => 
        this.reduceValidCell(records, cell, ri, ci), [],
      );
    });

    return Array.from({ length: 5 }, () => {
      return cells.splice(MathUtils.randInt(0, cells.length - 1), 1)[0];
    });
  }
}

export {
  GameController,
};