import { Box3, Mesh, MeshBasicMaterial, Vector2Like } from 'three';
import { IRobot, RobotInfo } from './types/robot';
import { ModelLoader } from '../loaders/model-loader';
import { BoardCoordsHelper } from '../utils/coords-helper';

const PARAM_SCALE = 0.005;

const OPACITY_SELECTED = 0.9;
const OPACITY_DESELECTED = 0.7;

class Robot extends Mesh implements IRobot {
  declare userData: {
    name: RobotInfo['name']
  };

  constructor(robotInfo: RobotInfo) {
    const geom = ModelLoader.Models.get('robot')?.center();

    if (!geom) {
      throw new Error('Error when build Robot. Model not loaded');
    }

    const mat = new MeshBasicMaterial({
      color: robotInfo.color,
      transparent: true,
      opacity: OPACITY_DESELECTED,
    });

    super(geom, mat);

    this.name = 'robot';
    this.userData.name = robotInfo.name;

    this.scale.set(PARAM_SCALE, PARAM_SCALE, PARAM_SCALE);
    this.rotation.x = 270 * (Math.PI / 180);
    this.position.y = this.box.max.y;
  }

  get coords() {
    return BoardCoordsHelper.toCoords({ x: this.position.x, y: this.position.z });
  }

  move(position: Vector2Like): void {
    this.position.x = position.x;
    this.position.z = position.y;
  }

  select(): void {
    (this.material as MeshBasicMaterial).opacity = OPACITY_SELECTED;
  }
  
  deselect(): void {
    (this.material as MeshBasicMaterial).opacity = OPACITY_DESELECTED;
  }

  private get box() {
    return new Box3().setFromObject(this);
  }
}

export {
  Robot,
};