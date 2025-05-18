import { AppEventMessage } from '../../messages';
import { MessagesHandler } from './message-handler';

type AppMessageHandler = MessagesHandler<AppEventMessage>;

export type {
  AppMessageHandler,
};
