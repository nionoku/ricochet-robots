import { Color, Scene } from 'three';
import appConfig from '#app-config';
import { GameController } from '../../controllers/game';
import type { IScene } from './types/scene';

class MainScene extends Scene implements IScene {
  constructor(private readonly gc: GameController) {
    super();

    this.background = new Color(appConfig.scene_background_color);
    this.setupScene();

    gc.prepare();
  }

  private setupScene(): void {
    this.add(...this.gc.objects);
  }

  update(): void {
    return;
  }
}

export {
  MainScene,
};
