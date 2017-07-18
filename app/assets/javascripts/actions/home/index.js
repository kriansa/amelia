import Vue from 'vue';
import domReady from 'domready';
import App from '../../applications/home/index.vue';
import '../../lib/global';

domReady(() => {
  new Vue(App).$mount('#app');
});
