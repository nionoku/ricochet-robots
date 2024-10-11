import tokensInfo from '../assets/tokens.json';
import { IController } from './types/controller';
import { Token } from '../models/token';
import { TokenInfo } from '../models/types/token';

class TokensController implements IController {
  private _selectedToken: Token | null = null;

  private readonly _tokens: Token[];

  constructor() {
    const tokens = tokensInfo.flatMap((info) => {
      const token = new Token(info as TokenInfo);

      return token;
    });

    this._tokens = tokens;
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
}

export {
  TokensController,
};