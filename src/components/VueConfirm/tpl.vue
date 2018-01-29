<style lang="postcss" scoped>
.wc {
    position: fixed;
    top: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, .4);
    z-index: 998;
}
.wc-popup {
    position: fixed;
    z-index: 999;
    top: 50%;
    left: 50%;
    overflow: hidden;
    width: 16rem;
    -webkit-transform: translate3d(-50%, -50%, 0) scale(1.185);
    text-align: center;
    color: #595c49;
    border-radius: .75rem;
    border: .125rem solid #595c49;
    background-color: #fff;
}
.wc-popup.wc-popup-in {
    display: block;
    transform: translate3d(-50%, -50%, 0) scale(1);
    opacity: 1;
}
.wc-popup.wc-popup-out {
    transform: translate3d(-50%, -50%, 0) scale(1);
    opacity: 0;
}
.wc-popup-inner {
    position: relative;
    padding: 1rem;
    border-radius: 13px 13px 0 0;
    background: rgba(255, 255, 255, .95);
}
.wc-popup-title {
    font-size: 1.1rem;
    font-weight: 500;
    text-align: center;
}
.wc-popup-title + .wc-popup-text {
    font-family: inherit;
    font-size: .85rem;
    margin: .4rem 0 0;
}
.wc-popup-buttons {
    position: relative;
    display: flex;
    height: 2.75rem;
    justify-content:space-around;
}
.wc-popup-button {
    display: inline-block;
    font-size: 1rem;
    line-height: 2.0rem;
    position: relative;
    display: block;
    overflow: hidden;
    box-sizing: border-box;
    width: 100%;
    height: 2.25rem;
    border-radius: 1.25rem;
    padding: 0 .8rem;
    color: #595c49;
    border:.125rem solid #595c49;
    background: rgba(255, 255, 255, .95);
    cursor: pointer;
    margin: 0 1.2rem;
    font-weight:bold;
}
.wc-popup-button:after {
    position: absolute;
    z-index: 15;
    top: 0;
    right: 0;
    bottom: auto;
    left: auto;
    display: block;
    width: 1px;
    height: 100%;
    content: '';
    transform: scaleX(.5);
    transform-origin: 100% 50%;
    background-color: rgba(0, 0, 0, .2);
}

.wc-enter {
    opacity: 0;
    .wc-popup {
        transform: translate3d(-50%, -50%, 0) scale(1.185);
    }
}
.wc-enter-active, .wc-leave-active {
    transition: all .4s;
    .wc-popup {
        transition: all .4s;
    }
}
.wc-leave-active {
    opacity: 0;
}
</style>


<template>
  <transition name="wc">
    <div v-if="show" class="wc">
      <div class="wc-popup wc-popup-in">
        <div class="wc-popup-inner">
          <div class="wc-popup-title" v-if="title">{{title}}</div>
          <div class="wc-popup-text">{{content}}</div>
        </div>
        <div class="wc-popup-buttons">
          <span class="wc-popup-button"  @click="success">{{yes.text}}</span>
          <span class="wc-popup-button"  @click="cancel">{{no.text}}</span>
        </div>
      </div>
        </div>
  </transition>
</template>

<script>
import pageChange from './mixins'
export default {
  mixins: [pageChange],
  data () {
    return {
      show: false,
      title: '提示',
      content: '',
      style: {},
      yes: {
        text: '确定',
        style: {}
      },
      no: {
        text: '取消',
        style: {}
      }
    }
  },
  methods: {
    success () {
      this.show = false
    },
    cancel () {
      this.show = false
    }
  }
}
</script>
