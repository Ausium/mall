import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import  FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import vuescroll from 'vuescroll'

import toast from './components/common/toast'


Vue.config.productionTip = false
// 安装toast插件,toast是是导入进去对象
Vue.use(toast)

// 安装懒加载插件,需要下载1.2.6版本
Vue.use(VueLazyload)

// 解决移动端300ms的延迟
// FastClick.attach(document.body)

Vue.use(vuescroll); // install the vuescroll first
Vue.prototype.$vuescrollConfig = {
  bar: {
    background: '#000'
  }
};



new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
