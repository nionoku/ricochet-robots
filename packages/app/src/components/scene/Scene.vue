<template>
  <iframe
    v-show="!isLoading"
    id="scene"
    :src="baseUrl"
  ></iframe>

  <Loader v-if="isLoading" />
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

// loading message handler
const lmh: MessagesHandler = (event) => {
  switch (event.data.event) {
    case 'ready': {
      isLoading.value = false;
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
}
</style>