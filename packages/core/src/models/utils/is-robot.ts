import { Robot } from '../robot';

// eslint-disable-next-line sonarjs/no-redundant-type-constituents
const isRobot = (robot: Robot | unknown): robot is Robot => (robot as Robot).isRobot;

export {
  isRobot,
};