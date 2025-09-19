import { Vector2Like } from 'three';
import { CSS2DObject } from 'three/examples/jsm/Addons.js';
import { Notations } from '../models/notations';
import { IController } from './types/controller';

class NotationsController implements IController {
  private readonly _notations = new Notations();

  highlighting(coords: Vector2Like): void {
    for (const element of this._notations.notations) {
      const elementCoords = element.userData['coords'] as Vector2Like;

      const isTargetNotation = [
        coords.x === elementCoords.x,
        coords.y === elementCoords.y,
      ].some(Boolean);

      this.setHighlight(element, isTargetNotation);
    }
  }

  clearHighlighting(): void {
    for (const element of this._notations.notations) {
      element.element.style.fontWeight = 'normal';
    }
  }

  private setHighlight({ element }: CSS2DObject, isTargetNotation: boolean): void {
    element.style.fontWeight = isTargetNotation
      ? '800'
      : '400';
    element.style.opacity = isTargetNotation
      ? '1'
      : '0.5';
  }

  get objects(): Notations[] {
    return [
      this._notations,
    ];
  }
}

export { NotationsController };
