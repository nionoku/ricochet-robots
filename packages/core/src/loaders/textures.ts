import { LoadingManager, TextureLoader as BaseTextureLoader, Texture, SRGBColorSpace } from 'three';
import texturesMap from '../assets/textures.json';

type Key = keyof typeof texturesMap;

class TextureLoader {
  public static readonly instance = new TextureLoader();
  public readonly textures = new Map<Key, Texture>();

  load(textures: Record<string, string>, loadingManager?: LoadingManager): Promise<Texture[]> {
    const tasks = Object.entries(textures)
      .map(([name, url]) => {
        return new BaseTextureLoader(loadingManager)
          .loadAsync(url)
          .then((texture) => {
            texture.colorSpace = SRGBColorSpace;
            this.textures.set(name as Key, texture);

            return texture;
          });
      });

    return Promise.all(tasks);
  }
}

export {
  TextureLoader,
};
