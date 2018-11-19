export const option = {
  tooltip: {
    show: true,
    trigger: 'item'
  },
  grid: {
    right: 0,
    left: 0,
    top: 30,
    bottom: 40
  }, // 整个图例的位置
  calculable: true,
  color: '#101e73',
  xAxis: [
    {
      type: 'category',
      axisLine: {
        lineStyle: {
          color: '#f2f2f2'
        }
      },
      // maxInterval: 5,
      axisLabel: {
        fontSize: 10,
        interval: 0,
        color: '#666666',
        align: 'center'
        // rotate: 30
      },
      // axisTick: {
      //   length: 7,
      //   lineStyle: {
      //     width: 2
      //   }
      // },
      data: ['电子通信', '中药', '海洋工程', '基础化学', '公共交通', '冶金']
    }
  ],
  yAxis: [
    {
      type: 'log',
      show: false
    }
  ],
  series: [
    {
      tooltip: {
        show: false
      },
      name: '搜索引擎',
      type: 'bar',
      barWidth: 20, // 系列级个性化，柱形宽度
      itemStyle: {
        normal: { // 系列级个性化，横向渐变填充
          label: {
            show: true,
            position: [-5, -15],
            textStyle: {
              fontSize: '10',
              // fontFamily: '微软雅黑',
              // fontWeight: 'bold',
              color: '#666666'
            }
          },
          color: function (params) {
            let colorList = ['rgb(255,59,46)', 'rgb(255,59,46)', 'rgb(255,59,46)', 'rgb(76,218,95)', 'rgb(76,218,95)', 'rgb(76,218,95)'] // 颜色
            return colorList[params.dataIndex]
          }
        }
      },
      data: [
        650.36, 616.19,
        {
          value: 588.97,
          itemStyle: { normal: { label: { position: 'inside' } } }
        },
        523.28, 495.33, 494.86
      ]
    }
  ]
}
