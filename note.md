## 项目结构说明
### 主要结构放在src目录
#### common文件夹
放公共资源，包括
- assets（图片资源）
- image（部分临时图片资源）
- js（公共js）
- stylus（公共css，还未进行css转stylus优化）
#### components文件夹
- echarts（图表）
- wordcloud（词云）
- wxWechat（ai页面级组件中的主要组件）
- articleTabbar（详情页底部导航）
- header（头部组件）
- navbar（个股页组件选项卡）
- ripple（点击波纹效果组件）
- search（搜索框组件 - 头部组件有引用）
- tab（资讯页面头部组件）
- tabbar（一级页面底部导航）
#### pages文件夹中放页面级组件 
分层逻辑为非二级页面 
##### 第一层包括
- index（主页面，首页等一级页面通过它渲染展示）
- ai（仿微信聊天框智能机器人页面，该页面大部分样式请在components/wxWechat/wxChat.vue 里面改） 
- error（404页面，跟后端路由冲突，暂时在vue-router中注释） 
- HomePage（首页） 
- login（登录页，其中登录未登录状态都在该页面，需要解耦） 
- overView（智能简报页） 
- own（自选股页面）
##### 第二层（sub）包括
vue文件
- IndividualShar（个股页面）
- plite（板块页面）
- MainText（详情页）

文件夹
- homepage（首页的二级页面）
- index（资讯的二级页面文件夹）
- News（智能简报的详情页）
- search（搜索页）
- sharSub（个股二级页面）

##### 第三层包括
homepage文件夹
- echartImg （ai界面的大盘页面组件）
- echartImgRater （ai界面的个股页面组件）
- homeExplain （对投资指数的解释页）
- table （历史表现页）

index文件夹
- Explain （智读页面）
- Message （快报页面）
- HotEvaluate （热评）
- HotList （暂被注释）

News文件夹
- morningNews （智能早报界面）
- noonNews （智能午报、晚报界面）

search文件夹
- SearchDetail （搜索详情页）
- Searched （搜索显示结果页）
- SearchPage （搜索输入包括搜索历史页）
### ui组件库
vux
### 代码规范工具
eslint
### 第三方插件
demo - 插件名（作用，使用页面）
- swiper （滑动插件，IndividualShar、table）
- mescroll （上拉加载下拉刷新，Explain、Message、HotEvaluate）
- echarts （数据展示图表，所有用到echart的组件均名字中带有echart）
- vue-star（点击特效，articleTabbar）- homepage（首页的二级页面）
- index（资讯的二级页面文件夹）
- News（智能简报的详情页）
- search（搜索页）
- sharSub（个股二级页面）

##### 第三层包括
homepage文件夹
- echartImg （ai界面的大盘页面组件）
- echartImgRater （ai界面的个股页面组件）
- homeExplain （对投资指数的解释页）
- table （历史表现页）

index文件夹
- Explain （智读页面）
- Message （快报页面）
- HotEvaluate （热评）
- HotList （暂被注释）

News文件夹
- morningNews （智能早报界面）
- noonNews （智能午报、晚报界面）

search文件夹
- SearchDetail （搜索详情页）
- Searched （搜索显示结果页）
- SearchPage （搜索输入包括搜索历史页）
### ui组件库
vux
### 代码规范工具
eslint
### 第三方插件
demo - 插件名（作用，使用页面）
- swiper （滑动插件，IndividualShar、table）
- mescroll （上拉加载下拉刷新，Explain、Message、HotEvaluate）
- echarts （数据展示图表，所有用到echart的组件均名字中带有echart）
- vue-star（点击特效，articleTabbar）

## 可优化
### demo
- 问题
- 暂行方案（无）
- 预想解决方案
### ripple插件
- 点击颜色未挑选 水波纹效果不流畅
- 现在的实现原理是在ripple里面有一个input，点击input时触发效果
- 可以考虑把效果解耦或者另找新的插件
### 页面切换动画
- 动画不完整
- 有部分动画是swiper插件完成，有一部分直接写在父路由上面
- 可以重新设计一套动画效果，针对不同的页面跳转
### ios回弹（橡皮筋效果）
- ios中的浏览器自带回弹效果，会展示“此网页由xxx提供”
- 把不需要滚动的地方都给了一个@touchmove.prevent禁止掉它的滑动方法，但是对于一些需要滚动的界面无效，而且对登录页无效，因为登录页很大一块内容是margin-top，无法添加事件
- 给根结点@touchmove.prevent，禁止所有触屏滚动，需要滚动的地方引入better-scroll插件进行滚动
### 滚动条
- ios中右侧滚动条无法隐藏
- 无
- better-scroll可以隐藏，或者https://blog.csdn.net/qianhong_/article/details/52426014 一文中有原生实现方法，需改成vue版。通过mixin进行复用
### 登录界面
- ios依旧无法登陆
- 无
- 因为ios不允许拿到cookie，需要换一种方式进行登录验证操作
### 快报页面
- 初始化之后上拉会带动时间栏
- 直接进入会引起上述bug，但是从智读界面跳入则不会，调整跳转方式,先从智读页面进入，规避此bug
- 时间栏接口较快，提前渲染，mescroll由于要实例化实际渲染在时间栏后面，猜测此时手指上移判断操作dom在时间栏而非mescroll
### 点击动画
- 点击动画有坐标轴偏移
- 引用插件vue-star，并进行手动调整
- 建议原生，效果可能会更好
### 词云
- 需求可点击，自定义颜色大小，点击可跳转
- 修改vue-wordcloud实现部分效果，但是该插件将点击事件封装，所以在该插件所在的盒子中增加点击事件，使其跳转至搜索页，并且颜色值参考d3，并不支持外界传值
- 两种解决方法，一是原生实现，写好大小，颜色的区间，用随机数在其中随机，然后坐标也同样使用随机数，要注意防碰撞
## 可复用
- axios
- 跳转（this.$router.push）
- 插件实例（swiper，mescroll，echart）
- 检查登录状态




login 解耦之后登录页面
<template>
  <div>
    <div class="contain_logo">
      <div class="logo">
        <div class="img"><img :src="this.headimg" alt=""></div>
        <p class="img_end" >{{username}}</p>
      </div>
      <div style="margin-top: 6.44rem;">
        <div style="margin-left: .293333rem;">
          <button class="logOut" @click="logOut">退出登录</button>
        </div>
        <div class="version">
          <p style="padding-bottom:.533333rem;">MegaTech 版本号： 0.1.0</p>
        </div>
      </div>
    </div>
    <tabbar></tabbar>
  </div>
</template>

<script>
import tabbar from '../components/tabbar'
export default {
  components: {
    tabbar
  },
  data () {
    return {
      username: ''
    }
  },
  created () {
    this.checkState()
  },
  mounted: function () {
  },
  methods: {
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
    logOut () {
      this.axios.get(this.linkPrefix + '/users_api/logout')
      this.$router.push('/l')
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
button{
  font-size: .426667rem;
  width: 9.413333rem;
  height: 1.12rem;
  border: none;
  outline: none;
  border-radius: .106667rem;
}
</style>
