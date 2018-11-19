<template>
<div class="fixed">
    <search :search="search" @jump="jump('/SP')"></search>
    <div class="contain">
      <tab :line-width="5" custom-bar-width=".4rem" active-color="#000000">
        <tab-item :selected="sth==0?true:false" @on-item-click="jump('/MS')" style="font-size:.426667rem"><ripple :width="'3.33333rem'">快报</ripple></tab-item>
        <tab-item :selected="sth==1?true:false"  @on-item-click="jump('/EP')" style="font-size:.426667rem"><ripple :width="'3.33333rem'">智读</ripple></tab-item>
        <tab-item :selected="sth==2?true:false" @on-item-click="jump('/HE')" style="font-size:.426667rem"><ripple :width="'3.33333rem'">热评</ripple></tab-item>
        <!--<tab-item @on-item-click="jump('/HL')" style="font-size:.426667rem">热榜</tab-item>-->
      </tab>
    </div>
</div>
</template>

<script>
import ripple from './ripple'
import { Tab, TabItem } from 'vux'
import search from './search'
export default {
  components: {
    Tab,
    TabItem,
    search,
    ripple
  },
  data () {
    return {
      sth: 1,
      path: ['/MS', '/EP', '/HE'],
      search: {
        type: 1
      }
    }
  },
  methods: {
    jump (data) {
      this.$router.push(data)
    }
  },
  mounted () {
    // 随路径跟换默认选项
    this.$data.sth = this.path.indexOf(this.$route.path)
  }
}
</script>

<style lang="stylus" scoped>
.contain /deep/ .vux-tab .vux-tab-item{
  background: none;
}
.fixed{
  position: fixed;
  background-color: #ffffff;
  z-index: 10;
  width: 100%;
}
</style>
