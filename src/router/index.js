import Vue from "vue";
import VueRouter from "vue-router";
import Nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import routes from './router';//路由文件

Vue.use(VueRouter);

// 自动化配置路由
const requireContext = require.context('@views/',true,/\.vue$/);
requireContext.keys().forEach(fileName=>{
  //获取路由配置
  const routerModule = requireContext(fileName);
  routes.push({
    path:`/${fileName.replace(/(\.\/|\.vue)/g, '')}`,
    name:routerModule.default.name || fileName.split('/').pop().replace(/(\.\/|\.vue)/g, ''),
    component:routerModule.default
  })
})
console.log(routes);
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// 前置路由（未登录拦截）
router.beforeEach((to, from, next) => {
  console.log(to,from);
  Nprogress.start();
  next();
})

router.afterEach((to,from)=>{
  console.log(to,from);
  Nprogress.done();
})

export default router;
