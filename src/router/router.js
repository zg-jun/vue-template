/**
 * 路由地址
 */
const Home = () => import("@views/Home.vue");
const Notfound = () => import("@views/Notfound.vue");

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "*",
    name: "Notfound",
    component: Notfound
  }
  //其余路由index.js自动配置...
];

export default routes;