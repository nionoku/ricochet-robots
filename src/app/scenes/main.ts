import { Color, Scene } from 'three';
import { IScene } from './types/scene';
import { GameController } from '../../controllers/game';

class MainScene extends Scene implements IScene {
  constructor(private readonly gc: GameController) {
    super();

    this.background = new Color('#D0D0D0');
    this.setupScene();
    this.setupRobots();

    gc.prepare();
  }

  private setupScene() {
    this.add(this.gc.bc.board);
  }

  private setupRobots() {
    this.add(...this.gc.rc.objects);
  }

  update() {
    return;
  }
}

export {
  MainScene,
};