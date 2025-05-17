<template>
  <div class="container">
    <iframe
      v-show="!isLoading"
      id="scene"
      ref="scene"
      :src="baseUrl"
    />

    <LoaderComponent
      v-if="isLoading"
      class="loader"
    />
  </div>
</template>

<script lang="ts" setup>
import { useTemplateRef } from 'vue';
import { MessageControllerInstance } from '../../controllers/messages';
import { LoaderComponent } from './components/loader';
import { useSceneState } from './composables/use-scene-state';
import { waitSceneReady } from './utils/wait-scene-ready';

const baseUrl = import.meta.env.VITE_APP_CORE_BASE_URL;

const sceneRef = useTemplateRef('scene');
const { isLoading } = useSceneState();

const handleIsSceneReady = (event: Event): void => {
  const iframeContext = (event.target as HTMLIFrameElement).contentWindow;

  if (!iframeContext) {
    throw new TypeError('iframeContext is not ready');
  }

  MessageControllerInstance
    .bind(iframeContext);
};

waitSceneReady(sceneRef, handleIsSceneReady);
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
