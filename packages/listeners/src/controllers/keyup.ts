import { Direction } from 'core/src/constants/direction';
import type { IMessagesControllerImpl } from '../types';

class KeyupController {
  private readonly kh: (event: KeyboardEvent) => void;

  constructor(private readonly target: Window, mc: IMessagesControllerImpl) {
    this.kh = (event) => {
      switch (event.key) {
        case 'ArrowUp': {
          mc.emit({ event: 'move_robot', direction: Direction.UP });
          return;
        }

        case 'ArrowDown': {
          mc.emit({ event: 'move_robot', direction: Direction.DOWN });
          return;
        }

        case 'ArrowLeft': {
          mc.emit({ event: 'move_robot', direction: Direction.LEFT });
          return;
        }

        case 'ArrowRight': {
          mc.emit({ event: 'move_robot', direction: Direction.RIGHT });
          return;
        }
      }
    };
  }

  on() {
    this.target.addEventListener('keyup', this.kh);
  }

  off() {
    this.target.removeEventListener('keyup', this.kh);
  }
}

export {
  KeyupController,
};