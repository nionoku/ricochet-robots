import { CoreEventsController } from '../../..';

class CoreEventsControllerImpl extends CoreEventsController {
  public static readonly instance: CoreEventsControllerImpl = new this();

  private constructor() {
    super(import.meta.env.VITE_APP_CORE_TARGET_ORIGIN);
  }
}

export {
  CoreEventsControllerImpl,
};
