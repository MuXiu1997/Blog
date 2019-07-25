import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入element-ui
import {
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Row,
  Col,
  Link,
  Divider
} from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

// 导入iview
import { LoadingBar, Anchor, Affix } from 'iview'
import 'iview/dist/styles/iview.css'

Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Row)
Vue.use(Col)
Vue.use(Link)
Vue.use(Divider)
Vue.component('LoadingBar', LoadingBar)
Vue.component('Anchor', Anchor)
Vue.component('Affix', Affix)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  LoadingBar.start()
  next()
})

router.afterEach(() => {
  LoadingBar.finish()
})

Vue.prototype.$Loading = LoadingBar

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
