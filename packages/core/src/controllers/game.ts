import { Camera, Object3D, Scene, Vector2, type Vector2Like } from 'three';
import type { RobotInfo } from '../models/types/robot';
import { Direction } from '../constants/direction';
import { MapHelper } from '../utils/map-helper';
import type { TokenName } from '../models/types/token';
import { Token } from '../models/token';
import { Robot } from '../models/robot';
import { isRobot } from '../models/utils/is-robot';
import { isScene } from '../models/utils/is-scene';
import { isRobotEqualTokenColors } from '../models/utils/is-robot-equal-token-colors';
import { CoreMessageHandler, CoreEvent, GameKeyupController, IListenerController, GameSwipeController } from '../../../host';
import { BoardController } from './board';
import { IntersectionController } from './intersection';
import { RobotsController } from './robots';
import { TokensController } from './tokens';
import type { RobotsCoords } from './types/robots-coords';
import type { IntersectionEventHandler } from './types/intersections';
import { generateRobotsCoords } from './utils/generate-robots-positions';
import { GameStateController } from './game-state';
import { GameState } from './constants/game-state';
import { EventsController } from './events';
import { NotationsController } from './notations';

class GameController {
  /** Message handler */
  private readonly mh: CoreMessageHandler = (event) => {
    switch (event.data.event) {
      case CoreEvent.GenerateInitialRobotsCoords: {
        this.generateRobotsCoords();
        return;
      }

      case CoreEvent.ConfigureGame: {
        this.configureRobots(event.data.robots_coords);
        this.configureMap(event.data.order_map_parts);
        this.configureMapHelper(event.data.order_map_parts);

        return;
      }

      case CoreEvent.EnableMoveRobots: {
        this.enableRobotsMove();
        return;
      }

      case CoreEvent.DisableMoveRobots: {
        this.disableMoveRobots();
        return;
      }

      case CoreEvent.SetTargetToken: {
        this.selectToken(event.data.token);
        return;
      }

      case CoreEvent.SelectRobot: {
        this.selectRobot(event.data.robot);
        return;
      }

      case CoreEvent.SelectPrevRobot: {
        this.selectPrevRobot();
        return;
      }

      case CoreEvent.SelectNextRobot: {
        this.selectNextRobot();
        return;
      }

      case CoreEvent.MoveRobot: {
        this.calculateSelectedRobotMovedPosition(event.data.direction);
        return;
      }

      case CoreEvent.RobotMoved: {
        this.moveSelectedRobot(event.data.to);
      }
    }
  };

  /** Click event handler */
  private readonly ceh: IntersectionEventHandler = (intersections) => {
    /* handle click by robot */
    const robot = intersections.at(0)?.object;

    if (robot && isRobot(robot)) {
      this.mc.sendMessage({
        event: CoreEvent.SelectRobot,
        robot: robot.userData.name,
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

  private readonly mc = EventsController.instance;

  private readonly bc = new BoardController();

  private readonly nc = new NotationsController();

  private readonly rc = new RobotsController();

  private readonly ic: IntersectionController;

  private readonly interactiveControllers: IListenerController[];

  constructor(private readonly root: HTMLCanvasElement, private readonly camera: Camera) {
    this.ic = new IntersectionController(this.root, this.camera);

    this.interactiveControllers = [
      new GameKeyupController(this.mc),
      new GameSwipeController(this.mc),
      this.ic,
    ];
  }

  public prepare(): void {
    this.mc.on(this.mh);
    this.ic.bind(this.rootObject, this.ih);
  }

  public notifyReady(): void {
    this.mc.sendMessage({
      event: CoreEvent.Ready,
    });
  }

  public attachInteractiveListeners(): void {
    for (const controller of this.interactiveControllers) {
      controller.attach();
    }
  }

  private generateRobotsCoords(): void {
    const coords = generateRobotsCoords(
      this.mapHelper,
      this.tc.objects.map((it) => it.coords),
    );

    const robotsCoords = this.rc.objects.reduce<Partial<RobotsCoords>>((list, robot, index) => {
      list[robot.userData.name] = coords[index].toArray();

      return list;
    }, {});

    this.mc.sendMessage({
      event: CoreEvent.InitialRobotsCoords,
      coords: robotsCoords,
    });
  }

  private configureRobots(coordsList: Partial<RobotsCoords>): void {
    for (const robot of this.rc.objects) {
      const coords = coordsList[robot.userData.name];

      if (!coords) {
        throw new Error(`Undefined coords for robot: '${robot.userData.name}'`);
      }

      const coordsVector = new Vector2().fromArray(coords);

      this.moveRobot(robot, coordsVector);

      robot.visible = true;
    }
  }

  private configureMap(partsOrder: number[]): void {
    this.bc.setMap(partsOrder);
    this.tc.setTokensFromBoard(this.bc.board);
  }

  private moveRobot(_robot: Robot | RobotInfo['name'], coords: Vector2Like): void {
    const robot = (_robot instanceof Object3D) && isRobot(_robot)
      ? _robot
      : this.rc.getRobotByName(_robot);

    robot.move(coords);
  }

  private configureMapHelper(partsOrder: number[]): void {
    this.mapHelper.generate(partsOrder);
  }

  private selectToken(name: TokenName): void {
    const token = this.tc.selectToken(name);

    // highlight notations
    this.nc.highlighting(token.coords);
  }

  private selectRobot(name: RobotInfo['name']): void {
    if (this.st.state === GameState.MOVE_DISABLED) {
      return;
    }

    this.rc.selectRobot(name);
  }

  private selectPrevRobot(): void {
    if (this.st.state === GameState.MOVE_DISABLED) {
      return;
    }

    this.rc.selectPrevRobot();
  }

  private selectNextRobot(): void {
    if (this.st.state === GameState.MOVE_DISABLED) {
      return;
    }

    this.rc.selectNextRobot();
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
      event: CoreEvent.RobotMoved,
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
        event: CoreEvent.TokenAchieved,
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
      ...this.bc.objects,
      ...this.nc.objects,
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
