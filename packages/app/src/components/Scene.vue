<template>
  <iframe
    id="scene"
    :src="baseUrl"
  ></iframe>
</template>

<script lang="ts" setup>
const props = defineProps<{
}>();

const emits = defineEmits({
});

const baseUrl = import.meta.env.VITE_APP_CORE_BASE_URL;
</script>

<style scoped>
#scene {
  display: block;
  border: none;
}
</style>