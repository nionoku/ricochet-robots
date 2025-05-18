import { onMounted, onUnmounted, shallowRef } from 'vue';
import { AppEvent, AppEventsControllerImpl, type AppMessageHandler } from '../../../../../host';

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
    AppEventsControllerImpl.instance
      .on(handler);
  });

  onUnmounted(() => {
    AppEventsControllerImpl.instance
      .off(handler);
  });

  return {
    isShowTimer,
  };
};

export {
  useTimerEvents,
};
