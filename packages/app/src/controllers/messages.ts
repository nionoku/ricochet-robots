import { MessageController as CoreMessageController } from 'core/src/controllers/messages';
import type { EventMessage } from 'core/src/controllers/types/events';

class MessageController extends CoreMessageController {
  emit(message: EventMessage): void {
    const iframe = document.getElementById('scene') as HTMLIFrameElement;
    // eslint-disable-next-line sonarjs/post-message
    iframe.contentWindow?.postMessage(message, '*');
  }
}

export {
  MessageController,
};

export { type MessagesHandler } from 'core/src/controllers/types/message';