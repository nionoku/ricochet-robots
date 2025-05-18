<template>
  <div class="container">
    <iframe
      v-show="!isLoading"
      id="scene"
      ref="scene"
      :src="coreAppUrl"
    />

    <LoaderComponent
      v-if="isLoading"
      class="loader"
    />
  </div>
</template>

<script lang="ts" setup>
import { useTemplateRef, watch } from 'vue';
import { CoreEvent, CoreEventsControllerImpl, type CoreMessageHandler } from '../../../../host';
import { LoaderComponent } from './components/loader';
import { useSceneState } from './composables/use-scene-state';

const coreAppUrl = import.meta.env.VITE_APP_CORE_BASE_URL;

const sceneRef = useTemplateRef('scene');
const { isLoading } = useSceneState(sceneRef);

watch(isLoading, (value) => {
  if (value) {
    return;
  }

  const scene = sceneRef.value as HTMLIFrameElement | null;

  if (!scene) {
    throw new TypeError('iframe is not ready');
  }

  const iframeContext = (sceneRef.value as HTMLIFrameElement | undefined)?.contentWindow;

  if (!iframeContext) {
    throw new TypeError('iframeContext is not ready');
  }

  scene.focus();

  CoreEventsControllerImpl.instance
    .setContext(iframeContext);

  // DEBUG !!! REMOVE AFTER TESTS
  /** @deprecated remove after tests */
  const prepare = () => {
    CoreEventsControllerImpl.instance
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

    CoreEventsControllerImpl.instance
      .sendMessage({
        event: CoreEvent.EnableMoveRobots,
      });
  };

  // loading message handler
  const lmh: CoreMessageHandler = (event) => {
    switch (event.data.event) {
      case CoreEvent.Ready: {
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
        CoreEventsControllerImpl.instance
          .sendMessage(event.data);
        // DEBUG !!! REMOVE AFTER TESTS
      }
    }
  };

  // add message handler for watch ready state
  CoreEventsControllerImpl.instance
    .on(lmh);

  prepare();
  // DEBUG !!! REMOVE AFTER TESTS
});
</script>

<style scoped>
#scene {
  display: block;
  border: none;

  width: 100%;
  height: 100%;
}

.container {
  display: flex;
  place-items: center;
  place-content: center;
}
</style>
