<template>
  <Host
    v-if="route.name === 'host'"
    @start-game="whenStartGame"
  />

  <Scene
    v-else-if="route.name === 'game'"
    class="scene"
  />
</template>

<script setup lang="ts">
import Host from './components/host/Host.vue';
import Scene from './components/scene/Scene.vue';
import { useRouter, type Route } from './composables/router';

// TODO (2024.10.13): Check initial by query params
const initial: Route = { name: 'host' }

const { route, replace } = useRouter(initial);

const whenStartGame = () => {
  replace({ name: 'game' })
}
</script>

<style scoped>
.scene {
  width: 100%;
  height: 100%;
}
</style>
