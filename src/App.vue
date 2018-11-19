<template>
  <div id="app">
    <!-- <keep-alive include="MC"><router-view></router-view></keep-alive>   信息表经常需要查看，所以用keep-alive保留缓存 -->
      <router-view v-if="$route.meta.keepAlive">
        HotList, Message, Explain, HotEvaluate, IndividualShar, overView, plite, SearchPage, SearchDetail, Searchedgit s
      </router-view>
    <router-view></router-view>
  </div>
</template>

<script>
// import Headera from './components/header.vue'
export default {
  components: {
    // Header
  }
}
</script>

<style lang="stylus">
  *
    margin 0
    padding 0
  #app
    margin 0
    padding 0
</style>
