import { ref, type Ref } from 'vue';

type Route = {
  name: 'host' | 'game'
};

const useRouter = (initial: Route) => {
  const route: Ref<Route> = ref(initial);

  const replace = (_route: Route) => {
    route.value = _route;
  };

  return {
    route,
    replace,
  };
};

export {
  useRouter,
  type Route,
};
