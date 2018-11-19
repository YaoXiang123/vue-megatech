<template>
    <div id="pliteChart" style="height:4.52rem"></div>
</template>

<script>
import { option } from './option.js'
const echarts = require('echarts')
export default {
  name: 'hello',
  data () {
    return {
      name: ''
    }
  },
  mounted () {
    this.get_sector()
    // this.jump()
    // this.click()
  },
  methods: {
    get_sector () {
      let that = this
      let myChart = echarts.init(document.getElementById('pliteChart'))
      this.axios.get(this.linkPrefix + '/homepage_api/sector_info_index')
        .then(response => {
          option.xAxis[0].data = response.data.sectorname
          // console.log( response.data.sectorname)
          option.series[0].data = response.data.index_list
          myChart.setOption(option)
          myChart.on('click', function (e) {
            that.name = e.name
            window.location.href = '/pt?sector=' + e.name
            // this.$router.push({path: '/news/' + this.name})
          })
        })
    },
    jump () {
      this.$router.push({path: '/news/' + this.name})
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
