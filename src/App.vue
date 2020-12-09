<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import '@assets/styles/base.scss'; //基础样式
@import '@assets/styles/common.scss'; //公共样式
#nprogress .bar {
  background: #41b880 !important; //自定义进度条颜色
}
</style>
