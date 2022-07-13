import { createApp } from 'vue';

import App from '@/App.vue';
import SvgIcon from '@/components/SvgIcon/index.vue'; // svg component

// register globally
createApp(App).component('Icon', SvgIcon);

const req = require.context('./svg', false, /\.svg$/);
const requireAll = (requireContext) =>
  requireContext.keys().map(requireContext);
requireAll(req);
