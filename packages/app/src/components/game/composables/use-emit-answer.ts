import { ref, type useTemplateRef } from 'vue';
import type Timer from '../../timer/Timer.vue';
import { MessageControllerInstance } from '../../../controllers/messages';

const useEmitAnswer = (timerRef: ReturnType<typeof useTemplateRef<InstanceType<typeof Timer>>>) => {
  const isShowTimer = ref(false);
  
  const handleAnswer = (answer: number) => {
    if (!timerRef.value) {
      throw new Error('timerRef is undefined');
    }
  
    // TODO (2024.11.17): emit for each player
  
    isShowTimer.value = true;
    timerRef.value.start();
  
    /* DEBUG */
    MessageControllerInstance
      .sendMessage({ event: 'enable' });
  };

  const handleTimeout = () => {
    isShowTimer.value = false;

    // TODO (2024.11.17): emit for each player

    /* DEBUG */
    MessageControllerInstance
      .sendMessage({ event: 'disable' });
  };

  return {
    isShowTimer,

    handleAnswer,
    handleTimeout,
  };
};

export {
  useEmitAnswer,
};