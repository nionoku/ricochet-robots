import { type Intersection, Object3D } from 'three';

type IntersectionEventType = keyof HTMLElementEventMap;
type IntersectionEventHandler = (intersections: Intersection<Object3D>[], event?: IntersectionEventType) => void;

export type {
  IntersectionEventHandler,
  IntersectionEventType,
};