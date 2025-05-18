import { Direction } from 'core/src/constants/direction';
import { CoreEventsController } from '../controllers';
import { CoreEvent } from '../events';
import type { IListenerController } from './types/listener';

const THRESHOLD = 20;

class GameSwipeController implements IListenerController {
  private lastStartSwipeData: Touch | undefined;

  private readonly touchMoveHandler = (event: TouchEvent): void => {
    event.preventDefault();
  };

  private readonly touchStartHandler = (event: TouchEvent): void => {
    this.lastStartSwipeData = event.changedTouches[0];
  };

  private readonly touchEndHandler = (event: TouchEvent): void => {
    const endSwipeData = event.changedTouches[0];

    if (!this.lastStartSwipeData) {
      throw new Error('Last start swipe data is empty');
    }

    const diffByX = this.lastStartSwipeData.screenX - endSwipeData.screenX;
    const diffByY = this.lastStartSwipeData.screenY - endSwipeData.screenY;

    this.lastStartSwipeData = undefined;

    // cancel swipe event, if every diff less than threshold
    if ([diffByX, diffByY].every((it) => Math.abs(it) < THRESHOLD)) {
      return;
    }

    const direction = ((): Direction => {
      if (Math.abs(diffByX) > Math.abs(diffByY)) {
        return diffByX > 0 ? Direction.LEFT : Direction.RIGHT;
      } else {
        return diffByY > 0 ? Direction.UP : Direction.DOWN;
      }
    })();

    this.handler(direction);
  };

  private readonly handler = (direction: Direction): void => {
    this.mc.sendMessage({
      event: CoreEvent.MoveRobot,
      direction,
    });
  };

  constructor(private readonly mc: CoreEventsController) {}

  public attach(): void {
    this.detach();

    globalThis.addEventListener('touchmove', this.touchMoveHandler, { passive: false });
    globalThis.addEventListener('touchstart', this.touchStartHandler);
    globalThis.addEventListener('touchend', this.touchEndHandler);
  }

  public detach(): void {
    globalThis.removeEventListener('touchmove', this.touchMoveHandler);
    globalThis.removeEventListener('touchstart', this.touchStartHandler);
    globalThis.removeEventListener('touchend', this.touchEndHandler);
  }
}

export {
  GameSwipeController,
};
