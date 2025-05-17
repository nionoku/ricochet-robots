import { shallowRef } from 'vue';
import type { MessagesHandler } from 'listeners';
import { MessageControllerInstance } from '../../../controllers/messages';

const useSceneState = () => {
  const isLoading = shallowRef(false);

  // DEBUG !!! REMOVE AFTER TESTS
  const prepare = () => {
    MessageControllerInstance
      .sendMessage({
        event: 'prepare',
        schema: [0, 1, 2, 3],
        robotsCoords: {
          blue: {
            x: 14,
            y: 5,
          },
          green: {
            x: 9,
            y: 12,
          },
          yellow: {
            x: 10,
            y: 2,
          },
          red: {
            x: 15,
            y: 9,
          },
          grey: {
            x: 11,
            y: 12,
          },
        },
      });
  };
  // DEBUG !!! REMOVE AFTER TESTS

  // loading message handler
  const lmh: MessagesHandler = (event) => {
  // eslint-disable-next-line sonarjs/no-small-switch
    switch (event.data.event) {
      case 'ready': {
        isLoading.value = false;

        // DEBUG !!! REMOVE AFTER TESTS
        prepare();
        // DEBUG !!! REMOVE AFTER TESTS

        break;
      }
    }
  };

  // add message handler for watch ready state
  MessageControllerInstance
    .on(lmh);

  return {
    isLoading,
  };
};

export {
  useSceneState,
};
