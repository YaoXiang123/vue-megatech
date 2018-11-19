<template>
  <div style="overflow:hidden">
    <Header :HeaderMes="HeaderMes"></Header>\
    <hr class="hr" style="margin-top:.8rem;">
    <div class="main">
      <span class="title">{{newsDetail.title}}</span>
      <div class="time">
        <p style="margin-left:0rem;">{{newsDetail.source}}</p>
        <p>{{newsDetail.day}}</p>
        <p>{{newsDetail.time}}</p>
        <p v-if="newsDetail.readnum">阅读{{newsDetail.readnum}}</p>
        <p v-if="newsDetail.hotval">热度{{newsDetail.hotval}}</p>
      </div>
      <article v-html="newsDetail.content"></article>
      <!--<div class="bdsharebuttonbox bdshare-button-style0-16">
        <a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a>
        <a href="#" class="bds_tqq" data-cmd="tqq" title="分享到腾讯微博"></a>
        <a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信"></a>
        <a href="#" class="bds_sqq" data-cmd="sqq" title="分享到QQ好友"></a>
        <a href="#" class="bds_evernotecn" data-cmd="evernotecn" title="分享到印象笔记"></a>
      </div>
      <div class="-mob-share-open">分享</div>
      <share :config="config"></share>-->
    </div>

    <article-tabbar :articleTabbar="articleTabbar" v-bind:pagetype="pagetype" v-bind:news_url = "url" v-bind:islike = "islike"></article-tabbar>
    <loading v-model="showLoading" ></loading>
  </div>
</template>

<script>
import Loading from '../../../node_modules/vux/src/components/loading/index'
import Header from '@/components/header'
import articleTabbar from '@/components/articleTabbar'
export default {
  components: {
    Header,
    articleTabbar,
    Loading
  },
  data () {
    return {
      pagetype: 'news',
      showLoading: true,
      url: '',
      img: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3641064786,3874798264&fm=27&gp=0.jpg',
      force: 0,
      islike: 0,
      HeaderMes: {
        title: '',
        type: 1,
        search: true
      },
      articleTabbar: {hide: true},
      newsDetail: {}
    }
  },
  created: function () {
    window._bd_share_main = ''
  },
  // created: function () {
  //   console.log(this.$route.params.id)
  // },
  mounted: function () {
    this.getNewsDetail()
    setTimeout(() => {
      this.setup()
    }, 0)
    if (window.history.length < 2) {
      this.HeaderMes.type = 2
    }
    // this.setup()
  },
  methods: {
    setup () {
      window._bd_share_config = {
        'common': {
          'bdSnsKey': {},
          'bdText': this.newsDetail.title,
          'bdMini': '2',
          'bdPic': '',
          'bdStyle': '0',
          'bdSize': '32'
        },
        'share': {}
      }
      const s = document.createElement('script')
      s.type = 'text/javascript'
      s.src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5)
      document.body.appendChild(s)
    },
    forceIt () {
      if (this.$data.force === 0) {
        this.$data.force = 1
      } else {
        this.$data.force = 0
      }
    },
    getNewsDetail () {
      this.axios.get(this.linkPrefix + '/message_api/news_detail', {
        params: {
          url: this.$route.query.url,
          type: this.$route.query.type
        }
      })
        .then(response => {
          this.showLoading = false
          this.news = response.data
          this.newsDetail = response.data.result
          this.islike = response.data.islike
          this.url = response.data.url
          this.HeaderMes.title = response.data.headtitle
          // console.log('url ' + this.url)
        })
    }
  }
}
</script>

<style scoped>
.main{
  width: 9.107rem;
  margin-left: .4465rem;
  margin-bottom: 2.4rem;
  padding-top:.32rem;
}
.hr{
  border:.013333rem solid #f2f2f2;
}
.title{
  font-size: .533333rem;
  color: #000000;
  letter-spacing: -.0128rem;
  line-height: .746667rem;
}
.time{
  width: 100%;
  padding:.32rem 0 .426667rem 0;
  color: #999999;
  font-size: .32rem;
  line-height: .453333rem;
  display: flex;
  justify-content: flex-start;
}
.time p{
  margin-left: .32rem;
}
article{
  font-size: .426667rem;
  line-height: .746667rem;
  color:#333333;
  letter-spacing: -.0104rem;
}
article /deep/ p{
  height: .266667rem;
}
.author{
  height:1.88rem;
  display:flex;
  flex-direction:row;
  align-items:center;
  background-color: #eaeaea;
  border-radius: .22rem;
}
.profile{
  width:1.3733333333rem;
  height: 1.37333333333333rem;
  border-radius: 50%;
  background-color: red;
  overflow: hidden;
}
.name{
  margin-left: .1rem;
  color: #4f8bfe;
  font-size: .4rem;
}
.buttonArea{
  flex:1;
  display:flex;
  justify-content:flex-end;
  align-items:center;
}
.button{
  height:.54666666666666rem;
  width:1.133333333rem;
  text-align:center;
  line-height:.6rem;
  color:#fff;
  font-weight:bold;
  background-color:#ff4c4b;
  border-radius:.12rem;
  margin-right: .186rem;
}
article{
  font-size: .426667rem;
  line-height: .8233333333333333333rem;
  text-align: justify;
}
.footer{
  display:flex;
  justify-content:space-around;
  height: 1rem;
  position: fixed;
  width: 100%;
  background-color: #ffffff;
  top: 16.8rem;
  border-top: .026667rem solid;
}
.footer div{
  padding-top:.266667rem;
}
</style>
