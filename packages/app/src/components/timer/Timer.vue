<template>
  <div>
    {{ currentTimeToSeconds }}
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

const SECOND = 1000;

const timeoutValue: number = import.meta.env.VITE_APP_RESOLVE_TIMEOUT;
const currentTime = ref<number>(timeoutValue);
let timerId: NodeJS.Timeout;

const emits = defineEmits<{
  start: []
  finish: []
}>();

const currentTimeToSeconds = computed(() => currentTime.value / SECOND);

const start = () => {
  currentTime.value = timeoutValue;

  timerId = setInterval(() => {
    currentTime.value -= SECOND;

    if (currentTime.value === 0) {
      clearInterval(timerId);
      emits('finish');
    }
  }, 1000);

  emits('start');
};

const stop = () => {
  currentTime.value = 0;

  clearInterval(timerId);
  emits('finish');
};

defineExpose({
  start,
  stop,
});

</script>

<style scoped></style>
