<template>
  <div class="navBar">
    <div class="navLeft">
      <slot name="nav-left"></slot>
    </div>
    <div class="navContent">
      <slot name="nav-content"></slot>
    </div>
    <div class="navRight">
      <slot name="nav-right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "navBar",
  data() {
    return {
    }
  },
  components:{ },
  props:{ },
}
</script>
<style scoped lang="scss">
.navBar {
  display: flex;
  height: 44px;
  // border-bottom: 1px solid #eee;
  // box-shadow: 0 1px 1px rgba(100,100,100,.08);
  .navLeft,.navRight  {
    width: 60px;
  }
  .navContent {
    flex: 1;
  }
}
</style>