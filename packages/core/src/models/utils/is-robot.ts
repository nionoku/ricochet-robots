import { Object3D } from 'three';
import { Robot } from '../robot';

const isRobot = (robot: Object3D): robot is Robot => (robot as Robot).isRobot;

export {
  isRobot,
};
