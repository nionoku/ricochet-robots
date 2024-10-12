<template>
  <iframe :src="baseUrl"></iframe>
</template>

<script lang="ts" setup>
const props = defineProps<{
}>();

const emits = defineEmits({
});

const baseUrl = import.meta.env.VITE_APP_CORE_BASE_URL;
</script>