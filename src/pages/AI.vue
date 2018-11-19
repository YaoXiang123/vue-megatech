<template>
<wxChat
  @submitValue= 'submitValue'
  :data="wxChatData"
  :showShade="false"
  contactNickname="小智（AI投资助手）"
  :getUpperData="getUpperData"
  :getUnderData="getUnderData"
  :ownerAvatarUrl="ownerAvatarUrl"
  :contactAvatarUrl="contactAvatarUrl"
  :width="width">
</wxChat>
</template>

<script>
import wxChat from '@/components/wxwechat/wxChat.vue'
export default {
  components: {
    wxChat
  },
  data () {
    return {
      userinfo: {},
      upperTimes: 0,
      underTimes: 0,
      upperId: 0,
      underId: 6,
      userArray: {},
      width: window.screen.width,
      ownerAvatarUrl: 'https://sinacloud.net/vue-wechat/images/url-qrcode-both.jpg',
      contactAvatarUrl: 'https://sinacloud.net/vue-wechat/images/url-qrcode-both.jpg',
      wxChatData: []
    }
  },
  mounted: function () {
    if (this.isweixin) {
      if (this.$route.query.state === 'b') {
        this.userLogin()
      } else {
        this.checkLoginState()
      }
    } else {
      this.get_history()
    }
  },
  methods: {
    get_history () {
      this.axios.get(this.linkPrefix + '/chatbot_api/chathistory', {
        params: {
          nums: 1
        }
      })
        .then(response => {
          if (response.data.size && response.data.size > 0) {
            this.wxChatData = response.data.history
            console.log('history')
          } else {
            const tmp =
            {
              direction: 1,
              id: 0,
              type: 1,
              content: '您好，小智为您服务！为您提供最新的大盘和个股的智能分析结果与智能简报。',
              ctime: new Date().toLocaleString()
            }
            this.wxChatData.push(tmp)
          }
          console.log(this.wxChatData)
        })
    },
    checkLoginState () {
      this.axios.get(this.linkPrefix + '/users_api/check_login_state')
        .then(response => {
          if (response.data.flag === 1 && response.data.userInfo) {
            this.userinfo = response.data.userInfo
            this.ownerAvatarUrl = this.userinfo.headimgurl
            this.get_history()
          } else {
            window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + response.data.appid + '&redirect_uri=' + location.href.split('?')[0] + '&response_type=code&scope=snsapi_userinfo&state=b#wechat_redirect'
          }
        })
    },
    userLogin () {
      this.axios.get(this.linkPrefix + '/users_api/weixin_user_login', {
        params: {
          code: this.$route.query.code
        }
      })
        .then(response => {
          if (response.data.userInfo) {
            this.userinfo = response.data.userInfo
            this.ownerAvatarUrl = this.userinfo.headimgurl
            this.get_history()
          } else {
            console.log('login failed')
          }
        })
    },
    submitValue (data) {
      this.userArray =
        {
          direction: 2,
          id: 6,
          type: 1,
          content: data
        }
      this.wxChatData.push(this.userArray)
      this.axios.get(this.linkPrefix + '/chatbot_api/chatmessage', {
        params: {
          question: data
        }
      })
        .then(response => {
          if (response.data.sucess) {
            // this.wxChatData = response.data.report_list
            this.wxChatData.push(response.data.data)
            console.log(response.data, 'ss', this.wxChatData)
            this.type = response.data.type
            this.alett = response.data.alett
            this.url = response.data.url
          } else {
            console.log(response.data.msg)
          }
        })
      console.log(this.wxChatData[this.wxChatData.length - 1])
    },
    // 向上滚动加载数据
    getUpperData () {
      let me = this
      // 这里为模拟异步加载数据
      // 实际上你可能要这么写:
      // return axios.get('xxx').then(function(result){
      //     return result;  //result的格式需要类似下面resolve里面的数组
      // })
      return new Promise(function (resolve) {
        setTimeout(function () {
          // 模拟加载完毕
          if (me.upperTimes > 3) {
            return resolve([])
          }
          // 加载数据
          resolve([
            {
              direction: 2,
              id: me.upperId - 1,
              type: 1,
              content: '向上滚动加载第 ' + me.upperTimes + ' 条！',
              ctime: new Date().toLocaleString()
            },
            {
              direction: 1,
              id: me.upperId - 2,
              type: 1,
              content: '向上滚动加载第 ' + me.upperTimes + ' 条！',
              ctime: new Date().toLocaleString()
            }]
          )
        }, 1000)
        me.upperId = me.upperId + 2
        me.upperTimes++
      })
    },
    getUnderData () {
      let me = this
      // 意义同getUpperData()
      return new Promise(function (resolve) {
        setTimeout(function () {
          // 模拟加载完毕
          if (me.underTimes > 3) {
            return resolve([])
          }
          // 加载数据
          resolve(
            [{
              direction: 1,
              id: me.underId + 1,
              type: 1,
              content: '向下滚动加载第 ' + me.underTimes + ' 条！',
              ctime: new Date().toLocaleString()
            },
            {
              direction: 2,
              id: me.underId + 2,
              type: 1,
              content: '向下滚动加载第 ' + me.underTimes + ' 条！',
              ctime: new Date().toLocaleString()
            }]
          )
        }, 1000)
        me.underId = me.underId + 2
        me.underTimes++
      })
    }
  }
}
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 1.6rem;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
}
</style>
