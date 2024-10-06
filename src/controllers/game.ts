import { MathUtils, Vector2 } from 'three';
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

  private reduceValidCell(records: Vector2[], cell: number, ri: number, ci: number) {
    const currentPosition = BoardCoordsHelper.toPosition(new Vector2(ci, ri));

    const isValid = [
      // cell not box wall
      cell !== 15,
      // exclude tokens positions
      this.tc.positions.every((position) => !position.equals(currentPosition)),
    ].every(Boolean);

    if (isValid) {
      records.push(currentPosition);
    }

    return records;
  }

  private generateRobotsPositions(): Vector2[] {
    const map = BoardCoordsHelper.map();
    const cells: Vector2[] = map.flatMap((column, ci) => {
      return column.reduce<Vector2[]>((records, cell, ri) => 
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