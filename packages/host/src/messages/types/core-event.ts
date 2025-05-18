import { IEventMessage } from './event';
import { CoreEvent } from 'src/events/core-event';

type ICoreEventMessage<Event extends CoreEvent> = IEventMessage<Event>;

export type {
  ICoreEventMessage,
};
