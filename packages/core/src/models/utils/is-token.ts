import { Token } from '../token';

const isToken = (token: unknown): token is Token => (token as Token).isToken;

export {
  isToken,
};
