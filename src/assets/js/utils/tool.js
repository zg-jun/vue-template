/**常用工具类 */

/* eslint-disable no-return-assign */
import $ from "jquery";

/**
 * 设置cookie
 */
const setCookie = (name, value) => {
  var Days = 7;
  var exp = new Date();
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
  document.cookie =
    name + "=" + escape(value) + ";expires=" + exp.toGMTString();
};

/**
 * 获取cookie
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
const getCookie = name => {
  if (document.cookie.length > 0) {
    let start = document.cookie.indexOf(name + "=");
    if (start !== -1) {
      start = start + name.length + 1;
      let end = document.cookie.indexOf(";", start);
      if (end === -1) {
        end = document.cookie.length;
      }
      return unescape(document.cookie.substring(start, end));
    }
  }
  return "";
};

/**
 * 存储localStorage/sessionStorage
 */
const setStore = (name, content, deep) => {
  if (!name) return;
  if (typeof content !== "string") {
    content = JSON.stringify(content);
  }
  if (deep) {
    window.localStorage.setItem(name, content);
  } else {
    window.sessionStorage.setItem(name, content);
  }
};

/**
 * 获取localStorage/sessionStorage
 */
const getStore = (name, deep) => {
  if (!name) return;
  if (deep) {
    return window.localStorage.getItem(name);
  } else {
    return window.sessionStorage.getItem(name);
  }
};

/**
 * 删除localStorage/sessionStorage
 */
const removeStore = (name, deep) => {
  if (!name) return;
  if (deep) {
    window.localStorage.removeItem(name);
  } else {
    window.sessionStorage.removeItem(name);
  }
};

/**
 * 格式化日期
 * @param  {[type]} fmt [description]
 * @return {[type]}     [description]
 */
const DateFormat = (date, fmt) => {
  if (typeof date === "string") {
    date = date.replace(/-/g, "/");
  }
  date = new Date(date);
  var o = {
    "M+": date.getMonth() + 1, // 月份
    "d+": date.getDate(), // 日
    "h+": date.getHours(), // 小时
    "m+": date.getMinutes(), // 分
    "s+": date.getSeconds(), // 秒
    "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  }
  return fmt;
};
/**
 * 格式化日期
 * @param  {[type]} fmt [description]
 * @return {[type]}     [description]
 */
const DateFormatTZ = dateStr => {
  let time = new Date(dateStr).getTime();
  let date = DateFormat(
    new Date(time - 8 * 60 * 60 * 1000),
    "yyyy-MM-dd hh:mm:ss"
  );
  let dateTZ = new Date((date + ".000Z").replace(" ", "T"));
  return dateTZ;
};

// 函数节流
const throttle = (idea, action) => {
  let last = 0;
  return function () {
    let now = +new Date();
    if (now - last > idea) {
      action && action.apply(this, arguments);
      last = now;
    }
  };
};

// 函数防抖 debounce(1000,fn)
export const debounce = (idea, action) => {
  let timer = null;
  return function () {
    let that = this;
    let args = arguments;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(function () {
      action && action.apply(that, args);
    }, idea);
  };
};
// extend
const extend = (target, source) => {
  for (let attr in source) {
    target[attr] = source[attr];
  }
  return target;
};

// deepCopy
const deepCopy = (obj, cache = []) => {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  const hit = find(cache, c => c.original === obj);
  if (hit) {
    return hit.copy;
  }

  const copy = Array.isArray(obj) ? [] : {};
  cache.push({
    original: obj,
    copy
  });

  Object.keys(obj).forEach(key => {
    copy[key] = deepCopy(obj[key], cache);
  });
  return copy;
};
// 处理时间
let addZero = num => (num > 9 ? num : "0" + num);
const timeFormat = (time = new Date(), fn = addZero) => {
  // eslint-disable-next-line one-var
  let y = time.getFullYear(),
    mon = fn(time.getMonth() + 1),
    d = fn(time.getDate()),
    h = fn(time.getHours()),
    m = fn(time.getMinutes()),
    s = fn(time.getSeconds());
  return {
    y,
    mon,
    d,
    h,
    m,
    s
  };
};
// 获取url上的查询参数
export const parseUrl = function (url) {
  var result = {};
  var query = url.split("?")[1];
  if (!query) return result;
  var queryArr = query.split("&");
  queryArr.forEach(function (item) {
    var value = item.split("=")[1];
    var key = item.split("=")[0];
    result[key] = value;
  });
  return result;
};

/**
 * 高德地图通过上级获取下级地址信息
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
const amapGetRegion = (name, cb) => {
  var apiConv =
    "http://restapi.amap.com/v3/config/district" +
    "?key=09fc21a01b861edccad8027462452966" +
    "&keywords=" +
    name +
    "&subdistrict=2" +
    "&extensions=base";
  $.getJSON(apiConv, function (data) {
    cb(data);
  });
};

const createLink = (h, params, fn, text, props, style) => {
  let defProps = props || {
    type: "text",
    size: "small"
  };
  let defStyle = style || {
    // marginRight: '10px',
    color: "#19be6b"
  };
  return h(
    "a",
    {
      props: defProps,
      style: defStyle,
      on: {
        click: () => {
          fn(params.row);
        }
      }
    },
    text
  );
};

const createButton = (h, params, fn, text, type, style, isDisabled) => {
  let defType = type || "success";
  let topText = "";
  // 置顶操作新增
  if (params.row.top === 0) {
    topText = "  Top  ";
  } else if (params.row.top === 1) {
    topText = "Unpin";
  }
  return h(
    "Button",
    {
      props: {
        type: defType,
        size: "small",
        disabled: isDisabled || false
      },
      style: style,
      on: {
        click: () => {
          fn(params.row);
        }
      }
    },
    [h("span", text || topText)]
  );
};

const createSpan = (h, params, fn, text, style, isDisabled) => {
  return h(
    "Span",
    {
      props: {
        disabled: isDisabled || false
      },
      style: style,
      on: {
        click: () => {
          fn(params.row);
        }
      }
    },
    text
  );
};

const tagStatus = (h, params, list, status, fn) => {
  const color = status === 0 ? "primary" : status === 1 ? "success" : "warning";
  const text = status === 0 ? "无" : status === 1 ? "正常" : "报警";
  const dis = status === 0;
  return [
    h(
      "Button",
      {
        props: {
          type: color,
          size: "small",
          disabled: dis
        },
        style: {
          marginRight: "5px"
        },
        on: {
          click: () => {
            fn(params.row);
          }
        }
      },
      text
    ),
    h(
      "div",
      {
        slot: "content"
      },
      [
        h(
          "ul",
          list.map(item => {
            return h(
              "li",
              {
                style: {
                  textAlign: "center",
                  padding: "4px"
                }
              },
              item.n + "：" + item.c
            );
          })
        )
      ]
    )
  ];
};

/**
 * 是否存在数组里面
 * @param array
 * @param value
 */
const isInArray = (array, value) => {
  let ret = array.find(item => {
    return item.value === value;
  });
  if (ret) {
    return ret.value;
  }
  return "";
};
/**
 * 判断字符串是否是JSON
 * @param str
 * @returns {boolean}
 */
const isJSON = str => {
  if (typeof str === "string") {
    try {
      JSON.parse(str);
      if (str.indexOf("{") > -1) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
  return false;
};
/**
 * 是否存在数组中，存在则返回原来的数组，不存在则添加在原来的数组中
 * @param array
 * @param json
 * @returns {*}
 */
const isInSelectArray = (array, json) => {
  let ret = array.find(item => {
    return item.value === json.value;
  });
  if (ret) {
    return array;
  } else {
    array.push(json);
    return array;
  }
};
const checkVIN = sVIN => {
  let Arr = [];
  let Brr = [];
  Arr["A"] = 1;
  Arr["B"] = 2;
  Arr["C"] = 3;
  Arr["D"] = 4;
  Arr["E"] = 5;
  Arr["F"] = 6;
  Arr["G"] = 7;
  Arr["H"] = 8;
  Arr["J"] = 1;
  Arr["K"] = 2;
  Arr["L"] = 3;
  Arr["M"] = 4;
  Arr["N"] = 5;
  Arr["P"] = 7;
  Arr["R"] = 9;
  Arr["S"] = 2;
  Arr["T"] = 3;
  Arr["U"] = 4;
  Arr["V"] = 5;
  Arr["W"] = 6;
  Arr["X"] = 7;
  Arr["Y"] = 8;
  Arr["Z"] = 9;
  Arr["1"] = 1;
  Arr["2"] = 2;
  Arr["3"] = 3;
  Arr["4"] = 4;
  Arr["5"] = 5;
  Arr["6"] = 6;
  Arr["7"] = 7;
  Arr["8"] = 8;
  Arr["9"] = 9;
  Arr["0"] = 0;
  Brr[1] = 8;
  Brr[2] = 7;
  Brr[3] = 6;
  Brr[4] = 5;
  Brr[5] = 4;
  Brr[6] = 3;
  Brr[7] = 2;
  Brr[8] = 10;
  Brr[9] = 0;
  Brr[10] = 9;
  Brr[11] = 8;
  Brr[12] = 7;
  Brr[13] = 6;
  Brr[14] = 5;
  Brr[15] = 4;
  Brr[16] = 3;
  Brr[17] = 2;
  var bl = false;
  if (sVIN.length === 17) {
    return true; // 上线时 这里删掉
  }
  return bl;
};

const getSelectItem = (list, label) => {
  if (list) {
    return list.map(item => {
      return {
        value: item.id,
        label: item[label]
      };
    });
  }
};

/**
 * 版本比较
 * @param 旧版本
 * @param 新版本
 * @returns {*}
 */
const compareVersion = (ov, nv) => {
  if (!ov || !nv || ov === "" || nv === "") {
    return false;
  }
  if (ov === nv) {
    return false;
  }
  // let b = false;
  let ova = ov.split(".", 4);
  let nva = nv.split(".", 4);
  for (var i = 0; i < ova.length && i < nva.length; i++) {
    let so = ova[i];
    let no = parseInt(so);
    let sn = nva[i];
    let nn = parseInt(sn);
    if (nn > no || sn.length > so.length) {
      return true;
    } else if (nn < no) {
      return false;
    }
  }
  if (nva.length > ova.length && nv.indexOf(ov) === 0) {
    return true;
  }
};
/**
 * 判断元素是否在数组里面
 * @author maybe
 * @param 旧版本
 * @param 新版本
 * @returns {*}
 */
const isConArray = (array, obj) => {
  let flag = false;
  array.forEach(e => {
    if (e === obj) {
      flag = true;
    }
  });
  return flag;
};
const getRandomNum = () => {
  return Math.random();
};
/**
 *
 *将0时区时间处理成客户当地时间
 * @param {0时区时间戳} GMT
 * @returns 包含 年月日等系列值的对象
 */
const getLocalTime = GMT => {
  let localTime = GMT - new Date().getTimezoneOffset() * 60 * 1000;
  return timeFormat(new Date(localTime));
};

/**
 *获取操作系统
 * @returns 操作系统信息
 */
const findOS = () => {
  var curOS = "Not Named...";
  if (navigator.userAgent.indexOf("Win") !== -1) return (curOS = "Windows");
  if (navigator.userAgent.indexOf("Mac") !== -1) return (curOS = "MacOS");
  if (navigator.userAgent.indexOf("X11") !== -1) return (curOS = "UNIX");
  if (navigator.userAgent.indexOf("Linux") !== -1) return (curOS = "Linux");
  return curOS;
};
/**
 * 获取操作系统的详细信息
 * @returns 操作系统信息及位数
 */
const findOsDetail = () => {
  let info = "Unknown";
  let version = navigator.userAgent.toLowerCase();
  // 判断系统
  if (version.indexOf("windows nt 5") !== -1) {
    info = "Win XP";
  } else if (version.indexOf("windows nt 7") !== -1) {
    info = "Win7";
  } else if (version.indexOf("windows nt 8") !== -1) {
    info = "Win8";
  } else if (version.indexOf("windows nt 10") !== -1) {
    info = "Win10";
  } else if (version.indexOf("mac") !== -1) {
    info = "MacOS";
  } else if (version.indexOf("x11") !== -1) {
    info = "Unix";
  } else if (version.indexOf("linux") !== -1) {
    info = "Linux";
  }
  // 判断位数
  if (version.indexOf("win32") !== -1 || version.indexOf("wow32") !== -1) {
    info += " 32";
  }
  if (version.indexOf("win64") !== -1 || version.indexOf("wow64") !== -1) {
    info += " 64";
  }
  return info;
};
/**
 * 获取浏览器信息
 * @returns 浏览器信息
 */
const findBrowser = () => {
  let browser = {
    msie: false,
    firefox: false,
    opera: false,
    safari: false,
    chrome: false,
    netscape: false,
    appname: "unknown",
    version: 0
  };
  let ua = window.navigator.userAgent.toLowerCase();
  if (/(msie|firefox|opera|chrome|netscape)\D+(\d[\d.]*)/.test(ua)) {
    browser[RegExp.$1] = true;
    browser.appname = RegExp.$1;
    browser.version = RegExp.$2;
  } else if (/version\D+(\d[\d.]*).*safari/.test(ua)) {
    // safari
    browser.safari = true;
    browser.appname = "safari";
    browser.version = RegExp.$2;
  }
  return browser.appname + " " + browser.version;
};
// 抛出
export default {
  findBrowser,
  findOsDetail,
  findOS,
  getLocalTime,
  timeFormat,
  setCookie,
  getCookie,
  setStore,
  getStore,
  removeStore,
  DateFormat,
  DateFormatTZ,
  throttle,
  debounce,
  extend,
  deepCopy,
  amapGetRegion,
  createLink,
  createButton,
  createSpan,
  tagStatus,
  isInArray,
  isJSON,
  checkVIN,
  isInSelectArray,
  getSelectItem,
  compareVersion,
  isConArray,
  getRandomNum
};
