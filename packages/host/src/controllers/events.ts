import { IEventMessage } from '../messages/types/event';
import { Context, IMessagesController } from './types/message-handler';

abstract class EventsController<Event extends string, Message extends IEventMessage<Event> = IEventMessage<Event>> implements IMessagesController<Event, Message> {
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
