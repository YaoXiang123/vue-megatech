<template>
  <div class="body" style="overflow:hidden">
    <div style="display:flex">
      <search :search="search" @find="isShow" @state="ispro" v-model="sonValue" @sendValue="sendValue" @findDelete="findDelete" ref="search"></search>
    </div>
    <hr class="hr" style="margin-top: .373333rem" />
    <div v-if="historyShow">
      <div class="history" style="padding-right:.32rem;color:#999999" v-if="history">搜索历史<img src="../../../common/assets/icon-searchPage.png/delete.png" style=" width: .293333rem;height: .4rem;" alt="" @click="remove"></div>
      <hr class="hr" />
      <div v-for="(item,index) in history" :key="index" >
        <div v-if='index<=5'>
          <div class="history" style="padding-right:.32rem">
            <div @click="showHis(index)" style="width:95%">{{ item }}</div>
            <div @click='removeOne(index)' style="color:#999999">&times;</div>
          </div>
          <hr class="hr" />
        </div>
      </div>
      <!-- <div class="noHistory" v-if="history.length<=0">暂无搜索历史</div> -->
    </div>
    <div v-for="(pro,id) in query_candidates" :key="id"  @click="showPro(id)">
      <div v-if='id<=9 && proShow'>
        <p class="history" >{{ pro }}</p>
        <hr class="hr"/>
      </div>
    </div>
    <div >
    </div>
    <div class="defaultPage" v-if="defaultPage1 && defaultPage2 && defaultPage3">暂无关于<font style="color:#000000">{{sonValue}}</font>的结果</div>
    <loading v-model="showLoading" ></loading>
  </div>
</template>

<script>
import Loading from '../../../../node_modules/vux/src/components/loading/index'
import search from '../../../components/search'
export default {
  components: {
    search,
    Loading
  },
  data () {
    return {
      search: {
        back: {}
      },
      showLoading: false,
      defaultPage1: false,
      defaultPage2: false,
      defaultPage3: false,
      state: {show: 1},
      query_candidates: [],
      search_stock: {},
      search_results: [],
      search_results_news: [],
      search_results_weibo: [],
      search_results_report: [],
      sonValue: '',
      proShow: false,
      textShow: false,
      historyShow: true,
      shareEnd: false,
      history: []
    }
  },
  watch: {
    sonValue: {
      // 传input里的值到后台
      handler: function (val, oldval) {
        this.axios.get(this.linkPrefix + '/search_api/auto_complete_query', {
          params: {
            query: val
          }
        })
          .then(response => {
            this.query_candidates = response.data.candidates
          })
        if (this.sonValue === '') {
          this.getHistory()
          this.historyShow = true
          this.proShow = false
        }
      }
    }
  },
  mounted () {
    this.$set(this.state, 'show', 2)
    this.getHistory()
    this.focusSearch()
  }, // 重新渲染页面隐藏暂无搜索结果
  methods: {
    focusSearch () {
      this.$refs.search.childfocusSearch()
    },
    // 删除历史记录
    findDelete () {
      this.defaultPage1 = false
    },
    // 添加股票
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
          }
        })
    },
    // 跳转个股页面
    Toshare (data) {
      this.$router.push({path: '/news/' + this.search_stock.data[data].stockcode})
    },
    // 获取历史记录
    getHistory () {
      this.history = []
      this.axios.get(this.linkPrefix + '/search_api/search_history')
        .then(response => {
          this.history = response.data.search_history
        })
    },
    // 删除所有历史记录
    deleteHistoryAll () {
      this.history = []
      this.axios.get(this.linkPrefix + '/search_api/delete_history_all')
    },
    // 删除某一条历史记录
    deleteHistoryOne (q) {
      this.axios.get(this.linkPrefix + '/search_api/delete_history_one', {
        params: {
          query: q
        }
      })
    },
    addSearchHistory (q) {
      this.axios.get(this.linkPrefix + '/search_api/add_search_history', {
        params: {
          query: q
        }
      })
    },
    func (data) {
      this.sonValue = this.query_candidates[data]
      this.toSearchStock(this.query_candidates[data])
      this.toSearch(this.query_candidates[data])
      this.toSearchWeibo(this.query_candidates[data])
      this.toSearchReport(this.query_candidates[data])
    },
    sendValue (data) {
      this.sonValue = data
    },
    isShow () {
      if (this.sonValue === '') {
        return
      }
      document.getElementById('search1').value = this.sonValue
      this.$router.push({path: '/SE', query: {id: document.getElementById('search1').value}})
    },
    showHis (data) {
      this.sonValue = this.history[data]
      this.isShow()
    },
    showPro (data) {
      this.sonValue = this.query_candidates[data]
      this.isShow()
    },
    removeOne (index) {
      this.deleteHistoryOne(this.history[index])
      this.history.splice(index, 1)
    },
    remove () {
      this.history = ''
      this.deleteHistoryAll()
    },
    ispro () {
      this.proShow = true
      this.historyShow = false
      this.textShow = false
    }
  }
}
</script>

<style scoped>
.body{
  background-color: #ffffff;
}
.remove{
  display: none;
}
.history{
  display: flex;
  justify-content: space-between;
  padding: .266667rem 0 .266667rem .32rem;
  font-size: .4rem;
}
.hr{
  border: .013333rem solid #f2f2f2
}
.defaultPage{
  width: 100%;
  text-align: center;
  height: 4.266667rem;
  line-height: 4.266667rem;
  color:#cccccc;
  font-size: .426667rem;
}
/* .noHistory{
  width: 100%;
  text-align: center;
  font-style: .426667rem;
  color:#cccccc;
  height: ;
  line-height:
} */
</style>
