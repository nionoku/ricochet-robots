import type { EventMessage } from './events';

type MessagesHandler = (message: MessageEvent<EventMessage>) => void;

interface IMessagesControllerImpl {
  sendMessage: (message: EventMessage) => void
}

export type {
  MessagesHandler,
  IMessagesControllerImpl,
};
