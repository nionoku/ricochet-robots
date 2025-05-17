import { Robot } from '../robot';
import type { Token } from '../token';

const isRobotEqualTokenColors = (robot: Robot, token: Token): boolean => {
  if (robot.userData.name === 'grey') {
    return false;
  }

  return token.userData.color.includes(robot.userData.name);
};

export {
  isRobotEqualTokenColors,
};
