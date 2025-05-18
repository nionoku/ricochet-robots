import { CoreEventMessage } from '../messages';
import { EventsController } from './events';

abstract class CoreEventsController extends EventsController<CoreEventMessage> {}

export {
  CoreEventsController,
};
