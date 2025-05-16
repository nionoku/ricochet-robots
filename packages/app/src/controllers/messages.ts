import { MessageController as OriginMessageController } from 'listeners';

class MessageController extends OriginMessageController {
  constructor() {
    super(import.meta.env.VITE_APP_CORE_TARGET_ORIGIN);
  }
}

const MessageControllerInstance = new MessageController();

export {
  MessageController,
  MessageControllerInstance,
};
