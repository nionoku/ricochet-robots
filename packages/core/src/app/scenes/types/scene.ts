import { Scene } from 'three';

type IScene = Scene & {
  /** Call before render */
  update(): void
};

export type {
  IScene,
};
