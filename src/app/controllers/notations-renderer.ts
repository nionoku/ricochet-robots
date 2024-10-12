// eslint-disable-next-line import/extensions
import { CSS2DRenderer } from 'three/examples/jsm/Addons.js';

class NotationsRendererController extends CSS2DRenderer {
  constructor(width: number, height: number) {
    super();

    this.domElement.id = 'notations';
    this.domElement.style.position = 'absolute';
    this.domElement.style.top = '0px';
    this.domElement.style.pointerEvents = 'none';

    this.setSize(width, height);
  }
  
  resize(width: number, height: number) {
    this.setSize(width, height);
  }
}

export {
  NotationsRendererController,
};