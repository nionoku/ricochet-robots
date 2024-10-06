import { Vector2Tuple } from 'three';

type TokenColor = 'yellow' | 'blue' | 'red' | 'green';
type TokenType = 'planet' | 'cross' | 'gear' | 'moon';

type TokenInfo = {
  token: `${TokenColor}-${TokenType}` | 'black-hole'
  color: TokenColor[],
  position: Vector2Tuple
};

export type {
  TokenInfo,
};
