import { EventsController } from './events';
import { CoreEvent } from 'src/events/core-event';

class CoreEventsController extends EventsController<CoreEvent> {
  public static readonly instance: CoreEventsController = new this();

  private constructor(contextOrigin: string = import.meta.env.VITE_APP_APP_TARGET_ORIGIN) {
    super(contextOrigin);
  }
}

export {
  CoreEventsController,
};
