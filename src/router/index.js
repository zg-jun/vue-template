import Vue from "vue";
import VueRouter from "vue-router";
import Nprogress from "nprogress";
import "nprogress/nprogress.css";
import routes from "./router"; //路由文件

Vue.use(VueRouter);

// 递归检测是否包含同级目录
const findRoute = (routeItem, routeName) => {
  for (let item of routeItem) {
    // debugger;
    if (item.path.replace(/\//g, "") === routeName) {
      return item;
    } else {
      if (item.children && item.children.length) {
        return findRoute(item.children, routeName);
      }
    }
  }
};

// 自动化配置路由
const requireContext = require.context("@views/", true, /\.vue$/);

requireContext.keys().forEach(fileName => {
  //获取路由配置
  const routerModule = requireContext(fileName);
  // 命名
  let filePath = fileName.replace(/(\.\/|\.vue)/g, "");
  // 是否有层级
  if (filePath.indexOf("/") === -1) {
    // 处理无层级
    let result = findRoute(routes, filePath);
    !result &&
      routes.push({
        path: `/${filePath}`,
        name: routerModule.default.name || filePath,
        component: routerModule.default,
        children: []
      });
  } else {
    // 处理有层级
    let routeArr = filePath.split("/");
    // 记录父级
    let parentName = null;
    routeArr.forEach(item => {
      let result = findRoute(routes, item);
      if (result) {
        parentName = result;
      } else {
        parentName.children.push({
          path: item,
          name: routerModule.default.name || item,
          component: routerModule.default,
          children: []
        });
      }
    });
  }
});
// console.log(routes);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// 前置路由（未登录拦截）
router.beforeEach((to, from, next) => {
  console.log(to, from);
  Nprogress.start();
  next();
});

router.afterEach((to, from) => {
  console.log(to, from);
  Nprogress.done();
});

export default router;
