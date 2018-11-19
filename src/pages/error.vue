<template>
  <div id="wrapper">
    <img class="fade" src="https://img-blog.csdn.net/20140611151010296?watermark/2/text/aHR0cDovL2Jsb2cuY3NkuZXQvd3p5Z2lz/font/5a6L5L2T/bi5uZXQvd3p5Z2lz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast">
        <div>
            <h1 class="fade">温馨提示：您访问的地址不存在！</h1>
            <p class="fade">你正在寻找的页面无法找到。
            <font style="opacity: 1;" class="link" @click="goback">返回?</font></p>
        </div>
  </div>
</template>

<script>
export default {
  methods: {
    goback () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
html {
  background: url(/static/images/paper.jpg) !important;
}
a,
fieldset,
img {
  border: 0;
}
a {
  color: #221919;
  text-decoration: none;
  outline: none;
}
a:hover {
  color: #3366cc;
  text-decoration: underline;
}
body {
  font-size: .64rem;
  color: #b7aeb4;
}
body a.link,
body h1,
body p {
  -webkit-transition: opacity .5s ease-in-out;
  -moz-transition: opacity .5s ease-in-out;
  transition: opacity .5s ease-in-out;
}
#wrapper {
  text-align: center;
  margin: 2.666667rem auto;
  width: 15.84rem;
}
a.link {
  text-shadow: 0px 1px 2px white;
  font-weight: 600;
  color: #3366cc;
  opacity: 0;
}
h1 {
  text-shadow: 0px 1px 2px white;
  font-size: .64rem;
  opacity: 0;
}
img {
  -webkit-transition: opacity 1s ease-in-out;
  -moz-transition: opacity 1s ease-in-out;
  transition: opacity 1s ease-in-out;
  height: 5.386667rem;
  width: 5.306667rem;
  opacity: 0;
}
p {
  text-shadow: 0px 1px 2px white;
  font-weight: normal;
  font-weight: 200;
  opacity: 0;
}
.fade {
  opacity: 1;
}
@media only screen and (min-device-width: 8.533333rem) and (max-device-width: 12.8rem) {
  #wrapper {
    margin: 1.066667rem auto;
    text-align: center;
    width: 7.466667rem;
  }
}
</style>
