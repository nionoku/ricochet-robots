import { EventsController } from './events';
import { CoreEvent } from 'src/events/core-event';

class CoreEventsController extends EventsController<CoreEvent> {}

export {
  CoreEventsController,
};
