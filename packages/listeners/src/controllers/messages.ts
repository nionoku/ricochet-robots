import type { EventMessage } from '../types/events';
import type { MessagesHandler } from '../types/message';

class MessageController {
  protected target: Window | undefined;

  constructor(private readonly targetOrigin: string) {}

  bind(element: Window) {
    this.target = element;
    return this;
  }

  on(handler: MessagesHandler) {
    window.addEventListener('message', handler);
    return this;
  }

  off(handler: MessagesHandler) {
    window.removeEventListener('message', handler);
    return this;
  }

  sendMessage(message: EventMessage) {
    if (!this.target) {
      throw new Error('Call \'bind\' with argument is target window, before emit events');
    }

    this.target.postMessage(message, this.targetOrigin);
    return this;
  }
}

export {
  MessageController,
};
