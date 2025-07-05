import type { CoreEventMessage } from '../../../messages';
import type { MessagesHandler } from '../../types/message-handler';

type CoreMessageHandler = MessagesHandler<CoreEventMessage>;

export type {
  CoreMessageHandler,
};
