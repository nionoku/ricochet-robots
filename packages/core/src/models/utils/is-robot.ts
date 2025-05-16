import { Robot } from '../robot';

const isRobot = (robot: unknown): robot is Robot => (robot as Robot).isRobot;

export {
  isRobot,
};
