/**
 * 定义action
 */

import { types } from "./mutations_types";

export default {
   handleVueDemo({commit}, payload){
     commit(types.VUE_DEMO, payload);
   }
}