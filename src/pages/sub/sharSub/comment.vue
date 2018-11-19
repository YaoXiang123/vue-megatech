<template>
  <div>
    <div v-if="weibo">
      <hr class="hr">
      <div v-for="(item,id) in weibo" :key="id">
          <div>
              <div class="items_head">
                <div class="item_head">
                    <div class="item_head_photo"><img :src="item.img" ></div>
                    <div class="item_head_text">
                      <div class="item_head_name">{{item.source}}<img v-if="item.yellowV" style="width:.373333rem" src="../../../common/assets/icon-common.png/weibo.png" ></div>
                      <div class="item_times">
                          <div>{{item.time}}</div>
                      </div>
                    </div>
                </div>
              </div>
        </div>
        <div class="text">
          <p v-html="item.text">{{item.text}}</p>
        </div>
        <hr class="hr" style="width:9.346667rem;margin-left:.32rem;margin-top:.266667rem">
      </div>
    </div>
    <div class="noData" v-if="end">
      暂无相关点评
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
      weibo: []
    }
  },
  mounted: function () {
    this.getStockWeibo()
  },
  methods: {
    getStockWeibo () {
      this.axios.get(this.linkPrefix + '/stocks_api/stock_weibo', {
        params: {
          stockcode: this.$route.params.stockcode
        }
      })
        .then(response => {
          this.weibo = response.data.weibo
          this.showLoading = false
          if (response.data.weibo.length <= 0) {
            this.end = true
          }
          console.log(this.weibo)
        })
    }
  }
}
</script>

<style scoped>
.hr {
  border:.013333rem solid #f2f2f2;
}
.items_head {
  display: flex;
}
.item_head {
  margin-top: .293333rem;
  display: flex;
}
.item_head_photo {
  height: 1.066667rem;
  width: 1.066667rem;
  border-radius: 50%;
  overflow: hidden;
  margin-left: .32rem;
}
.item_head_photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.item_head_text {
  display: flex;
  flex-direction: column;
  margin-left: .213333rem;
}
.item_times {
  display: flex;
  justify-content: flex-start;
}
.item_head_name {
  color: #000000;
  letter-spacing: -.009067rem;
  line-height: .533333rem;
  font-size: .373333rem;
  margin-bottom: .1rem;
}
.item_times div{
  color: #999999;
  font-size: .32rem;
  line-height: .453333rem;
  margin-right: .1rem;
}
.text p {
  font-size: .38rem;
  text-align: justify;
  margin-top: -.0001rem;
}
.text {
  font-size: .373333rem;
  line-height: .533333rem;
  color:#000000;
  margin-left: .32rem;
  width: 9.36rem;
  margin-top: .266667rem;
}
.text /deep/ em{
  color: #f35c04;
  font-style:normal
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
