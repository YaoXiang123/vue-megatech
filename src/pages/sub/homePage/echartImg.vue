<template>
  <div class="body" id="screenshot" v-if="this.completed">
    <div class="title"> <img src="../../../common/assets/background-echartImg.svg/1megatouzizhishu未标题-1.svg" align="AbsMiddle" crossOrigin='anonymous'> {{message.index}}</div>
    <div :class="message.color=='yellow'?'circle_background_yellow':(message.color=='green'?'circle_background_green':'circle_background_red')"  class="circle_background"></div>
    <div class="gaugue"><gaugue :message="message" :id="message.id"/></div>
  </div>
</template>

<script>
import gaugue from '../../../components/echarts/gaugeImg/gauge'
// import html2canvas from 'html2canvas'
// import Canvas2Image from 'canvas2image'
export default {
  components: {
    gaugue
  },
  data () {
    return {
      message: {},
      completed: false
    }
  },
  mounted: function () {
    // setTimeout(() => {
    //   this.convert2canvas()
    // }, 3000)
    this.market_index()
  },
  methods: {
    market_index () {
      this.axios.get(this.linkPrefix + '/chatbot_api/market_index')
        .then(response => {
          if (response.data.success === 1) {
            this.message = response.data.data
            this.completed = true
          }
        })
    }
    // toPng () {
    //   let dom = document.getElementById('screenshot')
    //   html2canvas(dom).then(
    //     function (canvas) {
    //       document.body.appendChild(canvas)
    //     }
    //   )
    // },
    // convert2canvas () {
    //   var cntElem = document.getElementById('screenshot')
    //
    //   var shareContent = cntElem // 需要截图的包裹的（原生的）DOM 对象
    //   var width = shareContent.offsetWidth // 获取dom 宽度
    //   var height = shareContent.offsetHeight // 获取dom 高度
    //   var canvas = document.createElement('canvas') // 创建一个canvas节点
    //   var scale = 30 // 定义任意放大倍数 支持小数
    //   canvas.width = width * scale // 定义canvas 宽度 * 缩放
    //   canvas.height = height * scale // 定义canvas高度 *缩放
    //   canvas.getContext('2d').scale(scale, scale) // 获取context,设置scale
    //   var opts = {
    //     scale: scale, // 添加的scale 参数
    //     canvas: canvas, // 自定义 canvas
    //     // logging: true, // 日志开关，便于查看html2canvas的内部执行流程
    //     width: width, // dom 原始宽度
    //     height: height,
    //     allowTaint: true
    //     // useCORS: true // 【重要】开启跨域配置
    //   }
    //
    //   html2canvas(shareContent, opts).then(function (canvas) {
    //     // var context = canvas.getContext('2d')
    //     // 【重要】关闭抗锯齿
    //     // context.mozImageSmoothingEnabled = false
    //     // context.webkitImageSmoothingEnabled = false
    //     // context.msImageSmoothingEnabled = false
    //     // context.imageSmoothingEnabled = false
    //
    //     // 【重要】默认转化的格式为png,也可设置为其他格式
    //     var img = Canvas2Image.convertToJPEG(canvas, canvas.width, canvas.height)
    //
    //     document.body.appendChild(img)
    //     img.width = canvas.width / scale
    //     img.hight = canvas.height / scale
    //   })
    // }
  }
}
</script>

<style scoped>
.title img{
  width: 179px;
}
.body{
  height: 250px;
  width: 540px;
  background: -moz-linear-gradient(top, #2a3471 30%, #4b2671 100%);
  background: -webkit-gradient(linear, left top, left bottom, color-stop(11%,#2a3471), color-stop(100%,#4b2671));
  background: -webkit-linear-gradient(top, #2a3471 30%,#4b2671 100%);
  background: -o-linear-gradient(top, #2a3471 50%,#4b2671 100%);
  background: -ms-linear-gradient(top, #2a3471 11%,#4b2671 100%);
  background: linear-gradient(to bottom, #2a3471 50%,#4b2671 100%);
}
.title{
  text-align: center;
  width: 100%;
  font-size: .48rem;
  color: #ffffff;
  padding-top: .266667rem;
}
.circle_background_green, .circle_background_red, .circle_background_yellow{
  border-radius: 50%;
  left: 3.8rem;
  top: 1.5rem;
  width: 2.466667rem;
  height: 2.466667rem;
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
.gaugue{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
