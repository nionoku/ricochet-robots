import { ref, watch, type useTemplateRef } from 'vue';

const useSceneReady = (sceneRef: ReturnType<typeof useTemplateRef<HTMLIFrameElement>>) => {
  const isSceneReady = ref(false);

  watch(sceneRef, (scene) => {
    if (!scene) {
      throw new Error('Iframe is undefined');
    }

    scene.addEventListener('load', () => {
      isSceneReady.value = Boolean(scene.contentWindow);
    });
  });

  return {
    isSceneReady,
  };
};

export {
  useSceneReady,
};
