<template>
  <div style="background-color:#f2f2f2;width:10rem">
    <Header :HeaderMes="HeaderMes" style="margin-top: -.174rem;"/>
    <div style="padding-top:1.174rem">
      <div class="body">
        <div class="main">
          <!--<div class="index">-->
            <!--<div class="data">-->
              <!--<span>{{nowData}}</span><p>{{increaseData}}&nbsp;&nbsp;&nbsp;&nbsp;{{increase}}</p>-->
            <!--</div>-->
            <!--<div class="index_p">-->
              <!--<p><span>高 <span style="color:#fd4243">{{higher}}</span></span><span>开 <span style="color:#fd4243">{{begin}}</span></span><span>量 {{amount}}万</span> </p>-->
              <!--<p><span>低 <span style="color:#00b251">{{lower}}</span></span><span>换 {{changer}}</span><span>额 {{total}}亿</span> </p>-->
            <!--</div>-->
          <!--</div>-->
          <div class="wordCloud">
            <p class="title">今日关键词</p>
            <word-cloud :stockcode="sectorname"></word-cloud>
          </div>
          <div class="echart" v-if="sentiment.success">
            <div class="title">实时热度 <echart :sectorname="sectorname"/></div>
            <div class="title" >信息汇总<gauge v-bind:sentiment="sentiment"/>
              <div class="gauge_explain">
                <div class="gauge_logo"><div  style="backgroundColor:red"></div><font>利好</font></div>
                <div class="gauge_logo"><div  style="backgroundColor:green"></div><font>利空</font></div>
                <div class="gauge_logo"><div  style="backgroundColor:#f5b183"></div><font>维持</font></div>
              </div>
            </div>
          </div>
          <div class="plate" v-if="stocks.success">
            <p class="title">成分股信息</p>
            <x-table :cell-bordered="false" style="margin: auto;">
              <thead>
                <tr class="tr">
                  <th>序号</th>
                  <th style="text-align: left">个股</th>
                  <!-- <th style="text-align: left;color:#ffba6c"></th> -->
                  <th>活跃度</th>
                  <th>涨跌幅</th>
                  <th>舆情</th>
                </tr>
              </thead>
              <tbody v-for="(item,id) in stocks.results" :key="id" >
                <tr class="tr" :style="{borderBottom:item.dead}">
                  <td>{{id+1}}</td>
                  <td style="text-align: left;display:flex;font-size:.373333rem" @click="ToIndividual(id)">{{item.stockname}}
                    <div style="width: .48rem;height: .773333rem;">
                    <img v-if="item.type === 'rise'" style="width:.48rem;height:.48rem;padding-top: .08rem;" src="../../common/image/rise.png">
                    <img v-if="item.type === 'fall'" style="width:.48rem;height:.48rem;padding-top: .08rem;" src="../../common/image/fall.png">
                    <img v-if="item.type === 'changeless'" style="width:.48rem;height:.48rem;padding-top: .08rem;" src="../../common/image/changeless.png">
                    </div>
                    <div class="tipNum">{{item.num}}</div>
                  </td>
                  <td style="font-size:.373333rem">{{item.score}}</td>
                  <td style="font-size:.373333rem" :style="{color:item.chgcolor}">{{item.chg}}</td>
                  <td><div style="font-size:.373333rem" :style="{color:item.senticolor}">{{item.sentiment}}</div></td>
                </tr>
              </tbody>
            </x-table>
          </div>
        <div class="news" style="backgroundColor:#ffffff;margin-top:.3rem" v-if="news.success">
          <p class="title">相关新闻</p>
            <div v-for="(item,index) in news.newslist" :key="index">
            <div class="container">
              <span class="main_title" @click="Tonews(index)" style="  overflow: hidden;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;word-break: break-all;">{{item.title}}</span>
            </div>
            <div class="main_source">
              <p>{{item.source}}&nbsp;&nbsp;{{item.time}}</p>
            </div>
              <HR width="90%" color=#eaeaea SIZE=1 class="hr"/>
          </div>
          <div>
            <div class="noData" v-if="end">
              暂无相关新闻
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import XTable from '../../../node_modules/vux/src/components/x-table/index'
import Tab from '../../../node_modules/vux/src/components/tab/tab'
import Header from '@/components/header'
import wordCloud from '@/components/wordCloud'
import echart from '@/components/echarts/lineEchart/echart'
import gauge from '@/components/echarts/gauge/gauge'
export default {
  components: {
    Header,
    wordCloud,
    echart,
    XTable,
    Tab,
    gauge
  },
  data () {
    return {
      HeaderMes: {
        title: '',
        search: true,
        type: 1
      },
      stocks: {},
      end: false,
      sentiment: {},
      news: {},
      sectorname: this.$route.query.sector,
      nowData: '4851.45',
      increase: '0.07%',
      increaseData: '3.03',
      higher: '4851.45',
      begin: '4848.42',
      amount: '53.26',
      lower: '4845.96',
      changer: '0.41%',
      total: '14.97'
    }
  },
  mounted: function () {
    this.getTitle()
    this.getSectorDaySenti()
    this.getSectorStockInfo()
    this.getSectorNews()
    // console.log(this.sentiment)
    // console.log(this.HeaderMes)
  },
  methods: {
    Tonews (data) {
      // console.log(this.news.newslist[data].url)
      this.$router.push({path: '/MT', query: {url: this.news.newslist[data].url}})
    },
    ToIndividual (data) {
      // console.log(this.stocks.results[data])
      this.$router.push({path: '/news/' + this.stocks.results[data].stockcode})
    },
    getSectorNews () {
      this.axios.get(this.linkPrefix + '/stocks_api/sector_news', {
        params: {
          sectorname: this.sectorname
        }
      })
        .then(response => {
          this.news = response.data
          // console.log(response.data.newslist.length)
          if (response.data.newslist.length <= 0) {
            this.end = true
          }
        })
    },
    getSectorStockInfo () {
      this.axios.get(this.linkPrefix + '/stocks_api/sector_stock_info', {
        params: {
          sectorname: this.sectorname
        }
      })
        .then(response => {
          this.stocks = response.data
        })
    },
    getSectorDaySenti () {
      this.axios.get(this.linkPrefix + '/stocks_api/sector_sentiment', {
        params: {
          sectorname: this.sectorname
        }
      })
        .then(response => {
          this.sentiment = response.data
        })
    },
    getTitle () {
      this.HeaderMes.title = this.$route.query.sector
    }
  }
}
</script>

<style scoped>
.box {
  width: 0;
  margin: 2.666667rem auto;
  color: red;
  border: .213333rem solid transparent;
  border-top: .213333rem solid red;
  box-shadow: 0 -.32rem 0 -.106667rem;
}
.body{
  margin:0 auto;
}
.index,.wordCloud,.hot,.plate,.sub,.news{
  width: 100%;
  background-color:#ffffff;
}
.index{
  height: 1.93333333333rem;
  margin-top: .18666666666667rem;
  display: flex;
  justify-content: space-between;
}
.wordCloud{
  height: 3.76rem;
  margin-top: .24rem;
}
.hot{
  height: 10.293333333333333rem;
  margin-top: .133333333333333333rem;
}
.plate,.sub{
  margin-top: .24rem;
}
.data{
  display: flex;
  flex-direction: column;
  width: 2.16rem;
  height: 1.467777777rem;
  padding-top: .146667rem;
  margin: 0 auto;
}
.data span,.data p{
  color:#fd4341;
  font-size: .393333rem;
  font-weight: 600;
  line-height: .56rem;
}
.data span{
  text-align:center;
  font-size: .613333rem;
  line-height: 1rem;
}
.index_p p{
  width:6.9rem;
  padding-top: .3rem;
  padding-bottom: .2rem;
  display: flex;
  justify-content: space-around;
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
.title{
  padding:.3rem .5rem 0 .5rem;
  font-size: .453333rem;
}
.switch-bar /deep/ .vux-tab-bar-inner {
  border-radius: 25%;
  margin-top: -.13rem;
}
.subBody{
  display: flex;
  width:8.933333rem;
  padding: .52rem 0 .306667rem 0;
  margin: 0 auto;
}
.body_text{
  width:8.346667rem;
  line-height:.4rem;
  padding-left:.053333rem;
}
.tip{
  height: 1.56rem;
  width: .5333333rem;
  line-height: .55rem;
  color: #ffffff;
  text-align: center;
  writing-mode:vertical-lr;
}
.text{
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
}
.tipNum{
  transform: scale(0.7);
  margin-left: -.1rem;
}
.container{
  overflow:hidden;
  display:flex;
  padding-top:.293333rem;
}
.main_title{
  font-size: .426667rem;
  line-height: .586667rem;
  float:left;
  color:#000000;
  margin:0 .32rem;
  width: 9.36rem;
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
.hr{
  margin-left: .4rem;
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
}
.gauge_logo font{
  font-size: .293333rem;
  color: #999999
}
.echart{
  height: 10.88rem;
  margin-top: .24rem;
  width: 100%;
  background-color:#ffffff;
}
.noData{
  height: 2.346667rem;
  color:#cccccc;
  font-size: .426667rem;
  text-align: center;
  width: 100%;
  line-height: 2.346667rem;
}
</style>
