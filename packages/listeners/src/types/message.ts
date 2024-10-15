import type { EventMessage } from './events';

type MessagesHandler = (message: MessageEvent<EventMessage>) => void;

type IMessagesControllerImpl = {
  sendMessage: (message: EventMessage) => void;
};

export type {
  MessagesHandler,
  IMessagesControllerImpl,
};