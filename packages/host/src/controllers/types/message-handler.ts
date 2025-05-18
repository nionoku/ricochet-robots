import type { IEventMessage } from '../../messages/types/event';

type Context = Pick<typeof globalThis, 'postMessage'>;
type MessagesHandler<Message extends IEventMessage<string>> = (message: MessageEvent<Message>) => void;

interface IMessagesController<Message extends IEventMessage<string>, Handler extends MessagesHandler<Message> = MessagesHandler<Message>> {
  setContext: (context: Context) => this
  on: (handler: Handler) => this
  off: (handler: Handler) => this
  sendMessage: (message: Message) => this
}

export type {
  Context,
  MessagesHandler,
  IMessagesController,
};
