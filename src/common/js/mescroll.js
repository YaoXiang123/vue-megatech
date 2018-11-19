import MeScroll from 'mescroll.js'
import 'mescroll.js/mescroll.min.css'
export const mixin = {
  components: {
    MeScroll
  },
  data () {
    return {
      showLoading: true,
      mescroll: null
    }
  },
  destroyed () {
    this.mescroll.destroy()
  },
  methods: {
    refresh () {
      this.downCallback()
      document.querySelector('.d_jump').scrollIntoView()
    },
    upCallback (page) {
      for (let i = (page.num - 1) * page.size; i < page.num * page.size; i++) {
        if (i < this.newsList.length) {
          this.dataList.push(this.newsList[i])
        }
        this.$nextTick(() => {
          this.mescroll.endUpScroll(false)
        })
        if (i === this.newsList.length - 1) {
          this.$nextTick(() => {
            this.mescroll.endUpScroll(true)
          })
        }
      }
    },
    init () {
      let self = this
      self.mescroll = new MeScroll(this.$refs.mescroll, { //  在mounted初始化mescroll,确保此处配置的ref有值
      // down:{}, //  下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则down可不用写了)
        down: {
          callback: self.downCallback, // 下拉刷新的回调,别写成downCallback(),多了括号就自动执行方法了
          auto: false,
          isBoth: true,
          textOutOffset: '释放刷新 最后更新于' + this.refreshtime
        },
        up: {
          callback: self.upCallback,
          // 以下是一些常用的配置,当然不写也可以的.
          page: {
            num: 0, //  当前页 默认0,回调之前会加1; 即callback(page)会从1开始
            size: 6 //  每页数据条数,默认10
          },
          htmlNodata: '<p class="upwarp-nodata">-- 已经到底了 --</p>',
          noMoreSize: 5
        }
      })
    }
  }
}
