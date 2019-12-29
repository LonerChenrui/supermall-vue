<template>
  <div class="tabConrol">
    <div 
      v-for="(item, index) in tabControlTitles"
      class="tabConrol-item" 
      :class="{active: curIndex === index}"
      :key="index"
      @click="tabControlTitleClick(index)"
    >
        <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "tabConrol",
  data() {
    return {
      curIndex: 0
    }
  },
  components:{ 

  },
  props:{ 
    tabControlTitles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    tabControlTitleClick(index) {
      this.curIndex = index
      this.$emit("goodsListtype",index)
    }
  },
  
}
</script>
<style scoped lang="scss">
.tabConrol {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #fff;
  .active {
    color: red;
  }
  .tabConrol-item {
    padding: 14px 0;
    span{
    border-bottom: 2px solid;
    padding-bottom: 8px;
  }
  }
}

</style>