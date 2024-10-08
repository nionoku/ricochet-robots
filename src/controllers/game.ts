import { BoardController } from './board';
import { IntersectionsController } from './intersections';
import { MessageController } from './messages';
import { RobotsController } from './robots';
import { TokensController } from './tokens';
import { MessagesHandler } from './types/message';
import { RobotsPositions } from './types/robots-positions';
import { generateRobotsPositions } from './utils/generate-robots-positions';
import { IntersectionEventHandler } from './types/intersections';
import { RobotInfo } from '../models/types/robot';
import { Direction } from '../types/direction';
import { BoardCoordsHelper } from '../utils/coords-helper';

class GameController {
  /** Message handler */
  private readonly mh: MessagesHandler = (event) => {
    switch (event.data.event) {
      case 'generate_robots_positions': {
        this.generateRobotsPositions();
        return;
      }

      case 'submit_robots_positions': {
        this.applyRobotsPositions(event.data.data);
        return;
      }

      case 'select_robot': {
        this.selectRobot(event.data.name);
        return;
      }

      case 'move_selected_robot': {
        this.moveSelectedRobot(event.data.direction);
        return;
      }
    }
  };

  /** Click event handler */
  private readonly ceh: IntersectionEventHandler = (intersections) => {
    /* handle click by robot */
    const robot = intersections.find(({ object }) => object.name === 'robot')?.object;

    if (robot) {
      this.mc.emit({ event: 'select_robot', name: robot.userData.name });
    }
    /* end handle click by robot */
  };

  /** Intersection handler */
  private readonly ih: IntersectionEventHandler = (intersections, event) => {
    if (event === 'click') {
      return this.ceh(intersections);
    }
  };

  public readonly bc = new BoardController();

  public readonly rc = new RobotsController();

  public readonly tc = new TokensController();

  public readonly mc = new MessageController();

  constructor(private readonly ic: IntersectionsController) {
    /* -- temporary keyboard listener -- */
    window.addEventListener('keyup', (event) => {
      switch (event.key) {
        case 'ArrowUp': {
          this.mc.emit({ event: 'move_selected_robot', direction: Direction.UP });
          return;
        }

        case 'ArrowDown': {
          this.mc.emit({ event: 'move_selected_robot', direction: Direction.DOWN });
          return;
        }

        case 'ArrowLeft': {
          this.mc.emit({ event: 'move_selected_robot', direction: Direction.LEFT });
          return;
        }

        case 'ArrowRight': {
          this.mc.emit({ event: 'move_selected_robot', direction: Direction.RIGHT });
          return;
        }
      }
    });
    /* -- end temporary keyboard listener -- */
  }

  public prepare() {
    this.mc.on(this.mh);
    this.ic.on(this.rootObject, this.ih);
  }

  private generateRobotsPositions() {
    const positions = generateRobotsPositions(
      this.tc.objects.map((it) => it.coords),
    );
    
    const data = this.rc.objects.reduce<Partial<RobotsPositions>>((record, robot, index) => {
      record[robot.userData.name] = positions[index];

      return record;
    }, {});

    this.mc.emit({
      event: 'submit_robots_positions',
      data,
    });
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

  private selectRobot(name: RobotInfo['name']) {
    this.rc.selectRobot(name);
  }

  private moveSelectedRobot(direction: Direction) {
    if (!this.rc.selectedRobot) {
      return;
    }

    BoardCoordsHelper.calculateDestinationPoint(this.rc.selectedRobot, direction, this.rc.objects);
    
    throw new Error('Not implemented');
  }

  private get rootObject() {
    const root = this.bc.objects[0].parent;

    if (!root) {
      throw new Error('Undefined parent for board');
    }

    if (root.type !== 'Scene') {
      throw new Error('Parent for board is not a Scene');
    }

    return root;
  }
}

export {
  GameController,
};