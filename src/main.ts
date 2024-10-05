import './assets/main.css';

import { ViewController } from './controllers/view';
import { MainScene } from './scenes/main';

const main = () => {
  const root = document.body;

  if (!root) {
    throw new Error('Invalid root element');
  }

  const vc = new ViewController(root, MainScene);

  window.addEventListener('resize', () => vc.resize());
  root.appendChild(vc.domElement);

  vc.animate();
};

main();