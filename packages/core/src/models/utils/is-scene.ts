import type { Scene } from 'three';

const isScene = (scene: unknown): scene is Scene => (scene as Scene).isScene;

export {
  isScene,
};
