import { LoadingManager } from 'three';

interface ILoader {
  load(data: Record<string, string>, loadingManager?: LoadingManager): void
}

export type {
  ILoader,
};
