<template>
  <Host
    v-if="route.name === 'host'"
    @start-game="whenStartGame"
  />

  <Game
    v-else-if="route.name === 'game'"
    class="game"
  />
</template>

<script setup lang="ts">
import Game from './components/game/Game.vue';
import Host from './components/host/Host.vue';
import { useRouter, type Route } from './composables/router';

// TODO (2024.10.13): Check initial by query params
const initial: Route = { name: 'host' };

const { route, replace } = useRouter(initial);

const whenStartGame = () => {
  replace({ name: 'game' });
};
</script>

<style scoped>
.game {
  width: 100%;
  height: 100%;
}
</style>
