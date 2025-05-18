import { onMounted, onUnmounted, shallowRef } from 'vue';
import { AppEvent, AppEventsController, type AppMessageHandler } from '../../../../../host';

const useTimerEvents = (handleStartTimer: () => void) => {
  const isShowTimer = shallowRef(false);

  const handler: AppMessageHandler = (message) => {
    switch (message.data.event) {
      case AppEvent.TimerStart: {
        isShowTimer.value = true;
        handleStartTimer();

        break;
      }

      case AppEvent.TimerTimeUp: {
        isShowTimer.value = false;

        break;
      }
    }
  };

  onMounted(() => {
    AppEventsController.instance
      .on(handler);
  });

  onUnmounted(() => {
    AppEventsController.instance
      .off(handler);
  });

  return {
    isShowTimer,
  };
};

export {
  useTimerEvents,
};
