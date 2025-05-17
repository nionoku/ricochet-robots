<template>
  <div class="container">
    <button @click="handleClick">
      Start game
    </button>
  </div>
</template>

<script lang="ts" setup>
const emits = defineEmits<{
  'game:start': []
}>();

const handleClick = (): void => {
  emits('game:start');
};
</script>

<style scoped>
.container {
  display: flex;
  place-content: center;
  place-items: end;

  width: 100%;
  height: 100%;

  padding: 12px 12px 56px;

  box-sizing: border-box;
}
</style>
