<template>
<div class="contain">
  <div class="head">
    <div class="head_icon">
      <img src="../../../common/assets/icon-ranking.png/画板 1@2x-8.png" alt="" @click="back">
      <img src="../../../common/assets/icon-ranking.png/画板 5@2x-8.png" alt="" @click="search">
    </div>
    <div>
      <div class="head_title">
        <div class="head_maintitle">Mega指数排行</div>
        <div class="head_time">
          <img src="../../../common/assets/icon-ranking.png/画板 6@2x-8.png" align="absmiddle" alt="">
          <div>每个交易日09:20、12:50更新排名</div>
        </div>
      </div>
    </div>
    <div class="head_text">基于海量实时新闻、重大事件、公告、和全球股市行情数据，通过深度学习进行语义情感分析、非线性加权算法综合计算而得出的结果。</div>
    <div class="head_data">
      <div>阅读数  12w+</div><div>加自选数  40w+</div>
    </div>
  </div>
  <div class="table">
    <sticky ref="sticky">
      <div class="table_title">
        <span class="table_title_one">排名</span>
        <div>股票名称</div>
        <div class="right">最新价</div>
        <div class="right" @click="sort">涨跌幅</div>
        <div></div>
      </div>
    </sticky>
    <hr class="hr">
    <div v-for="(item,index) in contain" :key="index">
      <div class="table_contain">
        <span class="table_title_one center"><font :class="{color:index<3}">{{index+1}}</font></span>
        <div style="margin-top: 5px;">
          <p class="table_Pup">{{item.stockname}}</p>
          <p class="table_Pdown">{{item.stockcode}}</p>
        </div>
        <div class="right center">{{item.price}}</div>
        <div class="right center"><font :style="{color:item.color}">{{item.pchange}}%</font></div>
        <div class="table_label ">
          <div class="label" style="width:80%;color:#cccccc" v-if="item.label" >已加自选</div>
          <div class="label" style="width:80%" @click="addShare(index)" v-else>加自选</div>
        </div>
      </div>
      <hr class="hr">
    </div>
  </div>
  <div class="toast">
    <toast v-model="showToast" type="text" width="4rem" :time="2200" is-show-mask :text="toastText" position="bottom"></toast>
  </div>
</div>

</template>

<script>
import Toast from '../../../../node_modules/vux/src/components/toast/index'
import Sticky from '../../../../node_modules/vux/src/components/sticky/index'
export default {
  components: {
    Toast,
    Sticky
  },
  data () {
    return {
      toastText: '已添加',
      showToast: false,
      contain: []
    }
  },
  mounted () {
    this.getStock_rank()
  },
  methods: {
    getStock_rank () {
      this.axios.get(this.linkPrefix + '/homepage_api/stock_rank')
        .then(response => {
          this.contain = response.data.results
        })
    },
    back () {
      this.$router.go(-1)
    },
    search () {
      this.$router.push('/SP')
    },
    addShare (index) {
      this.$set(this.contain[index], 'label', true)
      this.showToast = true
    },
    sort () {
      this.contain.sort(function (a, b) {
        return a.chg - b.chg
      })
    }
  }
}
</script>

<style scoped>
.head{
  display: flex;
  flex-direction:column;
  justify-content: space-around;
  padding: 0 .293333rem;
  height: 5.624rem;
  background-color: #004799;
  color: #FFFFFF;
}
.head_icon{
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: .586667rem;
}
.head_icon img{
  height: .586667rem;
}
.head_title{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.head_maintitle{
  font-size: .48rem;
  letter-spacing: -0.011467rem;
  line-height: .666667rem;
  width: 3.32rem;
  height: .666667rem;
}
.head_time{
  display: flex;
  align-items: center;
  font-size: .32rem;
  letter-spacing: -0.007733rem;
  text-align: right;
  line-height: .453333rem;
}
.head_time img{
  width: .346667rem;
}
.head_text{
  font-size: .373333rem;
  letter-spacing: -0.009067rem;
  line-height: .533333rem;
  text-align: justify;
  flex-grow: 0.1;
}
.head_data{
  display: flex;
  justify-content: space-between;
  font-size: .32rem;
  color: #FFFFFF;
  letter-spacing: -0.007733rem;
  line-height: .453333rem;
  width: 4.64rem;
}
.table{
  padding: 0 .293333rem;
}
.table_title{
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  height: .796rem;
  font-size: .32rem;
  color: #999999;
  letter-spacing: -0.29px;
  line-height: .796rem;
  margin-top: -0.000126667rem;
}
.table_contain{
  display: flex;
  justify-content: space-between;
  font-size: .426667rem;
  margin: .186667rem 0;
}
.table_title div, .table_contain div{
  width: 20%;
}
.table_title span, .table_contain span{
  width: 10%;
}
.color{
  color: #F5A623;
  font-weight: 600;
}
.table_Pup{
  font-size: .373333rem;
  color: #000000;
  letter-spacing: -0.009067rem;
}
.table_Pdown{
  font-size: .32rem;
  color: #999999;
  letter-spacing: -0.29px;
  line-height: .373333rem;
}
.right {
  text-align: right;
}
.label{
  text-align: center;
  font-size: .32rem;
  color: #F5A623;
  letter-spacing: -0.007733rem;
  background: #FFFFFF;
  border: 1px solid #CCCCCC;
  border-radius: .106667rem;
  width: 1.4rem;
  height: .48rem;
}
.table_label{
  text-align: -webkit-right;
  text-align: right;
  margin-top:.293333rem;
}
.hr{
  border:.013333rem solid #f2f2f2;
}
.toast /deep/ .weui-toast.vux-toast-bottom{
  bottom: 1.706667rem;
}
.table_contain {
  color: #666666;
}
.center{
  line-height: 1.066667rem;
}
</style>
