import type { EventMessage } from '../types/events';
import type { MessagesHandler } from '../types/message';

type Target = Pick<typeof globalThis, 'postMessage'>;

class MessageController {
  protected target: Target | undefined;

  constructor(private readonly targetOrigin: string) {}

  bind(element: Target) {
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
