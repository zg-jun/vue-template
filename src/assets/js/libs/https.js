/**axios配置 */

import _hyTool from "@assets/js/utils/tool";
import { Notice } from "view-design";
import axios from "axios";
import router from "@/router";

// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    if (
      _hyTool.getStore("token") !== "undefined" &&
      config.url.indexOf("127.0.0.1:12345") === -1
    ) {
      config.headers["Authorization"] = "Bearer " + _hyTool.getStore("token");
    }
    if (
      _hyTool.getStore("hwToken") !== "undefined" &&
      config.url.indexOf("127.0.0.1:12345") === -1
    ) {
      config.headers["Authorization"] = "Bearer " + _hyTool.getStore("hwToken");
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    if (
      response.data.code === 1 ||
      response.data.status === 1 ||
      response.data.Code === "0"
    ) {
      return Promise.resolve(response.data);
    } else {
      if (response.data.status === 0) {
        // 退出登录
        Notice.error({
          title: "Current account has been logged in"
        });
        // 清空缓存
        window.sessionStorage.clear();
        window.localStorage.clear();
        router.replace({
          path: "/login"
        });
      } else if (response.data.code === -1) {
        // 提示错误
        console.log(response.data.msg);
        Notice.error({
          title: "error"
        });
        return response.data;
      } else {
        return Promise.reject(response.data);
      }
    }
  },
  function (error) {
    // 对响应错误做点什么
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          // store.commit(types.LOGIN_OUT);
          router.replace({
            path: "login",
            query: {
              redirect: router.currentRoute.fullPath
            }
          });
          break;
        case 500:
          Notice.error({
            title: "Error",
            desc: "Timeout Please try again"
          });
          break;
        case 502:
          Notice.error({
            title: "Error",
            desc: "The system is being maintained"
          });
          break;
        case 504:
          Notice.error({
            title: "Error",
            desc: "The system is being maintained"
          });
          break;
      }
    }
    return Promise.reject(error);
  }
);

export default axios;
