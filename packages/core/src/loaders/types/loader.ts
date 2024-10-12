import { LoadingManager } from 'three';

type ILoader = {
  load(data: Record<string, string>, loadingManager?: LoadingManager): void
};

export type {
  ILoader,
};