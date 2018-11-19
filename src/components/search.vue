<template>
<div>
    <div id="search">
        <div v-if="search.back" @click="routerBack()"><img style="margin-top: .24rem;" src="../common/assets/icon-common.png/Back@2x.png"></div>
        <div><input type="text" :class="[{'backSearch':search.back},{moveInput:search.remove}]" id="search1" name="search" placeholder=搜索个股/新闻/研报/大V观点 v-on:input="state" v-model="value" @keyup.enter="find" @keyup.delete="findDelete" @focus="jump" ref="search"></div>
        <div><img src="../common/image/sound.png" style="height: .853333rem;" v-if="search.type===1"><div v-else class="text" v-show="!search.remove" @click="find">搜索</div></div>
    </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      value: ''
    }
  },
  props: [ 'search' ],
  watch: {
    value: {
      handler: function (val, oldval) {
        // console.log(val)
        this.$emit('sendValue', val)
      }
    }
  },
  // mounted() {
  //   this.$refs['search'].focus()
  // },
  methods: {
    childfocusSearch () {
      this.$nextTick(() => {
        this.$refs['search'].focus()
      })
    },
    jump () {
      this.$emit('jump')
    },
    state () {
      this.$emit('state')
    },
    find (e) {
      this.$emit('find')
    },
    findDelete () {
      this.$emit('findDelete')
    },
    routerBack () {
      this.$router.back(-1)
    }
  }
}
</script>

<style scoped>
#search{
  display:flex;
  width: 10rem;
  margin-top: .46666666667rem;
  font-family: 'Microsoft YaHei';
  margin-bottom: -.1rem;
  justify-content: space-around;
  align-items: center;
}
img {
  height:.5224rem;
}
input{
  border-radius: .2rem;
  width: 6.724102564102667rem;
  background-color: #FBFBFB;
  border: .026667rem solid #FBFBFB;
  height: .7866666666666667rem;
  background-image: url('../common/assets/icon-search.png/搜索icon@2x.png');
  background-repeat: no-repeat;
  background-size: .517333rem;
  background-position:.1528205128205rem center;
  padding:0 0 0 .912564102564rem;
}
input:focus {
  outline: none !important;
  border:.013333rem solid #cccccc;
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
  color: #cccccc; opacity:1;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
  color: #cccccc;opacity:1;
}

input:-ms-input-placeholder{
  color: #cccccc;opacity:1;
}
input::-webkit-input-placeholder{
  color: #cccccc;opacity:1;
  line-height: .373333rem;
  font-size: .373333rem;
}
.text{
  color: #9ddefc;
  /* padding: 7px 0 0 30px; */
  font-size: .426667rem;
  color: #000000;
}
.backSearch{
  width: 5.866667rem;
  /* margin-left: -2.026667rem; */
}
.removeText{
  display: none;
}
</style>
