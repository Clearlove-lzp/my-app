import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import Bus from "./style/bus.js";
import './style/format'

import VueQuillEditor from "vue-quill-editor";
// eslint-disable-next-line import/no-extraneous-dependencies
import "quill/dist/quill.core.css";
// eslint-disable-next-line import/no-extraneous-dependencies
import "quill/dist/quill.snow.css";
// eslint-disable-next-line import/no-extraneous-dependencies
import "quill/dist/quill.bubble.css";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ViewUI);
Vue.use(ElementUI);
Vue.prototype.$bus = Bus;
Vue.use(VueQuillEditor /* { default global options } */);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
