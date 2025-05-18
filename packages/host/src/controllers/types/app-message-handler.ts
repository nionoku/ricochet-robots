import type { AppEventMessage } from '../../messages';
import type { MessagesHandler } from './message-handler';

type AppMessageHandler = MessagesHandler<AppEventMessage>;

export type {
  AppMessageHandler,
};
