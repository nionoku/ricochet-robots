import { Object3D } from 'three';

type IController = {
  get objects(): Object3D[];
};

export type {
  IController,
};