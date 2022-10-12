import Vue from 'vue'
import App from './App.vue'
import router from './router'
import qs from 'qs'

import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import DataDriverUI from 'dd-ui-library'
import 'dd-ui-library/dd-ui-library.css'
// 工具类
import CommonUtils from 'dd-ui-library/utils/index.js'

Vue.prototype.$CommonUtils = CommonUtils
Vue.prototype.$qs = qs

Vue.use(VXETable);
Vue.use(ElementUI)
Vue.use(DataDriverUI);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
