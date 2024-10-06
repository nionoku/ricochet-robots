import { Vector2 } from 'three';
import tokensInfo from '../assets/tokens.json';
import { BoardCoordsHelper } from '../utils/coords-helper';

class TokensController {
  get positions(): Vector2[] {
    return tokensInfo.flatMap((part) => 
      part.map(({ position }) =>
        BoardCoordsHelper.toPosition(new Vector2(position[0], position[1])),
      ),
    );
  }
}

export {
  TokensController,
};