import type { Vector2Tuple } from 'three';
import type { IModel } from './model';
import type { RobotName } from './robot';

type TokenName = `${TokenColor}-${TokenType}` | 'black-hole';
type TokenColor = Exclude<RobotName, 'grey'>;
type TokenType = 'planet' | 'cross' | 'gear' | 'moon';

interface TokenInfo {
  name: TokenName
  color: TokenColor[]
  position: Vector2Tuple
}

type IToken = IModel;

export type {
  TokenInfo,
  TokenColor,
  TokenName,

  IToken,
};
