import { Direction } from 'core/src/constants/direction';
import { CoreEventsControllerImpl } from '../controllers';
import { CoreEvent } from '../events';
import type { IListenerController } from './types/listener';
import { Keys } from './types/keys';

class GameKeyupController implements IListenerController {
  private readonly handler = (event: KeyboardEvent): void => {
    switch (event.key as Keys) {
      case Keys.Up: {
        this.mc
          .sendMessage({
            event: CoreEvent.MoveRobot,
            direction: Direction.UP,
          });
        return;
      }

      case Keys.Down: {
        this.mc
          .sendMessage({
            event: CoreEvent.MoveRobot,
            direction: Direction.DOWN,
          });
        return;
      }

      case Keys.Left: {
        this.mc
          .sendMessage({
            event: CoreEvent.MoveRobot,
            direction: Direction.LEFT,
          });
        return;
      }

      case Keys.Right: {
        this.mc
          .sendMessage({
            event: CoreEvent.MoveRobot,
            direction: Direction.RIGHT,
          });
        return;
      }
    }
  };

  constructor(private readonly mc: CoreEventsControllerImpl) {}

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
