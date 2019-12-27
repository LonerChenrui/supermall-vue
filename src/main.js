import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'; 

Vue.config.productionTip = false

// 全局实例化$bus事件总线 (用于非父子组件通信)
Vue.prototype.$bus = new Vue()

Vue.use(Vant)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
