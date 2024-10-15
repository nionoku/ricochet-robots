import type { EventMessage } from './events';

type MessagesHandler = (message: MessageEvent<EventMessage>) => void;

type IMessagesControllerImpl = {
  emit: (message: EventMessage) => void;
};

export type {
  MessagesHandler,
  IMessagesControllerImpl,
};