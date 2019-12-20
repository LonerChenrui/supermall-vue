<template>
  <div class="tabBarItemCon tabBarItem" @click="activePath">
    <div v-if="!isActive">
      <slot name="icon-item"></slot>
    </div>
    <div v-else>
      <slot name="icon-item-active"></slot>
    </div>
    <div :style="fontColor">
      <slot name="icon-item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
     
    }
  },
  components:{ },
  props:{
    link: String,
    colorType: {
      type: String,
      default: 'red'
    }
   },
  methods: {
    activePath() {
      this.$router.push(this.link)
    }
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.link) !== -1
    },
    fontColor() {
      return this.isActive ? {color: this.colorType} : ''
    }
  },
}
</script>
<style scoped lang="scss">
.tabBarItemCon {
    flex: 1;
}
.tabBarItem {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 4px;
}
.tabBarItem img {
    width: 24px;
    height: 24px;
}
</style>