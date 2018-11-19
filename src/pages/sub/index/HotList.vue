<template>

<div style="padding-top: 2.60667rem;">
  <div class="swiper">
    <swiper loop auto :list="img" style="margin:0 auto;" height="4rem" dots-class="custom-bottom" dots-position="center"></swiper>
  </div>
  <p class="text" style="  overflow: hidden;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;word-break: break-all;">{{text}}</p>
  <p style="padding: 1.706666rem 0 .2666rem .48rem">{{subText}} {{subNum}}评</p>
  <HR width="90.8%" color=#eaeaea SIZE=1 class="hr"/>
  <div v-for="item in main" :key="item.id">
    <div class="article_border">
      <div class="article_border_left">
        <p class="article_title">{{item.Title}}</p>
        <div class="article_mess">{{item.name}} {{item.num}}评</div>
      </div>
      <div class="article_right">
        <img :src="item.faceImg">
      </div>
    </div>
    <HR width="90%" color=#eaeaea SIZE=1 class="hr"/>
  </div>
</div>
</template>

<script>
import Swiper from '../../../../node_modules/vux/src/components/swiper/swiper'
export default {
  components: {
    Swiper
  },
  data () {
    return {
      main: [{Title: '半年蒸发10000亿市值，被大摩踢群，腾讯到底经历了什么？股王见顶了吗？', name: '和讯网', num: '53', faceImg: 'http://5b0988e595225.cdn.sohucs.com/images/20170623/a51bf3610e3a47e3b631248555448665.png'}],
      text: '最近传了一条川普说A股暴跌27%的推特。我还以为是假的。结果一看是真的。这段时间他就发2条关于中国的',
      subText: 'Stevevai1983',
      subNum: '668',
      img: [{
        url: 'javascript:',
        img: 'http://pic68.nipic.com/file/20150525/17961491_083957653000_2.jpg',
        title: '外媒：巨幅震荡是因为散户不理智'
      },
      {
        url: 'javascript:',
        img: 'http://pic68.nipic.com/file/20150525/17961491_083957653000_2.jpg',
        title: '外媒：巨幅震荡是因为散户不理智'
      },
      {
        url: 'javascript:',
        img: 'http://pic68.nipic.com/file/20150525/17961491_083957653000_2.jpg',
        title: '外媒：巨幅震荡是因为散户不理智'
      }]
    }
  }
}
</script>

<style scoped>
.swiper /deep/ .vux-slider > .vux-swiper > .vux-swiper-item > a > .vux-swiper-desc {
  background-image:none!important;
  bottom: 2.693333rem;
}
.swiper /deep/ .vux-slider > .vux-indicator > a > .vux-icon-dot.active, .vux-slider .vux-indicator-right > a > .vux-icon-dot.active{
  background-color: #ffffff;
}
.text{
  font-size: .4rem;
  overflow: hidden;
  float:left;
  color:#0d0d0d;
  padding: .52rem .413333rem 0 .453333rem ;
  width: 9rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
}
.hr {
  margin-left: .373333rem;
}
.article_border,.article_border_left,.article_mess{
  display: flex;
  justify-content: flex-start;
}
.article_border{
  width: 9.7866666rem;
  height: 2.4533333rem;
  background-color: #ffffff;
  margin: .106666666rem auto;
  align-items: flex-start;
  overflow: hidden;
}
.article_border_left{
  width:5.893333rem;
  height:2.186666rem;
  align-items: flex-start;
  flex-direction:column;
  padding: .26666666rem 0 .26666666rem .26666666rem;
}
.article_title{
  font-size: .373333rem;
  font-weight: bold;
}
.article_mess{
  width:100%;
  align-items:center;
  flex-direction:row;
  color:#545454;
}
.article_mess{
  flex:1;
}
.article_right{
  width:3.12rem;
  height:1.853333rem;
  overflow:hidden;
  border-radius: .266667rem;
  margin-top: .186667rem;
}
.article_right img{
  width: 100%;
}
</style>
