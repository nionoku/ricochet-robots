import { Direction } from 'core/src/constants/direction';
import { CoreEventsControllerImpl } from '../controllers';
import { CoreEvent } from '../events';
import type { IListenerController } from './types/listener';
import { Keys } from './types/keys';

class GameKeyupController implements IListenerController {
  private readonly handler = (keyEvent: KeyboardEvent): void => {
    switch (keyEvent.code as Keys) {
      case Keys.UP: {
        this.mc
          .sendMessage({
            event: CoreEvent.MoveRobot,
            direction: Direction.UP,
          });
        return;
      }

      case Keys.DOWN: {
        this.mc
          .sendMessage({
            event: CoreEvent.MoveRobot,
            direction: Direction.DOWN,
          });
        return;
      }

      case Keys.LEFT: {
        this.mc
          .sendMessage({
            event: CoreEvent.MoveRobot,
            direction: Direction.LEFT,
          });
        return;
      }

      case Keys.RIGHT: {
        this.mc
          .sendMessage({
            event: CoreEvent.MoveRobot,
            direction: Direction.RIGHT,
          });
        return;
      }

      case Keys.SPACE: {
        const event: CoreEvent.SelectNextRobot | CoreEvent.SelectPrevRobot = keyEvent.shiftKey
          ? CoreEvent.SelectPrevRobot
          : CoreEvent.SelectNextRobot;

        this.mc
          .sendMessage({
            event,
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
