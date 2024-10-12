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
import { MapHelper } from '../utils/map-helper';
import { generateRobotsCoords } from './utils/generate-robots-positions';
import { TokenInfo } from '../models/types/token';
import { Token } from '../models/token';
import { Robot } from '../models/robot';
import { Scene, Vector2, Vector2Like } from 'three';
import { isRobot } from '../models/utils/is-robot';
import { GameStateController } from './game-state';
import { GameState } from './constants/game-state';

class GameController {
  /** Message handler */
  private readonly mh: MessagesHandler = (event) => {
    switch (event.data.event) {
      case 'generate_robots_coords': {
        this.generateRobotsCoords();
        return;
      }

      case 'prepare': {
        this.prepareRobots(event.data.robotsCoords);
        this.prepareMap(event.data.schema);
        this.prepareMapHelper(event.data.schema);

        return;
      }

      case 'enable': {
        this.enableRobotsMove();
        return;
      }

      case 'disable': {
        this.disableMoveRobots();
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
        const coords = new Vector2().fromArray(event.data.to);
        this.moveRobot(event.data.robot, coords);
        
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

  private readonly mapHelper = new MapHelper();

  private readonly st = new GameStateController();

  public readonly bc = new BoardController();

  public readonly rc = new RobotsController();

  private readonly tc = new TokensController();

  private readonly mc = new MessageController();

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
      this.mapHelper,
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

  private prepareRobots(coordsList: Partial<RobotsCoords>) {
    this.rc.objects.forEach((robot) => {
      const coords = coordsList[robot.userData.name];

      if (!coords) {
        throw new Error(`Undefined coords for robot: '${robot.userData.name}'`);
      }

      this.moveRobot(robot, coords);
      
      robot.visible = true;
    });
  }

  private prepareMap(partsOrder: number[]) {
    this.bc.setMap(partsOrder);
    this.tc.setTokensFromBoard(this.bc.board);
  }

  private moveRobot(_robot: Robot | RobotInfo['name'], coords: Vector2Like) {
    const robot = isRobot(_robot) ? _robot : this.rc.getRobotByName(_robot);

    if (!robot) {
      throw new Error('Received move robot event with undefined robot');
    }

    robot.move(coords);
  }

  private prepareMapHelper(partsOrder: number[]) {
    this.mapHelper.generate(partsOrder);
  }

  private selectToken(name: TokenInfo['token']) {
    this.tc.selectToken(name);
  }

  private selectRobot(name: RobotInfo['name']) {
    if (this.st.state !== GameState.MOVE_DISABLED) {
      return;
    }

    this.rc.selectRobot(name);
  }

  private moveSelectedRobot(direction: Direction) {
    if (this.st.state !== GameState.MOVE_DISABLED) {
      return;
    }

    if (!this.rc.selectedRobot) {
      return;
    }

    const target = this.mapHelper?.getTargetPoint(this.rc.selectedRobot, direction, this.rc.objects);
    
    if (!target) {
      throw new Error(`Not found position by direction: '${direction}' from: ${this.rc.selectedRobot.coords.toArray()}`);
    }
    
    // if robot didn't move - stop handler
    if (target.equals(this.rc.selectedRobot.coords)) {
      return;
    }

    this.mc.emit({
      event: 'robot_moved',
      robot: this.rc.selectedRobot.userData.name,
      from: this.rc.selectedRobot.coords.toArray(),
      to: target.toArray(),
    });

    if (this.isRobotAchievedToken(this.rc.selectedRobot.userData.name, target, this.tc.selectedToken)) {
      this.mc.emit({
        event: 'token_achieved',
      });
    }
  }

  private isRobotAchievedToken(robotName: RobotInfo['name'], robotCoords: Vector2Like, token: Token | null): boolean {
    if (!token) {
      return false;
    }

    return token.coords.equals(robotCoords)
      // @ts-expect-error TokenColor extends RobotColor
      && token.userData.color.includes(robotName);
  }

  private enableRobotsMove() {
    this.st.setState(GameState.MOVE_ENABLED);
  }

  private disableMoveRobots() {
    this.st.setState(GameState.MOVE_DISABLED);
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