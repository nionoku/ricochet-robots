import { AppEvent } from '../events';
import { EventsController } from './events';

class AppEventsController extends EventsController<AppEvent> {
  public static readonly instance: AppEventsController = new this();

  private constructor(contextOrigin: string = import.meta.env.VITE_APP_CORE_TARGET_ORIGIN) {
    super(contextOrigin);
  }
}

export {
  AppEventsController,
};
