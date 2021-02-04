/**
 * 路由地址
 */
const Home = () => import("@views/Home.vue");
const NotFound = () => import("@views/NotFound.vue");

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "*",
    name: "NotFound",
    component: NotFound
  }
  //其余路由index.js自动配置...
];

export default routes;
