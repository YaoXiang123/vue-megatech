<template>
    <x-header style="background-color:#ffffff;title-color:black;position:fixed;z-index:10;width:100%">
      <div>
        <!-- 用于个股、板块页 -->
          <div v-if="HeaderMes.num" style="color:#0b0b0b;font-size:9px;">
              <p style="height: 0.4rem;color: #000000;font-size: 18px;padding-top:3px">{{stockname}} <font style="color:#666666">{{stockcode}}</font></p>
          </div>
        <p v-if="HeaderMes.title" style="height: 0.4rem;color: #000000;font-size: 18px;padding-top:3px">{{HeaderMes.title}}</p>
      </div>
        <div v-if="HeaderMes.avatar" class="avatar">
            <div class="avatar_border">
            </div>
            <div class="avatar_name">
                {{HeaderMes.IdName}}
                <div class="avatar_level">
                    {{HeaderMes.level}}
                </div>
            </div>
        </div>
        <div slot="overwrite-left">
            <!-- <img v-if="HeaderMes.type== 0 || !HeaderMes.type" src="@/assets/images/navbar/ic_appbar_search_large.png" alt="mess" style="width:50%;height:50%;"> -->
            <!-- 返回按钮 -->
            <img v-if="HeaderMes.type== 1" src="../common/assets/icon-common.png/Back@2x.png" alt="mess" style="width:.373333rem;margin-left: 10px;" @click="routerBack()">
            <!-- 点击退出按钮（用于分享页） -->
            <img v-if="HeaderMes.type== 2" src="../common/assets/icon-common.png/Back@2x.png" alt="mess" style="width:.373333rem;margin-left: 10px;" @click="routerCancel()">
        </div>
        <!-- 搜索框 -->
        <div slot="right" v-if="HeaderMes.search" @click="search">
            <img src="../common/assets/icon-common.png/Search@2x.png" alt="mess" style="width:20px;float:right;margin-right: .373333rem;">
        </div>
    </x-header>
</template>

<script>
import { XHeader, XImg } from 'vux'
// import navBar from '@/components/navbar'
export default {
  data () {
    return {
      stockcode: this.HeaderMes['num'],
      stockname: ''
    }
  },
  props: [ 'HeaderMes' ],
  computed: {
  },
  components: {
    XHeader,
    XImg
    // navBar
  },
  mounted: function () {
    if (this.stockcode && this.stockcode !== 0) {
      this.getStockName()
    }
  },
  methods: {
    search () {
      this.$router.push({path: '/SP'})
    },
    getStockName () {
      this.axios.get(this.linkPrefix + '/stocks_api/stock_name', {
        params: {
          stockcode: this.stockcode
        }
      })
        .then(response => {
          this.stockname = response.data.stockname
        //   console.log(this.HeaderMes)
        })
    },
    clickItemChange (index) {
      // console.log(index)
      this.$data.navbarSelected = index
    },
    routerBack () {
      this.$router.back(-1)
    },
    routerCancel () {
      // WeixinJSBridge.call('closeWindow')
    }
  }
}
</script>

<style lang="stylus" scoped>
flex(e)
    display flex
    justify-content center
    align-items center
    flex-direction e
.avatar
    height 4.2666667rem;
    flex(column)
    justify-content flex-start
    padding-top .4rem
    .avatar_border
        width 1.6533333rem
        height 1.6533333rem
        border-radius 50%
        overflow hidden
        flex(row)
        img
            height 100%
    .avatar_name
        font-style .373333rem
        color #14191e
        font-weight bold
        flex(row)
        img
            width .4rem
    .avatar_mess
        flex(row)
        div
            font-size .373333rem
            color #6e7378
            flex(row)
            p
                margin-left .3rem
            span
                width .826667rem
                position relative
                &:after
                    content ''
                    position absolute
                    width .026667rem
                    height .3rem
                    right 0
                    top .38333333rem
                    background-color #c8cdd2
    .getZan:after
        background-color transparent
</style>
