<template>
  <div class="body" id="screenshot">
    <img src="../../../common/assets/background-echartImgRater.svg/megatouzizhishu未标题-1.svg" alt="">
    <div class="rater"><Rater disabled :margin= "10" :font-size= "40" :value="star"/></div>
  </div>
</template>

<script>
import Rater from 'vux/src/components/rater'
// import html2canvas from 'html2canvas'
// import Canvas2Image from 'canvas2image'
export default {
  components: {
    Rater
  },
  data () {
    return {
      star: this.$route.query.star
    }
  },
  mounted: function () {
    console.log(this.star)
  }
}
</script>

<style scoped>
.rater{
  padding-top: .96rem;
}
.body img{
  width: 179px;
}
.body{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 250px;
  width: 540px;
  text-align: center;
  background: -moz-linear-gradient(top, #2a3471 30%, #4b2671 100%);
  background: -webkit-gradient(linear, left top, left bottom, color-stop(11%,#2a3471), color-stop(100%,#4b2671));
  background: -webkit-linear-gradient(top, #2a3471 30%,#4b2671 100%);
  background: -o-linear-gradient(top, #2a3471 50%,#4b2671 100%);
  background: -ms-linear-gradient(top, #2a3471 11%,#4b2671 100%);
  background: linear-gradient(to bottom, #2a3471 50%,#4b2671 100%);
}
</style>
