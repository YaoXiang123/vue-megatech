export const option = {
  grid: {
  },
  animation: false,
  series: [
    {
      axisLine: { // 坐标轴线
        lineStyle: { // 属性lineStyle控制线条样式
          width: 7,
          color: [[1, '#f7033d']] // 线条颜色
        }
      },
      axisTick: { // 坐标轴小标记
        length: 7, // 属性length控制线长
        lineStyle: { // 属性lineStyle控制线条样式
          color: '#4b2671',
          width: 4
        }
      },
      splitLine: { // 分隔线
        length: 0, // 属性length控制线长
        lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
          color: 'auto'
        }
      },
      radius: 70,
      axisLabel: {
        color: '#ffffff',
        show: true,
        distance: 8,
        fontSize: 8
      },
      name: '业务指标',
      type: 'gauge',
      //  data: [{
      //   value: 15,
      //   name: '61%',
      // }],
      pointer: {
        show: true,
        // 指针长度
        length: '90%',
        width: 3
      },
      detail: {
        formatter: ' ',
        fontSize: 40,
        offsetCenter: [42, 45],
        color: 'red'
      },
      title: {
        offsetCenter: [0, '65%'],
        color: '#ffffff',
        fontSize: 18,
        // backgroundColor: 'red',
        padding: 2,
        fontWeight: 'bolder'
      },
      data: [{
        y: 20,
        value: 50,
        textStyle: {
          color: '#ffffff'
        },
        name: ' 50% '
      }]
    },
    {
      center: ['50%', '50%'],
      axisLine: { // 坐标轴线
        lineStyle: { // 属性lineStyle控制线条样式
          width: 4,
          color: [[0.1, 'rgba(255,0,0,.1)'], [0.15, 'rgba(255,0,0,.15)'], [0.2, 'rgba(255,0,0,.2)'], [0.25, 'rgba(255,0,0,.25)'],
            [0.3, 'rgba(255,0,0,.3)'], [0.35, 'rgba(255,0,0,.35)'], [0.4, 'rgba(255,0,0,.4)'], [0.45, 'rgba(255,0,0,.45)'], [0.5, 'rgba(255,0,0,.5)'], [0.55, 'rgba(255,0,0,.5)'],
            [0.6, 'rgba(255,0,0,.6)'], [0.65, 'rgba(255,0,0,.65)'], [0.7, 'rgba(255,0,0,.7)'], [0.75, 'rgba(255,0,0,.75)'],
            [0.8, 'rgba(255,0,0,.8)'], [0.85, 'rgba(255,0,0,.85)'], [0.9, 'rgba(255,0,0,.9)'], [0.9, 'rgba(255,0,0,.95)'], [1.0, 'rgba(255,0,0,1.0)']]
        }
      },
      axisTick: { // 坐标轴小标记
        length: 0, // 属性length控制线长
        lineStyle: { // 属性lineStyle控制线条样式
          color: '#4b2671',
          width: 1.8
        }
      },
      splitLine: { // 分隔线
        length: 0, // 属性length控制线长
        lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
          color: 'auto'
        }
      },
      radius: 80, // 仪表盘大小
      axisLabel: {
        show: false
      },
      name: '业务指标',
      type: 'gauge',
      //  data: [{
      //   value: 15,
      //   name: '61%',
      // }],
      pointer: {
        show: false,
        // 指针长度
        length: '90%',
        width: 0
      },
      detail: {
        // formatter: '•',
        formatter: ' ',
        fontSize: 15,
        offsetCenter: [50, 45],
        color: 'black'
      },
      title: {
        formatter: '61%',
        color: '#ffffff',
        padding: 2
      },
      data: [{
        value: 40
      }]
    }
    // {
    //   type: 'pie',
    //   radius: ['0%', '65%'],
    //   center: ['50%', '50%'],
    //   axisLine: { // 坐标轴线
    //     lineStyle: { // 属性lineStyle控制线条样式
    //       width: 7
    //     }
    //   },
    //   data: [
    //     {
    //       value: 3,
    //       itemStyle: {
    //         color: {
    //           type: 'linear',
    //           x: 0,
    //           y: 0,
    //           x2: 0,
    //           y2: 1,
    //           colorStops: [{
    //             offset: 0, color: 'rgba(255,0,0, 0.5)' // 0% 处的颜色
    //           }, {
    //             offset: 1, color: 'rgba(255,0,0, 0)' // 100% 处的颜色
    //           }],
    //           globalCoord: false // 缺省为 false
    //         }
    //       }
    //     }
    //   ],
    //   labelLine: {
    //     normal: {
    //       show: false
    //     }
    //   }
    // }
  ]
}
