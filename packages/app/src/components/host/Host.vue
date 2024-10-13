<template>
  <button @click="whenClick">
    Start game
  </button>
</template>

<script lang="ts" setup>
const props = defineProps<{
}>();

const emits = defineEmits({
  startGame: null
});

const whenClick = () => emits('startGame')
</script>