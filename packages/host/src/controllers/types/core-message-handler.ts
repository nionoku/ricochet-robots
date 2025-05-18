import { CoreEventMessage } from '../../messages';
import { MessagesHandler } from './message-handler';

type CoreMessageHandler = MessagesHandler<CoreEventMessage>;

export type {
  CoreMessageHandler,
};
