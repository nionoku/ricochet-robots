import { MessageController as OriginMessageController } from 'listeners';

class MessageController extends OriginMessageController {
  constructor() {
    super(import.meta.env.VITE_APP_APP_TARGET_ORIGIN);

    if (!window.top) {
      throw new Error('window.top is undefined');
    }

    this.bind(window.top);
  }
}

export {
  MessageController,
};
