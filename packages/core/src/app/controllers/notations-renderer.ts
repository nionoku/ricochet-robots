import { CSS2DRenderer } from 'three/examples/jsm/Addons.js';

const CONTAINER_ID = 'notations';

class NotationsRendererController extends CSS2DRenderer {
  constructor(width: number, height: number) {
    super();

    this.domElement.id = CONTAINER_ID;
    this.domElement.style.position = 'absolute';
    this.domElement.style.top = '0px';
    this.domElement.style.pointerEvents = 'none';

    this.setSize(width, height);
  }

  resize(width: number, height: number): void {
    this.setSize(width, height);
  }
}

export {
  NotationsRendererController,
};
