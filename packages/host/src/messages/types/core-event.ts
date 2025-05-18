import { CoreEvent } from '../../events/core-event';
import { IEventMessage } from './event';

type ICoreEventMessage<Event extends CoreEvent> = IEventMessage<Event>;

export type {
  ICoreEventMessage,
};
