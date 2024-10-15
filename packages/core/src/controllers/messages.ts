import { MessageController as OriginMessageController, type EventMessage } from 'listeners';

class MessageController extends OriginMessageController {
  constructor() {
    super(import.meta.env.VITE_APP_APP_TARGET_ORIGIN);
  }

  emit(message: EventMessage) {
    window.top?.postMessage(message);
  }
}

export {
  MessageController,
};