<template>
  <div class="body">
  <HR color=#eaeaea SIZE=1 />
    <div ref="mescroll" class="mescroll">
      <div>
        <div class="d_jump"></div>
        <div v-for="(item,index) in dataList" :key="index">
          <transition name="fade">
            <div class="tip" v-if="tip && index < 1">本次为您精选{{times}}篇文章</div>
          </transition>
          <transition name="fade">
            <div class="tip" v-if="notip && index < 1">暂无最新数据</div>
          </transition>
          <div class="nodata" v-if=" times - 1 < index &&  index < times + 1 && nodata">
              <div>上次已阅读到这里</div>
              <div style="color:#00003F;margin-left:.2rem" @click="refresh"> 刷新</div>
          </div>
          <div class="container" @click="Tonews(index)">
            <span class="main_title" style="  overflow: hidden;display: -webkit-box;-webkit-line-clamp: 4;-webkit-box-orient: vertical;word-break: break-all;">
            {{item.text}}</span>
          </div>
          <span class="labelText"><div class="label" v-for="(label,id) in item.labels" :key="id" @click="labelTonews(label.stockcode)">{{label.name}} <font :style={color:label.color} > {{label.num}}</font></div></span>
          <div class="main_source">
            <p>{{item.source}}</p><p>{{item.time}}</p><p>阅读{{item.readnum}}</p>
          </div>
          <HR width="90%" color=#eaeaea SIZE=1 class="hr"/>
        </div>
      </div>
    </div>
    <loading v-model="showLoading" >
    </loading>
  </div>
</template>
<script>
import { mixin } from '../../../common/js/mescroll.js'
import Loading from '../../../../node_modules/vux/src/components/loading/index'
export default {
  mixins: [mixin],
  components: {
    Loading
  },
  data () {
    return {
      notip: false,
      times: '',
      nodata: false,
      tip: false,
      dataList: [],
      dataTime: '2018-08-06 星期一',
      newsList: [],
      refreshtime: '',
      datalength: '',
      refershList: []
    }
  },
  mounted: function () {
    this.getAiNews()
  },
  methods: {
    // 下拉刷新
    downCallback (page) {
      this.axios.get(this.linkPrefix + '/message_api/pull_refersh_ai_news', {
        params: {
          nums: this.newsList.length}
      })
        .then(response => {
          if (response.data.refersh_ai_news < 1) {
            this.notip = true
          }
          if (response.data.refersh_ai_news.length > 0) {
            this.tip = true
            this.nodata = true
            this.times = response.data.refersh_ai_news.length
            this.$set(this.$data.mescroll.optDown, 'textOutOffset', '释放刷新 最后更新于' + response.data.time)
          }
          this.refershList = response.data.refersh_ai_news
          this.dataList = this.refershList.concat(this.dataList)
          this.nodata = true
          this.$nextTick(() => {
            this.refreshtime = response.data.time
            this.mescroll.endBySize(page.size, response.data.length)
          })
        })
      setTimeout(() => {
        this.tip = false
        this.notip = false
      }, 3000)
    },
    // 跳转详情页
    Tonews (data) {
      this.$router.push({path: '/MT', query: {url: this.dataList[data].url, type: this.dataList[data].type}})
    },
    // 跳转个股页
    labelTonews (stockcode) {
      if (stockcode) {
        this.$router.push({path: '/news/' + stockcode})
      }
    },
    getAiNews () {
      this.axios.get(this.linkPrefix + '/message_api/ai_news')
        .then(response => {
          if (response.data.not_login) {
            this.$router.push({path: '/L', query: {tologin: 1}})
          } else {
            this.newsList = response.data.results
            this.refreshtime = response.data.time
          }
          this.showLoading = false
          this.init()
        })
    }
  }
}
</script>

<style scoped>
.body{
  padding-top: 2.60667rem;
  background-color: #ffffff;
}
.d_jump{
  width: 100%;
}
.fade-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
   0% {
      opacity: 0;
      transform: translateY(-2000px);
   }
   80% {
      transform: translateY(-10px);
   }
   100% {
      transform: translateY(0);
   }
}
.nodata,.tip{
  width: 100%;
  height: .853333rem;
  text-align: center;
}
.nodata{
  font-size: .373333rem;
  background: #EBEBEB;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999999;
}
.tip{
  background: #F5A623;
  font-size: .32rem;
  line-height: .826667rem;
  color: #ffffff
}
.mescroll {
  position: fixed;
  top: 2.60667rem;
  bottom: 1.413333rem;
  height: auto;
  background-color: #ffffff;
}
.mescroll /deep/ .mescroll-upwarp{
  visibility:visible!important;
  min-height:0
}
.container{
  overflow:hidden;
  display:flex;
  padding-top:.293333rem;
  text-align: justify;
}
.main_title{
  font-size: .426667rem;
  line-height: .586667rem;
  float:left;
  color:#000000;
  margin:0 .32rem;
  width: 9.36rem;
}
.main_source{
  color: #999999;
  font-size: .32rem;
  line-height: .453333rem;
  display: flex;
  margin-top:.3rem;
  padding-bottom: .293333rem;
}
.main_source p{
  margin-left: .32rem;
}
.deadline{
  margin-left: 6.5rem;
}
.hr{
  margin-left: .4rem;
}
.labelText{
  display:flex;
  justify-content: flex-start;
  line-height: .693333rem;
  margin-top: .24rem;
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
.defaultPage{
  width: 100%;
  text-align: center;
  height: 1.066667rem;
  line-height: 1.28rem;
  color:#cccccc;
  font-size: .32rem;
}
</style>
