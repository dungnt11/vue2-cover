import Vue from 'vue'

import App from '@/App.vue'
import store from '@/store'
import router from '@/router'
import VModal from 'vue-js-modal'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.use(VModal)
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app")