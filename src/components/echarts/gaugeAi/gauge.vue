<template>
    <div :id= id style="width:3.5rem;height:3.5rem"></div>
</template>

<script>
import { option } from './option.js'
const echarts = require('echarts')
export default {
  name: 'hello',
  props: ['message', 'id'],
  data () {
    return {
    }
  },
  mounted () {
    let Chart = echarts.init(document.getElementById(this.id))
    console.log(option)
    option.series[0].data[0].name = this.message.prob + '%'
    option.series[0].data[0].value = this.message.prob
    if (this.message.color === 'green') {
      option.series[0].axisLine.lineStyle.color[0][1] = '#06f4b6'
      for (var i = 2; i <= 20; i += 1) {
        const j = i * 0.05
        const c = [j, 'rgba(0,255,0,' + j + ')']
        option.series[1].axisLine.lineStyle.color.push(c)
      }
    } else if (this.message.color === 'yellow') {
      option.series[0].axisLine.lineStyle.color[0][1] = '#f9a88c'
      option.series[1].axisLine.lineStyle.color = []
      for (i = 2; i <= 20; i += 1) {
        const j = i * 0.05
        const c = [j, 'rgba(249,168,140,' + j + ')']
        option.series[1].axisLine.lineStyle.color.push(c)
      }
    }
    Chart.setOption(option)
  },
  methods: {
  }
}
</script>

<style scoped>
.ball {
  top: 2.586667rem;
  left: -.8rem;
  position: absolute;
  width: .33333rem;
  height: .33333rem;
  background-color: red;
  border-radius: 50%;
  offset-path: path("M139.7,125.6 c-10.9-13.6-16.6-30-16.6-47.5c0-42,34.2-76.2,76.2-76.2s76.2,34.2,76.2,76.2c0,17.5-5.7,33.9-16.6,47.5");
  offset-distance: 0%;
  animation: red-ball 5s infinite linear;
}

@keyframes red-ball {
  from {
    offset-distance: 0%;
  }
  to {
    offset-distance: 100%;
  }
}

</style>
