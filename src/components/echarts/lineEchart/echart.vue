<template>
    <div id="lineChart" style="width:9rem;height:4.52rem"></div>
</template>

<script>
import { option, peakNews } from './option.js'
const echarts = require('echarts')
export default {
  name: 'hello',
  props: [ 'stockcode', 'sectorname' ],
  data () {
    return {
    }
  },
  mounted () {
    let myChart = echarts.init(document.getElementById('lineChart'))
    if (this.stockcode) {
      this.getStockData(myChart)
    }
    console.log(this.sectorname)
    if (this.sectorname) {
      this.getSectorData(myChart)
    }
    // myChart.setOption(option)
    // this.click()
  },
  methods: {
    getSectorData (myChart) {
      this.axios.get(this.linkPrefix + '/stocks_api/sector_trend', {
        params: {
          sectorname: this.sectorname
        }
      })
        .then(response => {
          if (response.data.success) {
            option.xAxis[0].data = response.data.dates
            option.series[0].data = response.data.guba_list
            option.series[1].data = response.data.news_list
            // peakNews.data = response.data.peak_news
            option.yAxis[0].interval = 20
            option.yAxis[0].max = 100
            myChart.setOption(option)
          }
          // console.log(option.series[1].data)
          // console.log(option.xAxis[0].data)
        })
    },
    getStockData (myChart) {
      this.axios.get(this.linkPrefix + '/stocks_api/stock_trend', {
        params: {
          stockcode: this.stockcode
        }
      })
        .then(response => {
          option.xAxis[0].data = response.data.dates
          option.series[0].data = response.data.guba_list
          option.series[1].data = response.data.news_list
          peakNews.data = response.data.peak_news
          option.yAxis[0].interval = 20
          option.yAxis[0].max = 100
          myChart.setOption(option)
          // console.log(option.series[1].data)
          // console.log(option.xAxis[0].data)
        })
    }
    // click () {
    //   let myChart = echarts.init(document.getElementById('lineChart'))
    //   myChart.on('click', function (param) {
    //     if (typeof param.seriesIndex === 'undefined') {
    //       return
    //     }
    //     if (param.type === 'click') {
    //       console.log(param.data.text)
    //     }
    //   })
    // }
  }
}
</script>

<style scoped>

</style>
