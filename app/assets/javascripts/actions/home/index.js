// import 'bootstrap/dist/css/bootstrap.min.css';
// import styles from '../../index';
import Vue from 'vue'
import App from '../../applications/home/index'

document.addEventListener('DOMContentLoaded', function() {
    new Vue(App).$mount('#app');
});
