import { Camera, Object3D, Raycaster, Vector2 } from 'three';
import type { IntersectionEventHandler, IntersectionEventType } from './types/intersections';

class IntersectionController extends Raycaster {
  private _handler: ((event: MouseEvent) => void) | null = null;

  constructor(
    private readonly _canvas: HTMLCanvasElement,
    private readonly _camera: Camera,
  ) {
    super();
  }

  on(from: Object3D, handler: IntersectionEventHandler): void {
    this.off();

    this._handler = (event: MouseEvent) => {
      const bbox = this._canvas.getBoundingClientRect();

      const pointer: Vector2 = new Vector2(
        ((event.x - bbox.left) / this._canvas.scrollWidth) * 2 - 1,
        -((event.y - bbox.top) / this._canvas.scrollHeight) * 2 + 1,
      );

      this.setFromCamera(pointer, this._camera);
      handler(this.intersectObject(from), event.type as IntersectionEventType);
    };

    this._canvas.addEventListener('click', this._handler);
  }

  off(): void {
    if (!this._handler) {
      return;
    }

    this._canvas.removeEventListener('click', this._handler);
  }
}

export {
  IntersectionController,
};
