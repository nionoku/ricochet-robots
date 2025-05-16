<template>
  <div class="container">
    <div class="top">
      <Stats class="stats" />

      <Timer
        v-show="isShowTimer"
        ref="timerRef"
        class="timer"
        @finish="handleFinishTimer"
      />
    </div>

    <Scene class="scene" />

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
import { Scene } from '../scene';
import Stats from '../stats/Stats.vue';
import Timer from '../timer/Timer.vue';
import { useEmitAnswer } from './composables/use-emit-answer';
import { validateAnswer } from './utils/validate-answer';

const timerRef = useTemplateRef<InstanceType<typeof Timer>>('timerRef');
const {
  isShowTimer,
  handleAnswer,

  handleTimeout,
} = useEmitAnswer(timerRef);

const props = defineProps<{
}>();

const emits = defineEmits({});

const handleResolve = () => {
  // TODO (2024.11.17): Replace prompt to dialog
  // TODO (2024.11.17): prompt stops microtasks queue
  const stepCount = validateAnswer(
    prompt('Steps for resolve?'),
  );

  // TODO (2024.11.17): Check is first or better answer
  // if (isFirstOrBetterAnswer) ...
  handleAnswer(stepCount);
};

const handleFinishTimer = () => {
  handleTimeout();
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
