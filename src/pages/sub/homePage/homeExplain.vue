<template>
  <div style="padding:0">
  <Header :HeaderMes="HeaderMes" ></Header>
    <div style="padding-top:1.4rem;">
      Mega投资指数是基于海量实时新闻、重大事件、公告、和全球股市行情数据，通过深度学习进行语义情感分析、非线性加权算法综合计算而得出的结果。
    </div>
    <div style="padding-top:0">
      Mega投资指数每3秒更新一次，实时反应市场当前利好程度，该指数越高代表当前利好越多。
    </div>
    <p>
      Mega投资星级(范围：2星~5星)
    </p>
    <x-table :cell-bordered="false" style="margin: auto;">
      <thead>
        <tr class="tr">
          <th>星级</th>
          <th>利好程度</th>
          <th>上涨概率</th>
        </tr>
      </thead>
      <tbody v-for="(item,id) in td" :key="id" >
        <tr class="tr" :style="{borderBottom:item.dead}">
          <td >{{item.star}}</td>
          <td >{{item.degree}}</td>
          <td >{{item.chg}}</td>
        </tr>
      </tbody>
    </x-table>
    <div>
      注：该指数仅作为投资辅助参考，不作为投资建议；市场有风险，投资需谨慎。
    </div>
  </div>
</template>

<script>
import XTable from '../../../../node_modules/vux/src/components/x-table/index'
import Header from '../../../components/header'
export default {
  components: {
    XTable,
    Header
  },
  data () {
    return {
      HeaderMes: {
        title: 'Mega投资指数说明',
        search: true,
        type: 1
      },
      td: [{star: '5星', degree: '极好', chg: '90.88%'}, {star: '4.5星', degree: '优秀', chg: '70.56%'},
        {star: '4星', degree: '良好', chg: '62.32%'}, {star: '3,3.5星', degree: '一般 ', chg: '28.89%'}, {star: '2星、2.5星', degree: '较差', chg: '10.65%'}]
    }
  }
}
</script>

<style scoped>
.tr{
  border-bottom: .026667rem solid #f2f2f2;
  color:#333333;
}
tr td::before,tr th::before,table.vux-table.vux-table-no-cell-bordered::after{
  display: none;
}
div{
  font-size: .426667rem;
  line-height: .746667rem;
  color: #333333;
  padding:.15rem .266667rem;
  text-align: justify;
}
p{
  padding-left: .266667rem;
}
</style>
