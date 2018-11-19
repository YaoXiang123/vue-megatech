<template>
  <div class="fixed">
    <div class="line deadLine" style="padding: .266667rem 0;">
      <div style="vertical-align:middle;" @click="relay"><img src="../common/assets/icon-articleTabbar.png/Launch@2x.png" style="width:.48rem;" align="absmiddle"><span> 转发</span></div>
      <div >
        <vue-star animate="yourAnimateCssClass" color="#F5A623" style="margin-top: -1.1rem;margin-left: -1.453333rem;">
          <img slot="icon" src="../common/assets/icon-articleTabbar.png/FavoriteActive@2x.png" style="width: .432rem;margin-top:.133333rem" @click="likepage" v-if="active"/>
          <img slot="icon" src="../common/assets/icon-articleTabbar.png/Favorite@2x.png" style="width: .432rem;"  @click="likepage" align="absmiddle" v-else>
        </vue-star>
        <span :class="{favorite:this.active}" @click="likepage"> &nbsp;喜欢</span>
      </div>
      <div @click="runSound" v-if="run">
        <img src="../common/assets/icon-articleTabbar.png/Pause@2x.png" style="width: .48rem;" align="absmiddle" >
        <span>暂停</span>
      </div>
      <div @click="stopSound" :class="{hide:articleTabbar.hide}" v-else>
        <img src="../common/assets/icon-articleTabbar.png/Play@2x.png" style="width: .48rem;" align="absmiddle"  >
        <span>播报</span>
      </div>
    </div>
  </div>
</template>

<script>
import VueStar from 'vue-star'
// import Vue from 'vue'
export default {
  components: {
    VueStar
  },
  props: ['pagetype', 'news_url', 'report_id', 'islike', 'articleTabbar'],
  data () {
    return {
      run: false,
      active: false
    }
  },
  watch: {
    islike: {
      handler: function (val, oldval) {
        console.log('watch is like ' + val)
        if (this.islike === 1) {
          this.active = true
        } else {
          this.active = false
        }
      }
    }
  },
  methods: {
    runSound (e) {
      // console.log(e)
      this.run = !this.run
      this.$emit('changePlayState', 'pause')
    },
    likepage () {
      if (this.pagetype === 'report') {
        this.likereport()
      } else if (this.pagetype === 'news') {
        this.likenews()
      } else {
        console.log('pagetype is ' + this.pagetype + ' not exists')
      }
    },
    likenews () {
      let isLike = 1
      if (this.active) {
        isLike = 0
      }
      this.axios.get(this.linkPrefix + '/message_api/like_news', {
        params: {
          news_url: this.news_url,
          is_like: isLike
        }
      })
        .then(response => {
          if (response.data.not_login) {
            this.$router.push({path: '/L', query: {tologin: 1}})
          } else if (response.data.success) {
            this.islike = response.data.islike
          }
        })
    },
    likereport () {
      let isLike = 1
      if (this.active) {
        isLike = 0
      }
      this.axios.get(this.linkPrefix + '/aireport_api/like_report', {
        params: {
          report_id: this.report_id,
          is_like: isLike
        }
      })
        .then(response => {
          if (response.data.success) {
            this.islike = response.data.islike
          }
        })
    },
    relay () {
      console.log('relay')
      // Vue.wechat.ready(function () {
      //   Vue.wechat.updateAppMessageShareData({
      //     title: '', // 分享标题
      //     desc: '', // 分享描述
      //     link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      //     imgUrl: '' // 分享图标
      //   }, function (res) {
      //     console.log('分享成功')
      //   })
      // })
    },
    stopSound () {
      this.run = !this.run
      this.$emit('changePlayState', 'play')
      // this.$emit('runSound')
    }
  }
}
</script>

<style scoped>
.favorite{
  color:#F5A623;
}
.line{
  display:flex;
  justify-content:space-around;
}
.deadLine{
  z-index: 500;
  position: fixed;
  width: 100%;
  background-color: #f8f8f8;
  bottom: 0;
}
span{
  color:#666666;
}
.hide{
  display:none
}
</style>
