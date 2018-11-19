<template>
  <button @click="rippleClick" :style="{width:width, color:color}"  class="ripple_button" :class="{active: repple_button.toggle}">
    <slot></slot>
    <span class="__cov-ripple" :class="{'animate': repple_button.animate}"></span>
  </button>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: '80px'
    },
    color: {
      type: String,
      default: '#000000'
    }
  },
  data () {
    return {
      repple_button: {
        animate: false,
        toggle: false
      }
    }
  },
  methods: {
    rippleClick (e) {
      this.repple_button.animate = true
      let button = e.target
      let ripple = button.querySelector('.__cov-ripple')
      if (ripple) {
        let d = Math.max(button.offsetHeight, button.offsetWidth)
        let x = e.layerX - ripple.offsetWidth / 2
        let y = e.layerY - ripple.offsetHeight / 2
        ripple.setAttribute('style', 'height: ' + d + 'px; width: ' + d + 'px; top: ' + y + 'px; left: ' + x + 'px;')
      }
      this.$nextTick(() => {
        setTimeout(() => {
          this.repple_button.animate = false
        }, 660)
      })
    }
  }
}
</script>

<style>
.ripple_button{
  background: transparent;
  border: none;
  border-radius: 2px;
  position: relative;
  height: 36px;
  padding: 0 16px;
  display: inline-block;
  font-family: Roboto,Helvetica,Arial,sans-serif;
  font-size: 16px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0;
  overflow: hidden;
  will-change: box-shadow,transform;
  -webkit-transition: box-shadow .2s cubic-bezier(.4,0,1,1),background-color .2s cubic-bezier(.4,0,.2,1),color .2s cubic-bezier(.4,0,.2,1);
  transition: box-shadow .2s cubic-bezier(.4,0,1,1),background-color .2s cubic-bezier(.4,0,.2,1),color .2s cubic-bezier(.4,0,.2,1);
  outline: none;
  /* cursor: pointer; */
  text-decoration: none;
  text-align: center;
  line-height: 36px;
  vertical-align: middle;
}
.ripple_button:hover {
  background-color: #ffffff
}
.__cov-ripple {
  display: block;
  position: absolute;
  background: rgb(211, 211, 211);
  /* background-color: #000000; */
  border-radius: 100%;
  transform: scale(0);
}
.__cov-ripple.animate {
  animation: ripple .35s linear;
}
@keyframes ripple {
  100% {opacity: 0; transform: scale(2.5);}
}
</style>
