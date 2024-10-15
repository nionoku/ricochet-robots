import { MessageController as OriginMessageController, type EventMessage } from 'listeners';

class MessageController extends OriginMessageController {
  constructor() {
    super(import.meta.env.VITE_APP_APP_TARGET_ORIGIN);
  }

  emit(message: EventMessage) {
    if (!window.top) {
      throw new Error('window.top is undefined');
    }
    
    super.emit(message, window.top);
  }
}

export {
  MessageController,
};