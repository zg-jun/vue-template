/**
 * 路由地址
 */
const Home = () => import("@views/Home.vue");

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  }
];

export default routes;