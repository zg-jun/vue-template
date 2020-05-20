import Vue from "@components/iview/iview";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "view-design/dist/styles/iview.css"; // 导入iview
import "@assets/js/utils/global.js"; // 挂载Vue原型上的方法

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
