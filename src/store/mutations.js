/**
 * 定义mutations
 */

import types from './mutations_types';

export default {
  [types.VUE_DEMO](state,options){
    state.vueDemo = options;
  }
}