<template>
  <div>
    {{ currentTimeToSeconds }}
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useTimer } from './composes/use-timer';

const SECOND = 1000;

const emits = defineEmits<{
  'timer:start': []
  'timer:done': []
}>();

const { timer, start: startTimer } = useTimer(() => {
  emits('timer:done');
});

const currentTimeToSeconds = computed(() => timer.value / SECOND);

const handleStart = (): void => {
  emits('timer:start');
  startTimer();
};

defineExpose({
  start: handleStart,
});

</script>

<style scoped></style>
