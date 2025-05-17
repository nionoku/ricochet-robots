<template>
  <HostPage
    v-if="route.name === 'host'"
    @game:start="handleStartGame"
  />

  <GamePage
    v-else-if="route.name === 'game'"
    class="game"
  />
</template>

<script setup lang="ts">
import { useRouter, type Route } from '@shared/router';
import { GamePage } from '@pages/game';
import { HostPage } from '@pages/host';

// TODO (2024.10.13): Check initial by query params
const initial: Route = { name: 'host' };

const { route, replace } = useRouter(initial);

const handleStartGame = (): void => {
  replace({ name: 'game' });
};
</script>

<style scoped>
.game {
  width: 100%;
  height: 100%;
}
</style>
