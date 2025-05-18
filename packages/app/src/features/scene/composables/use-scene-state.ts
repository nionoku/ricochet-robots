import { onMounted, onUnmounted, shallowRef, useTemplateRef } from 'vue';

const useSceneState = (sceneRef: ReturnType<typeof useTemplateRef<HTMLIFrameElement>>) => {
  const isLoading = shallowRef(true);

  const handleReady = (): void => {
    isLoading.value = false;
  };

  onMounted(() => {
    sceneRef.value?.addEventListener('load', handleReady);
  });

  onUnmounted(() => {
    sceneRef.value?.removeEventListener('load', handleReady);
  });

  return {
    isLoading,
  };
};

export {
  useSceneState,
};
