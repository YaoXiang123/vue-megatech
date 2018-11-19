<template>
    <div id="gauge" style="height:4.52rem"></div>
</template>

<script>
import {option} from './option.js'
const echarts = require('echarts')
export default {
  name: 'hello',
  props: ['sentiment'],
  data () {
    return {
    }
  },
  mounted () {
    let Chart = echarts.init(document.getElementById('gauge'))
    this.setData(Chart)
  },
  methods: {
    setData (myChart) {
      console.log(this.sentiment.results)
      if (this.sentiment.results.length === 3) {
        for (let i = 0; i < 3; i++) {
          option.series[i].title.backgroundColor = this.sentiment.results[i].color
          option.series[i].data[0].name = this.sentiment.results[i].name
          option.series[i].axisLine.lineStyle.color = this.sentiment.results[i].lineres
        }
        myChart.setOption(option)
      }
    }
  }
}
</script>

<style scoped>

</style>
