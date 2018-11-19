<template>
<div class="body">
  <hr class="titleHr">
  <div class="title"  @touchmove.prevent>
    <div style="padding:.213333rem .64rem 0 .32rem">{{titleTime}}</div>
    <div style="padding-top:.213333rem" v-if="titlePrice.price">{{titleName}} &nbsp;&nbsp;
      <font :style="{color:titlePrice.color}"> {{titlePrice.price}}55&nbsp; {{titlePrice.chg_val}}&nbsp; {{titlePrice.change}}</font>
    </div>
  </div>
  <!-- <hr class="titleEndHr"> -->
  <div>
    <!-- <div class="space"></div> -->
      <div ref="mescroll" class="mescroll">
        <div>
          <div v-for="(item,id) in dataList" :key="id">
            <div style="display:flex;padding-left:.32rem;margin-top:.373333rem;">
            <div class="headLogo" v-if="show && id>0"></div>
            <spinner :type="'ripple'" v-if="id === 0" style="margin-left:-.16rem;height:.133333rem"></spinner>
            <!-- <transition name="fade">
            </transition> -->
              <p class="headTime">{{item.time}}</p></div>
            <div class="borderText">
              <div class="mainText">
                <div>{{item.summary}}</div>
                <span class="labelText" @click="labelToStock(item.stockcode)"><div class="label" v-if="item.labelname">{{item.labelname}}<font :style="{color:item.color}">{{item.labelnum}}</font></div></span>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
  <loading v-model="showLoading" >
  </loading>
</div>
</template>

<script>
import { mixin } from '../../../common/js/mescroll.js'
import Spinner from '../../../../node_modules/vux/src/components/spinner/index'
import Loading from '../../../../node_modules/vux/src/components/loading/index'
import Header from '@/components/header'
let interval
export default {
  mixins: [mixin],
  components: {
    Header,
    Spinner,
    Loading
  },
  name: 'MC',
  data () {
    return {
      dataList: [],
      main: [{labelname: '123', color: 'green', labelnum: 'sss'}],
      show: true,
      headcolor: '#101e73',
      headTime: '10秒',
      titleTime: '',
      titleName: '上证指数   ',
      titlePrice: {},
      data: '',
      id: '',
      x: 6,
      newsList: [],
      refershlist: [],
      time: '',
      img: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3641064786,3874798264&fm=27&gp=0.jpg'
    }
  },
  mounted: function () {
    this.getNewsList()
    this.getTitlePrice()
    interval = setInterval(this.getTitlePrice, 5000)
  },
  destroyed: function () {
    clearInterval(interval)
    console.log('ss')
  },
  methods: {
    downCallback (page) {
      // url = this.newsList[0].url
      this.axios.get(this.linkPrefix + '/message_api/news_feed', {
        // params: {
        //   url: this.newsList[0].url
        // }
      })
        .then(response => {
          this.dataList = response.data.list
          this.$set(this.$data.mescroll.optDown, 'textOutOffset', '释放刷新 最后更新于' + response.data.time)
          this.$nextTick(() => {
            this.mescroll.endBySize(page.size, response.data.length)
          })
        })
    },
    labelToStock (stockcode) {
      if (stockcode) {
        this.$router.push({path: '/news/' + stockcode})
      }
    },
    toIndividualNews (msg) {
      console.log(...msg)
      // this.$router.push({path: '/sd'}, {query: {num: 1}})
    },
    getTitlePrice () {
      this.axios.get(this.linkPrefix + '/stocks_api/stock_hq', {
        params: {
          stocks: 's_sh000001'
        }
      })
        .then(response => {
          if (response.data.success) {
            this.titlePrice = response.data.stock_price[0]
          }
        })
    },
    getNewsList () {
      this.axios.get(this.linkPrefix + '/message_api/news_feed')
        .then(response => {
          this.newsList = response.data.list
          this.titleTime = response.data.titleTime
          this.showLoading = false
          this.time = response.data.time
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
.mescroll {
  position: fixed;
  top: 3.54667rem;
  bottom: 1.413333rem;
  height: auto;
  background-color: #ffffff;
}
.mescroll /deep/ .mescroll-upwarp{
  visibility:visible!important;
  min-height:0
}
.title{
  display: flex;
  height: .853333rem;
}
.titleHr{
  border:.013333rem solid #f2f2f2;
}
.titleEndHr{
  border:.013333rem solid #f2f2f2;
  width: 9.386667rem;
  margin-left: .32rem;
}
.title div{
  font-size: .32rem;
  color: #000000;
  letter-spacing: -.007733rem;
  line-height: .453333rem;
}
.items_head{
  display: flex;
}
.item_head{
  height: 1.7333333rem;
  margin-top: .41333333rem;
  display: flex;
}
.item_head_photo{
  height: .76rem;
  width: .76rem;
  border-radius: 50%;
  background-color: red;
  overflow:hidden;
  margin-left: .533333rem;
  margin-top: .3rem;
}
.item_head_photo img{
  width: 100%;
  height: 100%;
  object-fit:cover;
}
.item_head_text{
  display: flex;
  flex-direction:column;
  margin-left: .2rem;
  margin-top: .2rem;
}
.item_times{
  display: flex;
  justify-content:space-between;
}
.item_head_name{
  color: #474747;
  font-size: .45rem;
  margin-bottom: .1rem;
  width:4rem;
}
.headLogo{
  width: .426667rem;
  height: .426667rem;
  background-color: #cccccc;
  border-radius: 50%;
}
.headTime{
  font-size: .32rem;
  color: #999999;
  letter-spacing: -.007733rem;
  line-height:.373333rem;
  padding-left:.266667rem
}
/* .item_head_day{
  margin-right: .16rem;
}
.item_head_day,.item_head_time{
  color: #8d8d8d;
  font-size: .35rem;
} */

#letter{
  height: .28666666667rem;
  width: .44rem;
  margin-left: 3.4rem;
  margin-top: .826666666667rem;
}
li{
  list-style-type:none;
  color:#8d8d8d;
}
.main_title{
  font-size: .35rem;
  overflow: hidden;
  float:left;
  color:#0d0d0d;
  margin-left: .5rem;
  width: 9rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
}
.deadline{
  display: flex;
  justify-content: space-between;
  margin-top: .4rem;
  padding-left: .48rem;
  width: 9rem;
}
.Hr{
  margin-left: .4rem;
}
p{
  color:#8c8c8c;
}
.borderText{
  font-size: .426667rem;
  color: #000000;
  letter-spacing: -.0104rem;
  line-height: .586667rem;
  border-left: .026667rem dashed #f2f2f2;
  padding: .24rem 0 0 .426667rem;
  margin: 0 .32rem 0 .506667rem;
}
.mainText{
  border-bottom: .026667rem dashed #f2f2f2;
  padding-bottom: .48rem;
  line-height: .7rem;
  text-align: justify;
}
.label{
  height: .453333rem;
  margin-top: .133333rem;
  text-align: center;
  font-size: .32rem;
  line-height:.453333rem;
  background-color: #f2f2f2;
  border-radius: .106667rem;
  padding: .106667rem .266667rem .026667rem  .266667rem;
  color: #000000;
}
.labelText{
  display:flex;
  justify-content: flex-start;
  line-height: .693333rem;
}
</style>
