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
import { useTemplateRef } from 'vue';
import { CoreEvent, CoreEventsControllerImpl, type CoreMessageHandler } from '../../../../host';
import { LoaderComponent } from './components/loader';
import { useSceneState } from './composables/use-scene-state';

const coreAppUrl = import.meta.env.VITE_APP_CORE_BASE_URL;

const sceneRef = useTemplateRef('scene');
const { isLoading } = useSceneState(sceneRef);

// DEBUG !!! REMOVE AFTER TESTS
// DEBUG !!! REMOVE AFTER TESTS
const lmh: CoreMessageHandler = (event) => {
  // eslint-disable-next-line sonarjs/no-small-switch
  switch (event.data.event) {
    case CoreEvent.Ready: {
      const scene = sceneRef.value as HTMLIFrameElement | null;

      if (!scene) {
        throw new TypeError('iframe is not ready');
      }

      const iframeContext = scene.contentWindow;

      if (!iframeContext) {
        throw new TypeError('iframeContext is not ready');
      }

      scene.focus();

      CoreEventsControllerImpl.instance
        .setContext(iframeContext);

      break;
    }

    default: {
      // DEBUG !!! REMOVE AFTER TESTS
      CoreEventsControllerImpl.instance
        .sendMessage(event.data);

      break;
      // DEBUG !!! REMOVE AFTER TESTS
    }
  }
};

// add message handler for watch ready state
CoreEventsControllerImpl.instance
  .on(lmh);

// eslint-disable-next-line sonarjs/post-message
window.addEventListener('message', (event) => {
  console.log(event.data);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (event.data.event === 'core:ready') {
    // eslint-disable-next-line sonarjs/post-message
    window.postMessage({
      event: 'core:configure_game',
      order_map_parts: [0, 1, 2, 3],
      robots_coords: {
        blue: [14, 5],
        green: [9, 12],
        yellow: [10, 2],
        red: [15, 9],
        grey: [11, 12],
      },
    }, '*');
    // eslint-disable-next-line sonarjs/post-message
    window.postMessage({
      event: 'core:set_target_token',
      token: 'green-moon',
    }, '*');
    // eslint-disable-next-line sonarjs/post-message
    window.postMessage({
      event: 'core:enable_move_robots',
    }, '*');
  }
});
// DEBUG !!! REMOVE AFTER TESTS
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
