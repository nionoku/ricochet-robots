import { Camera, Object3D, Raycaster, Vector2, Vector2Like } from 'three';
import { IListenerController } from '../../../host';
import type { IntersectionEventHandler, IntersectionEventType } from './types/intersections';

class IntersectionController extends Raycaster implements IListenerController {
  private readonly rect: DOMRect;

  private intersectedRootObject: Object3D | undefined;
  private callbackHandler: IntersectionEventHandler | undefined;

  private readonly _handler = (event: MouseEvent): void => {
    if (!this.intersectedRootObject) {
      return;
    }

    if (!this.callbackHandler) {
      return;
    }

    const pointer = this.normalizedPoint(event);

    this.setFromCamera(pointer, this.camera);
    this.callbackHandler(this.intersectObject(this.intersectedRootObject), event.type as IntersectionEventType);
  };

  constructor(
    private readonly root: HTMLCanvasElement,
    readonly camera: Camera,
  ) {
    super();

    this.rect = this.root.getBoundingClientRect();
  }

  bind(object: Object3D, handler: IntersectionEventHandler): void {
    this.intersectedRootObject = object;
    this.callbackHandler = handler;
  }

  attach(): void {
    this.detach();

    this.root.addEventListener('click', this._handler);
  }

  detach(): void {
    this.root.removeEventListener('click', this._handler);
  }

  private normalizedPoint(point: Vector2Like): Vector2 {
    return new Vector2(
      ((point.x - this.rect.left) / this.root.scrollWidth) * 2 - 1,
      -((point.y - this.rect.top) / this.root.scrollHeight) * 2 + 1,
    );
  }
}

export {
  IntersectionController,
};
