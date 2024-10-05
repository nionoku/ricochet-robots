import { LoadingManager, TextureLoader as BaseTextureLoader, Texture } from 'three';
import texturesMap from '../assets/textures.json';

type Key = keyof typeof texturesMap;

class TextureLoader {
  public static readonly Textures = new Map<Key, Texture>();

  static load(textures: Record<string, string>, loadingManager?: LoadingManager) {
    return Object.entries(textures)
      .map(async ([name, url]) => {
        const texture = await new BaseTextureLoader(loadingManager).loadAsync(url);
        TextureLoader.Textures.set(name as Key, texture);
      });
  }
}

export {
  TextureLoader,
};
