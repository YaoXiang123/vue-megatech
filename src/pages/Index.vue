<template>
    <div class="page">
          <!-- <Header :HeaderMes="HeaderMes"></Header> -->
      <div @touchmove.prevent>
        <tab></tab>
      </div>
    <transition name="slide-fade">
        <router-view></router-view>
    </transition>
    <div @touchmove.prevent>
      <tabbar></tabbar>
    </div>
         <!-- <tab-bar @tab="tab"></tab-bar> -->
    </div>
</template>

<script>
import tabbar from '../components/tabbar'
import Header from '../components/header'
import tab from '../components/tab'
export default {
  components: {
    // tabBar,
    Header,
    tab,
    tabbar
  },
  watch: {
    $route (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
  }
}
</script>

<style lang="stylus" scoped>
.page /deep/ .vux-tab span {
    margin-top -.13rem
}

.page {
    overflow hidden
    background-color #ffffff
}

.contain {
    width: 100%;
    height: 13.97332rem;
    overflow-x: hidden;
    overflow-y: scroll;

    ::-webkit-scrollbar {
        width: 0;
        height: 0;
        background-color: transparent;
    }
}
.flex {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.slide-fade{
  position: absolute;left:0;right: 0;
}
.slide-fade-enter-active {
  transition all 1.2s ease
}
.slide-fade-leave-active {
  transition: all .1s cubic-bezier(2.0, .5, .8, 1.0)
}
.slide-fade-enter, .slide-fade-leave-to
{
  left:0;right: 0;
  transform: translateX(50px);
  opacity: 0;
}
</style>
