<template>
  <div style="background-color #ffffff">
    <Header :HeaderMes="HeaderMes" @touchmove.prevent></Header>
    <div style="display:none"><audio id="audioBoxList" ref='audio' controls></audio></div>
    <div class="contain_logo">
      <div class="logo">
        <div class="logo_img">
          <img src="../common/image/overflow.png" alt="">
        </div>
        <div class="logo_text">透视海量资讯,知晓最新解读</div>
      </div>
    </div>
    <div class="contains_bodys">
      <div class="contain_bodys" v-for="(item,id) in report_list" :key="id" >
        <div v-if="report_list && id < 5">
          <div class="contain_body" @click="jump(id)">
            <div class="title">{{item.newTime}}{{item.name}}</div>
            <div class="label" v-if="item.new">最新</div>
          </div>
          <!-- build之后限制失效所以写在行内 -->
          <div @click="jump(id)"><p class="limit"  style="overflow:hidden;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;word-break:break-all;">{{item.text}}</p></div>
          <div style="display:flex;width:100%;justify-content: space-between;">
            <p class="time">{{item.time}}</p>
            <div class="time" @click="play(id)">语音播报
              <img v-if="item.play" src="../common/assets/icon-overview.png/Pause@2x.png" align="absmiddle" alt="" >
              <img v-else src="../common/assets/icon-overview.png/Play@2x.png" align="absmiddle" alt="" >
            </div>
          </div>
          <HR width="100%" :style="{display:item.end}" color=#eaeaea SIZE=1 class="hr"/>
        </div>
      </div>
    </div>
    <!-- <p class="tip">上拉加载更多</p> -->
    <tabbar @touchmove.prevent></tabbar>
    <loading v-model="showLoading" ></loading>
  </div>
</template>

<script>
import Loading from '../../node_modules/vux/src/components/loading/index'
import Header from '../components/header'
import tabbar from '../components/tabbar'
export default {
  components: {
    tabbar,
    Header,
    Loading
  },
  data () {
    return {
      showLoading: true,
      HeaderMes: {
        title: '智能简报'
      },
      report_list: [],
      audio_path: ''
    }
  },
  mounted: function () {
    this.getReportList()
  },
  methods: {
    getReportList () {
      this.axios.get(this.linkPrefix + '/aireport_api/ai_report_list')
        .then(response => {
          this.report_list = response.data.report_list
          this.showLoading = false
        })
    },
    play (index) {
      let audio = document.querySelector('#audioBoxList')
      if (this.report_list[index].play) {
        audio.pause()
      } else {
        if (this.$refs.audio.src !== 'http://61.135.195.37:82/common/' + this.report_list[index].audio_path) {
          this.$refs.audio.src = 'http://61.135.195.37:82/common/' + this.report_list[index].audio_path
        }
        audio.play()
        for (var i = 0; i < this.report_list.length; i++) {
          if (i !== index && this.report_list[i].play) {
            this.$set(this.report_list[i], 'play', !this.report_list[i].play)
          }
        }
      }
      this.$set(this.report_list[index], 'play', !this.report_list[index].play)
    },
    jump (data) {
      this.axios.get(this.linkPrefix + '/users_api/check_login_state')
        .then(response => {
          if (response.data.flag) {
            this.$router.push({path: this.report_list[data].type, query: {report_date: this.report_list[data].report_date, report_type: this.report_list[data].report_type}})
          } else {
            this.$router.push({path: '/L', query: {tologin: 1}})
          }
        })
    }
  }
}
</script>

<style scoped>
.contain_logo{
  width: 100%;
  height: 4.32rem;
  background-color: #101e73;
  padding-top: 1.226667rem;
}
.logo{
  display: flex;
}
.logo_img{
  margin: 1.493333rem 0 1.493333rem 1.04rem
}
.contains_bodys{
  margin-bottom:1.733333rem
}
.contain_bodys{
  padding:.32rem .32rem 0;
  -webkit-tap-highlight-color: rgba(240,240,240,0);
}
.contain_body{
  display:flex;
  justify-content:space-between;
}
.logo_text{
  width:5.466667rem;
  height: .64rem;
  color:#ffffff;
  line-height:.586667rem;
  font-size: .426667rem;
  margin: 1.813333rem 1.2rem 1.813333rem .32rem;
}
.title{
  width: 4.16rem;
  height: .64rem;
  font-size: .426667rem;
  height: .586667rem;
}
.time{
  font-size: .32rem;
  line-height: .453333rem;
  padding-top: .266667rem;
  padding-bottom: .213333rem;
  color:#999999;
}
.time img{
  width: .373333rem;
  margin-bottom: .046667rem;
}
.limit{
  color:#999999;
  padding-top: .16rem;
  font-size: .373333rem;
  line-height: .533333rem;
  width: 100%;
  text-align: justify;
}
.label{
  float: right;
  width: 1.173333rem;
  height: .533333rem;
  background-color: #ff0000;
  text-align: center;
  line-height: .533333rem;
  color: #ffffff;
}
.tip{
  width:100%;
  text-align:center;
  padding:.266667rem 0;
  color:#9a9a9a
}
</style>
