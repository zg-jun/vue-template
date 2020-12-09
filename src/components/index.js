/**
 * 组件自动化注册
 */
const install = Vue =>{
    const requireComponent  = require.context('./',true,/\.vue$/);
    requireComponent.keys().forEach(fileName=>{
        // 获取组件配置
        const componentConfig = requireComponent(fileName);

        // 获取组件的命名
        const componentName = fileName.split('/').pop().replace(/\.\w+$/, '');
        
        // 全局注册组件
        Vue.component(
            componentName,
            // 如果这个组件选项是通过 `export default` 导出的，
            // 那么就会优先使用 `.default`，
            // 否则回退到使用模块的根。
            componentConfig.default || componentConfig
        )
    })
}

export default { install }