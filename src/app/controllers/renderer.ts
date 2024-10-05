import { WebGLRenderer } from 'three';

class RendererController extends WebGLRenderer {
  constructor(width: number, height: number) {
    super({
      antialias: true,
    });

    this.setSize(width, height);
    this.setPixelRatio(window.devicePixelRatio);
  }

  resize(width: number, height: number) {
    this.setSize(width, height);
  }
}

export {
  RendererController,
};