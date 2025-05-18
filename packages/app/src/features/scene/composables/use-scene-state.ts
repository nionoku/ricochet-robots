import { shallowRef } from 'vue';
import { CoreEventsController, CoreEvent, type CoreMessageHandler } from '../../../../../host';

const useSceneState = () => {
  const isLoading = shallowRef(false);

  // DEBUG !!! REMOVE AFTER TESTS
  /** @deprecated remove after tests */
  const prepare = () => {
    CoreEventsController.instance
      .sendMessage({
        event: CoreEvent.PrepareGame,
        order_map_parts: [0, 1, 2, 3],
        robots_coords: {
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

    CoreEventsController.instance
      .sendMessage({
        event: CoreEvent.EnableMoveRobots,
      });
  };
  // DEBUG !!! REMOVE AFTER TESTS

  // loading message handler
  const lmh: CoreMessageHandler = (event) => {
    switch (event.data.event) {
      case CoreEvent.Ready: {
        isLoading.value = false;

        // DEBUG !!! REMOVE AFTER TESTS
        prepare();
        // DEBUG !!! REMOVE AFTER TESTS

        break;
      }

      case CoreEvent.MoveRobot:
      case CoreEvent.RobotMoved:
      case CoreEvent.SetTargetToken:
      case CoreEvent.TokenAchieved:
      case CoreEvent.SelectRobot: {
        // TODO (2025.05.18): Move call sendMessage to peerjs-instance

        // DEBUG !!! REMOVE AFTER TESTS
        CoreEventsController.instance
          .sendMessage(event.data);
        // DEBUG !!! REMOVE AFTER TESTS
      }
    }
  };

  // add message handler for watch ready state
  CoreEventsController.instance
    .on(lmh);

  return {
    isLoading,
  };
};

export {
  useSceneState,
};
