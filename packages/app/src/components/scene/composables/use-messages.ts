import { onUnmounted, useTemplateRef, watch } from 'vue';
import { MessageController } from '../../../controllers/messages';

const useMessages = (handler: Parameters<MessageController['on']>[0], sceneRef: ReturnType<typeof useTemplateRef<HTMLIFrameElement>>) => {
  const mc = new MessageController();

  const subscribe = () => {
    mc.on(handler);
  };

  const unsubscribe = () => {
    mc.off(handler);
  };

  watch(sceneRef, (scene) => {
    if (!scene) {
      throw new Error('Scene is undefined');
    }
    
    mc.bind(scene);
  });

  onUnmounted(() => {
    unsubscribe();
  });

  return {
    subscribe,
    unsubscribe,
    emit: mc.emit.bind(mc),
  };
};

export {
  useMessages,
};