import { AppEvent } from '../../events/app-event';
import type { IEventMessage } from './event';

type IAppEventMessage<Event extends AppEvent> = IEventMessage<Event>;

export type {
  IAppEventMessage,
};
