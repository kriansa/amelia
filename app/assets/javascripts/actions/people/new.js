import Vue from 'vue';
import domReady from 'domready';

import '../../lib/global';
import App from '../../applications/people/new.vue';

domReady(() => {
  new Vue(App).$mount('#new');
});
