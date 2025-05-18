import { AppEvent } from '../../events/app-event';
import { IEventMessage } from './event';

type IAppEventMessage<Event extends AppEvent> = IEventMessage<Event>;

export type {
  IAppEventMessage,
};
