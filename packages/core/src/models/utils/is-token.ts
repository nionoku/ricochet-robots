import { Token } from '../token';

// eslint-disable-next-line sonarjs/no-redundant-type-constituents
const isToken = (token: Token | unknown): token is Token => (token as Token).isToken;

export {
  isToken,
};