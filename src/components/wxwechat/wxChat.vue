<template>
    <div class="wxchat-container" :style="{backgroundColor: wrapBg}">
        <!-- <div class="window" id="window-view-container" :style="{maxHeight: maxHeight + 'px', width: width +'px'}"> -->
          <div class="window" id="window-view-container">
            <!-- data is empty -->
            <div class="loading" v-if="data && data.length==0">
                <div style="margin-top: 8rem;text-align:center; font-size: .426667rem;">
                    <span>未查找到聊天记录</span>
                </div>
            </div>
            <!-- loading -->
            <div class="loading" v-if="data.length==0">
                <div style="margin-top: 8rem;">
                        <div>加载中...</div>
                </div>
            </div>
            <div class="title" style="position:fixed;z-index:200" v-if="data && data.length>0">
                <p v-text="contactNickname"></p>
            </div>
            <!-- main -->
            <ScrollLoader :minHeight="minHeight" @scroll-to-top="refresh" @scroll-to-botton="infinite" class="container-main" v-if="data && data.length>0" :style="{maxHeight: maxHeight-50 + 'px'}">
                <div class="message">
                    <ul>
                        <li v-for="(message, id) in data"  :key="id" :class="message.direction==2?'an-move-right':'an-move-left'">
                            <p class="time"> <span v-text="message.ctime"></span> </p>
                            <p class="time system" v-if="message.type==10000"> <span v-html="message.content"></span> </p>
                            <div :class="'main' + (message.direction==2?' self':'')" v-else>
                                <img class="avatar" width="45" height="45" :src="message.direction==2? ownerAvatarUrl: require('../../common/assets/icon-wxChat.png/画板 1@2x.png')" v-if="!message.alett">
                                <!-- 文本 -->
                                <div class="text"  v-if="message.type==1">{{message.content}}</div>
                                <!-- 图片 -->
                                <div class="text" v-else-if="message.type==2">
                                    <img :src="message.content" class="image" alt="聊天图片">
                                </div>
                                <!-- 推荐 -->
                                <div class="commend" v-else-if="message.type==3">
                                  <div  v-for="(item,index) in message.content" :key="index" @click="transition(id, index)">{{item}}</div>
                                </div>
                                <!-- 智报 -->
                                <div class="AINews" v-else-if="message.type==4">
                                  <div class="AINews_head">{{message.head}}<div></div></div>
                                  <div class="AINews_text">{{message.text}}</div>
                                  <div class="AINews_time">{{message.time}}</div>
                                  <hr style="margin-top:.08rem" class="hr">
                                  <p class="more" @click="toAINews(message.url)">了解更多</p>
                                </div>
                                <!-- 个股 -->
                                <div class="INNews" v-else-if="message.type==5">
                                  <div class="INNews_head">
                                    <div>Mega投资指数 &nbsp;<img src="../../common/assets/icon-common.png/homeExplain.png" style="width:.45rem;padding-bottom:.083333rem;" alt="" align="absmiddle" @click="toExplain"></div>
                                    <div><Rater disabled v-model="message.star"/></div>
                                    <div style="font-size:.373333rem">{{message.text}}</div>
                                  </div>
                                  <div class="INNews_text">
                                    <p>{{message.name}}</p>
                                    <p>{{message.week}}</p>
                                    <p>{{message.year}}</p>
                                  </div>
                                  <div class="AINews_time">{{message.time}}</div>
                                  <hr style="margin-top:.08rem" class="hr">
                                  <p class="more" @click="toAINews(message.code)">了解更多</p>
                                </div>
                                <!-- 大盘 -->
                                <div class="IndexNews" v-else-if="message.type==6" >
                                  <div class="IndexNews_head_color">
                                    <div class="IndexNews_head">
                                      <div><img src="../../common/assets/icon-common.png/homeExplain.png" style="width:.45rem;padding-bottom:.083333rem;" alt="" align="absmiddle" @click="toExplain"> &nbsp;Mega投资评级：{{message.index}}</div>
                                      <div class="circle"></div>
                                      <div><div :class="message.color=='yellow'?'circle_background_yellow':(message.color=='green'?'circle_background_green':'circle_background_red')"  class="circle_background"></div><gauge :message="message" :id="message.id"/></div>
                                      <div style="font-size:.373333rem">{{message.gailv}}</div>
                                    </div>
                                  </div>
                                  <div class="IndexNews_text">
                                    <p v-html="message.hq">{{message.hq}}</p>
                                    <p>{{message.all}}</p>
                                  </div>
                                  <div class="AINews_time">{{message.time}}</div>
                                </div>
                                <!-- 其他
                                <div class="text" v-else-if="message.type!=10000" v-text="'[暂未支持的消息类型:'+ message.type +']\n\r' + message.content">
                                </div>-->
                            </div>
                            <div  style="margin-top:5rem;width:100%;position:relative" class="d_jump" v-if=" index > data.length - 2 " ></div>
                        </li>
                    </ul>
                </div>
            </ScrollLoader>
            <div class="deadline">
              <input :style="{bottom: iBottom}" v-on:input="clickInput" @blur="losefocus" ref="input" placeholder=不妨试试看，我智能不智能 type="text" @keyup.enter="submit1">
              <!-- <transition name="deadline"> -->
              <img src="../../common/assets/icon-wxChat.png/Button_More@2x.png"  alt="" @click="MoreETS" v-if="MoreExtensions">
              <div v-else @click="submit" >发送</div>
              <!-- </transition> -->
            </div>
            <transition name="fade">
              <div  v-if="isDeadline_Sp">
                <div style="bottom:3.2rem" class="deadline">
                  <input style="bottom:3.2rem" v-on:input ="clickInput" @blur="losefocus" ref="input" placeholder=不妨试试看，我智能不智能 type="text" @keyup.enter="submit1">
                  <img style="bottom:3.2rem"  src="../../common/assets/icon-wxChat.png/Button_More@2x.png"  alt="" @click="reMoreETS" v-if="MoreExtensions">
                  <div style="bottom:3.3rem" v-else @click="submit" >发送</div>
                </div>
                <div class="deadline_Sp">
                  <div>智能简报</div>
                  <div>资讯</div>
                  <div>自选股</div>
                  <div>Mega指数</div>
                </div>
              </div>
            </transition>
        </div>
    </div>
</template>

<script>
import gauge from '../echarts/gaugeAi/gauge'
import Rater from 'vux/src/components/rater'
import ScrollLoader from './scrollLoader.vue'
export default {
  name: 'wxChat',
  components: {
    ScrollLoader,
    Rater,
    gauge
  },
  props: {
    contactNickname: {
      type: String,
      default: 'Mystic Faces'
    },
    data: {
      type: Array,
      required: true
    },
    width: {
      type: Number,
      default: 450
    },
    wrapBg: {
      type: String,
      default: '#efefef'
    },
    maxHeight: {
      type: Number,
      default: 700
    },
    contactAvatarUrl: {
      type: String
    },
    ownerAvatarUrl: {
      type: String
    },
    getUpperData: {
      type: Function,
      required: true
    },
    getUnderData: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      MoreExtensions: true,
      IndexNews: false,
      AINews: false,
      INNews: false,
      star: 5,
      isDeadline_Sp: false,
      iBottom: '.1rem',
      isUpperLaoding: false,
      isUnderLaoding: false,
      isRefreshedAll: false,
      isLoadedAll: false,
      minHeight: 700,
      value: ''
    }
  },
  // created () {
  //   this.initData()
  // },
  updated () {
    document.querySelector('.d_jump').scrollIntoView({behavior: 'smooth'})
  },
  mounted () {
  },
  methods: {
    transition (id, index) {
      console.log(this.data[id].content[index])
      // this.$router.push({path: })
    },
    reMoreETS () {
      this.isDeadline_Sp = false
    },
    MoreETS () {
      this.isDeadline_Sp = true
    },
    toExplain () {
      this.$router.push({path: '/HEN'})
    },
    toAINews (data) {
      this.$router.push({path: data})
      console.log(data)
    },
    clickInput () {
      this.$nextTick(() => {
        if (document.querySelector('.d_jump')) {
          document.querySelector('.d_jump').scrollIntoView({behavior: 'smooth'})
        }
        this.MoreExtensions = false
        // this.iBottom = '300px'
      })
    },
    losefocus () {
      this.iBottom = '.1rem'
    },
    submit () {
      if (this.$refs.input.value !== '') {
        this.$emit('submitValue', this.$refs.input.value)
        if (document.querySelector('.d_jump')) {
          document.querySelector('.d_jump').scrollIntoView({behavior: 'smooth'})
        }
        this.$refs.input.value = ''
        this.MoreExtensions = true
        console.log('submit')
      }
    },
    submit1 () {
      if (this.$refs.input.value !== '') {
        this.$emit('submitValue', this.$refs.input.value)
        if (document.querySelector('.d_jump')) {
          document.querySelector('.d_jump').scrollIntoView({behavior: 'smooth'})
        }
        this.$refs.input.value = ''
        console.log('submit')
      }
    },
    // initData () {
    // this.dataArray = this.dataArray.concat(this.data)
    // },
    scroll (index) {
      console.log('aaa')
    },
    // 向上拉刷新
    refresh (done) {
      let me = this
      if (me.isUpperLaoding) {
        return
      }
      if (me.isRefreshedAll) {
        done(true)
        me.isUpperLaoding = false
        return
      }
      try {
        this.getUpperData().then(function (data) {
          if (data.length === 0) {
            me.isRefreshedAll = true
            done(true)
          } else {
            // me.dataArray = data.reverse().concat(me.dataArray) // 倒序合并
            done()
          }
        })
      } catch (error) {
        console.error(
          'wxChat: props "getUpperData" must return a promise object!'
        )
      }
      me.isUpperLaoding = false
    },
    // 向下拉加载
    infinite (done) {
      let me = this
      if (me.isUnderLaoding) {
        return
      }
      if (me.isLoadedAll) {
        done(true)
        me.isUnderLaoding = false
        return
      }
      try {
        this.getUnderData().then(function (data) {
          if (data === 0) {
            me.isLoadedAll = true
            done(true)
          } else {
            done()
            // me.dataArray = me.dataArray.concat(data) // 直接合并
          }
        })
      } catch (error) {
        console.error(
          'wxChat: props "getUnderData" must return a promise object!'
        )
      }
      me.isUnderLaoding = false
    }
  }
}
</script>

<style scoped>
.commend::-webkit-scrollbar{width:0;height:0}
.circle_background_green, .circle_background_red, .circle_background_yellow{
  border-radius: 50%;
  left: 3.226667rem;
  top: 3.813333rem;
  width: 2.666667rem;
  height: 2.666667rem;
  position: absolute;
}
.circle_background_green{
  background-color: #06f4b6;
  background: linear-gradient(to bottom, #06f4b6 50%,#06f4b6 100%);
  background: #06f4b6;
  background: -webkit-linear-gradient(rgba(6, 244, 182, .5),rgba(6, 244, 182, 0));
}
.circle_background_red{
  background-color: #f7033d;
  background: linear-gradient(to bottom, #f7033d 50%,#f7033d 100%);
  background: #f7033d;
  background: -webkit-linear-gradient(rgba(247, 3, 61, .5),rgba(247, 3, 61, 0));
}
.circle_background_yellow{
  background-color: #f9a88c;
  background: linear-gradient(to bottom, #f9a88c 50%,#f9a88c 100%);
  background: #f9a88c;
  background: -webkit-linear-gradient(rgba(249, 168, 140, .5),rgba(249, 168, 140, 0));
}
.INNews,.AINews,.IndexNews {
  background: #FFFFFF;
  border: 1px solid #E0E0E0;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.12);
  border-radius: 2px;
  margin-top: 2rem;
  width: 9.04rem;
  height: 8.08rem;
}
.IndexNews{
  height: 7.653333rem;
}
.IndexNews_head{
  height: 5.146667rem;
  /* background-color: #7e1291;
  opacity:.1; */
  background: -moz-linear-gradient(top, #2a3471 30%, #4b2671 100%);
  background: -webkit-gradient(linear, left top, left bottom, color-stop(11%,#2a3471), color-stop(100%,#4b2671));
  background: -webkit-linear-gradient(top, #2a3471 30%,#4b2671 100%);
  background: -o-linear-gradient(top, #2a3471 50%,#4b2671 100%);
  background: -ms-linear-gradient(top, #2a3471 11%,#4b2671 100%);
  background: linear-gradient(to bottom, #2a3471 50%,#4b2671 100%);
}
.IndexNews_head_color{
  width: 9.04rem;
  height: 5.146667rem;
  background-color: #09215d;
  z-index: 200000;
}
.INNews_head, .AINews_head, .IndexNews_head{
  font-family: Roboto-Regular;
  color: #FFFFFF;
  background-color: #09215d;
}
.INNews_text p,.IndexNews_text p{
  font-size: .373333rem;
  color: #000000;
  margin-top: .32rem;
  margin-left: .32rem;
}
.INNews_head{
  height: 3.626667rem;
}
.INNews_head,.IndexNews_head {
  font-size: .426667rem;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
}
.more {
  font-size: .373333rem;
  color: #000000;
  line-height: 1.066667rem;
  padding-left: .346667rem;
}
.AINews_head{
  font-size: .48rem;
  text-align: center;
  height: 3.146667rem;
  line-height: 3.146667rem;
}
.AINews_head div{
  width: 1.28rem;
  height: .08rem;
  background: #ffffff;
  margin-left: 4rem;
  margin-top: -1.12rem;
}
.AINews_text {
  font-family: PingFangSC-Regular;
  font-size: .373333rem;
  color: #000000;
  text-align: left;
  line-height: .64rem;
  width: 8.453333rem;
  height: 2.64rem;
  margin-left: .32rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  word-break: break-all;
  margin-top: .32rem;
}
.AINews_time{
  font-family: PingFangSC-Regular;
  font-size: .32rem;
  color: #CCCCCC;
  text-align: right;
  margin-left: -.573333rem;
  margin-top: .32rem;
  width: 100%;
}
.hr{
  border:.013333rem solid #f2f2f2;
}
.deadline {
  width: 100%;
  height: 1.28rem;
  background-color: #ffffff;
  position: fixed;
  bottom: 0;
  display: flex;
}
.deadline input,
.deadline div {
  position: fixed;
  bottom: .1rem;
}
.deadline input {
  width: 6.84rem;
  height: 1.013333rem;
  margin-left: .32rem;
  background: #f2f2f2;
  border-radius: .1rem;
  outline: 0;
  text-shadow: none;
  border: .026667rem solid #fbfbfb;
  background-image: url("../../common/image/mic.svg");
  background-repeat: no-repeat;
  background-size: .373333rem;
  background-position: .1528205128205rem center;
  padding: 0 0 0 .912564102564rem;
  font-size: .426667rem;
}
.deadline img{
  position: fixed;
  left: 8.4rem;
  bottom: .266667rem;
  width:.904rem;
  height:.904rem;
}
.deadline div {
  width: 1.28rem;
  height: .64rem;
  background: #0000a0;
  box-shadow: .053333rem 0 .106667rem 0 rgba(0, 0, 0, .5);
  border-radius: .053333rem;
  font-size: .32rem;
  line-height: .583333rem;
  text-align: center;
  color: #ffffff;
  left: 8.4rem;
  border-radius: .1rem;
  bottom: .266667rem;
}
.deadline_Sp {
  position: fixed;
  bottom: 0;
  height: 3.2rem;
  width: 100%;
  background-color: #ffffff;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
  .deadline-enter-active{
    transition: all .3s ease;
  }
  .deadline-leave-active{
    transition: all .8s cubic-bezier(1.0, .5, .8, 1.0);
  }
 .deadline-enter, .deadline-leave-active {
 transform: translatey(.266667rem);
  opacity: 0;
 }
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #cccccc;
  opacity: 1;
}
.commend {
  display: -webkit-box;
  overflow-x: scroll;
  -webkit-overflow-scrolling:touch;
}
.commend div{
  font-size: .426667rem;
  line-height: .56rem;
  color: #424242;
  background: #F2F2F2;
  border: 2px solid #DEDEDE;
  padding: .266667rem .346667rem;
  border-radius: .133333rem;
  margin-left: .426667rem;
}
::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #cccccc;
  opacity: 1;
}

input:-ms-input-placeholder {
  color: #cccccc;
  opacity: 1;
}

input::-webkit-input-placeholder {
  color: #cccccc;
  opacity: 1;
  line-height: .426667rem;
  font-size: .426667rem;
}
.d_jump {
  width: 100%;
  position: relative;
}
.wxchat-container {
  width: 100%;
  height: 100%;
  z-index: 100;
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
}
.shadow {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: .2;
}
.window {
  box-shadow: 1px 1px .533333rem -.133333rem #000; /*max-width: 450px;*/
  min-width: 8rem;
  background: #f5f5f5;
  margin: 0 auto;
  overflow: hidden;
  padding: 0;
  height: 100%;
  position: relative;
  z-index: 101;
}
button {
  border: 0;
  background: none;
  border-radius: 0;
  text-align: center;
}
button {
  outline: none;
}
.w100 {
  width: 100%;
}
.mt5 {
  margin-top: .133333rem;
}
.mt10 {
  margin-top: .266667rem;
}
.mt20 {
  margin-top: .533333rem;
}
.mb10 {
  margin-bottom: .266667rem;
}
.mb20 {
  margin-bottom: .533333rem;
}
.fs0 {
  font-size: 0;
}
.title {
  background: #000;
  text-align: center;
  color: #fff;
  width: 100%;
  height: 1.333333rem;
  line-height: 1.333333rem;
  font-size: .373333rem;
}
.loading,
.no-more {
  text-align: center;
  color: #b0b0b0;
  line-height: 2.666667rem;
}
.no-more {
  line-height: 1.6rem;
}
.pull-right {
  float: right;
}
.link-line {
  text-decoration: underline;
}
.message {
  /*height: 100%;*/
  padding: .266667rem .4rem;
  /*overflow-y: scroll;*/
  background-color: #f5f5f5;
}
.message li {
  margin-bottom: .4rem;
  left: 0;
  position: relative;
  display: block;
}
.message .time {
  margin: .266667rem 0;
  text-align: center;
}
.message .text {
  display: inline-block;
  position: relative;
  padding: 0 .266667rem;
  max-width: calc(100% - 2rem);
  min-height: .933333rem;
  line-height: 2.1;
  font-size: .4rem;
  padding: .16rem .266667rem;
  text-align: left;
  word-break: break-all;
  background-color: #fff;
  color: #000;
  border-radius: .106667rem;
  box-shadow: 0px 1px .186667rem -.133333rem #000;
}
.message .avatar {
  float: left;
  margin: 0 .266667rem 0 0;
  border-radius: .08rem;
  background: #fff;
}
.message .time > span {
  display: inline-block;
  padding: 0 .133333rem;
  font-size: .32rem;
  color: #fff;
  border-radius: .053333rem;
  background-color: #dadada;
}
.message .system > span {
  padding: .106667rem .24rem;
  text-align: left;
}
.message .text:before {
  content: " ";
  position: absolute;
  top: .24rem;
  right: 100%;
  border: .16rem solid transparent;
  border-right-color: #fff;
}
.message .self {
  text-align: right;
}
.message .self .avatar {
  float: right;
  margin: 0 0 0 .266667rem;
}
.message .self .text {
  background-color: #DEDEDE;
}
.message .self .text:before {
  right: inherit;
  left: 100%;
  border-right-color: transparent;
  border-left-color: #DEDEDE;
}
.message .image {
  max-width: 5.333333rem;
}
img.static-emotion-gif,
img.static-emotion {
  vertical-align: middle !important;
}
.an-move-left {
  left: 0;
  animation: moveLeft .7s ease;
  -webkit-animation: moveLeft .7s ease;
}
.an-move-right {
  left: 0;
  animation: moveRight .7s ease;
  -webkit-animation: moveRight .7s ease;
}
.bgnone {
  background: none;
}
@keyframes moveRight {
  0% {
    left: -.533333rem;
    opacity: 0;
  }
  100% {
    left: 0;
    opacity: 1;
  }
}
@-webkit-keyframes moveRight {
  0% {
    left: -.533333rem;
    opacity: 0;
  }
  100% {
    left: 0px;
    opacity: 1;
  }
}
@keyframes moveLeft {
  0% {
    left: .533333rem;
    opacity: 0;
  }
  100% {
    left: 0px;
    opacity: 1;
  }
}
@-webkit-keyframes moveLeft {
  0% {
    left: .533333rem;
    opacity: 0;
  }
  100% {
    left: 0px;
    opacity: 1;
  }
}
@media (max-width: 9.786667rem) {
  .fzDInfo {
    width: 82%;
  }
}
</style>
