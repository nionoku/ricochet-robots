import { MessageController as OriginMessageController, type EventMessage } from 'listeners';

class MessageController extends OriginMessageController {
  private target: HTMLIFrameElement | undefined;

  constructor() {
    super(import.meta.env.VITE_APP_CORE_TARGET_ORIGIN);
  }

  bind(iframe: HTMLIFrameElement) {
    this.target = iframe;
  }

  emit(message: EventMessage) {
    if (!this.target?.contentWindow) {
      throw new Error('Call \'bind\' with argument is target iframe, before emit events');
    }

    super.emit(message, this.target.contentWindow);
  }
}

export {
  MessageController,
};