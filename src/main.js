import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'; 

Vue.config.productionTip = false

// 全局实例化$bus事件总线 (用于非父子组件通信)
Vue.prototype.$bus = new Vue()

// 使用Vant ui框架
Vue.use(Vant)

// 解决移动端300ms延迟
import fastClick from 'fastclick'
fastClick.attach(document.body);

// 图片懒加载
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
  preLoad: 1.3,//页面预加载
  // error: 'dist/error.jpg',//加载失败图片
  loading: require('@/assets/img/common/placeholder.png'),//加载中的图片
  attempt: 1//尝试计数
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
