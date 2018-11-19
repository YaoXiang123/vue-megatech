<template>
  <div style="background-color: #ffffff;">
    <Header :HeaderMes="HeaderMes"></Header>
    <!-- 自选股有数据 start -->
    <div class="body" v-if="share">
      <div class="contains">
        <!-- <hr class="hr"> -->
        <div class="contain" style="padding-top: -0.1rem;">
          <div class="contain_left">股票名称</div>
          <div class="contain_center">最新价</div>
          <div class="contain_right">涨跌幅</div>
        </div>
        <hr class="hr">
      </div>
      <div class="contains_body">
        <div v-for="(item,index) in share" :key="index" @touchstart="showDeleteButton(index)" @touchend="clearLoop" @click="ToIndividual(index)">
          <div class="contain">
            <div class="shareName">
              <div class="shareName_name" >{{item.name}}</div>
              <div class="shareName_num" >{{item.num}}</div>
            </div>
            <div class="contain_now">{{item.now}}</div>
            <div class="contain_chg" :style="{color:item.color}" v-if="item.chg">{{item.chg}}</div>
          </div>
          <HR width="100%"  color=#f2f2f2 SIZE=1 />
        </div>
      </div>

      <!-- 长按删除 start -->
      <x-dialog v-model="showDialog" :dialog-style="{'max-width': '50%', width: '6.4rem', height: '2.56rem',left:'-1.013333rem', 'background-color': '#ffffff'}">
        <div @click="isdelete(index)" class="tip">删除</div>
        <hr class="hr">
        <div @click="cancel" class="tip">取消</div>
      </x-dialog>
      <!-- 长按删除 end -->
    </div>
    <!-- 自选股有数据 end -->
    <!-- 无数据页面 start -->
    <div class="noshare_contain" @touchmove.prevent v-else>
      <div class="noshare">
        暂无自选股
      </div>
      <button class="noshareButton" @click="toHome"><ripple :width="'4.426667rem'" :color="'#ffffff'">去挑选</ripple></button>
      <div class="unlogin" v-if="login === 0">
        <p>登录后，资讯推荐更精准，智能简报阅读更及时，云端数据同步更实时</p><div class="login" @click="toLogin">登录</div>
      </div>
    </div>
    <!-- 无数据页面 end -->
    <tabbar></tabbar>
    <loading v-model="showLoading" ></loading>
    <div class="toast">
      <toast v-model="showToast" type="text" width="4rem" :time="2200" is-show-mask :text="toastText" :position="position"></toast>
    </div>
  </div>
</template>

<script>
import XDialog from '../../node_modules/vux/src/components/x-dialog/index'
import Loading from '../../node_modules/vux/src/components/loading/index'
import Toast from '../../node_modules/vux/src/components/toast/index'
import ripple from '../components/ripple'
import Header from '../components/header'
import tabbar from '../components/tabbar'
let interval
export default {
  components: {
    tabbar,
    Header,
    XDialog,
    Loading,
    ripple,
    Toast
  },
  data () {
    return {
      toastText: '删除成功',
      showToast: false,
      position: 'bottom',
      showLoading: true,
      login: -1,
      index: '',
      showDialog: false,
      HeaderMes: {
        title: '自选股',
        search: true
      },
      share: []
    }
  },
  mounted: function () {
    interval = setInterval(this.getHQ, 5000)
    this.getStocks()
    this.checkState()
  },
  destroyed: function () {
    clearInterval(interval)
  },
  methods: {
    // 跳转到登录页面并告诉后台登录状态
    toLogin () {
      this.$router.push({path: '/L', query: {tologin: 1}})
    },
    // 判断是否登录
    checkState () {
      this.axios.get(this.linkPrefix + '/users_api/check_login_state')
        .then(response => {
          if (response.data.flag) {
            this.login = 1
          } else {
            this.login = 0
            console.log(this.login)
          }
        })
    },
    // 获取行情数据
    getHQ () {
      let u = ''
      if (!this.share) {
        return
      }
      if (this.share.length === 0) {
        return
      }
      this.share.map(function (value) {
        u += `s_${value.num},`
      })
      u = u.toLocaleLowerCase()
      this.axios.get(this.linkPrefix + '/stocks_api/stock_hq', {
        params: {
          stocks: u
        }
      })
        .then(response => {
          if (response.data.stock_price && response.data.stock_price.length === this.share.length) {
            this.share.map(function (value, i) {
              if (value.code === response.data.stock_price[i].stockcode) {
                // console.log(value, response.data.stock_price[i])
                value.now = response.data.stock_price[i].price
                value.chg = response.data.stock_price[i].change
                value.color = response.data.stock_price[i].color
                // console.log(value)
              }
            })
            this.showLoading = false
          }
        })
    },
    getStocks () {
      this.share = []
      this.axios.get(this.linkPrefix + '/stocks_api/user_stocks')
        .then(response => {
          this.share = response.data.user_stocks
          // console.log(this.share)
          this.getHQ()
        })
    },
    deleteUserStock (stockcode) {
      this.axios.get(this.linkPrefix + '/stocks_api/delete_user_stock', {
        params: {
          stockcode: stockcode
        }
      })
    },
    showDeleteButton (index) {
      clearInterval(this.Loop) // 再次清空定时器，防止重复注册定时器
      let This = this
      this.Loop = setTimeout(function () {
        This.showDialog = true
        This.index = index
      }, 1000)
    },
    clearLoop () {
      clearInterval(this.Loop)
    },
    isdelete (index) {
      this.showDialog = false
      this.deleteUserStock(this.share[index].code)
      this.share.splice(index, 1)
      this.showToast = true
    },
    cancel () {
      this.showDialog = false
    },
    ToIndividual (data) {
      this.$router.push({path: '/news/' + this.share[data].code})
    },
    toHome () {
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>

<style scoped>
.body{
  padding-top: 1.2rem;
}
.toast /deep/ .weui-toast.vux-toast-bottom {
  bottom: 1.4rem
}
.contains{
  margin-top:-1px;
  position: fixed;
  background-color: #ffffff;
  display: flex;
  width: 100%;
}
.contain{
  display: flex;
  width: 100%;
  justify-content: space-around;
  font-size: .373333rem;
  line-height: .533333rem;
  color: #999999;
  padding: .186667rem 0 .213333rem 0;
  -webkit-user-select: none;/*禁用手机浏览器的用户选择功能 */
  -moz-user-select: none;
}
.contains_body{
  margin-top: .906133rem;
}
.contain_left, .contain_center, .contain_right, .shareName, .contain_now, .contain_chg{
  width:3.333rem;
}
.contain_left, .shareName{
  padding-left: .32rem;
}
.contain_center, .contain_now, .contain_right, .contain_chg{
  text-align: right;
}
.contain_right, .contain_chg{
  padding-right: .32rem;
}
.contain_now{
  line-height:.96rem;
  font-size:.48rem;
  color:#000000;
}
.contain_chg{
  line-height:.96rem;
  font-size:.48rem;
}
.shareName_name, .tip, .noshare{
  font-size:.426667rem;
}
.shareName_name{
  line-height:.586667rem;
  color:#000000;
}
.shareName_num{
  font-size:.32rem;
  line-height:.373333rem;
  color:#999999
}
.noshare_contain{
  text-align: center;
}
.tip{
  width: 100%;
  line-height: .586667rem;
  text-align: left;
  padding:.373333rem 0 .293333rem .4rem
}
.noshare{
  width: 100%;
  text-align: center;
  padding-top: 5.826667rem;
  line-height: .586667rem;
  color:#cccccc;
}
.noshareButton{
  width: 4.426667rem;
  height: .96rem;
  background-color: #101e73;
  color:#ffffff;
  line-height: .586667rem;
  border-radius: .2rem;
  margin-top: 3.626667rem;
  border:0;
  outline:none;
}
.unlogin{
  position: fixed;
  bottom:1.2rem;
  height: 1.386667rem;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: .013333rem solid #f2f2f2;
}
.unlogin p{
  width: 7.546667rem;
  height: .96rem;
  text-align: left;
}
.login{
  font-size: .373333rem;
  color: #101e73;
  letter-spacing: -.009067rem;
  text-align: center;
  background: #FFFFFF;
  border: .026667rem solid #101e73;
  border-radius: .106667rem;
  width: 1.386667rem;
  height: .64rem;
}
.hr{
  border:.00000013333rem solid #f2f2f2;
}
</style>
