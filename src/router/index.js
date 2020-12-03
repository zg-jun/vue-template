import Vue from "vue";
import VueRouter from "vue-router";
import routes from './router';//路由文件

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// 前置路由（未登录拦截）
router.beforeEach((to, from, next) => {
  // ...
  console.log(to,from);
  next();
})

export default router;
