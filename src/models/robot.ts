import { Box3, BufferGeometry, ColorRepresentation, Mesh, MeshBasicMaterial, Vector2 } from 'three';
import { IRobot } from './types/robot';

const PARAM_SCALE = 0.05;

class Robot extends Mesh implements IRobot {
  constructor(model: BufferGeometry, color: ColorRepresentation) {
    const geom = model.center();
    const mat = new MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.7,
    });

    super(geom, mat);

    this.name = 'robot';
    this.userData.color = color;

    this.scale.set(PARAM_SCALE, PARAM_SCALE, PARAM_SCALE);
    this.position.y = this.box.max.y;
  }

  move(position: Vector2): void {
    throw new Error('Method not implemented.');
  }

  select(): void {
    throw new Error('Method not implemented.');
  }
  
  unselect(): void {
    throw new Error('Method not implemented.');
  }

  private get box() {
    return new Box3().setFromObject(this);
  }
}

export {
  Robot,
};