<template>
  <div>
    <div v-if="newslist">
    <HR color=#eaeaea SIZE=1 />
      <div v-for="(item,index) in newslist" :key="index" @click="toNews(index)">
    <div class="container">
      <span class="main_title" style="  overflow: hidden;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;word-break: break-all;">{{item.title}}</span>
    </div>
    <div class="main_source">
      <div><p>{{item.source}}&nbsp;&nbsp;{{item.time}}</p></div>
      <div class="tip" :style="{backgroundColor:item.color}">{{item.tip}}</div>
    </div>
      <HR width="90%" color=#eaeaea SIZE=1 class="hr"/>
  </div>
    </div>
    <div class="noData"  v-if="end">
      暂无相关新闻
    </div>
    <loading v-model="showLoading" position="absolute"></loading>
</div>
</template>

<script>
import Loading from '../../../../node_modules/vux/src/components/loading/index'
export default {
  components: {
    Loading
  },
  data () {
    return {
      showLoading: true,
      end: false,
      newslist: []
    }
  },
  mounted: function () {
    this.getStockNews()
  },
  methods: {
    toNews (data) {
      this.$router.push({path: '/MT', query: {url: this.newslist[data].url}})
      // console.log('todo')
    },
    getStockNews () {
      this.axios.get(this.linkPrefix + '/stocks_api/stock_news', {
        params: {
          stockcode: this.$route.params.stockcode
        }
      })
        .then(response => {
          this.newslist = response.data.newslist
          this.showLoading = false
          if (response.data.newslist.length <= 0) {
            this.end = true
          }
          // console.log(this.newslist)
        })
    }
  }
}
</script>

<style scoped>
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
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
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
  width: 100%;
  justify-content: space-between;
}
.main_source p{
  margin-left: .32rem;
}
.hr{
  margin-left: .4rem;
}
.tip{
  width: .96rem;
  height: .426667rem;
  color: #f2f2f2;
  text-align: center;
  font-size: .32rem;
  margin-right: .533333rem;
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
