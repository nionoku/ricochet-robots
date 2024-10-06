import { Vector2, Vector2Like } from 'three';
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

  get positions(): Vector2Like[] {
    return tokensInfo.flatMap(({ position }) => BoardCoordsHelper.toPosition(new Vector2().fromArray(position)));
  }
    
  get objects(): Token[] {
    return this._tokens;
  }
}

export {
  TokensController,
};