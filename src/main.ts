import './assets/main.css';

import textures from './assets/textures.json';
import models from './assets/models.json';

import { ViewController } from './app/controllers/view';
import { ModelLoader } from './loaders/model-loader';
import { TextureLoader } from './loaders/texture-loader';
import { MainScene } from './app/scenes/main';

const main = async () => {
  const root = document.body;

  if (!root) {
    throw new Error('Invalid root element');
  }

  await Promise.all([
    ...TextureLoader.load(textures),
    ...ModelLoader.load(models),
  ]);

  const vc = new ViewController(root, MainScene);

  window.addEventListener('resize', () => vc.resize());
  root.append(...vc.domElements);

  vc.animate();
};

main();