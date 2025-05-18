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
import { CoreEventsControllerImpl, type CoreMessageHandler } from '../../../../host';
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
  const lmh: CoreMessageHandler = (event) => {
    // DEBUG !!! REMOVE AFTER TESTS
    CoreEventsControllerImpl.instance
      .sendMessage(event.data);
    // DEBUG !!! REMOVE AFTER TESTS
  };

  // add message handler for watch ready state
  CoreEventsControllerImpl.instance
    .on(lmh);
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
