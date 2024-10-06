import { Color, Scene } from 'three';
import { IScene } from './types/scene';
import { BoardController } from '../../controllers/board';
import { RobotsController } from '../../controllers/robots';
import { GameController } from '../../controllers/game';
import { TokensController } from '../../controllers/tokens';

class MainScene extends Scene implements IScene {
  private readonly bc = new BoardController();

  private readonly rc = new RobotsController();

  private readonly tc = new TokensController();

  private readonly gc = new GameController(
    this.rc,
    this.tc,
  );
  
  constructor() {
    super();
    
    this.background = new Color('#D0D0D0');
    this.setupScene();
    this.setupRobots();
    this.setupTokens();
  }

  private setupScene() {
    const board = this.bc.objects[0];
    board.rotation.x = 270 * (Math.PI / 180);

    this.add(board);
  }

  private setupRobots() {
    this.add(...this.rc.objects);
  }

  private setupTokens() {
    // TODO (2024.10.06): Add tokens
    this.add();
  }

  update() {
    return;
  }
}

export {
  MainScene,
};