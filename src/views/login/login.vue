<style lang="scss" scoped>
.content {
  text-align: center;
  font-size: 30px;
}
</style>

<template>
  <div class="content">
    登录页
  </div>
</template>

<script>
import { findListConfModalName } from "@service/onLine/onLine";
export default {
  data() {
    return {};
  },
  created() {
    this._hyTool.setStore("token", "d1b7ab3bb92a80a053b0acf4013f1bb7");
    findListConfModalName().then(res => {
      console.log(res);
    });
  }
};
</script>
