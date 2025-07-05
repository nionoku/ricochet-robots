import type { AppEventMessage } from '../../messages';
import { EventsController } from '../events';

abstract class AppEventsController extends EventsController<AppEventMessage> {}

export {
  AppEventsController,
};
