<template>
  <div class="container">
    <div class="stats">
      stats
    </div>

    <Scene class="scene" />

    <div class="actions">
      <button class="resolve">
        Resolve
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Scene from '../scene/Scene.vue';

const props = defineProps<{
}>();

const emits = defineEmits({
});

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

.stats,
.actions {
  display: flex;

  position: absolute;

  left: var(--gap);
  right: var(--gap);

  z-index: 1;
}

.stats {
  top: var(--gap);
}

.actions {
  bottom: var(--gap);
}

.resolve {
  flex-grow: 1;
}
</style>