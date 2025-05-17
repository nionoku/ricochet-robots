import { onMounted, onUnmounted, type useTemplateRef } from 'vue';

const waitSceneReady = (sceneRef: ReturnType<typeof useTemplateRef<HTMLIFrameElement>>, handleReady: (event: Event) => void): void => {
  onMounted(() => {
    sceneRef.value?.addEventListener('load', handleReady);
  });

  onUnmounted(() => {
    sceneRef.value?.removeEventListener('load', handleReady);
  });
};

export {
  waitSceneReady,
};
