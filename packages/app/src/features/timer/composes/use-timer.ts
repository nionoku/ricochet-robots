import { shallowRef } from 'vue';
import appConfig from '#app-config';

const SECOND = 1000;

const useTimer = (onFinish: () => void, { timeout = appConfig.resolve_timeout, step = SECOND } = {}) => {
  let timerId: NodeJS.Timeout;
  const timer = shallowRef(0);

  const start = (): void => {
    timer.value = timeout;

    timerId = setInterval(() => {
      timer.value -= step;

      if (timer.value === 0) {
        stop();
        onFinish();
      }
    }, step);
  };

  const stop = (): void => {
    clearInterval(timerId);
    timer.value = 0;
  };

  return {
    timer,
    start,
    stop,
  };
};

export {
  useTimer,
};
