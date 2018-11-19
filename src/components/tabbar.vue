<template>
<div class="fixed">
    <tabbar @on-index-change="onIndexChange">
      <tabbar-item :selected="sth==0?true:false" link="/" >
        <img slot="icon" src="../common/assets/icon-tabbar.png/首页-未选中@2x.png">
        <img slot="icon-active" src="../common/assets/icon-tabbar.png/首页-选中@2x.png">
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item :selected="sth==1?true:false" link="/o">
        <img slot="icon" src="../common/assets/icon-tabbar.png/自选-未选中@2x.png">
        <img slot="icon-active" src="../common/assets/icon-tabbar.png/自选-选中@2x.png">
        <span slot="label">自选</span>
      </tabbar-item>
      <tabbar-item :selected="sth==2?true:false" link="/ov" id="middle">
      <!-- 其中两张图是带红点表示有更新时的状态 -->
        <img slot="icon-active" src="../common/assets/icon-tabbar.png/智报-选中Icon@2x.png" v-if="icon">
        <img slot="icon-active" src="../common/assets/icon-tabbar.png/智报-选中@2x.png" v-else>
        <img slot="icon" src="../common/assets/icon-tabbar.png/智报-未选中Icon@2x.png" v-if="icon">
        <img slot="icon" src="../common/assets/icon-tabbar.png/智报-未选中@2x.png" v-else>
        <span slot="label">智报</span>
      </tabbar-item>
      <tabbar-item :selected="sth==3?true:false" link="/EP">
        <img slot="icon" src="../common/assets/icon-tabbar.png/资讯-未选中@2x.png">
        <img slot="icon-active" src="../common/assets/icon-tabbar.png/资讯-选中@2x.png">
        <span slot="label">资讯</span>
      </tabbar-item>
      <tabbar-item :selected="sth==4?true:false" link="/l">
        <img slot="icon" src="../common/assets/icon-tabbar.png/我的-未选中@2x.png">
        <img slot="icon-active" src="../common/assets/icon-tabbar.png/我的-选中@2x.png">
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
</div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux'
export default {
  data () {
    return {
      path: ['/', '/o', '/ov', '/EP', '/l'],
      icon: false, // 打点状态控制
      sth: 0
    }
  },
  components: {
    Tabbar,
    TabbarItem
  },
  mounted () {
    this.$data.sth = this.path.indexOf(this.$route.path)
    this.hasReport()
  },
  methods: {
    hasReport () {
      this.axios.get(this.linkPrefix + '/aireport_api/has_new_report')
        .then(response => {
          if (response.data.flag) {
            this.icon = true
          }
        })
    },
    onIndexChange (newIndex, oldIndex) {
      // console.log(newIndex, oldIndex)
    }
  }
}
</script>

<style scoped>
.fixed /deep/ .weui-tabbar{
  position: fixed;
}
a {
  text-decoration: none;
}
.router-link-active {
  text-decoration: none;
}
.fixed /deep/ .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label{
  color:#004799
}
.fixed /deep/ #middle .weui-tabbar__icon{
  width: 1.76rem;
}
.fixed /deep/ .weui-tabbar__icon img{
  width: 85%;
  height: 85%;
}
</style>
