import { Object3D, Scene, Vector2, type Vector2Like } from 'three';
import { KeyupController, type MessagesHandler } from 'listeners';
import type { RobotInfo } from '../models/types/robot';
import { Direction } from '../constants/direction';
import { MapHelper } from '../utils/map-helper';
import type { TokenName } from '../models/types/token';
import { Token } from '../models/token';
import { Robot } from '../models/robot';
import { isRobot } from '../models/utils/is-robot';
import { isScene } from '../models/utils/is-scene';
import { isRobotEqualTokenColors } from '../models/utils/is-robot-equal-token-colors';
import { BoardController } from './board';
import { IntersectionController } from './intersection';
import { RobotsController } from './robots';
import { TokensController } from './tokens';
import type { RobotsCoords } from './types/robots-coords';
import type { IntersectionEventHandler } from './types/intersections';
import { generateRobotsCoords } from './utils/generate-robots-positions';
import { GameStateController } from './game-state';
import { GameState } from './constants/game-state';
import { MessagesController } from './messages';

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
        this.calculateSelectedRobotMovedPosition(event.data.direction);
        return;
      }

      case 'robot_moved': {
        this.moveSelectedRobot(event.data.to);
      }
    }
  };

  /** Click event handler */
  private readonly ceh: IntersectionEventHandler = (intersections) => {
    /* handle click by robot */
    const robot = intersections.find(({ object }) => isRobot(object))?.object as Robot | undefined;

    if (robot) {
      this.mc.sendMessage({
        event: 'select_robot',
        name: robot.userData.name,
      });
    }
    /* end handle click by robot */
  };

  /** Intersection handler */
  private readonly ih: IntersectionEventHandler = (intersections, event) => {
    // eslint-disable-next-line sonarjs/no-small-switch -- will be fixed after add other events
    switch (event) {
      case 'click': {
        this.ceh(intersections);
        break;
      }

      default: {
        break;
      }
    }
  };

  private readonly mapHelper = new MapHelper();

  private readonly st = new GameStateController();

  private readonly tc = new TokensController();

  private readonly mc = new MessagesController();

  private readonly bc = new BoardController();

  private readonly rc = new RobotsController();

  private readonly kc = new KeyupController(globalThis, this.mc);

  constructor(private readonly ic: IntersectionController) {}

  public prepare(): void {
    this.kc.on();
    this.mc.on(this.mh);
    this.ic.on(this.rootObject, this.ih);
  }

  public notifyReady(): void {
    this.mc.sendMessage({ event: 'ready' });
  }

  private generateRobotsCoords(): void {
    const coords = generateRobotsCoords(
      this.mapHelper,
      this.tc.objects.map((it) => it.coords),
    );

    const data = this.rc.objects.reduce<Partial<RobotsCoords>>((list, robot, index) => {
      list[robot.userData.name] = coords[index];

      return list;
    }, {});

    this.mc.sendMessage({
      event: 'submit_robots_coords',
      coords: data,
    });
  }

  private prepareRobots(coordsList: Partial<RobotsCoords>): void {
    for (const robot of this.rc.objects) {
      const coords = coordsList[robot.userData.name];

      if (!coords) {
        throw new Error(`Undefined coords for robot: '${robot.userData.name}'`);
      }

      this.moveRobot(robot, coords);

      robot.visible = true;
    }
  }

  private prepareMap(partsOrder: number[]): void {
    this.bc.setMap(partsOrder);
    this.tc.setTokensFromBoard(this.bc.board);
  }

  private moveRobot(_robot: Robot | RobotInfo['name'], coords: Vector2Like): void {
    const robot = isRobot(_robot)
      ? _robot
      : this.rc.getRobotByName(_robot);

    robot.move(coords);
  }

  private prepareMapHelper(partsOrder: number[]): void {
    this.mapHelper.generate(partsOrder);
  }

  private selectToken(name: TokenName): void {
    this.tc.selectToken(name);
  }

  private selectRobot(name: RobotInfo['name']): void {
    if (this.st.state === GameState.MOVE_DISABLED) {
      return;
    }

    this.rc.selectRobot(name);
  }

  private calculateSelectedRobotMovedPosition(direction: Direction, selectedRobot = this.rc.selectedRobot): void {
    if (this.st.state === GameState.MOVE_DISABLED) {
      return;
    }

    if (!selectedRobot) {
      return;
    }

    const target = this.mapHelper.getTargetPoint(selectedRobot, direction, this.rc.objects);

    // if robot didn't move - stop handler
    if (target.equals(selectedRobot.coords)) {
      return;
    }

    this.mc.sendMessage({
      event: 'robot_moved',
      robot: selectedRobot.userData.name,
      from: selectedRobot.coords.toArray(),
      to: target.toArray(),
    });
  }

  private moveSelectedRobot(position: number[], selectedRobot = this.rc.selectedRobot, selectedToken = this.tc.selectedToken): void {
    if (!selectedRobot) {
      return;
    }

    const nextCoords = new Vector2().fromArray(position);
    selectedRobot.move(nextCoords);

    if (!selectedToken) {
      return;
    }

    const isRobotReachedTargetToken = this.isRobotReachedTargetToken(selectedRobot, selectedToken);

    if (isRobotReachedTargetToken) {
      this.mc.sendMessage({
        event: 'token_achieved',
        token: selectedToken.userData.name,
      });
    }
  }

  private isRobotReachedTargetToken(robot: Robot, token: Token): boolean {
    return token.coords.equals(robot.coords) && isRobotEqualTokenColors(robot, token);
  }

  private enableRobotsMove(): void {
    this.st.setState(GameState.MOVE_ENABLED);
  }

  private disableMoveRobots(): void {
    this.st.setState(GameState.MOVE_DISABLED);
  }

  public get objects(): Object3D[] {
    return [
      this.bc.board,
      ...this.rc.objects,
    ];
  }

  private get rootObject(): Scene {
    const root = this.bc.objects[0].parent;

    if (!isScene(root)) {
      throw new Error('Parent is not a Scene');
    }

    return root;
  }
}

export {
  GameController,
};
