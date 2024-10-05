import { Color, Scene } from 'three';
import { IScene } from './types/scene';
import { BoardController } from '../../controllers/board';
import { RobotsController } from '../../controllers/robots';

class MainScene extends Scene implements IScene {
  private readonly bc = new BoardController();

  private readonly rc = new RobotsController();
  
  constructor() {
    super();
    
    this.background = new Color('#D0D0D0');
    this.setupScene();
    this.setupRobots();
  }

  private setupScene() {
    const board = this.bc.objects[0];
    board.rotation.x = 270 * (Math.PI / 180);

    this.add(board);
  }

  private setupRobots() {
    this.add(...this.rc.objects);
  }

  update() {
    return;
  }
}

export {
  MainScene,
};