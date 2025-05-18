import { AppEventsController } from '../../..';

class AppEventsControllerImpl extends AppEventsController {
  public static readonly instance: AppEventsControllerImpl = new this();

  private constructor() {
    super(import.meta.env.VITE_APP_APP_TARGET_ORIGIN);
  }
}

export {
  AppEventsControllerImpl,
};
