/**
 * 时间：2020-05-19
 * 描述：服务基类
 */
import axios from "@assets/js/libs/https";

export const fetch = axios;

export const apiFormat = (str, res) => {
  let reg = /\{(\w+?)\}/gi;
  return str.replace(reg, ($0, $1) => {
    return res[$1];
  });
};

export const apiFormat2 = (url, params) => {
  if (params) {
    let propertys = Object.keys(params);
    url = url + "?";
    propertys.forEach((key, index) => {
      if (index === propertys.length - 1) {
        url = url + key + "=" + params[key];
      } else {
        url = url + key + "=" + params[key] + "&";
      }
    });
  }
  return url;
};
// 飞速接口地址
export const fsHttp = "/apifs";

// 内部请求地址
export const devHttp = "/api";

// 后台接口
export const adminHttp = "http://54.245.72.232:5008"; // 测式
// export const adminHttp = 'https://overseas.tomcat.site';// 正式
