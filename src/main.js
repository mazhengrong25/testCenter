import Vue from 'vue'
import App from './App.vue'
import router from './router'

import axios from "axios";
Vue.prototype.$axios = axios;

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

import "../public/base.less"

axios.interceptors.request.use((config) => {
	if(localStorage.getItem('login')){
		let username = JSON.parse(localStorage.getItem('login')).username
		config.headers['userName'] = username
		 return config
	}else{
		return config
	}
})


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
