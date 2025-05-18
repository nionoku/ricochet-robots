import './assets/main.css';

import { CoreEventsController } from '../../host';
import textures from './assets/textures.json';
import models from './assets/models.json';

import { ViewController } from './app/controllers/view';
import { ModelLoader } from './loaders/models';
import { TextureLoader } from './loaders/textures';
import { MainScene } from './app/scenes/main';

/** bind app context if is exist. If context is undefined, core app starts in standalone mode */
const setContextEventsController = (): void => {
  if (window.top) {
    CoreEventsController.instance
      .setContext(window.top);
  } else {
    console.warn('app context is undefined');
  }
};

const main = async (): Promise<void> => {
  const root = document.body;

  await Promise.all([
    TextureLoader.instance.load(textures),
    ModelLoader.instance.load(models),
  ]);

  setContextEventsController();

  const vc = new ViewController(root, MainScene);

  window.addEventListener('resize', () => {
    vc.resize();
  });

  root.append(...vc.domElements);

  vc.animate();
  vc.notifyReady();
};

void main();
