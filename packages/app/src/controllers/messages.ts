import { MessageController as CoreMessageController } from 'core/src/controllers/messages';
import type { EventMessage } from 'core/src/controllers/types/events';

class MessageController extends CoreMessageController {
  emit(message: EventMessage): void {
    const iframe = document.getElementById('scene') as HTMLIFrameElement;
    iframe.contentWindow?.postMessage(message, import.meta.env.VITE_APP_CORE_TARGET_ORIGIN);
  }
}

export {
  MessageController,
};

export { type MessagesHandler } from 'core/src/controllers/types/message';