import { Mesh, MeshBasicMaterial, PlaneGeometry, Vector2 } from 'three';
import { TokenInfo } from './types/token';
import { CELL_SIZE } from './constants/map';
import { TextureLoader } from '../loaders/texture-loader';
import { BoardCoordsHelper } from '../utils/coords-helper';

class Token extends Mesh {
  constructor(public readonly tokenInfo: TokenInfo) {
    const textures = TextureLoader.Textures;

    const geom = new PlaneGeometry(CELL_SIZE * 0.95, CELL_SIZE * 0.95);
    const mat = new MeshBasicMaterial({
      map: textures.get(tokenInfo.token),
      transparent: true,
      opacity: 1,
    });

    super(geom, mat);
    
    this.name = 'token';
    this.userData = {
      type: tokenInfo.token,
      color: tokenInfo.color,
    };
    
    this.rotation.x = 270 * (Math.PI / 180);
    this.setPosition(new Vector2(tokenInfo.position[0], tokenInfo.position[1]));
  }

  private setPosition(coords: Vector2) {
    const position = BoardCoordsHelper.toPosition(coords);
    this.position.x = position.x;
    this.position.z = position.y;
    this.position.y = 0.001;
  }
}

export {
  Token,
};