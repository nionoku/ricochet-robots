import './assets/main.css';

import textures from './assets/textures.json';
import models from './assets/models.json';

import { ViewController } from './app/controllers/view';
import { ModelLoader } from './loaders/models';
import { TextureLoader } from './loaders/textures';
import { MainScene } from './app/scenes/main';
import { GameController } from './controllers/game';

const main = async (): Promise<void> => {
  const root = document.body;

  await Promise.all([
    TextureLoader.instance.load(textures),
    ModelLoader.instance.load(models),
  ]);

  const vc = new ViewController(root, GameController, MainScene);

  window.addEventListener('resize', () => {
    vc.resize();
  });

  root.append(...vc.domElements);

  vc.run();
};

void main();
