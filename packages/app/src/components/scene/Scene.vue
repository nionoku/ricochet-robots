<template>
  <div class="scene-wrapper">
    <iframe
      v-show="!isLoading"
      id="scene"
      ref="scene"
      :src="baseUrl"
    ></iframe>

    <Loader
      v-if="isLoading"
      class="loader"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue';
import Loader from './Loader.vue';
import { useMessages } from './composables/use-messages';
import type { MessagesHandler } from 'listeners';

const props = defineProps<{
}>();

const emits = defineEmits({
});

const baseUrl = import.meta.env.VITE_APP_CORE_BASE_URL;

// loading message handler
const lmh: MessagesHandler = (event) => {
  console.log(event.data.event);

  switch (event.data.event) {
    case 'ready': {
      isLoading.value = false;
      prepare();

      return;
    }

    case 'select_robot': {
      emitMessage({ ...event.data });
      return;
    }

    case 'move_robot': {
      emitMessage({ ...event.data });
      return;
    }

    case 'robot_moved': {
      emitMessage({ ...event.data });
      return;
    }
  }
}

const isLoading = ref(true);
const sceneRef = useTemplateRef('scene');
const { subscribe: subscribeToMessages, emit: emitMessage } = useMessages(lmh, sceneRef);

const prepare = () => {
  emitMessage({ event: 'prepare', schema: [0, 1, 2, 3], robotsCoords: { "blue": { "x": 14, "y": 5 }, "green": { "x": 9, "y": 12 }, "yellow": { "x": 10, "y": 2 }, "red": { "x": 15, "y": 9 }, "grey": { "x": 11, "y": 12 } } });
  emitMessage({ event: 'enable' })
}

// subscribe to listeners
subscribeToMessages();

</script>

<style scoped>
#scene {
  display: block;
  border: none;

  width: 100%;
  height: 100%;
}

.scene-wrapper {
  display: flex;
  place-items: center;
  place-content: center;
}
</style>