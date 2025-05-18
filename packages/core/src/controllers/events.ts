import { CoreEventsController } from '../../../host';

class EventsController extends CoreEventsController {
  public static readonly instance: EventsController = new this();

  private constructor() {
    super(import.meta.env.VITE_APP_APP_TARGET_ORIGIN);

    if (window.top) {
      this.setContext(window.top);
    } else {
      console.warn('app context is undefined');
    }
  }
}

export {
  EventsController,
};
