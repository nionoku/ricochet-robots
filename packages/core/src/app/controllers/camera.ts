import { PerspectiveCamera } from 'three';
import { BASE_FOV } from '../../constants/camera';

class CameraController extends PerspectiveCamera {
  constructor(width: number, height: number) {
    super(75, width / height, 0.1, 1000);

    this.setFOV(width, height);
  }

  resize(width: number, height: number): void {
    this.aspect = width / height;
    this.updateProjectionMatrix();

    this.setFOV(width, height);
  }

  private setFOV(width: number, height: number): void {
    const aspect = height / width;
    const fov = BASE_FOV * Math.max(aspect, 1);

    this.position.z = fov;
  }
}

export {
  CameraController,
};
