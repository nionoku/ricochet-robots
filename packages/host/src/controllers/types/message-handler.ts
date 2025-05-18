import { IEventMessage } from '../../messages/types/event';

type Context = Pick<typeof globalThis, 'postMessage'>;
type MessagesHandler<Event extends string, Message extends IEventMessage<Event>> = (message: MessageEvent<Message>) => void;

interface IMessagesController<Event extends string, Message extends IEventMessage<Event>> {
  setContext: (context: Context) => this
  on: (handler: MessagesHandler<Event, Message>) => this
  off: (handler: MessagesHandler<Event, Message>) => this
  sendMessage: (message: Message) => this
}

export type {
  Context,
  IMessagesController,
};
