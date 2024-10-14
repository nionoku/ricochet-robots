<template>
  <div class="scene-wrapper">
    <iframe
      v-show="!isLoading"
      id="scene"
      :src="baseUrl"
    ></iframe>

    <Loader
      v-if="isLoading"
      class="loader"
    />
  </div>
</template>

<script lang="ts" setup>
import { onUnmounted, ref } from 'vue';
import Loader from './Loader.vue';
import { MessageController, type MessagesHandler } from '../../controllers/messages';

const props = defineProps<{
}>();

const emits = defineEmits({
});

const baseUrl = import.meta.env.VITE_APP_CORE_BASE_URL;

const isLoading = ref(true);
const mc = new MessageController();

const prepare = () => {
  mc.emit({ event: 'prepare', schema: [0, 1, 2, 3], robotsCoords: { "blue": { "x": 14, "y": 5 }, "green": { "x": 9, "y": 12 }, "yellow": { "x": 10, "y": 2 }, "red": { "x": 15, "y": 9 }, "grey": { "x": 11, "y": 12 } } });
}

// loading message handler
const lmh: MessagesHandler = (event) => {
  switch (event.data.event) {
    case 'ready': {
      isLoading.value = false;
      prepare();

      return;
    }
  }
}

mc.on(lmh)

onUnmounted(() => {
  mc.off(lmh)
})
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