<template>
  <div style="background-color:#f2f2f2;width:10rem">
    <Header :HeaderMes="HeaderMes" style="margin-top: -.174rem;"></Header>
    <div style="padding-top:1rem;padding-bottom:.986667rem;">
      <div>
        <div>
          <div class="index" v-if="hangqing.color">
            <div style="  display: flex;justify-content: space-between;">
              <div class="data">
                <span :style="{color:hangqing.color}">{{hangqing.price}}</span><p :style="{color:hangqing.color}">{{hangqing.chg}}&nbsp;&nbsp;{{hangqing.pchg}}</p>
              </div>
              <div class="index_p">
                <p class="dataP"><span class="span">高 <font style="color:#fd4243">{{hangqing.gao}}</font></span><span>开 <font style="color:#fd4243">{{hangqing.kai}}</font></span><span>量 {{hangqing.liang}}</span> </p>
                <p class="dataP"><span>低 <font style="color:#00b251">{{hangqing.di}}</font></span><span>换 {{hangqing.huan}}</span><span>额 {{hangqing.e}}</span> </p>
              </div>
            </div>
          </div>
          <div class="market">
            <p class="title">市场观点</p>
            <div style="text-align:center;font-size:.373333rem">
              <p>({{sectorInfo.sector}}板块关注度排名<font style="color:#fea42d">第{{sectorInfo.rank}}位</font>)</p>
            </div>
            <div class="barChats">
              <div class="barChat">
                <div class="barChat_outer">{{bad_percent}}%
                  <div class="barChat_inner" :style="{width:percent + '%'}"><div>{{percent}}%</div></div>
                </div>
              </div>
            </div>
            <div class="barChat_title">
              <div>看多</div>
              <div>看空</div>
            </div>
          </div>
          <div class="echart" v-if="sentiment.success">
            <div class="title">实时热度 <echart :stockcode="stockcode"/></div>
            <div class="title" >信息汇总<gauge v-bind:sentiment="sentiment"/>
              <div class="gauge_explain">
                <div class="gauge_logo"><div  style="backgroundColor:red"></div><font>利好</font></div>
                <div class="gauge_logo"><div  style="backgroundColor:green"></div><font>利空</font></div>
                <div class="gauge_logo"><div  style="backgroundColor:#f5b183"></div><font>维持</font></div>
              </div>
            </div>
          </div>
            <div>
              <div class="plate"  v-show="sectors.length > 0">
                <p class="title">所属板块</p>
                <x-table ref="sub" :cell-bordered="false" style="margin: auto;">
                  <thead>
                    <tr class="tr">
                      <th>板块</th>
                      <th>涨跌幅</th>
                      <th>周</th>
                      <th>月</th>
                      <th>年</th>
                    </tr>
                  </thead>
                  <tbody v-for="(item,id) in sectors" :key="id" >
                    <tr class="tr" :style="{borderBottom:item.dead}">
                      <td @click="Topolite(id)">{{item.name}}</td>
                      <td :style="{color:item.numcolor}">{{item.num}}</td>
                      <td :style="{color:item.weekcolor}" >{{item.week}}</td>
                      <td :style="{color:item.monthcolor}">{{item.month}}</td>
                      <td :style="{color:item.yearcolor}">{{item.year}}</td>
                    </tr>
                  </tbody>
                </x-table>
              </div>
            </div>
          <div class="wordCloud">
            <p class="title">今日关键词</p>
            <word-cloud :stockcode="stockcode"></word-cloud>
          </div>
        </div>
        <div  class="sub" >
          <sticky :offset="37.5" ref="sticky">
            <nav-bar :navbarItemProps="navbarItem" :Selected="navbarSelected" @clickItem="clickItemChange"></nav-bar>
          </sticky>
          <div class="content">
        <div class="swiper-container swiper_con">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,index) in list" :key="index">
            <keep-alive>
              <component :is="item.component"></component>
            </keep-alive>
            </div>
          </div>
        </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div style="display: flex;width: 9.226667rem;justify-content: space-between;align-items: center;">
        <div style="vertical-align:middle;"><img src="../../common/image/relay.png" style="width: .6rem;" align="absmiddle"><span style="color:#999999;font-size:.373333rem"> 转发</span></div>
        <div>
          <div class="optional" @click="addShare" v-if='isFocused===0'>加自选</div>
          <div class="optional" style="backgroundColor:#cccccc" v-else>已加自选</div>
        </div>
      </div>
    </div>
      <div class="toast">
        <toast v-model="showToast" type="text" width="4rem" :time="2200" is-show-mask :text="toastText" :position="position"></toast>
      </div>
    <!-- <loading v-model="showLoading" ></loading> -->
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import XTable from '../../../node_modules/vux/src/components/x-table/index'
import Tab from '../../../node_modules/vux/src/components/tab/tab'
import TabItem from '../../../node_modules/vux/src/components/tab/tab-item'
import Loading from '../../../node_modules/vux/src/components/loading/index'
import Sticky from '../../../node_modules/vux/src/components/sticky/index'
import Toast from '../../../node_modules/vux/src/components/toast/index'
import navBar from '@/components/navbar'
import news from './sharSub/news'
import report from './sharSub/report'
import comment from './sharSub/comment'
import ripple from '@/components/ripple'
import Header from '@/components/header'
import wordCloud from '@/components/wordCloud'
import echart from '@/components/echarts/lineEchart/echart'
import gauge from '@/components/echarts/gauge/gauge'
let interval
export default {
  components: {
    Header,
    wordCloud,
    XTable,
    Tab,
    TabItem,
    echart,
    gauge,
    Loading,
    Sticky,
    Toast,
    ripple,
    navBar,
    news,
    report,
    comment
  },
  data () {
    return {
      mySwiper: null,
      list: [
        {path: '/news/:stockcode', component: news},
        {path: '/report/:stockcode', component: report},
        {path: '/comment/:stockcode', component: comment}
      ],
      toastText: '已添加',
      navbarSelected: 0,
      showToast: false,
      position: 'bottom',
      data1: ['news'],
      data2: ['report'],
      data3: ['comment'],
      labelText: ['人工智能', '放量上涨', '龙头'],
      sentiment: {},
      isFocused: 0,
      wordCloud: [],
      showLoading: false,
      hangqing: {},
      stockcode: this.$route.params.stockcode,
      HeaderMes: {
        num: this.$route.params.stockcode,
        search: true,
        type: 1
      },
      sectorInfo: {},
      sectors: [],
      plate: '生物医药',
      ranking: '6',
      percent: 50,
      bad_percent: 50,
      transitionName: 'slide-left',
      navbarItem: [
        {
          title: '相关新闻'
        },
        {
          title: '券商研报'
        },
        {
          title: '大v点评'
        }
      ]
    }
  },
  watch: {
  },
  beforecreate () {
    this.showLoading = true
  },
  created: function () {
    interval = setInterval(this.getHangqing, 5000)
    this.showLoading = false
  },
  mounted: function () {
    this.focuse()
    this.getSectorRank()
    this.getSectorIndex()
    this.getHangqing()
    this.getStockSenti()
    this.getStockDaySenti()
    this.swiper()
    setTimeout(() => {
      this.mySwiper.activeIndex = 0
      this.clickItemChange(this.navbarSelected)
    }, 200)
  },
  destroyed: function () {
    clearInterval(interval)
  },
  methods: {
    // 组件跳转选项卡随之变化
    clickItemChange (index) {
      this.mySwiper.activeIndex = index
      this.mySwiper.slideTo(index, 1000, false)
    },
    // swiper实例化
    swiper () {
      let that = this
      that.mySwiper = new Swiper('.swiper-container', {
        initialSlide: 0,
        speed: 500,
        autoHeight: true,
        on: {
          slideChangeTransitionEnd: function () {
            that.$data.navbarSelected = this.activeIndex
          }
        },
        onSlideChangeStart: function () {
          that.nowIndex = that.mySwiper.activeIndex
        }
      })
    },
    getStockDaySenti () {
      this.axios.get(this.linkPrefix + '/stocks_api/stock_sentiment', {
        params: {
          stockcode: this.$route.params.stockcode
        }
      })
        .then(response => {
          this.sentiment = response.data
          this.mySwiper.activeIndex = 0
          this.clickItemChange(this.navbarSelected)
        })
    },
    Topolite (data) {
      this.$router.push({path: '/pt?sector=' + this.sectors[data].name})
    },
    addShare (stockcode) {
      this.axios.get(this.linkPrefix + '/stocks_api/add_user_stock', {
        params: {
          stockcode: this.$route.params.stockcode
        }
      })
        .then(response => {
          if (response.data.not_login) {
            this.$router.push({path: '/L', query: {tologin: 1}})
          } else {
            this.isFocused = 1
            this.showToast = true
          }
        })
    },
    focuse () {
      this.axios.get(this.linkPrefix + '/stocks_api/is_focused', {
        params: {
          stockcode: this.$route.params.stockcode
        }
      })
        .then(response => {
          if (response.data.focused) {
            this.isFocused = 1
          } else {
            this.isFocused = 0
          }
        })
    },
    getSectorRank () {
      this.axios.get(this.linkPrefix + '/stocks_api/stock_rank_in_sector', {
        params: {
          stockcode: this.$route.params.stockcode
        }
      })
        .then(response => {
          this.sectorInfo['sector'] = response.data.sector
          this.sectorInfo['rank'] = response.data.rank
        })
    },
    getHangqing () {
      if (this.$route.params.stockcode) {
        this.axios.get(this.linkPrefix + '/stocks_api/stock_price', {
          params: {
            stockcode: this.$route.params.stockcode
          }
        })
          .then(response => {
            if (response.data.flag === 1) {
              this.hangqing = response.data.hangqing
            }
          })
      }
    },
    getSectorIndex () {
      this.axios.get(this.linkPrefix + '/stocks_api/stock_sectors', {
        params: {
          stockcode: this.$route.params.stockcode
        }
      })
        .then(response => {
          this.sectors = response.data.sectors
          this.$refs.sticky.bindSticky()
        })
    },
    getStockSenti () {
      this.axios.get(this.linkPrefix + '/stocks_api/stock_info', {
        params: {
          stockcode: this.$route.params.stockcode
        }
      })
        .then(response => {
          this.percent = response.data.stock_info.good * 100
          this.percent = this.percent.toFixed(2)
          this.bad_percent = (100 - this.percent).toFixed(2)
        })
    },
    jump (data) {
      this.$router.replace({path: '/' + data + '/' + this.$route.params.stockcode})
    }
  }
}
</script>

<style scoped>
.swiper_con{
  width:100%;
  position:relative;
}
.contain /deep/ .vux-tab .vux-tab-item{
  background: none;
}
.toast /deep/ .weui-toast.vux-toast-bottom {
  bottom: 1.333333rem
}
td{
  font-size:.373333rem
}
.index,.wordCloud,.plate,.sub,.market,.echart{
  width: 100%;
  background-color:#ffffff;
}
.index{
  height: 2rem;
}
.echart{
  height: 10.88rem;
  margin-top: .24rem;
}
.label{
  border: .026667rem solid #4f8bff;
  border-radius: .1rem;
  padding: .026667rem .106667rem;
  margin-left: .3733333333rem;
}
.label_cotainer{
  display: flex;
  justify-content: flex-start;
}
.wordCloud{
  height: 3.893333rem;
  margin-top: .24rem;
}
.content{
  margin-bottom: .3rem;
}
.market{
  height: 2.466667rem;
  margin-top: .24rem;
}
.plate,.sub{
  margin-top: .24rem;
}
.data{
  display: flex;
  flex-direction: column;
  width: 1.86666667rem;
  height: 1.467777777rem;
  padding-left: .3733333333rem;
  padding-top: .3rem;
}
.data span,.data p{
  color:#fd4341;
  font-size: .373333rem;
  font-weight: 600;
}
.data span{
  text-align:center;
  font-size: .8rem;
}
.dataP span{
  width: 2.133333rem;
}
.index_p p{
  width:6.9rem;
  padding-top: .3rem;
  padding-bottom: .2rem;
  display: flex;
  justify-content: space-around;
  margin-left: .5rem;
}
.tr{
  border-bottom: .026667rem solid #f2f2f2;
  color:#999999;
}
tr td::before,tr th::before,table.vux-table.vux-table-no-cell-bordered::after{
  display: none;
}
.hr {
  margin-left: .5rem;
}
.barChats{
  display: flex;
  justify-content: space-around;
  padding-top: .106667rem;
  font-weight: bold;
}
.barChat{
  width: 9.066667rem;
  box-sizing: border-box;
}
.barChat_outer,.barChat_inner{
  color:#ffffff
}
.barChat_outer{
  background-color: #00b150;
  overflow: hidden;
  position: relative;
  vertical-align: middle;
  height: .4rem;
  padding-left: 6.8rem;
  text-align: right;
}
.barChat_inner{
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  text-align: left;
  line-height: 1;
  background-color: #fe0100;
}
.barChat_title{
  width: 9.066667rem;
  display: flex;
  justify-content: space-between;
  margin-left: .466667rem;
}
.title{
  padding:.3rem .5rem 0 .5rem;
  font-size: .453333rem;
}
.switch-bar /deep/ .vux-tab-bar-inner {
  border-radius: 25%;
  margin-top: -.13rem;
}
.footer{
  z-index: 100;
  display:flex;
  justify-content:space-around;
  height: 1.28rem;
  position: fixed;
  width: 100%;
  background-color: #ffffff;
  bottom: 0;
  border-top: .013333rem solid #f2f2f2;
}
.optional{
  width: 2.346667rem;
  height: .853333rem;
  line-height: .853333rem;
  text-align: center;
  background-color: red;
  color: #ffffff;
  border-radius: .1rem;
  font-size: .426667rem;
}
.gauge_explain{
  display: flex;
  width: 3rem;
  position: relative;
  bottom: 4.8rem;
  left: 6.266667rem;
}
.gauge_logo{
  display: flex;
  width: 1rem;
}
.gauge_logo div{
  width: .16rem;
  height: .08rem;
  margin-top: .186667rem;
  margin-right: .053333rem;
  margin-right: .053333rem;
}
.gauge_logo font{
  font-size: .293333rem;
  color: #999999
}
</style>
