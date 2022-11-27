import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import toast from './components/common/toast'


Vue.config.productionTip = false
// 安装toast插件,toast是是导入进去对象
Vue.use(toast)


new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
