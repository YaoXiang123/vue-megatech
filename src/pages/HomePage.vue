<template>
  <div style="overflow:hidden;background-color: #ffffff;" id="homepage">
    <div style="margin-bottom: 2rem;">
      <search :search="search" @jump="jump('/sp')"></search>
      <div class="text-container" @click="jump('/MS')" v-if="arr && arr.length > 0">
        <transition class="logo-container" name="slide" mode="out-in">
          <div class="logo" :key="text.id">{{text.type}}</div>
        </transition>
        <transition class="inner-container" name="slide" mode="out-in">
          <div class="transText" :key="text.id">{{text.val}}</div>
        </transition>
      </div>
      <hr class="hr">
      <div v-if="m_index > 0">
        <p class="title" style="padding-top:.64rem" >今日Mega投资指数&nbsp; <img src="../common/assets/icon-common.png/homeExplain.png" style="width:.45rem;padding-bottom:.083333rem;" alt="" align="absmiddle" @click="alert"></p>
        <div class="wave" data-top="40"></div>
        <div class="waveMain" >
          <!--<p  style="font-size:.32rem;line-height:.666667rem;color:#ffffff;"><font style="font-size:.32rem;line-height:.666667rem;color:#ffffff;" v-if="m_index_chg > 0">+</font><countup :end-val="this.m_index_chg" :duration="2" :decimals="2"></countup>%</p>-->
          <p style="font-size:.64rem;line-height:.666667rem;color:#ffffff;font-weight:600"><countup :end-val="this.m_index" :duration="2" :decimals="0"></countup></p>
        </div>
        <!--<div class="waveSub"><Rater disabled v-model="m_index_star"></Rater></div>-->
      </div>
      <div class="waveSub" v-if="m_index > 0"><Rater disabled v-model="m_index_star"></Rater></div>
      <p class="rater_explain">{{this.operation}}</p>
      <hr class="hr" style="margin-top:.365333rem;" />
      <div class="Div">
        <ul>
            <li>
                <p>上证指数</p>
                <p >2641.11</p>
                <p>-24.32  -0.91%</p>
            </li>
            <li>
                <p>深证成指</p>
                <p style="color: #D0021B;">2641.11</p>
                <p style="color: #D0021B;">-24.32  -0.91%</p>
            </li>
            <li>
                <p>创业板指</p>
                <p>2641.11</p>
                <p>-24.32  -0.91%</p>
            </li>
        </ul>
      </div>
      <hr class="hr" style="margin-top:.365333rem;" />
      <div class="ph">
        <span style="margin-left:.5rem; font-size: 16px;color: #000000;
                    letter-spacing: -0.39px;">Mega板块排行
        </span>
        <span style=" font-size: 12px;color: #999999;letter-spacing: -0.29px;"> 根据板块利好程度排名
        </span>
        <span style="float:right;color: #999999;margin-right:.5rem;">更多></span>
         <ul>
            <li>
                <p>1</p>
                <p>工程建设</p>
                <p>+3.25% </p>
                 <p>Mega评级</p>
                 <Rater :font-size="16" disabled v-model="m_index_star"></Rater>
                <!-- <div class="st" v-if="m_index > 0"><Rater disabled v-model="m_index_star"></Rater></div> -->
            </li>
            <li>
                <p>2</p>
                <p>金融</p>
                <p>+2.25% </p>
                 <p>Mega评级</p>
                 <Rater :font-size="16" disabled v-model="m_index_star"></Rater>
            </li>
            <li>
                <p>3</p>
                <p>房地产</p>
                <p>+1.25% </p>
                 <p>Mega评级</p>
                 <Rater :font-size="16" disabled v-model="m_index_star"></Rater>
            </li>
        </ul>
      </div >
       <hr class="hr" style="margin-top:.365333rem;" />
      <div style="margin:.7rem 0;">
        <span style="margin-left:.5rem; font-size: 16px;color: #000000;
                    letter-spacing: -0.39px;">Mega个股排行
        </span>
        <span style=" font-size: 12px;color: #999999;letter-spacing: -0.29px;"> 从不同维度数据挖掘有价值个股
        </span>
      </div>
      <div class="gp">
      <ul>
          <li class="active">Mega指数</li>
          <li>利好飙升</li>
          <li>机构关注</li>
          <li>用户关注</li>
      </ul>
      </div>



      <div>
      
       <!-- e-chart图 11.19注
        <p class="title" style="padding-bottom:.426667rem">今日Mega板块利好排行</p>
        <div>
          <plite-chart></plite-chart>
              <div class="gauge_explain">
                <div class="gauge_logo"><div  style="backgroundColor:#ff3b2e"></div><font>前三名</font></div>
                <div class="gauge_logo"><div  style="backgroundColor:#4cda5f"></div><font>后三名</font></div>
                
              </div>
          <hr class="hr">
        </div>
        -->

        <div v-if="stocklist && stocklist.length > 0">
          <p class="title" >大家都在关注 &nbsp;<a href="/tb" style="text-decoration : none;color: #999999;">>></a></p>
          <div style="display:flex;justify-content:space-around;padding-top: .426667rem;">
            <div v-for="(item,id) in stocklist" :key="id" @click="ToIndividual(id)">
              <p style="text-align:center; padding-bottom:.266667rem;font-size:.373333rem;color:#333333">{{item.stockname}}</p>
              <p style="text-align:center; padding-bottom:.266667rem;font-size:.373333rem;color:#333333;color:#ff3b2e" :style="{color:item.color}">{{item.change}}</p>
              <Rater v-model="item.star" disabled :font-size="15"></Rater>
            </div>
          </div>
        </div>
        <hr class="hr" style="margin-top:.408rem;">
        <div>
          <p class="title">今日热点</p>
          <div ></div>
          <div class="hot_contain" v-if="hot">
            <div v-for="(item, index) in hot" :key="index">
              <div class="hot" @click="hotWord(index)">
                <div style="overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1; "><font :class="{color:index<4, blue:index>=4}">{{index+1}}</font> {{item.word}}</div>
                <img v-if="hot && item.sentiment === 1" src="../common/assets/icon-homepage.png/画板 2@2x-8.png" align="absmiddle" alt="">
                <img v-else-if="hot && item.img===0" src="../common/assets/icon-homepage.png/画板 3@2x-8.png" align="absmiddle" alt="">
                <img v-else src="../common/assets/icon-homepage.png/画板 4@2x-8.png" align="absmiddle" alt="">
              </div>
            </div>
          </div>
          <!-- <word-cloud :stockcode="stockcode"></word-cloud> -->
        </div>
      </div>
    </div>
    <tabbar></tabbar>
    <div class="alert"><alert v-model="showAlert" :content="Alertconteng"></alert></div>
  </div>
</template>

<script>
import Alert from '../../node_modules/vux/src/components/alert/index'
import pliteChart from '@/components/echarts/plite/echart'
import Rater from '../../node_modules/vux/src/components/rater/index'
import Countup from '../../node_modules/vux/src/components/countup/index'
import wordCloud from '@/components/wordCloud'
import search from '../components/search'
import tabbar from '../components/tabbar'
// import html2canvas from 'html2canvas'
// import Canvas2Image from 'canvas2image'
// let interval
// let intervalhq
let intervalnews
export default {
  components: {
    search,
    Rater,
    wordCloud,
    tabbar,
    pliteChart,
    Countup,
    Alert
  },
  data () {
    return {
      Alertconteng: 'Mega投资指数是基于海量实时新闻、重大事件、公告、和全球股市行情数据，通过深度学习进行语义情感分析、非线性加权算法综合计算而得出的结果。该指数的范围为0-100，每个交易日09:20、12:50更新数据。该数据仅供参考，不作为投资建议，市场有风险，投资需谨慎。',
      showAlert: false,
      hot: [{title: '京山轻机京山生态', img: 1}, {title: '京山轻机生态圈', img: 1}, {title: '京山轻机生态圈', img: 1}, {title: '京山轻机生态圈', img: 1}, {title: '京山轻机京山生态圈', img: 2}, {title: '京山轻机生态圈', img: 2}, {title: '京山轻机生态圈', img: 2}, {title: '京山轻京山机生态圈', img: 1}],
      color: '#4cda5f',
      arr: [],
      type: [
        '快报',
        '快报'
      ],
      number: 0,
      ss: 5,
      num: 6,
      operation: '',
      m_index: 0,
      m_index_chg: 0,
      m_index_star: 0,
      sectorlist: [],
      stocklist: [],
      stockcode: 'homepage',
      individual: [],
      width: '200px',
      search: {
        remove: true
      },
      star: 3.5,
      total: '1502.36',
      chg: '+5.20%'
      // m_index_chg: ''
    }
  },
  computed: {
    text () {
      return {
        id: this.number,
        val: this.arr[this.number],
        type: this.type[this.number]
      }
    }
  },
  mounted: function () {
    if (this.isweixin) {
      if (this.$route.query.state === 'b') {
        this.userLogin()
      } else {
        this.checkLoginState()
      }
    }
    this.get_mIndex()
    this.get_stock()
    this.startMove()
    this.getNews()
    this.getHQ()
    this.get_wordcloud()
    // interval = setInterval(this.get_mIndex, 3000)
    intervalnews = setInterval(this.getNews, 10000)
    // this.timeNow()
    // setTimeout(() => {
    //   this.toPng()
    // }, 3000)
  },
  destroyed: function () {
    // clearInterval(interval)
    // clearInterval(intervalhq)
    clearInterval(intervalnews)
  },
  methods: {
    get_wordcloud () {
      this.axios.get(this.linkPrefix + '/stocks_api/wordcloud', {
        params: {
          stockcode: 'homepage'
        }
      })
        .then(response => {
          this.hot = response.data.wordcloud
        })
    },
    hotWord (index) {
      console.log(index)
      this.$router.push({path: '/MT', query: {'url': this.hot[index].url}})
    },
    alert () {
      this.showAlert = true
    },
    // 检查是否登录
    checkLoginState () {
      this.axios.get(this.linkPrefix + '/users_api/check_login_state')
        .then(response => {
          if (response.data.flag === 1 && response.data.userInfo) {
            this.userinfo = response.data.userInfo
            this.ownerAvatarUrl = this.userinfo.headimgurl
            this.get_history()
          } else {
            window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + response.data.appid + '&redirect_uri=' + location.href.split('?')[0] + '&response_type=code&scope=snsapi_userinfo&state=b#wechat_redirect'
          }
        })
    },
    userLogin () {
      this.axios.get(this.linkPrefix + '/users_api/weixin_user_login', {
        params: {
          code: this.$route.query.code
        }
      })
        .then(response => {
          if (response.data.userInfo) {
            this.userinfo = response.data.userInfo
            this.ownerAvatarUrl = this.userinfo.headimgurl
            this.get_history()
          } else {
            console.log('login failed')
          }
        })
    },
    // toPng () {
    //   let dom = document.body
    //   html2canvas(dom).then(
    //     function (canvas) {
    //       Canvas2Image.saveAsImage(canvas)
    //       // canvas.toDataURL('img/png')
    //     }
    //   )
    // },
    // timeNow () {
    //   let that = this
    //   let myDate = new Date()
    //   let hour = myDate.getHours()
    //   setInterval(function () {
    //     if (hour === 11 || hour === 18) {
    //       that.getHQ()
    //     }
    //   }, 6000)
    // },
    getHQ () {
      let u = ''
      if (!this.stocklist) {
        return
      }
      if (this.stocklist.length === 0) {
        return
      }
      this.stocklist.map(function (value) {
        u += `s_${value.stockcode1},`
      })
      u = u.toLocaleLowerCase()
      this.axios.get(this.linkPrefix + '/stocks_api/stock_hq', {
        params: {
          stocks: u
        }
      })
        .then(response => {
          if (response.data.stock_price && response.data.stock_price.length === this.stocklist.length) {
            this.stocklist.map(function (value, i) {
              if (value.stockcode === response.data.stock_price[i].stockcode) {
                value = Object.assign(value, response.data.stock_price[i])
              }
            })
          }
        })
    },
    getNews () {
      this.axios.get(this.linkPrefix + '/message_api/news_homepage')
        .then(response => {
          this.arr = response.data.list
        })
    },
    // 上下轮播图
    startMove () {
      setTimeout(() => {
        if (this.number === 1) {
          this.number = 0
        } else {
          this.number += 1
        }
        this.startMove()
      }, 3000)
    },
    get_mIndex () {
      this.axios.get(this.linkPrefix + '/homepage_api/market_info_index')
        .then(response => {
          this.m_index = response.data.m_index
          this.m_index_chg = response.data.m_index_chg
          this.m_index_star = response.data.m_index_star
          this.operation = response.data.current_MII.operation
        })
    },
    get_stock () {
      this.axios.get(this.linkPrefix + '/homepage_api/individual_info_index')
        .then(response => {
          this.stocklist = response.data.stocklist
          this.getHQ()
        })
    },
    ToIndividual (data) {
      this.$router.push({path: '/news/' + this.stocklist[data].stockcode})
    },
    jump (data) {
      this.$router.push({path: data})
    }
  }
}
</script>

<style scoped>
ul li{
    float:left;
   list-style:none;
}   
.active{
   font-size: 14px;
   letter-spacing: -0.02125rem;
   position:relative;
  /* border-bottom:.08rem solid #000;*/
}
.active::after{
    content:"";
    margin-top:.5rem;
    width:0.6rem;
    height:.08rem;
    background:#000;
    bottom:-10px;
    left:.86rem;
    position:absolute;;
}
.rater_explain{
  width: 100%;
  text-align: center;
  margin-top: .1rem;
  font-size: .373333rem;
  color: #999999;
}
.Div{
    width:100%;
    height:2.2rem;
  
    display: flex; 
    justify-content: space-around; 
    padding-top: 0.426667rem;
}
.Div ul li{
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #666666;
    letter-spacing: .013125rem;
    text-align:center;
   
    margin-left:..55rem;
    float:left;
    width:3.1rem;
    height:2.64rem;
  /* background:#ccc;*/
}
.Div ul li p,
.ph ul{
    line-height:.8rem;
}
.Div ul li p:nth-of-type(2){
    font-size: 18px;
    color: #7ED321;
    letter-spacing: .02rem;
}
.Div ul li p:nth-of-type(3){
    color: #7ED321;
    letter-spacing: .02rem;
}
.ph{
    margin-top:.566rem;
    width:100%;
    height:5.5444rem;
   /* background:pink;*/
    
}
.ph ul{
    margin-top:.5866rem;
    display: flex;
    text-align:center; 
    justify-content: space-around; 
}
.ph ul li p:nth-of-type(1){
    font-size: 16px;
    color: #F5A623;
    letter-spacing: -0.024375rem;
    text-align: center;
}
.ph ul li p:nth-of-type(2){
    font-size: 14px;
    letter-spacing: -0.02125rem;
}
.ph ul li p:nth-of-type(3){
   font-size: 14px;
    color: #D0021B;
    letter-spacing: -0.02125rem ;
}
.ph ul li p:nth-of-type(4){
 font-size: 12px;
color: #999999;
letter-spacing: -0.018125rem;
}
/*
.ph ul .st{
    font-size:12px;
}
*/
.gp ul{
    width:100%;
    height:1rem;
    display: flex;
    text-align:center; 
    line-height:1rem;
    justify-content: space-around; 
}
.gp ul li{
    width:2.33rem;
    height:.93rem;
   /* background:red;*/
}
.wave {
  position: relative;
  width: 2.666667rem;
  height: 2.666667rem;
  background-color:#004799;
  border-radius: 50%;
  overflow:hidden;
  top:.32rem;
  left: 3.68rem;
}
.wave::before,wave::after{
  --gap: this.ss;
  content: "";
  position: absolute;
  width: 5.333333rem;
  height: 5.333333rem;
  top: calc(var(--gap) * 1px);
  left: 50%;
  background-color: #ffffff;
  opacity: .3;
  border-radius: 45%;
  transform: translate(-50%, -70%) rotate(0);
  animation: rotate 6s linear infinite;
  z-index: 10;
}
.wave::after {
  border-radius: 47%;
  background-color: #004899;
  transform: translate(-50%, -70%) rotate(0);
  animation: rotate 10s linear -5s infinite;
  z-index: 20;
}
@keyframes rotate {
    50% {
        transform: translate(-50%, -73%) rotate(180deg);
    } 100% {
        transform: translate(-50%, -70%) rotate(360deg);
    }
}
.title{
  font-size: .426667rem;
  line-height: .586667rem;
  font-family:Arial, Helvetica, sans-serif;
  width: 100%;
  text-align: center;
  padding-top:.533333rem;
}
.waveSub{
  /* margin: -1.013333rem 0 0 5.653333rem; */
  width: 100%;
  text-align: center;
  margin-top: 1.5rem;
}
.waveMain{
  position: relative;
  margin-top: -1.68rem;
  width: 100%;
  text-align: center;
}
.chart /deep/ canvas{
  width: 100%;
  height: 5.333333rem;
}
.hr{
  border:.013333rem dashed #f2f2f2;
}
.text-container {
  display: flex;
  width: 100%;
  height: .96rem;
  margin: .266667rem auto;
  overflow: hidden;
}
.slide-enter-active, .slide-leave-active {
  transition: all .5s linear;
}
.slide-leave-to {
  transform: translateY(-.533333rem);
}
.slide-enter {
  transform: translateY(.533333rem);
}
.transText{
  margin-left:.106667rem;
  padding-top:.266667rem;
  font-size: .373333rem;
  line-height: .48rem;
  width: 8.16rem;
  height: .48rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  word-break: break-all;
}
.logo-container{
  width: 10%;
}
.inner-container{
  width: 90%;
}
.logo{
  padding: .04rem .053333rem .106667rem .08rem;
  width: .761333rem;
  height: .402667rem;
  background-color: #f2f2f2;
  margin: .2rem 0 0 .266667rem;
  color:#d0021b;
  border-radius: .053333rem;
  text-align: center;
}
.gauge_explain{
  display: flex;
  width: 3rem;
  position: relative;
  bottom: 4.8rem;
  left: 6.8rem;
}
.gauge_logo{
  display: flex;
  width: 1.3rem;
}
.gauge_logo div{
  width: .16rem;
  height: .08rem;
  margin-top: .186667rem;
  margin-right: .053333rem;
}
.gauge_logo font{
  font-size: .293333rem;
  color: #999999
}
.hot{
  display: flex;
  font-size: .373333rem;
  color:#333333;
  /* margin-left: .2566667rem;*/
  margin-top: .48rem;
  width: 4.46rem;
  justify-content: space-between;
}

.hot font {
  margin-right: .036667rem;
  line-height: .48rem;
}
.hot img{
  margin-top: .083333rem;
  width: .4rem;
  height: .4rem;
  margin-left: .32rem;
}
.hot_contain{
  display: flex;
  flex-wrap:wrap;
  justify-content: space-between;
  margin-top: .053333rem;
  margin: 0 .32rem;
}
.color{
  color:#f96262;
  font-weight: 600;
}
.blue{
  color: #748fff;
}
.alert /deep/ .weui-dialog__bd{
  font-size: .373333rem;
  text-align: justify;
  line-height: .586667rem;
  color: #333333;
}
.alert /deep/ .weui-dialog__btn_primary{
  color: #004799;
}
</style>
