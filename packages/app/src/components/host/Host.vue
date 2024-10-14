<template>
  <div class="container">
    <button @click="whenClick">
      Start game
    </button>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
}>();

const emits = defineEmits({
  startGame: null
});

const whenClick = () => emits('startGame')
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