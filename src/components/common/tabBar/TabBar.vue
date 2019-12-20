<template>
  <div class="tabBar">
      <slot></slot>
  </div>
</template>

<script>
export default {
  name: "tabBar",
  data() {
    return {

    }
  },
  components:{ },
  props:{ },
}
</script>
<style scoped lang='scss'>
.tabBar {
    display: flex;
}
</style>
