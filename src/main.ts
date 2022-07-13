import 'element-plus/dist/index.css';

// import '@/icons/index';
import { createApp } from 'vue';

import axios from 'axios';
// import ElementPlus from 'element-plus';
import VueAxios from 'vue-axios';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faGithub,
  faQq,
  faWeibo,
  faWeixin,
} from '@fortawesome/free-brands-svg-icons';
/* import specific icons */
import {
  faArrowRightFromBracket,
  faClapperboard,
  faCompress,
  faExpand,
  faHouseFire,
  faImage,
  faMusic,
  faPeopleRoof,
  faShare,
  faUserSecret,
} from '@fortawesome/free-solid-svg-icons';
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import App from './App.vue';
import router from './router/index';
import { store } from './store/index';

/* add icons to the library */
library.add(
  faUserSecret,
  faShare,
  faGithub,
  faPeopleRoof,
  faImage,
  faMusic,
  faHouseFire,
  faClapperboard,
  faExpand,
  faCompress,
  faQq,
  faWeixin,
  faWeibo,
  faArrowRightFromBracket
);
createApp(App)
  .use(store)
  // .use(ElementPlus)
  .use(VueAxios, axios)
  .use(router)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app');
