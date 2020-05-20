/**在线写码页面相关接口 */
import { fetch, devHttp } from "@/service/baseService";

// 查询所有型号 method 'POST'
const findListConfModalNameApi = devHttp + "/fsapi/model/findListConfModalName";
export const findListConfModalName = () => fetch.post(findListConfModalNameApi);
