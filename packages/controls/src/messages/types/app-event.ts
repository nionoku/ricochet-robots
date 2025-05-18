import { IEventMessage } from './event';
import { AppEvent } from 'src/events/app-event';

type IAppEventMessage<Event extends AppEvent> = IEventMessage<Event>;

export type {
  IAppEventMessage,
};
