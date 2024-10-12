import { EventMessage } from './events';

type MessagesHandler = (message: MessageEvent<EventMessage>) => void;

export type {
  MessagesHandler,
};