/**登录页面相关接口 */
import { fetch, devHttp } from "@service/baseService.js";

// 验证token
const checkTokenApi = devHttp + "/RefreshToken";
export const checkToken = payload =>
  fetch.post(checkTokenApi, null, {
    params: payload
  });
