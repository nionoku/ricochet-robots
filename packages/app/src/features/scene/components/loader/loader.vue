<template>
  <span class="loader">
    Loading
  </span>
</template>

<script lang="ts" setup>
</script>

<style scoped>
.loader {
  position: relative;

  &::after {
    position: absolute;

    margin-left: 3px;

    content: '';
    animation: loading 1.5s infinite;
  }
}

@keyframes loading {
  0% {
    content: '';
  }

  25% {
    content: '.';
  }

  50% {
    content: '..';
  }

  75% {
    content: '...';
  }
}
</style>
