import { IController } from './types/controller';
import { Token } from '../models/token';
import { TokenInfo } from '../models/types/token';
import { Object3D } from 'three';
import { isToken } from '../models/utils/is-token';
import { Board } from '../models/board';

class TokensController implements IController {
  private _selectedToken: Token | null = null;

  private _tokens: Token[] = [];

  setTokensFromBoard(board: Board) {
    this._tokens = this.findTokens(board);
  }

  selectToken(name: TokenInfo['token']) {
    const nextToken = this._tokens.find(({ userData: { token } }) => token === name);

    if (!nextToken) {
      throw new Error(`Unknown token: '${name}'`);
    }

    this._selectedToken = nextToken;
    return nextToken;
  }

  get selectedToken() {
    return this._selectedToken;
  }

  get objects(): Token[] {
    return this._tokens;
  }

  private findTokens(from: Object3D): Token[] {
    const { tokens, other } = from.children.reduce<{ tokens: Token[], other: Object3D[] }>((acc, it) => {
      if (isToken(it)) {
        acc.tokens.push(it);
      } else {
        acc.other.push(it);
      }
      
      return acc;
    }, { tokens: [], other: [] });

    return [...tokens, ...other.flatMap(this.findTokens.bind(this))];
  }
}

export {
  TokensController,
};