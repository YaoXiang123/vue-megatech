<template>
  <div class="body" @touchmove.prevent>
    <search :search="search" @jump="jump"></search>
    <div>
      <hr class="hr" style="margin-top:.373333rem" />
      <p class="title">{{title}}</p>
      <hr class="hr" />
        <div v-for="(item,index) in results" :key="index">
          <div class="history" @click="Tonews(index)">
            <div>
              <p class="text" v-html="item.title">{{item.title}}</p>
              <p v-if="item.summary" class="subText" v-html="item.summary">{{item.summary}}</p>
              <p style="padding-top:.2rem;color:#b1b1b1;font-size:.32rem">{{item.source}} &nbsp;&nbsp;&nbsp;&nbsp;{{item.time}}</p>
            </div>
          </div>
          <hr class="hr" />
        </div>
    </div>
  </div>
</template>

<script>
import search from '../../../components/search'
export default {
  components: {
    search
  },
  data () {
    return {
      results: [],
      search: {
        back: {}
      },
      title: '新闻'
    }
  },
  mounted: function () {
    this.search_results()
  },
  methods: {
    // 跳转正在搜索页面
    jump () {
      this.$router.push({path: '/sp'})
    },
    // 跳转进新闻详情页
    Tonews (data) {
      this.$router.push({path: '/MT', query: {url: this.results[data].url, type: this.$route.query.type}})
      console.log(this.results[data].url)
    },
    // 返回搜索结果
    search_results () {
      let url = ''
      if (this.$route.query.type === 'news') {
        url = '/search_api/search_news'
      } else if (this.$route.query.type === 'weibo') {
        url = '/search_api/search_weibo'
      } else {
        url = '/search_api/search_report'
      }
      this.axios.get(this.linkPrefix + url, {
        params: {
          query: this.$route.query.qword
        }
      })
        .then(response => {
          this.results = response.data.search_results.results
          this.title = response.data.search_results.category
        })
    }
  }
}
</script>

<style scoped>
.body{
  background-color: #ffffff;
}
.title{
  padding: .266667rem 0 .266667rem .32rem;
  color:#b1b1b1;
  font-size: .373333rem
}
.history{
  display: flex;
  justify-content: space-between;
  padding: .266667rem 0 .266667rem .32rem;
  font-size: .4rem;
}
.text,.subText{
  width: 9.36rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.text{
  font-size: .426667rem;
}
.subText{
  font-size: .373333rem;
  color: #666666;
  padding-top:.2rem;
}
.hr{
  border: .013333rem solid #f2f2f2
}
.text /deep/ em{
  color: #007aff;
  font-style:normal
}
</style>
