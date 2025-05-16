import { LoadingManager, BufferGeometry } from 'three';
import { STLLoader } from 'three/examples/jsm/Addons.js';
import modelsMap from '../assets/models.json';

type Key = keyof typeof modelsMap;

class ModelLoader {
  public static readonly Models = new Map<Key, BufferGeometry>();

  static load(models: Record<string, string>, loadingManager?: LoadingManager) {
    return Object.entries(models)
      .map(async ([name, url]) => {
        const model = await new STLLoader(loadingManager).loadAsync(url);
        ModelLoader.Models.set(name as Key, model);
      });
  }
}

export {
  ModelLoader,
};
