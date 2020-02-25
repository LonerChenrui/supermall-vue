<template>
  <div id="app">
    <keep-alive exclude="productDetails">
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from '@/components/content/mainTabBar/MainTabBar'
export default {
  name: 'App',
  data() {
    return {
    }
  },
  components: {
    MainTabBar
  }
}
</script>

<style>
  @import url('./assets/css/base.css');
</style>
