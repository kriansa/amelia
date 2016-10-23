import Vue from 'vue';
import App from '../../applications/home/index.vue';

document.addEventListener('DOMContentLoaded', () => {
  new Vue(App).$mount('#app');
});
