
type TokenColor = 'yellow' | 'blue' | 'red' | 'green';
type TokenType = 'planet' | 'cross' | 'gear' | 'moon';

type TokenInfo = {
  token: `${TokenColor}-${TokenType}` | 'black-hole'
  color: TokenColor[],
  position: [number, number]
};

export type {
  TokenInfo,
};
