/**
 * Vue扩展
 */
import Filters from './filters';
import Tool from  './tool';

const install = Vue =>{
  // 挂载方法到vue原型
  Vue.prototype._Tool = Tool;
  // 注册全局过滤器
  Vue.use(Filters);
}

export default { install }