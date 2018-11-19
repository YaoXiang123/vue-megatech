<template>
  <div class="body">
    <search :search="search" @jump="jumpToSearch"></search>
    <p class="space" style=" margin-top: .293333rem"></p>
    <div v-if=search_stock.flag>
      <p class="title">股票</p>
      <hr class="hr" style="margin-left:.32rem;width: 93.6%;"/>
      <div class="historyTitle" v-for="(item,id) in search_stock.data" :key="id">
        <span class="share" @click="Toshare(item)" style="font-size:.426667rem;color:#333333"><div style="color:#f35c04;">{{item.stockname}}</div> {{item.stockcode}}</span>
        <div style="color: #007aff;font-size:.426667rem" @click="addShare(id)"><div v-if='item.focused === 0'>加自选</div><div v-if='item.focused === 1' style="color:#cccccc">已加自选</div></div>
      </div>
      <hr class="hr" style="margin-left: .32rem;width: 93.6%;" v-if="shareEnd" />
      <p class="space" v-else></p>
    </div>
    <!-- 新闻 start -->
    <p class="title">新闻</p>
    <hr class="hr" style="margin-left:.32rem;width: 93.6%;"/>
    <div v-for="(res,idn) in search_results_news.results" :key="idn" >
      <div v-if="idn<=2">
        <div class="history" @click="Tonews(res)">
          <div>
            <p class="text" v-html='res.title'>{{res.title}}</p>
            <p v-if="res.summary" class="subText" v-html='res.summary'>{{res.summary}}</p>
            <p style="padding-top:.2rem;color:#b1b1b1;font-size:.32rem">{{res.source}} &nbsp;&nbsp;&nbsp;&nbsp;{{res.time}}</p>
          </div>
        </div>
        <div v-if='idn===2'>
          <hr class="hr" style="margin-left:.32rem;width: 93.6%;"/>
          <p class="history" style="color:#007aff;padding-left:4.2rem;font-size: .4rem;" @click="jump('news')">查看更多</p>
        </div>
        <hr class="hr" :style="{display:res.end}" style="margin-left:.32rem;width: 93.6%;" v-if="search_results_news && idn<search_results_news.results.length -1"/>
      </div>
    </div>
    <p class="history" v-if="this.defaultPage1"  style="color: #d3d3d3;padding-left: 4rem;">暂无搜索结果</p>
    <p class="space"></p>
    <!-- 新闻 end -->
    <!-- 大V观点 start -->
    <p class="title" v-if="{search_results_report:''}" >大V观点</p>
    <hr class="hr" style="margin-left:.32rem;width: 93.6%;"/>
    <div v-for="(res,idw) in search_results_weibo.results" :key="idw+'w'" >
      <div v-if="idw<=2">
        <div class="history" @click="Tonews(res, 'weibo')">
          <div>
            <p class="text" v-html='res.title'>{{res.title}}</p>
            <p v-if="res.summary" class="subText" v-html='res.summary'>{{res.summary}}</p>
            <p style="padding-top:.2rem;color:#b1b1b1;font-size:.32rem">{{res.source}}&nbsp;&nbsp;&nbsp;&nbsp;{{res.time}}</p>
          </div>
        </div>
        <div v-if='idw===2'>
          <hr class="hr" style="margin-left:.32rem;width: 93.6%;"/>
          <p class="history" style="color:#007aff;padding-left:4.2rem;font-size: .4rem;" @click="jump('weibo')">查看更多</p>
        </div>
        <hr class="hr" :style="{display:res.end}" style="margin-left:.32rem;width: 93.6%;" v-else/>
      </div>
    </div>
    <p class="history" v-if="this.defaultPage2"  style="color: #d3d3d3;padding-left: 4rem;">暂无搜索结果</p>
    <p class="space"></p>
    <!-- 大V观点 end -->
    <!-- 研报 start -->
    <p class="title" v-if="{search_results_report:''}" >研报</p>
    <hr class="hr" style="margin-left:.32rem;width: 93.6%;"/>
    <div v-for="(res,idr) in search_results_report.results" :key="idr+'r'">
      <div v-if="idr<=2">
        <div class="history" @click="Tonews(res, 'report')">
          <div>
            <p class="text" v-html='res.title'>{{res.title}}</p>
            <p v-if="res.summary" class="subText" v-html='res.summary'>{{res.summary}}</p>
            <p style="padding-top:.2rem;color:#b1b1b1;font-size:.32rem">{{res.source}}&nbsp;&nbsp;&nbsp;&nbsp;{{res.time}}</p>
          </div>
        </div>
        <div v-if='idr===2'>
          <hr class="hr" style="margin-left:.32rem;width: 93.6%;"/>
          <p class="history" style="color:#007aff;padding-left:4.2rem;font-size: .4rem;" @click="jump('report')">查看更多</p>
        </div>
        <hr class="hr" :style="{display:res.end}" style="margin-left:.32rem;width: 93.6%;" v-else/>
      </div>
    </div>
    <p class="history" v-if="this.defaultPage3" style="color: #d3d3d3;padding-left: 4rem;">暂无搜索结果</p>
    <p class="space"></p>
    <!-- 研报 end -->
    <loading v-model="showLoading" ></loading>
    <toast v-model="showToast" type="text" width="4rem" :time="2000" is-show-mask :text="toastText" :position="position"></toast>
  </div>
</template>

<script>
import Loading from '../../../../node_modules/vux/src/components/loading/index'
import Toast from '../../../../node_modules/vux/src/components/toast/index'
import search from '../../../components/search'
export default {
  components: {
    search,
    Loading,
    Toast
  },
  data () {
    return {
      search: {
        back: {}
      },
      toastText: '已添加',
      showToast: false,
      position: 'bottom',
      showLoading: false,
      shareEnd: false,
      search_stock: {},
      search_results: [],
      search_results_news: [],
      search_results_weibo: [],
      search_results_report: [],
      defaultPage1: false,
      defaultPage2: false,
      defaultPage3: false,
      array: []
      // sonValue: this.$route.params.id
    }
  },
  mounted: function () {
    this.toSearchStock()
    this.toSearch('weibo', '/search_api/search_weibo', this.defaultPage1)
    this.toSearch('report', '/search_api/search_report', this.defaultPage2)
    this.toSearch('news', '/search_api/search_news', this.defaultPage3)
    this.addSearchHistory()
  },
  methods: {
    jumpToSearch () {
      this.$router.push({path: '/SP'})
    },
    addSearchHistory () {
      this.axios.get(this.linkPrefix + '/search_api/add_search_history', {
        params: {
          query: this.$route.query.id
        }
      })
    },
    toSearch (cate, path, defaultPage) {
      this.showLoading = true
      // this.search_results_weibo = {}
      var arr = {}
      // this.axios.get(this.linkPrefix + '/search_api/search_weibo', {
      this.axios.get(this.linkPrefix + path, {
        params: {
          query: this.$route.query.id
        }
      })
        .then(response => {
          arr = response.data.search_results
          if (cate === 'weibo') {
            this.search_results_weibo = arr
            if (arr.results.length <= 0) {
              this.defaultPage2 = true
            }
          } else if (cate === 'report') {
            this.search_results_report = arr
            if (arr.results.length <= 0) {
              this.defaultPage3 = true
            }
          } else if (cate === 'news') {
            this.search_results_news = arr
            if (arr.results.length <= 0) {
              this.defaultPage1 = true
            }
          }
          this.showLoading = false
        })
    },
    toSearchStock () {
      this.axios.get(this.linkPrefix + '/search_api/search_stocks', {
        params: {
          query: this.$route.query.id
        }
      })
        .then(response => {
          this.search_stock = response.data.search_stocks
        })
    },
    addShare (data) {
      this.axios.get(this.linkPrefix + '/stocks_api/add_user_stock', {
        params: {
          stockcode: this.search_stock.data[data].stockcode
        }
      })
        .then(response => {
          if (response.data.not_login) {
            this.$router.push({path: '/L', query: {tologin: 1}})
          } else {
            this.search_stock.data[data].focused = 1
            this.showToast = true
            setTimeout(() => {
              this.showToast = false
            }, 2200)
          }
        })
    },
    Toshare (data) {
      this.$router.push({path: '/news/' + data.stockcode})
    },
    jump (type) {
      this.$router.push({path: '/SD', query: {'type': type, 'qword': this.$route.query.id}})
    },
    Tonews (data, type) {
      this.$router.push({path: '/MT', query: {url: data.url, type: type}})
    }
  }
}
</script>

<style scoped>
.body{
  background-color: #ffffff;
}
.space{
  width: 100%;
  height: .16rem;
  background-color: #f2f2f2;
}
.history{
  display: flex;
  justify-content: space-between;
  padding: .266667rem 0 .266667rem .32rem;
  font-size: .4rem;
}
.title{
  padding: .266667rem 0 .266667rem .32rem;
  color:#b1b1b1;
  font-size: .373333rem
}
.historyTitle{
  display: flex;
  justify-content: space-between;
  padding:0 .32rem;
  font-size: .373333rem;
  color: #999999;
  height: 1.12rem;
  align-items: center;
}
.share{
  display: flex;
  width: 4.053333rem;
  justify-content: space-between;
  color: #393939;
}
.hr{
  border: .013333rem solid #f2f2f2
}
.subText{
  font-size: .373333rem;
  color: #666666;
  padding-top:.2rem;
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
.text /deep/ em , .subText /deep/ em{
   color: #f35c04;
   font-style:normal
 }
.defaultPage{
  width: 100%;
  text-align: center;
  height: 4.266667rem;
  line-height: 4.266667rem;
  color:#cccccc;
  font-size: .426667rem;
}
</style>
