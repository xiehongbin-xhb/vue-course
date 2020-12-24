import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Bus from './bus/index'

console.log('store',store)
Vue.config.productionTip = false
Vue.prototype.$bus = Bus;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
