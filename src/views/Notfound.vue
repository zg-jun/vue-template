<style lang="scss" scoped>
@import '@assets/styles/_mixins';
.not-found {
  height: 100vh;
  font-weight: bold;
  @include f-sc(50px, #aaa);
}
</style>

<template>
  <div class="not-found d-flex-c">
    NOT FOUND
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
