import { Object3D } from 'three';

interface IController {
  get objects(): Object3D[]
}

export type {
  IController,
};
