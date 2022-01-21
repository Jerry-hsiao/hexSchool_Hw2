import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
// 使用vue axios來儲存cookie
axios.defaults.withCredentials = true
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
