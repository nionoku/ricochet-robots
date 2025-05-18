<template>
  <div class="container">
    <div class="top">
      <Stats class="stats" />

      <TimerComponent
        v-show="isShowTimer"
        ref="timerRef"
        class="timer"
      />
    </div>

    <SceneComponent class="scene" />

    <div class="actions">
      <button
        class="resolve"
        @click="handleResolve"
      >
        Resolve
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTemplateRef } from 'vue';
import Stats from '../../components/stats/stats.vue';
import { useTimerEvents } from './composables/use-timer-events';
import { SceneComponent } from '@features/scene';
import { TimerComponent } from '@features/timer';
import { submitAnswer } from '@shared/utils';

const timerRef = useTemplateRef<InstanceType<typeof TimerComponent>>('timerRef');

const { isShowTimer } = useTimerEvents(() => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  timerRef.value?.start();
});

const handleResolve = () => {
  // TODO (2024.11.17): Replace prompt to dialog
  // TODO (2024.11.17): prompt stops microtasks queue
  submitAnswer();
};
</script>

<style scoped>
.container {
  --gap: 8px;

  position: relative;

  display: flex;
  flex-direction: column;
}

.scene {
  flex-grow: 1;
}

.top,
.actions {
  display: flex;

  position: absolute;

  left: var(--gap);
  right: var(--gap);

  z-index: 1;
}

.top {
  top: var(--gap);

  flex-direction: column;

  row-gap: var(--gap);
}

.actions {
  bottom: var(--gap);
}

.resolve {
  flex-grow: 1;
}
</style>
