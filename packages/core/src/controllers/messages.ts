import type { EventMessage } from './types/events';
import type { MessagesHandler } from './types/message';

class MessageController {
  on(handler: MessagesHandler) {
    window.addEventListener('message', handler);
  }

  off(handler: MessagesHandler) {
    window.removeEventListener('message', handler);
  }

  emit(message: EventMessage) {
    // eslint-disable-next-line sonarjs/post-message
    window.top?.postMessage(message, '*');
  }
}

export {
  MessageController,
};