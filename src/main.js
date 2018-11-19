// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
// import fastclick from 'fastclick'
import 'lib-flexible/flexible'
import axios from 'axios'
import qs from 'qs'
import md5 from 'js-md5'
// import wx from 'wx'
import { WechatPlugin, AjaxPlugin } from 'vux'
Vue.use(WechatPlugin)
Vue.use(AjaxPlugin)
Vue.prototype.axios = axios
Vue.prototype.linkPrefix = 'http://192.168.10.101:8004'
Vue.prototype.axios.defaults.withCredentials = true
Vue.prototype.qs = qs
Vue.prototype.md5 = md5
// Vue.prototype.wx = wx
// fastclick.attach(document.body)
Vue.prototype.isweixin = false
if (navigator.userAgent.indexOf('MicroMessenger') > -1) {
  Vue.prototype.isweixin = true
}
// console.log(navigator.platform)
// Vue.use()
// console.log(Vue.prototype.wx)
Vue.config.productionTip = false
if (Vue.prototype.isweixin) {
  Vue.prototype.axios.get(Vue.prototype.linkPrefix + '/homepage_api/weixin_config', {
    params: {
      url: location.href.split('#')[0]
    }
  })
    .then(response => {
      // console.log(response.data)
      Vue.wechat.config(response.data.config)
    })
}
// Vue.http.get(Vue.prototype.linkPrefix + '/homepage_api/weixin_config', ({data}) => {
//   console.log(data)
//   Vue.wechat.config(data.config)
// })
// Vue.wechat.config({
//   debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//   appId: 'wxf129f6c9ecaf15de', // 必填，公众号的唯一标识
//   timestamp: '', // 必填，生成签名的时间戳
//   nonceStr: '', // 必填，生成签名的随机串
//   signature: '', // 必填，签名
//   jsApiList: [] // 必填，需要使用的JS接口列表
// })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App></App>'
})
// 渲染app.vue
