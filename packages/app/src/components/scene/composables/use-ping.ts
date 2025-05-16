import { MessageControllerInstance } from '../../../controllers/messages';

const TIMEOUT = 20;

const usePing = () => {
  let timerId: NodeJS.Timeout | null = null;

  const ping = () => {
    timerId = setInterval(() => {
      MessageControllerInstance.sendMessage({ event: 'ping' });
    }, TIMEOUT);
  };

  const cancel = () => {
    if (!timerId) {
      return;
    }

    clearInterval(timerId);
  };

  return {
    ping,
    cancel,
  };
};

export {
  usePing,
};
