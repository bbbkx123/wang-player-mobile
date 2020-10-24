import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './common/css/reset.css'
import './common/css/common.less'

import "./assets/fonts/iconfont.css";

createApp(App).use(store).use(router).mount('#app')
