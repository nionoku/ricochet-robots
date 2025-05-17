import { onMounted, onUnmounted, shallowRef } from 'vue';
import type { EventMessage } from 'listeners';
import { MessageControllerInstance } from '../../../controllers/messages';

const useTimerEvents = (handleStartTimer: () => void) => {
  const isShowTimer = shallowRef(false);

  const handler = (message: MessageEvent<EventMessage>) => {
    switch (message.data.event) {
      case 'timer:start': {
        isShowTimer.value = true;
        handleStartTimer();

        break;
      }

      case 'timer:time_up': {
        isShowTimer.value = false;

        break;
      }
    }
  };

  onMounted(() => {
    MessageControllerInstance.on(handler);
  });

  onUnmounted(() => {
    MessageControllerInstance.off(handler);
  });

  return {
    isShowTimer,
  };
};

export {
  useTimerEvents,
};
