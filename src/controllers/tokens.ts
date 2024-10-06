import { Vector2 } from 'three';
import tokensInfo from '../assets/tokens.json';
import { BoardCoordsHelper } from '../utils/coords-helper';
import { IController } from './types/controller';
import { Token } from '../models/token';
import { TokenInfo } from '../models/types/token';

class TokensController implements IController {
  private readonly _tokens: Token[];

  constructor() {
    const tokens = tokensInfo.flatMap((info) => {
      const token = new Token(info as TokenInfo);

      return token;
    });

    this._tokens = tokens;
  }

  get positions(): Vector2[] {
    return tokensInfo.flatMap(({ position }) => 
      BoardCoordsHelper.toPosition(new Vector2(position[0], position[1])),
    );
  }
    
  get objects(): Token[] {
    return this._tokens;
  }
}

export {
  TokensController,
};