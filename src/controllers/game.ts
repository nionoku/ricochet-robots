import { BoardController } from './board';
import { IntersectionsController } from './intersections';
import { MessageController } from './messages';
import { RobotsController } from './robots';
import { TokensController } from './tokens';
import { MessagesHandler } from './types/message';
import { RobotsCoords } from './types/robots-coords';
import { IntersectionEventHandler } from './types/intersections';
import { RobotInfo } from '../models/types/robot';
import { Direction } from '../constants/direction';
import { BoardCoordsHelper } from '../utils/coords-helper';
import { generateRobotsCoords } from './utils/generate-robots-positions';
import { TokenInfo } from '../models/types/token';
import { Token } from '../models/token';
import { Robot } from '../models/robot';
import { Scene, Vector2Like } from 'three';

class GameController {
  /** Message handler */
  private readonly mh: MessagesHandler = (event) => {
    switch (event.data.event) {
      case 'generate_robots_coords': {
        this.generateRobotsCoords();
        return;
      }

      case 'submit_robots_coords': {
        this.moveRobots(event.data.coords);
        return;
      }

      case 'select_token': {
        this.selectToken(event.data.token);
        return;
      }

      case 'select_robot': {
        this.selectRobot(event.data.name);
        return;
      }

      case 'move_robot': {
        this.moveSelectedRobot(event.data.direction);
        return;
      }

      case 'robot_moved': {
        // TODO (2024.10.11): Move robots from other players
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
          this.mc.emit({ event: 'move_robot', direction: Direction.UP });
          return;
        }

        case 'ArrowDown': {
          this.mc.emit({ event: 'move_robot', direction: Direction.DOWN });
          return;
        }

        case 'ArrowLeft': {
          this.mc.emit({ event: 'move_robot', direction: Direction.LEFT });
          return;
        }

        case 'ArrowRight': {
          this.mc.emit({ event: 'move_robot', direction: Direction.RIGHT });
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

  private generateRobotsCoords() {
    const coords = generateRobotsCoords(
      this.tc.objects.map((it) => it.coords),
    );
    
    const data = this.rc.objects.reduce<Partial<RobotsCoords>>((record, robot, index) => {
      record[robot.userData.name] = coords[index];

      return record;
    }, {});

    this.mc.emit({
      event: 'submit_robots_coords',
      coords: data,
    });
  }

  private moveRobots(coordsList: Partial<RobotsCoords>) {
    this.rc.objects.forEach((robot) => {
      const coords = coordsList[robot.userData.name];

      if (!coords) {
        throw new Error(`Undefined coords for robot "${robot.userData.name}"`);
      }

      this.moveRobot(robot, coords);
    });
  }

  private moveRobot(robot: Robot, coords: Vector2Like) {
    robot.move(coords);
  }

  private selectToken(name: TokenInfo['token']) {
    this.tc.selectToken(name);
  }

  private selectRobot(name: RobotInfo['name']) {
    this.rc.selectRobot(name);
  }

  private moveSelectedRobot(direction: Direction) {
    if (!this.rc.selectedRobot) {
      return;
    }

    const target = BoardCoordsHelper.getTargetPoint(this.rc.selectedRobot, direction, this.rc.objects);
    // if robot didn't move - stop handler
    if (target.equals(this.rc.selectedRobot.coords)) {
      return;
    }

    this.rc.selectedRobot.move(target);

    this.mc.emit({
      event: 'robot_moved',
      coords: target,
    });

    if (this.isRobotAchievedToken(this.rc.selectedRobot, this.tc.selectedToken)) {
      this.mc.emit({
        event: 'token_achieved',
      });
    }
  }

  private isRobotAchievedToken(robot: Robot | null, token: Token | null): boolean {
    if (!token || !robot) {
      return false;
    }

    return token.coords.equals(robot.coords) 
      // @ts-expect-error TokenColor extends RobotColor
      && token.userData.color.includes(robot.userData.name);
  }

  private get rootObject() {
    const root = this.bc.objects[0].parent;

    if (!root) {
      throw new Error('Undefined parent for board');
    }

    if (!(root as Scene).isScene) {
      throw new Error('Parent is not a Scene');
    }

    return root;
  }
}

export {
  GameController,
};