import { Box3, Mesh, MeshBasicMaterial, Vector2 } from 'three';
import { IRobot, RobotInfo } from './types/robot';
import { ModelLoader } from '../loaders/model-loader';

const PARAM_SCALE = 0.005;

class Robot extends Mesh implements IRobot {
  constructor(robotInfo: RobotInfo) {
    const geom = ModelLoader.Models.get('robot')?.center();

    if (!geom) {
      throw new Error('Error when build Robot. Model not loaded');
    }

    const mat = new MeshBasicMaterial({
      color: robotInfo.color,
      transparent: true,
      opacity: 0.7,
    });

    super(geom, mat);

    this.name = 'robot';
    this.userData.name = robotInfo.name;

    this.scale.set(PARAM_SCALE, PARAM_SCALE, PARAM_SCALE);
    this.rotation.x = 270 * (Math.PI / 180);
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