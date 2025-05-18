import { CoreEventMessage } from '../messages';
import { EventsController } from './events';

class CoreEventsController extends EventsController<CoreEventMessage> {
  public static readonly instance: CoreEventsController = new this();

  private constructor(contextOrigin: string = import.meta.env.VITE_APP_APP_TARGET_ORIGIN) {
    super(contextOrigin);
  }
}

export {
  CoreEventsController,
};
