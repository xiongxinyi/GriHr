import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import locale from 'element-plus/lib/locale/lang/zh-cn'//分页中文：element-plus
//import locale from 'element-plus/lib/locale/zh-cn'//分页中文：element-ui
// 阿里图标库
import "@/icon/icon1/iconfont.css"

const app = createApp(App)
//element icon 注册
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(store).use(router).use(ElementPlus, { locale }).mount('#app')
