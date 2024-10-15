import type { EventMessage } from '../types/events';
import type { MessagesHandler } from '../types/message';

class MessageController {
  constructor(private readonly targetOrigin: string) {}

  on(handler: MessagesHandler) {
    window.addEventListener('message', handler);
  }

  off(handler: MessagesHandler) {
    window.removeEventListener('message', handler);
  }

  emit(message: EventMessage) {
    window.top?.postMessage(message, this.targetOrigin);
  }
}

export {
  MessageController,
};