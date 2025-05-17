import { shallowRef } from 'vue';
import type { MessagesHandler } from 'listeners';
import { MessageControllerInstance } from '../../../controllers/messages';

const useSceneState = () => {
  const isLoading = shallowRef(false);

  // DEBUG !!! REMOVE AFTER TESTS
  /** @deprecated remove after tests */
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

    MessageControllerInstance.sendMessage({
      event: 'enable',
    });
  };
  // DEBUG !!! REMOVE AFTER TESTS

  // loading message handler
  const lmh: MessagesHandler = (event) => {
    switch (event.data.event) {
      case 'ready': {
        isLoading.value = false;

        // DEBUG !!! REMOVE AFTER TESTS
        prepare();
        // DEBUG !!! REMOVE AFTER TESTS

        break;
      }

      case 'move_robot':
      case 'robot_moved':
      case 'select_token':
      case 'token_achieved':
      case 'select_robot': {
        // TODO (2025.05.18): Move call sendMessage to peerjs-instance

        // DEBUG !!! REMOVE AFTER TESTS
        MessageControllerInstance
          .sendMessage(event.data);
        // DEBUG !!! REMOVE AFTER TESTS
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
