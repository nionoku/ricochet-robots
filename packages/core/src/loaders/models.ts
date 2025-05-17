import { LoadingManager, BufferGeometry } from 'three';
import { STLLoader } from 'three/examples/jsm/Addons.js';
import modelsMap from '../assets/models.json';

type Key = keyof typeof modelsMap;

class ModelLoader {
  public readonly models = new Map<Key, BufferGeometry>();
  public static readonly instance = new ModelLoader();

  async load(models: Record<string, string>, loadingManager?: LoadingManager): Promise<void> {
    const tasks = Object.entries(models)
      .map(([name, url]) => {
        return new STLLoader(loadingManager)
          .loadAsync(url)
          .then((model) => {
            this.models.set(name as Key, model);

            return model;
          });
      });

    await Promise.all(tasks);
  }
}

export {
  ModelLoader,
};
