<template>
  <div class="body">
    <Header :HeaderMes="HeaderMes"></Header>
    <div style="display:none"><audio id="audioBox" :src="audio_path"></audio></div>
    <div class="grids"  style="padding-top: 1.3666667rem;">
      <grid :cols="3" :show-lr-borders="false" :show-vertical-dividers="false" class="grid">
        <grid-item v-for="item in data.hq_list" :key="item.id">
          <span class="grid-center"><p style="font-size: .373333rem;line-height: .533333rem;">{{item.name}}</p><p style="font-size: .48rem;line-height: .586667rem;margin:.08rem 0;color:#333333">{{item.num}}</p><p style="font-size: .373333rem;line-height: .453333rem;" :style={color:item.color}>{{item.chg}}</p></span>
        </grid-item>
      </grid>
    </div>
    <p class="updataTime" v-if="data.hq_list && data.hq_list.length > 0">行情数据更新于{{data.hq_time}}</p>
    <div v-for="item in data.all_news" :key="item.id">
      <div class="space" v-if="item.space"></div>
      <p class="title" v-if="item.News && item.News.length > 0">{{item.plitename}}</p>
      <div class="Gnews" v-for="(New,index) in item.News" :key="index">
        <p>{{index+1}}.{{New.text}}</p>
        <div style="display:flex;margin-left: -.266667rem;">
          <div class="label" v-if="New.trend" :style="{color:New.trendColor}">{{New.trend}}</div>
          <div class="label"  v-for="div in New.stocks" :key="div.id">
            <div v-if="div.labelname"></div>
            {{div.labelname}}<font :style="{color:div.color}">{{div.num}}</font>
          </div>
        </div>
      </div>
    </div>
    <p class="title"  @click="aaa" v-if="data.sectors && data.sectors.length > 0">受益版块</p>
    <div style="display:flex;justify-content:space-around;margin-bottom:1.76rem" >
      <div v-for="(item,id) in data.sectors" :key="id" @click="Toplite(id)">
        <p style="text-align:center; padding-bottom:.266667rem;font-size:.426667rem;color:#333333">{{item.name}}</p>
        <Rater v-model="item.star" disabled :font-size="15"></Rater>
      </div>
    </div>
    <article-tabbar v-on:changePlayState = "playAudio($event)" v-bind:pagetype="pagetype" v-bind:report_id = "report_id" v-bind:islike = "islike" v-bind:articleTabbar="articleTabbar"></article-tabbar>
    <div class="dialogContain" >
      <x-dialog v-model="showToast" :dialog-style="{'max-width': '50%', width: '3.493333rem', top: '10.666667rem', height: '.853333rem', 'background-color': '#323232', 'font-size':'.373333rem'}">
        <div style="color:#ffffff;line-height:.533333rem;padding-top:.16rem;">预计播放{{time}}分钟</div>
      </x-dialog>
    </div>
    <!-- <div class="line deadLine" style="padding: .266667rem 0;">
      <div style="vertical-align:middle;"><img src="../../../common/image/relay.png" style="width:24px;" align="absmiddle"><span> 转发</span></div>
      <div><img src="../../../common/image/down.png" style="width: .52rem;" align="absmiddle"><span> 赞</span></div>
      <div @click="activeIcon" v-if="active"><img src="../../../common/image/earphone.png" style="width: 16.2px;" align="absmiddle" > <span> 语音播报</span></div>
      <div @click="activeIcon" v-else><img src="../../../common/image/earphoneActive.png" style="width: .48rem;"  align="absmiddle" > <span> 语音暂停</span></div>
    </div> -->
    <loading v-model="showLoading" ></loading>
  </div>
</template>
<script>
import Grid from '../../../../node_modules/vux/src/components/grid/grid'
import GridItem from '../../../../node_modules/vux/src/components/grid/grid-item'
import Rater from '../../../../node_modules/vux/src/components/rater/index'
import XDialog from '../../../../node_modules/vux/src/components/x-dialog/index'
import Loading from '../../../../node_modules/vux/src/components/loading/index'
import Header from '@/components/header'
import articleTabbar from '@/components/articleTabbar'
export default {
  components: {
    Header,
    Grid,
    GridItem,
    Rater,
    articleTabbar,
    XDialog,
    Loading
  },
  data () {
    return {
      data: {},
      showLoading: true,
      pagetype: 'report',
      articleTabbar: {},
      report_id: -1,
      islike: 0,
      active: false,
      showToast: false,
      time: '',
      HeaderMes: {
        title: '',
        type: 1,
        search: true
      },
      audio_path: ''
    }
  },
  mounted: function () {
    this.getMorningReport()
    if (window.history.length < 2) {
      this.HeaderMes.type = 2
    }
  },
  methods: {
    // 读报页面
    playAudio (msg) {
      let audio = document.querySelector('#audioBox')
      // console.log(audio.src)
      if (msg === 'play') {
        audio.play()
        this.isPlaying = true
      } else {
        audio.pause()
        this.isPlaying = false
      }
      if (this.isPlaying) {
        this.time = (audio.duration - audio.currentTime) / 60
        this.time = this.time.toFixed(2)
        this.showToast = true
        setTimeout(() => {
          this.showToast = false
        }, 2000)
      }
    },
    getMorningReport () {
      this.axios.get(this.linkPrefix + '/aireport_api/ai_report_morning', {
        params: {
          report_date: this.$route.query.report_date,
          report_type: this.$route.query.report_type
        }
      })
        .then(response => {
          if (response.data.not_login) {
            this.$router.push({path: '/L', query: {tologin: 1}})
          }
          this.data = {}
          this.data = response.data
          this.audio_path = 'http://61.135.195.37:82/common/' + response.data.audio_path
          this.HeaderMes.title = response.data.title
          this.report_id = response.data.report_id
          this.islike = response.data.islike
          this.showLoading = false
        })
    },
    aaa () {
      // console.log(this.$route.query.report_date)
      // console.log(this.$route.query.report_type)
    },
    activeIcon () {
      this.active = !this.active
    },
    Toplite (id) {
      // console.log(this.sectors[id].name)
    }
  },
  destroyed: function () {
    // console.log('我已经离开了')
  },
  sounding () {
    // console.log('aaa')
    this.showToast = true
  }
}
</script>

<style scoped>
.body{
  background-color: #ffffff;
}
.items{
  display:flex;
  width:100%;
  justify-content: space-around;
}
.title{
  padding: .533333rem 0 .346667rem .32rem;
  font-size: .426667rem;
  line-height: .586667rem;
  font-weight: bold;
  color: #000000;
}
.label{
  height: 0.453333rem;
  margin-left: 0.3rem;
  margin-top: .133333rem;
  text-align: center;
  font-size: .32rem;
  line-height:.453333rem;
  background-color: #f2f2f2;
  border-radius: .106667rem;
  padding: .106667rem .266667rem .026667rem  .266667rem;
  color: #000000;
}
.barChats{
  display: flex;
  justify-content: space-around;
  padding-top: 0.106667rem;
  font-weight: bold;
}
.barChat{
  width: 2.41766666666666rem;
  box-sizing: border-box;
}
.barChat_outer{
  background-color: #fe0100;
  overflow: hidden;
  position: relative;
  vertical-align: middle;
  height: .266667rem;
}
.barChat_inner{
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  text-align: left;
  line-height: 1;
  background-color: #00b150;
  text-align:center;
}
.line{
  display:flex;
  justify-content:space-around;
}
.grid-center {
  display: block;
  text-align: center;
  color: #666;
}
.grid{
  margin-top: .266667rem;
}
.grids /deep/ .weui-grids:before{
  display: none;
}
.grid /deep/ a{
  text-decoration:none;
  padding: .08rem;
  margin-bottom: .266667rem;
}
.grid /deep/ a:after{
  display: none;
}
.Gnews{
  padding:0 .32rem .266667rem .266667rem;
  color: #333333;
  font-size: .426667rem;
  line-height: .8rem;
}
.Gnews{
  text-align: justify;
}
.plite{
  width: 2.04rem;
  height:1.813333rem;
  background-color: #fe0100;
  color: #ffffff;
  border-radius: .213333rem;
}
.plite p{
  width: 100%;
  text-align: center;
  font-size: .373333rem;
  line-height: .56rem;
}
.deadLine{
  height: 1.12rem;
  position: fixed;
  width: 100%;
  background-color: #f8f8f8;
  top: 16.8rem;
}
.updataTime{
  font-size: .32rem;
  line-height: .453333rem;
  color:#999999;
  text-align: right;
  padding-right: .32rem;
}
.dialogContain /deep/ .vux-x-dialog .weui-mask{
  background:none;
}
</style>
