import Vue from 'vue'

import Cookies from 'js-cookie'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import lodash from 'lodash'

import i18n from './lang' // Internationalization
import '@/icons' // icon
import '@/permission' // permission control

import * as filters from './filters' // global filters

import utils from '../static/utils/utils.js'

import constant from '../static/utils/constant.js'

import { exportExcel } from '@/utils/exportExcel.js'
import VueDirectiveImagePreviewer from 'vue-directive-image-previewer'
import 'vue-directive-image-previewer/dist/assets/style.css'
Vue.use(VueDirectiveImagePreviewer) 


// 修改 el-dialog 默认点击遮照为不关闭
ElementUI.Dialog.props.closeOnClickModal.default = false;

// 图片预览
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
Vue.use(Viewer, {
    defaultOptions: {
        zIndex: 9999
    }
})

// 富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)

import vueParticleLine from 'vue-particle-line'
import 'vue-particle-line/dist/vue-particle-line.css'
Vue.use(vueParticleLine)


import iconPicker from 'e-icon-picker';
import "e-icon-picker/dist/symbol.js"; //基本彩色图标库
import 'e-icon-picker/dist/index.css'; // 基本样式，包含基本图标
import 'font-awesome/css/font-awesome.min.css'; //font-awesome 图标库
import 'element-ui/lib/theme-chalk/icon.css'; //element-ui 图标库

Vue.use(iconPicker, { FontAwesome: true, ElementUI: true, eIcon: true, eIconSymbol: true });




// bus
const bus = new Vue()
Vue.prototype.bus = bus

// lodash
Vue.prototype.$lodash = lodash

// exportExcel
Vue.prototype.$exportExcel = exportExcel

Vue.prototype.$utils = utils

Vue.use(ElementUI, {
    size: Cookies.get('size') || 'medium',
    i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false

Vue.use(utils)

Vue.use(constant)

// register global utility filters.
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

new Vue({
    el: '#app',
    router,
    store,
    i18n,
    render: h => h(App)
})