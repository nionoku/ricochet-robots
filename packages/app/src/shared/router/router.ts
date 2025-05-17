import { shallowRef } from 'vue';
import type { Route } from './types/routes';

const useRouter = (initial: Route) => {
  const route = shallowRef<Route>(initial);

  const replace = (_route: Route): void => {
    route.value = _route;
  };

  return {
    route,
    replace,
  };
};

export {
  useRouter,

};
