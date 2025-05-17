import { Mesh, MeshBasicMaterial, PlaneGeometry, Vector2, type Vector2Like, Vector3 } from 'three';
import { TextureLoader } from '../loaders/textures';
import { MapHelper } from '../utils/map-helper';
import type { IToken, TokenInfo } from './types/token';
import { CELL_SIZE, CELL_SIZE_HALF } from './constants/map';

class Token extends Mesh implements IToken {
  declare userData: Pick<TokenInfo, 'name' | 'color'>;

  public readonly isToken = true;

  constructor(public readonly tokenInfo: TokenInfo) {
    const textures = TextureLoader.instance.textures;

    const geom = new PlaneGeometry(CELL_SIZE * 0.95, CELL_SIZE * 0.95);
    const mat = new MeshBasicMaterial({
      map: textures.get(tokenInfo.name),
      transparent: true,
      opacity: 1,
    });

    super(geom, mat);

    this.name = 'token';
    this.userData = {
      name: tokenInfo.name,
      color: tokenInfo.color,
    };

    this.setInitialPosition(new Vector2().fromArray(tokenInfo.position));
  }

  private setInitialPosition(coords: Vector2Like): void {
    this.position.x = coords.x * CELL_SIZE + CELL_SIZE_HALF;
    this.position.y = coords.y * CELL_SIZE * -1 - CELL_SIZE_HALF;
    this.position.z = 0.001;
  }

  get coords(): Vector2 {
    const position = this.getWorldPosition(new Vector3());
    return MapHelper.toCoords(position);
  }
}

export {
  Token,
};
