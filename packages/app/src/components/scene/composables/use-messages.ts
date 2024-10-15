import { onUnmounted } from 'vue';
import { MessageController } from '../../../controllers/messages';

const useMessages = (handler: Parameters<MessageController['on']>[0]) => {
  const mc = new MessageController();

  const subscribe = () => {
    mc.on(handler);
  };

  const unsubscribe = () => {
    mc.off(handler);
  };

  onUnmounted(() => {
    unsubscribe();
  });

  return {
    subscribe,
    unsubscribe,
    emit: mc.emit,
  };
};

export {
  useMessages,
};