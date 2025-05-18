import { EventsController } from './events';
import { AppEvent } from 'src/events/app-event';

class AppEventsController extends EventsController<AppEvent> {}

export {
  AppEventsController,
};
