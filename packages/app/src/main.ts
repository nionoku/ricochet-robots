import './assets/main.css';

import { createApp } from 'vue';
import { App } from './app/root';
// import { getHostId } from './utils/get-host-id';
// import { attachMessaging } from '#host/messaging';

// attachMessaging(getHostId());

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
createApp(App)
  .mount('body');
