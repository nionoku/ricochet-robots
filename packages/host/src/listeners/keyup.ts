import { Direction } from 'core/src/constants/direction';
import { CoreEventsController } from '../controllers';
import { CoreEvent } from '../events';
import { IListenerController } from './types/listener';

class GameKeyupController implements IListenerController {
  private readonly handler = (event: KeyboardEvent): void => {
    switch (event.key) {
      case 'ArrowUp': {
        this.mc
          .sendMessage({
            event: CoreEvent.MoveRobot,
            direction: Direction.UP,
          });
        return;
      }

      case 'ArrowDown': {
        this.mc
          .sendMessage({
            event: CoreEvent.MoveRobot,
            direction: Direction.DOWN,
          });
        return;
      }

      case 'ArrowLeft': {
        this.mc
          .sendMessage({
            event: CoreEvent.MoveRobot,
            direction: Direction.LEFT,
          });
        return;
      }

      case 'ArrowRight': {
        this.mc
          .sendMessage({
            event: CoreEvent.MoveRobot,
            direction: Direction.RIGHT,
          });
        return;
      }
    }
  };

  constructor(private readonly mc: CoreEventsController) {}

  public attach(): void {
    this.detach();

    globalThis.addEventListener('keyup', this.handler);
  }

  public detach(): void {
    globalThis.removeEventListener('keyup', this.handler);
  }
}

export {
  GameKeyupController,
};
