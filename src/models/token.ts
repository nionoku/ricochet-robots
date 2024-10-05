import { Mesh, MeshBasicMaterial, PlaneGeometry } from 'three';
import { TokenInfo } from './types/token';
import { CELL_SIZE } from './constants/map';
import { TextureLoader } from '../loaders/texture-loader';

class Token extends Mesh {
  constructor(tokenInfo: TokenInfo) {
    const textures = TextureLoader.Textures;

    const geom = new PlaneGeometry(CELL_SIZE * 0.95, CELL_SIZE * 0.95);
    const mat = new MeshBasicMaterial({
      map: textures.get(tokenInfo.token),
      transparent: true,
      opacity: 0.6,
    });

    super(geom, mat);
    
    this.name = 'token';
    this.userData = {
      type: tokenInfo.token,
      color: tokenInfo.color,
    };
    this.rotation.x = -180 * (Math.PI / 180);
    this.position.set(tokenInfo.position[0] * CELL_SIZE, tokenInfo.position[1] * CELL_SIZE, -0.001);
  }
}

export {
  Token,
};