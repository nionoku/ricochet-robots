import { Mesh, MeshBasicMaterial, PlaneGeometry, Vector2, Vector2Like } from 'three';
import { IToken, TokenInfo } from './types/token';
import { CELL_SIZE } from './constants/map';
import { TextureLoader } from '../loaders/texture-loader';
import { BoardCoordsHelper } from '../utils/coords-helper';

class Token extends Mesh implements IToken {
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
    
    this.setPosition(new Vector2().fromArray(tokenInfo.position));
  }

  private setPosition(coords: Vector2Like) {
    const position = BoardCoordsHelper.toPosition(coords);
    this.position.x = position.x;
    this.position.y = position.y;
    this.position.z = 0.001;
  }

  get coords() {
    return BoardCoordsHelper.toCoords({ x: this.position.x, y: this.position.z });
  }
}

export {
  Token,
};