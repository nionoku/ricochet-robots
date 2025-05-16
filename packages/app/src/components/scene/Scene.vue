<template>
  <div class="container">
    <iframe
      v-show="!isLoading"
      id="scene"
      ref="scene"
      :src="baseUrl"
    />

    <Loader
      v-if="isLoading"
      class="loader"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, useTemplateRef, watch } from 'vue';
import type { MessagesHandler } from 'listeners';
import { MessageControllerInstance } from '../../controllers/messages';
import Loader from './Loader.vue';
import { useSceneReady } from './composables/use-scene-ready';
import { usePing } from './composables/use-ping';

const baseUrl = import.meta.env.VITE_APP_CORE_BASE_URL;

// loading message handler
const lmh: MessagesHandler = (event) => {
  switch (event.data.event) {
    case 'ready': {
      isLoading.value = false;

      cancelPingReadyState();
      prepare();

      return;
    }

    case 'select_robot': {
      MessageControllerInstance.sendMessage({ ...event.data });
      return;
    }

    case 'move_robot': {
      MessageControllerInstance.sendMessage({ ...event.data });
      return;
    }

    case 'robot_moved': {
      MessageControllerInstance.sendMessage({ ...event.data });
      return;
    }
  }
};

const isLoading = ref(true);
const sceneRef = useTemplateRef('scene');
const { isSceneReady } = useSceneReady(sceneRef);
const { ping: pingReadyState, cancel: cancelPingReadyState } = usePing();

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

const handleIsSceneReady = () => {
  if (!sceneRef.value?.contentWindow) {
    throw new Error('Iframe.contentWindow is not ready');
  }

  MessageControllerInstance
    .bind(sceneRef.value.contentWindow)
    .on(lmh);

  pingReadyState();
};

watch(isSceneReady, handleIsSceneReady);
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
