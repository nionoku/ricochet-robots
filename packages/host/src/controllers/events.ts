import type { IEventMessage } from '../messages/types/event';
import type { Context, IMessagesController } from './types/message-handler';

abstract class EventsController<Message extends IEventMessage<string>> implements IMessagesController<Message> {
  protected context: Context | undefined;

  constructor(private readonly contextOrigin: string) {}

  public setContext(context: Context): this {
    this.context = context;

    return this;
  };

  public on(handler: (message: MessageEvent<Message>) => void): this {
    window.addEventListener('message', handler);
    return this;
  };

  public off(handler: (message: MessageEvent<Message>) => void): this {
    window.removeEventListener('message', handler);
    return this;
  };

  public sendMessage(message: Message): this {
    if (!this.context) {
      throw new Error('Call \'setContext\' before emit events');
    }

    this.context.postMessage(message, this.contextOrigin);

    return this;
  };
}

export {
  EventsController,
};
