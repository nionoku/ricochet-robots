import { type Intersection } from 'three';

type IntersectionEventType = keyof HTMLElementEventMap;
type IntersectionEventHandler = (intersections: Intersection[], event?: IntersectionEventType) => void;

export type {
  IntersectionEventHandler,
  IntersectionEventType,
};
