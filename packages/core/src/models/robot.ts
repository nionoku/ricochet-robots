import { Box3, Mesh, MeshBasicMaterial, type Vector2Like } from 'three';
import type { IRobot, RobotInfo } from './types/robot';
import { ModelLoader } from '../loaders/model-loader';
import { MapHelper } from '../utils/map-helper';

const PARAM_SCALE = 0.005;

const OPACITY_SELECTED = 0.9;
const OPACITY_DESELECTED = 0.7;

class Robot extends Mesh implements IRobot {
  declare userData: {
    name: RobotInfo['name']
  };

  public readonly isRobot = true;

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
    this.position.z = this.box.max.z;
  }

  get coords() {
    return MapHelper.toCoords(this.position);
  }

  move(coords: Vector2Like): void {
    const position = MapHelper.toPosition(coords);
    
    this.position.x = position.x;
    this.position.y = position.y;
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