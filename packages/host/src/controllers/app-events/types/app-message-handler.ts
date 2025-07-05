import type { AppEventMessage } from '../../../messages';
import type { MessagesHandler } from '../../types/message-handler';

type AppMessageHandler = MessagesHandler<AppEventMessage>;

export type {
  AppMessageHandler,
};
