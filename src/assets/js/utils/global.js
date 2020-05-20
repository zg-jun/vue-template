/**挂载vue原型上的全局方法 */

import Vue from "@/components/iview/iview";
import _hyTool from "@assets/js/utils/tool";

Vue.prototype._hyTool = Vue._hyTool = Vue.prototype._hyTool || _hyTool;
