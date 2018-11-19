<template>
  <div class="contain_body">
    <Header :HeaderMes="HeaderMes" ></Header>
    <!-- <vue-table style="padding-top: 1.2rem;" :tdata="tableData" :tcolumns="tableColumns" :tdHeight="40" :selectFixed="true" :scrollHight="200"></vue-table> -->
    <div style="padding-top: 1.2rem;">
      <div class="swiper-container swiper_con">
        <!-- 选项卡1 start-->
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div>
              <div class="explain">
                <p>当日上证涨跌幅：</p>
                <p>(收盘时上证指数-早开盘时上证指数)/早开盘时上证指数</p>
                <p>(收盘时上证指数-午开盘时上证指数)/午开盘时上证指数</p>
                <p>当日涨跌幅：</p>
                <p>(个股收盘价-早开盘价)/早开盘价</p>
                <p>(个股收盘价-午开盘价)/午开盘价</p>
                <p>最大涨跌幅：</p>
                <p>(第二个交易日最高价-第一个交易日最低价)/第一个交易日最低价</p>
                <p>(第二个交易日最高价-第一个交易日午盘最低价)/第一个交易日午盘最低价</p>
              </div>
              <div class="bodys">
                <div class="body_fixed">
                  <div style=" width: 2rem;text-align:center" v-for="(item,index) in tableDataPage1" :key="index">
                    <div style="width:100%;height:1.28rem;  border-bottom: 1px solid #e8e8e8;" :class="index === 0?'head':''">{{item.stockname}}</div>
                  </div>
                </div>
                <div class="scroll">
                  <div class="body" v-for="(item,index) in tableDataPage1" :key="index" >
                    <div class="movable" :class="index === 0?'head':''">
                      <div style="width:2.5rem;">{{item.date}}</div>
                      <div style="width:2.5rem;"><font :style="{color:item.changeColor}">{{item.change}}</font></div>
                      <div style="width:2.5rem;">{{item.di}}</div>
                      <div>{{item.kai}}</div>
                      <div>{{item.shou}}</div>
                      <div>{{item.n_kai}}</div>
                      <div>{{item.n_gao}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 选项卡1 end-->
        <!-- 选项卡2 start-->
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div>
              <div class="bodys">
                <div class="body_fixed">
                  <div style=" width: 2rem;text-align:center" v-for="(item,index) in tableDataPage2" :key="index">
                    <div style="width:100%;height:1.28rem;  border-bottom: 1px solid #e8e8e8;" :class="index === 0?'head':''">{{item.stockname}}</div>
                  </div>
                </div>
                <div class="scroll">
                  <div class="body" v-for="(item,index) in tableDataPage2" :key="index" >
                    <div class="movable" :class="index === 0?'head':''">
                      <div>{{item.date}}</div>
                      <div><font :style="{color:item.changeColor}">{{item.change}}</font></div>
                      <div>{{item.di}}</div>
                      <div>{{item.kai}}</div>
                      <div>{{item.shou}}</div>
                      <div>{{item.n_kai}}</div>
                      <div>{{item.n_gao}}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="pointer">
                <p></p>
              </div>
            </div>
          </div>
        </div>
        <!-- 选项卡2 end-->
        <!-- 选项卡3 start-->
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div>
              <div class="bodys">
                <div class="body_fixed">
                  <div style=" width: 2rem;text-align:center" v-for="(item,index) in tableDataPage3" :key="index">
                    <div style="width:100%;height:1.28rem;  border-bottom: 1px solid #e8e8e8;" :class="index === 0?'head':''">{{item.stockname}}</div>
                  </div>
                </div>
                <div class="scroll">
                  <div class="body" v-for="(item,index) in tableDataPage3" :key="index" >
                    <div class="movable" :class="index === 0?'head':''">
                      <div>{{item.date}}</div>
                      <div><font :style="{color:item.changeColor}">{{item.change}}</font></div>
                      <div>{{item.di}}</div>
                      <div>{{item.kai}}</div>
                      <div>{{item.shou}}</div>
                      <div>{{item.n_kai}}</div>
                      <div>{{item.n_gao}}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="pointer">
                <p></p>
              </div>
            </div>
          </div>
        </div>
        <!-- 选项卡3 end-->
        <!-- 选项卡4 start-->
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div>
              <div class="bodys">
                <div class="body_fixed">
                  <div style=" width: 2rem;text-align:center" v-for="(item,index) in tableDataPage4" :key="index">
                    <div style="width:100%;height:1.28rem;  border-bottom: 1px solid #e8e8e8;" :class="index === 0?'head':''">{{item.stockname}}</div>
                  </div>
                </div>
                <div class="scroll">
                  <div class="body" v-for="(item,index) in tableDataPage4" :key="index" >
                    <div class="movable" :class="index === 4?'movable_dead':(index === 0?'head':'')">
                      <div>{{item.date}}</div>
                      <div><font :style="{color:item.changeColor}">{{item.change}}</font></div>
                      <div>{{item.di}}</div>
                      <div>{{item.kai}}</div>
                      <div >{{item.shou}}</div>
                      <div>{{item.n_kai}}</div>
                      <div>{{item.n_gao}}</div>
                    </div>
                  </div>
                </div>
              </div>
              <p style="margin-top: 1rem;text-align: center;color: #999999;">--没有更多数据了--</p>
            </div>
          </div>
        </div>
        <!-- 选项卡4 end-->
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import Header from '../../../components/header'
export default {
  components: {
    Header,
    Swiper
  },
  data () {
    return {
      HeaderMes: {
        title: '历史表现',
        search: true,
        type: 1
      },
      tableData: [],
      tableDataPage1: [],
      tableDataPage2: [],
      tableDataPage3: [],
      tableDataPage4: [],
      tableDataPage5: [],
      tableDataHead: {
        stockname: '股票名称',
        date: '日期',
        change: '涨跌幅',
        kai: '开盘价',
        di: '收盘价',
        shou: '当日最低价',
        n_kai: '次日开盘价',
        n_gao: '次日最高价'
      },
      tableColumns: [
        {
          title: '股票名称',
          key: 'stockname',
          textAlign: 'center',
          width: 100
        },
        { title: '日期', key: 'date', textAlign: 'center', width: 100 },
        { title: '涨跌幅', key: 'change', textAlign: 'right', width: 100 },
        { title: '开盘价', key: 'kai', textAlign: 'right', width: 100 },
        { title: '收盘价', key: 'shou', textAlign: 'right', width: 100 },
        { title: '当日最低价', key: 'di', textAlign: 'right', width: 100 },
        { title: '次日开盘价', key: 'n_kai', textAlign: 'right', width: 100 },
        { title: '次日最高价', key: 'n_gao', textAlign: 'right', width: 100 }
      ]
    }
  },
  mounted: function () {
    this.getData()
    this.swiper()
  },
  methods: {
    // 实例化swiper
    swiper () {
      let that = this
      that.mySwiper = new Swiper('.swiper-container', {
        initialSlide: 0,
        speed: 500,
        direction: 'vertical',
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        height: window.innerHeight,
        on: {
          slideChangeTransitionEnd: function () {
            that.$data.navbarSelected = this.activeIndex
          }
        },
        onSlideChangeStart: function () {
          that.nowIndex = that.mySwiper.activeIndex
        }
      })
    },
    // 切割数组
    getData () {
      this.tableData = []
      this.axios
        .get(this.linkPrefix + '/homepage_api/history_stock')
        .then(response => {
          this.tableData = response.data.results
          this.tableDataPage1 = this.tableData.slice(0, 5)
          this.tableDataPage1.unshift(this.tableDataHead)
          this.tableDataPage2 = this.tableData.slice(5, 15)
          this.tableDataPage2.unshift(this.tableDataHead)
          this.tableDataPage3 = this.tableData.slice(15, 25)
          this.tableDataPage3.unshift(this.tableDataHead)
          this.tableDataPage4 = this.tableData.slice(25, 29)
          this.tableDataPage4.unshift(this.tableDataHead)
        })
    }
  }
}
</script>

<style scoped>
.contain_body{
  background-color: #ffffff;
}
.scroll::-webkit-scrollbar{
  display: none;
  -webkit-overflow-scrolling: touch;
}
.scroll {
  overflow-x:auto;
  overflow-y: scroll;
}
.pointer {
  position: absolute;
  height: 3.8rem;
  bottom: .8rem;
  width: 100%;
}
.pointer p {
  animation: anima-pointer 2s infinite;
  position: absolute;
  bottom: 0;
  left: 60%;
  margin-left: -1.4rem;
  height: .8rem;
  width: .65rem;
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAkCAMAAADip6m2AAAAolBMVEUAAAAAAAAAAAAAAAAAAAABAQEAAAAAAAAHBwcAAAD////9/f37+/vt7e25ubn39/cKCgrz8/Pe3t7c3Nz+/v729vbW1tZra2tKSkoAAABpaWlgYGD9/f38/Pz5+fn5+fn39/fz8/Px8fHu7u7q6urm5ubj4+Pd3d3y8vLX19fJycnAwMC4uLisrKyhoaGVlZWGhoajo6MpKSkxMTGAgID///9oDYyzAAAANXRSTlMAAwcLFR0SGRAO+efJbSOcIqBDQvLNbTEpGxEQ9e3h29XDvLOsnJOJiIFpYVlNRkE7MiwfDLl52bwAAAGFSURBVEjH3ZXZboMwFERbHAMhC6EFQtrs+777/3+t98bGjmwqy32plHmLPYfMiYTy9nJ5F/kb693j+O4h7Y567SZjzbYHuDv72WCQxgfSjixpReyRqEWAdmK/YyaTfAHtpivjIo6TUReTZYxxcZzupju/XufP4g660aYD2USmuF13sKeP7Ae6uF13fKZBDRLQ81gTt+rOCmD9MPSBLmaauEV3hWidQOqIr57FLbrpDllCPAghSO9SU7xad3QCNiRQgwAeAn0a6eLVutOC4mRk+SCcToupIW7qsmWnByw25B3Svc6SaeKGbn9LA8UqGsW3fVMc2VJ3eJS6apcUPw5LcVmAq1J30qWBL1mN9gPanZTiUBE3pe5C6cpo4gtRjXkJjtf8cbnSlTHEcz5yTTwBh00UOVToVogfGvibhQq+pCyr0q0Wz1h6kTDsyZObPvn36bckh6qA8YE1eIUEa6GxyyeKEzhC1MLy6byL3yNP4BNn7TSWVRffHYHaI7qq7PB3qMr/mh8s20b2bOZlXQAAAABJRU5ErkJggg==')
  -63px 0;
  background-size:110% 31%;
  /* -moz-background-size:100% 100%; */
}
/*animation*/
@keyframes anima-pointer {
  0% {
    opacity: 0;
    bottom: 0;
  }
  100% {
    opacity: 1;
    bottom: 10px;
  }
}
.explain {
  padding-left: .533333rem;
  font-size: .346667rem;
  color: #666666;
  margin:.6rem 0;
}
.swiper_con {
  width: 100%;
  position: relative;
}
.bodys {
  color: #000000;
}
.heads,
.body,
.movable {
  display: flex;
}
.body_fixed {
  position: fixed;
  background-color: #ffffff;
  z-index: 2;
  line-height: 1.28rem;
  font-size: .373333rem;
}
.head {
  border-top: 1px solid #e8e8e8;
  border-bottom: 1px solid #e8e8e8;
  color: #666666;
  width: 22.133333rem;
  height: 1.28rem;
  line-height: 1.28rem;
  font-size: .373333rem;
}
.movable_dead{
 border-bottom: 1px solid black;
}
.movable {
  margin-left: 1.8rem;
  border-bottom: 1px solid #e8e8e8;
}
.movable div {
  margin-left: .64rem;
  width: 2.133333rem;
  height: 1.28rem;
  line-height: 1.28rem;
  text-align: center;
  font-size: .373333rem;
}
</style>
