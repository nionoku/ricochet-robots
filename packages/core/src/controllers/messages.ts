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
    window.top?.postMessage(message, import.meta.env.VITE_APP_APP_TARGET_ORIGIN);
  }
}

export {
  MessageController,
};