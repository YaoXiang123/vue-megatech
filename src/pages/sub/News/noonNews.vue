<template>
  <div style="overflow:hidden;background-color: #ffffff;">
    <Header :HeaderMes="HeaderMes"></Header>
    <div style="display:none"><audio id="audioBox" :src="audio_path"></audio></div>
    <div class="flex" style="padding-top:1.946667rem">
      <div v-for="item in data.exponential" :key="item.id" style="width:33.3%;text-align:center">
        <p style="font-size:.373333rem;line-height:.533333rem;color:#666666">{{item.name}}</p>
        <p style="font-size:.48rem;line-height:.586667rem;color:#000000">{{item.Trade}}</P>
        <P style="font-size:.373333rem;line-height:.453333rem;" :style="{color:item.color}">{{item.Chg}}</p>
      </div>
    </div>
    <div>
      <div v-for="main in data.sectors" :key="main.id">
        <div class="items">
          <p style="color:#333333;padding: .266667rem;padding: .533333rem 0px 0 .32rem;font-size: .373333rem;">{{main.title}}</p>
        </div>
        <div style="display:flex;">
          <div v-for="item in main.items" :key="item.id" style="width:33.3%;text-align:center;padding:.266667rem 0;">
            <p style="font-size:.426667rem;">{{item.plite}}</p>
            <p style="font-size:.426667rem;" :style={color:main.color}>{{item.num}}</p>
            <p style="color:#9e9e9e;font-size:.373333rem;">{{item.name}}</p>
          </div>
        </div>
      </div>
      <p style="color:#9e9e9e;text-align: end;padding: .266667rem .266667rem .266667rem 0;" v-if="data.sectors && data.sectors.length > 0">行情数据更新于{{time}}</p>
    </div>
    <p class="title" v-if="data.organization && data.organization.length > 0">机构观点</p>
    <div v-for="item in data.organization" :key="item.id">
      <p class="Gnews"><font style="color:#F5A623">{{item.img}}</font>: {{item.text}}</p>
    </div>
    <p class="title" v-if="data.MNews && data.MNews.length > 0">市场机会</p>
    <div v-for="New in data.MNews" :key="New.id">
      <p class="Gnews">{{New.num}}</p>
      <span class="labelText"><div class="label" v-for="div in New.stocks" :key="div.id" >{{div.name}} <font :style={color:div.color}> {{div.num}}</font></div></span>
    </div>
    <p class="title" v-if="data.selfs && data.selfs.length>0">自选股动态</p>
    <div v-for="self in data.selfs" :key="self.id">
      <p class="Gnews">{{self.SNew}}</p>
      <div class="line">
        <span class="labelText"><div class="label">{{self.name}} <font :style={color:self.color}> {{self.num}}</font></div></span>
      </div>
    </div>
    <div v-if="data.unusual && data.unusual.length>0" style="margin-bottom: .93333rem;">
      <p class="title" style="padding-bottom:.266667rem;" >自选股异动</p>
      <p v-for="item in data.unusual" :key="item.id" style="margin: 0 .32rem;padding-bottom: .266667rem;font-size:.426667rem"><span style="color:#333333">{{item.name}}</span><span style="float:right" :style="{color:item.color}">{{item.chg}}</span></p>
    </div>
    <article-tabbar v-bind:pagetype="pagetype" v-bind:report_id = "report_id" v-bind:islike = "islike" v-bind:articleTabbar="articleTabbar" v-on:changePlayState = "playAudio($event)"></article-tabbar>
    <div class="dialogContain" >
      <x-dialog v-model="showToast" :dialog-style="{'max-width': '50%', width: '3.493333rem', top: '1.666667rem', height: '.853333rem', 'background-color': '#323232', 'font-size':'.373333rem'}">
        <div style="color:#ffffff;line-height:.533333rem;padding-top:.16rem;">预计播放{{time}}分钟</div>
      </x-dialog>
    </div>
    <loading v-model="showLoading" ></loading>
  </div>
</template>

<script>
import XDialog from '../../../../node_modules/vux/src/components/x-dialog/index'
import Loading from '../../../../node_modules/vux/src/components/loading/index'
import Header from '@/components/header'
import articleTabbar from '@/components/articleTabbar'
// import Vue from 'vue'
export default {
  components: {
    Header,
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
      audio_duration: 0,
      showToast: false,
      active: false,
      isPlaying: false,
      audio_path: '',
      time: '',
      HeaderMes: {
        title: '',
        type: 1,
        search: true
      },
      path: ''
    }
  },
  mounted: function () {
    this.getNoonReport()
    if (window.history.length < 2) {
      this.HeaderMes.type = 2
    }
  },
  methods: {
    // setWeixin (title) {
    //   Vue.wechat.ready(function () {
    //     Vue.wechat.onMenuShareAppMessage({
    //       title: title, // 分享标题
    //       desc: '智能简报', // 分享描述
    //       link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    //       imgUrl: 'http://megatech.hongjungroup.cn/common/img/megatech.png' // 分享图标
    //     }, function (res) {
    //       console.log('分享成功')
    //     })
    //   })
    // },
    playAudio (msg) {
      let audio = document.querySelector('#audioBox')
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
    activeIcon () {
      this.active = !this.active
    },
    getNoonReport () {
      this.axios.get(this.linkPrefix + '/aireport_api/ai_report_noon', {
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
          this.$nextTick(function () {
            this.data = response.data
          })
          this.audio_path = 'http://61.135.195.37:82/common/' + response.data.audio_path
          this.HeaderMes.title = response.data.title
          this.time = response.data.time
          this.report_id = response.data.report_id
          this.islike = response.data.islike
          this.showLoading = false
          let audio = document.querySelector('#audioBox')
          audio.addEventListener('canplay', function () {
            this.audio_duration = audio.duration
          })
          // this.setWeixin(this.HeaderMes.title)
        })
    }
  }
}
</script>

<style scoped>
.flex{
  display:flex;
  justify-content: space-around;
}
.items{
  display:flex;
  width:100%;
  border-bottom: .013333rem solid  #f2f2f2;
}
.line{
  display:flex;
}
.title{
  padding: .533333rem 0 .346667rem .32rem;
  font-size: .426667rem;
  line-height: .586667rem;
  font-weight: bold;
  color: #000000;
}
.label{
  height: .453333rem;
  margin-left: .3rem;
  text-align: center;
  font-size: .32rem;
  line-height:.453333rem;
  background-color: #f2f2f2;
  border-radius: .106667rem;
  padding: .106667rem .266667rem .026667rem  .266667rem;
  color: #000000;
}
.Gnews{
  padding:0 .32rem .266667rem .266667rem;
  color: #333333;
  font-size: .426667rem;
  line-height: .8rem;
  text-align: justify;
}
.labelText{
  display:flex;
  justify-content: flex-start;
  padding-bottom:.48rem;
  line-height: .693333rem;
}
.deadLine{
  height: 1rem;
  position: fixed;
  width: 100%;
  background-color: #ffffff;
  top: 16.8rem;
  border-top: .026667rem solid;
}
.dialogContain /deep/ .vux-x-dialog .weui-mask{
  background:none;
}
</style>
