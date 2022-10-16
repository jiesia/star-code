import './style.less';
import App from './App.vue';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
// For highlight.js
import 'highlight.js/styles/stackoverflow-light.css';
import 'highlight.js/lib/common';
import hljsVuePlugin from '@highlightjs/vue-plugin';

createApp(App)
  .use(createPinia())
  .use(hljsVuePlugin)
  .mount('#app');
