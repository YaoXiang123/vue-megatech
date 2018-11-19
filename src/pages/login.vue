<template>
  <div style="background-color:#ffffff;">
    <div class="contain_logo">
      <div class="logo">
        <!-- 登录后头像 -->
        <div class="img" v-if="defaultLogo"><img :src="this.headimg" alt=""></div>
        <!-- 输入密码时取消按钮 -->
        <div class="img_cancle" @click="back" v-else>
          <img class="login_logo" src="../common/assets/icon-login.png/loging_logo.png" alt="" >
          <div class="cancel">取消</div>
        </div>
        <!-- 登陆后用户名 -->
        <p v-if="username" class="img_end">{{username}}</p>
        <!-- 登录前提示登录 -->
        <p v-else-if="(defaultLogo || !this.username) && checkstate" class="img_end" @click="login">登录/注册</p>
      </div>
      <!-- 登陆后退出登录界面 -->
      <div v-if="log_in" style="margin-top: 6.44rem;">
        <div style="margin-left: .293333rem;">
          <button class="logOut" v-if="username && this.showLogout" @click="logOut">退出登录</button>
        </div>
        <div class="version">
          <p style="padding-bottom:.533333rem;">MegaTech 版本号： 0.1.0</p>
        </div>
      </div>
      <!-- 输入账号密码界面 -->
      <div v-if="loging">
        <group class="group">
          <x-input placeholder="请输入账号" @on-change="changeAccount" ref="input"></x-input>
          <x-input type="password" :max="6" placeholder="请输入6位不连续密码" @on-change="changePassword"  autocomplete="new-password" @on-enter="registe"></x-input>
        </group>
        <div style="margin-left: .293333rem;">
          <button class="registe" style="backgroundColor:#101e73" @click="registe" v-if="Account && password">
            <ripple :width="'9.413333rem'" :color="'#ffffff'">登录/注册</ripple>
          </button>
          <button class="registe" disabled style="background:#cccccc"  v-else>登录/注册</button>
        </div>
         <toast
          v-model="showPositionValue"
          type="text"
          width="4rem"
          :time="2000"
          is-show-mask
          :text="toastText"
          :position="position"
          @on-hide="onHide"></toast>
        <p style="color:#999999; margin:.373333rem 0 0 .293333rem;">进入则代表已阅读并同意《用户协议及隐私条款》</p>
      </div>
    </div>
    <tabbar v-if="!this.loging"></tabbar>
  </div>
</template>

<script>
import ripple from '../components/ripple'
import tabbar from '../components/tabbar'
import XInput from '../../node_modules/vux/src/components/x-input/index'
import Group from '../../node_modules/vux/src/components/group/index'
import Toast from '../../node_modules/vux/src/components/toast/index'
export default {
  components: {
    XInput,
    Group,
    Toast,
    tabbar,
    ripple
  },
  data () {
    return {
      showPositionValue: false, // 是否显示提示
      position: 'middle', // 提示信息的位置
      toastText: '', // 提示文本
      showLogout: true,
      checkstate: false,
      username: '',
      headimg: '../common/assets/icon-login.png/defaultLogo.png',
      img: '',
      log_in: true,
      loging: false,
      buttonState: true,
      Account: '',
      password: '',
      success: '',
      error: '账号错误',
      defaultLogo: true
    }
  },
  created () {
    this.checkState()
  },
  mounted: function () {
    this.tologin()
  },
  methods: {
    back () {
      this.$router.back(-1)
    },
    getCookie (name) {
      let value = '; ' + document.cookie
      let parts = value.split(`;${name}=`)
      if (parts.length === 2) return parts.pop().split(';').shift()
    },
    checkState () {
      this.axios.get(this.linkPrefix + '/users_api/check_login_state')
        .then(response => {
          if (response.data.flag) {
            this.username = response.data.username
            if (response.data.userInfo) {
              this.username = response.data.userInfo.nickname
              this.showLogout = false
              if (response.data.userInfo.headimgurl.length > 0) {
                this.headimg = response.data.userInfo.headimgurl
              }
            }
            this.log_in = true
            this.loging = false
          }
          this.checkstate = true
        })
    },
    tologin () {
      if (this.$route.query.tologin) {
        this.defaultLogo = false
        this.log_in = false
        this.loging = true
        this.$nextTick(() => {
          this.$refs['input'].focus()
        })
      }
    },
    // 调用toast
    onHide () {
      if (this.success) {
        this.$router.back(-1)
      }
    },
    // 登录提交表单
    registe_get () {
      let getData = {
        'username': this.Account,
        'password': this.md5(this.password)
      }
      this.axios({
        method: 'get',
        url: this.linkPrefix + '/users_api/register_or_login',
        params: getData
      })
        .then(response => {
          if (response.data.flag) {
            this.username = response.data.username
            this.log_in = true
            this.loging = false
            this.$router.back(-1)
          }
          this.showPositionValue = true
          this.toastText = response.data.message
        })
    },
    registe () {
      this.registe_get()
    },
    registe_post () {
      let postData = this.qs.stringify({
        'username': this.Account,
        'password': this.md5(this.password)
      })
      this.axios({
        method: 'post',
        url: this.linkPrefix + '/users_api/register_or_login',
        headers: {'X-CSRFToken': this.getCookie('csrftoken')},
        data: postData
      })
        .then(response => {
          if (response.data.flag) {
            this.username = response.data.username
            this.log_in = true
            this.loging = false
            this.$router.back(-1)
          }
          this.showPositionValue = true
          this.toastText = response.data.message
        })
    },
    changeAccount (value) {
      this.Account = value
    },
    changePassword (value) {
      this.password = value
    },
    login () {
      this.log_in = false
      this.loging = true
      this.showPositionValue = false
      this.defaultLogo = false
      this.$nextTick(() => {
        this.$refs['input'].focus()
      })
    },
    logOut () {
      this.axios.get(this.linkPrefix + '/users_api/logout')
      this.log_in = true
      this.loging = false
      this.username = ''
    }
  }
}
</script>

<style scoped>
.img_end{
  color:#ffffff;
  padding-top:.186667rem;
  font-size:.426667rem;
}
.img img{
  width: 2rem;
}
.img_cancle{
  height: 2.746667rem;
  width: 2rem;
  position:relative;
}
.cancel{
  font-size: .426667rem;
  color: #ffffff;
  position: relative;
  top: -.933333rem;
  left: 6.72rem;
}
.group /deep/ .weui-cells:before{
  display: none;
}
.group /deep/ .weui-cell:before, .group /deep/ .weui-cells:after{
  width: 90%;
  border-bottom: .026667rem solid #f2f2f2;
  border-top: .026667rem solid #f2f2f2;
}
.group /deep/ .weui-cells:after{
  left: .4rem;
}
.group /deep/ .weui-cells{
  margin-top:0;
}
.group /deep/ .weui-cell{
  padding-top: .4rem
}
.group /deep/ :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #cccccc; opacity:1;
    font-size: .426667rem;
}

.group /deep/ ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #cccccc;opacity:1;
    font-size: .426667rem;
}

.group /deep/ .weui-input:-ms-input-placeholder{
    color: #cccccc;opacity:1;
    font-size: .426667rem;
}

.group /deep/ .weui-input::-webkit-input-placeholder{
    color: #cccccc;opacity:1;
    font-size: .426667rem;
}
.contain_logo{
  width: 100%;
  height: 5.093333rem;
  background-color: #101e73;
}
.img{
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto;
  background-color: #fff;
}
.logo{
  padding: 1.186667rem 1.28rem;
  text-align: center;
}
.version{
  width:100%;
  text-align: center;
  color: #9b9b9b;
  bottom: 1.333333rem;
  position: absolute;
}
.logOut{
  background-color: #f2f2f2;
  color: #101e73;
}
.registe{
  background-color: #b4b5c5;
  color:#ffffff;
  margin-top: 1.066667rem;
}
button{
  font-size: .426667rem;
  width: 9.413333rem;
  height: 1.12rem;
  border: none;
  outline: none;
  border-radius: .106667rem;
}
.login_logo{
  width: 4.346667rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  padding-left: 5.333333rem;
}
</style>
