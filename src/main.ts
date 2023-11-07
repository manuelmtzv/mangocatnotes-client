import './style.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './config/router'
import setPinia from './config/setPinia'
import setVueQuery from './config/setVueQuery'
import { LoadingPlugin } from 'vue-loading-overlay'

import 'vue-loading-overlay/dist/css/index.css'

const app = createApp(App)

setVueQuery(app)
setPinia(app)

app.use(LoadingPlugin).use(router)

router.isReady().then(() => {
  app.mount('#app')
})
