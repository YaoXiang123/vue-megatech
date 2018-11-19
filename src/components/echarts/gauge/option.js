export const option = {
  grid: {
  },
  series: [
    {
      axisLine: { // 坐标轴线
        lineStyle: { // 属性lineStyle控制线条样式
          width: 10,
          color: [[0.28, '#fd0100'], [0.89, '#f4b180'], [1, '#00b150']] // 线条颜色
        }
      },
      axisTick: { // 坐标轴小标记
        length: 10, // 属性length控制线长
        lineStyle: { // 属性lineStyle控制线条样式
          color: '#ffffff',
          width: 3
        }
      },
      splitLine: { // 分隔线
        length: 0, // 属性length控制线长
        lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
          color: 'auto'
        }
      },
      radius: 60,
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
        formatter: '近7日',
        fontSize: 12,
        offsetCenter: [0, 0],
        color: '#000000'
      },
      title: {
        offsetCenter: [0, '80%'],
        color: '#ffffff',
        fontSize: 12,
        backgroundColor: 'red',
        padding: 2
      },
      data: [{
        value: 20,
        name: ' 利好 '
      }]
    },
    {
      center: ['16%', '50%'],
      axisLine: { // 坐标轴线
        lineStyle: { // 属性lineStyle控制线条样式
          width: 8,
          color: [[0.1, '#fd0100'], [0.59, '#f4b180'], [1, '#00b150']] // 线条颜色
        }
      },
      axisTick: { // 坐标轴小标记
        length: 8, // 属性length控制线长
        lineStyle: { // 属性lineStyle控制线条样式
          color: '#ffffff',
          width: 1.8
        }
      },
      splitLine: { // 分隔线
        length: 0, // 属性length控制线长
        lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
          color: 'auto'
        }
      },
      radius: 50, // 仪表盘大小
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
        formatter: '近一月',
        fontSize: 12,
        offsetCenter: [0, 0],
        color: '#000000'
      },
      title: {
        offsetCenter: [0, '80%'],
        color: '#ffffff',
        fontSize: 12,
        backgroundColor: 'red',
        padding: 2
      },
      data: [{
        value: 40,
        name: ' 利空 '
      }]
    },
    {
      center: ['84%', '50%'],
      axisLine: { // 坐标轴线
        lineStyle: { // 属性lineStyle控制线条样式
          width: 8,
          color: [[0.1, '#fd0100'], [0.59, '#f4b180'], [1, '#00b150']] // 线条颜色
        }
      },
      axisTick: { // 坐标轴小标记
        length: 8, // 属性length控制线长
        lineStyle: { // 属性lineStyle控制线条样式
          color: '#ffffff',
          width: 1.8
        }
      },
      splitLine: { // 分隔线
        length: 0, // 属性length控制线长
        lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
          color: 'auto'
        }
      },
      radius: 50, // 仪表盘大小
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
        formatter: '近一年',
        fontSize: 12,
        offsetCenter: [0, 0],
        color: '#000000'
      },
      title: {
        formatter: '61%',
        offsetCenter: [0, '80%'],
        color: '#ffffff',
        fontSize: 12,
        backgroundColor: 'red',
        padding: 2
      },
      data: [{
        value: 40,
        name: ' 利空 '
      }]
    }
  ]
}
