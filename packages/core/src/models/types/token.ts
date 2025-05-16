import type { Vector2Tuple } from 'three';
import type { IModel } from './model';
import type { TokenColor } from './color';

type TokenType = 'planet' | 'cross' | 'gear' | 'moon';

interface TokenInfo {
  token: `${TokenColor}-${TokenType}` | 'black-hole'
  color: TokenColor[]
  position: Vector2Tuple
}

type IToken = IModel;

export type {
  TokenInfo,
  IToken,
};
