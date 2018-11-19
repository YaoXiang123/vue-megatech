<template>
  <div class="body">
  <hr class="hr">
    <div ref="mescroll" class="mescroll">
      <div>
        <div class="d_jump"></div>
        <div v-for="(item,id) in dataList" :key="id">
            <div>
              <transition name="fade">
                <div class="tip" v-if="tip && id < 1">本次为您精选{{times}}条热评</div>
              </transition>
              <transition name="fade">
                <div class="tip" v-if="notip && id < 1">暂无最新数据</div>
              </transition>
              <div class="nodata" v-if=" times - 1 < id &&  id < times + 1 && nodata">
                <div>上次已阅读到这里</div>
                <div style="color:#00003F;margin-left:.2rem" @click="refresh"> 刷新</div>
              </div>
                <div class="items_head">
                  <div class="item_head">
                      <div class="item_head_photo"><img :src="item.img" ></div>
                      <div class="item_head_text">
                        <div class="item_head_name">{{item.name}} <img v-if="item.weibo" style="width:.373333rem" src="../../../common/assets/icon-common.png/weibo.png" ></div>
                        <div class="item_times">
                            <div>{{item.day}}</div>
                            <div>{{item.time}}</div>
                            <div>{{item.subText}}</div>
                        </div>
                      </div>
                  </div>
                </div>
          </div>
          <div class="text">
            <p>{{item.text}}</p>
          </div>
          <div class="head_evaluate">
            <div class="top">
              <img src="../../../common/assets/icon-hotEvaluate.png/top.png" align="absmiddle" v-if="item.userlike !== 1"  @click="activeTopSpan(id)">
              <img src="../../../common/assets/icon-hotEvaluate.png/topActive.png" align="absmiddle"  @click="activeTopSpan(id)"  v-else>
              <span class="span" :class="{active:dataList[id].show}" >+1</span>
              {{item.like_num}}
              <img src="../../../common/assets/icon-hotEvaluate.png/down.png" style="padding-left:.64rem" align="absmiddle" v-if="item.userlike !== -1" @click="adtiveDownSpan(id)">
              <img src="../../../common/assets/icon-hotEvaluate.png/downActive.png" style="padding-left:.64rem" align="absmiddle"  @click="adtiveDownSpan(id)" v-else>
              {{item.unlike_num}}
            </div>
          </div>
          <hr class="hr" style="width:9.346667rem;margin-left:.32rem">
        </div>
      </div>
    </div>
    <loading v-model="showLoading" ></loading>
  </div>
</template>

<script>
import { mixin } from '../../../common/js/mescroll.js'
import Loading from '../../../../node_modules/vux/src/components/loading/index'
export default {
  mixins: [mixin],
  components: {
    Loading
  },
  data () {
    return {
      notip: false,
      times: '',
      nodata: false,
      tip: false,
      time: '10-10 16:58:29',
      dataList: [],
      top: 11,
      activeDown: true,
      activeTop: true,
      main: [{labelname: '123', color: 'green', labelnum: 'sss'}],
      newsList: [],
      refershList: [],
      img: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3641064786,3874798264&fm=27&gp=0.jpg'
    }
  },
  mounted: function () {
    this.get_newsList()
  },
  methods: {
    downCallback (page) {
      this.axios.get(this.linkPrefix + '/message_api/pull_refersh_hot_review', {
        params: {url: this.dataList[0].url}
      })
        .then(response => {
          if (response.data.list.length < 1) {
            this.notip = true
          }
          if (response.data.list.length > 0) {
            this.tip = true
            this.times = response.data.list.length
            this.nodata = true
            this.time = response.data.list.time
            this.$set(this.$data.mescroll.optDown, 'textOutOffset', '释放刷新 最后更新于' + response.data.time)
          }
          this.refershList = response.data.list
          console.log(this.refershList)
          this.dataList = this.refershList.concat(this.dataList)
          this.time = response.data.time
          // this.dataList = response.data.list
          this.$nextTick(() => {
            this.mescroll.endBySize(page.size, response.data.list.length)
          })
        })
      setTimeout(() => {
        this.tip = false
        this.notip = false
      }, 2000)
    },
    // 点赞逻辑
    adtiveDownSpan (data) {
      if (this.newsList[data].userlike === -1) {
        let flag = this.like_review(this.newsList[data].url, 0)
        if (flag) {
          this.$set(this.newsList[data], 'userlike', 0)
          this.$set(this.newsList[data], 'unlike_num', this.newsList[data].unlike_num - 1)
        }
      } else {
        // this.$set(this.newsList[data], 'show', true)
        if (this.newsList[data].userlike === 1) {
          this.$set(this.newsList[data], 'like_num', this.newsList[data].like_num - 1)
        }
        let flag2 = this.like_review(this.newsList[data].url, -1)
        if (flag2) {
          this.$set(this.newsList[data], 'userlike', -1)
          this.$set(this.newsList[data], 'unlike_num', this.newsList[data].unlike_num + 1)
        }
      }
    },
    activeTopSpan (data) {
      if (this.newsList[data].userlike === 1) {
        let flag = this.like_review(this.newsList[data].url, 0)
        if (flag) {
          this.$set(this.newsList[data], 'userlike', 0)
          this.$set(this.newsList[data], 'like_num', this.newsList[data].like_num - 1)
        }
      } else {
        // this.$set(this.newsList[data], 'show', true)
        if (this.newsList[data].userlike === -1) {
          this.$set(this.newsList[data], 'unlike_num', this.newsList[data].unlike_num - 1)
        }
        let flag2 = this.like_review(this.newsList[data].url, 1)
        if (flag2) {
          this.$set(this.newsList[data], 'show', true)
          this.$set(this.newsList[data], 'userlike', 1)
          this.$set(this.newsList[data], 'like_num', this.newsList[data].like_num + 1)
        }
      }
    },
    // 获取点赞数
    like_review (url, islike) {
      let res = true
      this.axios.get(this.linkPrefix + '/message_api/like_review', {
        params: {
          review_url: url,
          is_like: islike
        }
      })
        .then(response => {
          if (response.data.not_login) {
            this.$router.push({path: '/L', query: {tologin: 1}})
            res = false
          }
        })
      return res
    },
    get_newsList () {
      this.axios.get(this.linkPrefix + '/message_api/hot_review')
        .then(response => {
          this.newsList = response.data.list
          this.time = response.data.time
          this.showLoading = false
          this.init()
        })
    }
  }
}
</script>

<style scoped>
.body{
  background-color: #ffffff;
  padding-top: 2.60667rem;
  margin-bottom: 1.5rem;
}
.d_jump{
  width: 100%;
}
.fade-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
   0% {
      opacity: 0;
      transform: translateY(-2000px);
   }
   80% {
      transform: translateY(-10px);
   }
   100% {
      transform: translateY(0);
   }
}
.nodata,.tip{
  width: 100%;
  height: .853333rem;
  text-align: center;
}
.tip{
  background: #F5A623;
  font-size: .32rem;
  line-height: .826667rem;
  color: #ffffff
}
.nodata{
  font-size: .373333rem;
  background: #EBEBEB;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999999;
}
.mescroll {
  position: fixed;
  top: 2.60667rem;
  bottom: 1.413333rem;
  height: auto;
  background-color: #ffffff;
}
.mescroll /deep/ .mescroll-upwarp{
  visibility:visible!important;
  min-height:0
}
h1{
  font-size: 1.333333rem;
  color: pink;
  text-align: center;
  position: relative;
}
.span{
  color: #F5A623;
  font-size: .4rem;
  font-weight: normal;
  position: absolute;
  margin-top: -.4rem;
  margin-left: .266667rem;
  opacity: 0;
}
.active{
  -webkit-animation:flutter 3.5s linear;
  animation:flutter 3.5s 1 linear;
}
@keyframes flutter{
  0%{
      opacity: 0;
  }
  100%{
    font-size: .426667rem;
    color: #F5A623;
    opacity: 1;
    top: -.266667rem;
    left: 53%;
  }
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
.top{
  width: 30%;
  margin: .346667rem 0 .293333rem 6.53333rem;
  line-height: .453333rem;
  font-size: .32rem;
  color:#999999;
  display: flex;
  justify-content: space-between;
}
.top img{
  width: .48rem;
  height: .453333rem;
}
.text p {
  font-size: .38rem;
  text-align: justify;
  margin-top: -.0001rem;
}
.text {
  font-size: .373333rem;
  line-height: .533333rem;
  /* float:left; */
  color:#000000;
  margin-left: .32rem;
  width: 9.36rem;
  margin-top: .266667rem;
}
.text_end {
  color: #4d8bff;
  font-size: .3rem;
  display: flex;
  width: 4.853333rem;
  justify-content: flex-start;
  margin-left: 4.673333rem;
  height: .266777777rem;
  padding-bottom: .82666666667rem;
  margin-top: 1.75rem;
}
.hr {
  border:.013333rem solid #f2f2f2;
}
.label{
  height: .453333rem;
  margin-top: .32rem;
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
