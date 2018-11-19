<template>
  <tab :line-width="2" active-color="#14191e" defaultColor="#696e73" bar-active-color="#14191e" :custom-bar-width="getBarWidth" class="vuxTab">
    <tab-item :selected="selected === 0" @on-item-click="changeBarWidth(0,0)" ><ripple>{{navbarItemFirst.title}}</ripple></tab-item>
    <tab-item v-for="(list,index) in navbarItemOther" :selected="selected === index+1" ref="tabItem" @on-item-click="changeBarWidth(index+1,0)" :key="index"><ripple>{{list.title}}</ripple></tab-item>
  </tab>
</template>

<script>
import ripple from './ripple'
import { Tab, TabItem } from 'vux'
export default {
  data () {
    return {
      navbarItem: [],
      selected: 0,
      getBarWidth: null
    }
  },
  props: ['navbarItemProps', 'Selected'],
  computed: {
    navbarItemFirst () {
      return this.$data.navbarItem[0]
    },
    navbarItemOther () {
      return this.$data.navbarItem.slice(1)
    }
  },
  methods: {
    changeBarWidth (index, click) {
      let titleLength = this.navbarItem[index].title.length
      this.$data.getBarWidth = titleLength * 14 + 'px'
      this.selected = index
      // 点击跳页
      if (click === 0) {
        this.$emit('clickItem', index)
      }
    }
  },
  created () {
    this.$data.navbarItem = this.$props.navbarItemProps
    this.changeBarWidth(this.$props.Selected)
  },
  components: {
    Tab, TabItem, ripple
  },
  watch: {
    Selected (curVal, oldVal) {
      this.changeBarWidth(curVal)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .vuxTab >>> .vux-tab-item{
    background transparent!important
  }
  .vuxTab >>> .vux-tab{
    height:42px;
  }
</style>
