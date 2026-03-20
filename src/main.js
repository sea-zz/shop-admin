import { createApp } from 'vue'
import './style.css'
import './common.less';
import 'element-plus/dist/index.css';
import 'virtual:windi.css'
import App from './App.vue'
import ElementPlus from 'element-plus';
import { router } from './router';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import store from './store';
import permission from './directives/permission';

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus).use(router).use(store).use(permission).mount('#app')
