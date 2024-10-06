import { Vector2Tuple } from 'three';
import { IModel } from './model';

type TokenColor = 'yellow' | 'blue' | 'red' | 'green';
type TokenType = 'planet' | 'cross' | 'gear' | 'moon';

type TokenInfo = {
  token: `${TokenColor}-${TokenType}` | 'black-hole'
  color: TokenColor[],
  position: Vector2Tuple
};

type IToken = IModel;

export type {
  TokenInfo,
  IToken,
};
