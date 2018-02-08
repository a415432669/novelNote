<template>
  <div id="app">
    <router-view></router-view>
    <div class="vue-toast-manager_container">
      <transition-group name="toast" tag="div">
        <div class="vue-toast_container "  v-for="item in global.toast" :key="item.id">
          <div class="vue-toast_message">
            <span>{{item.text}}</span> <!---->
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'app',
  computed: {
    ...mapGetters({
      global: 'getGlobal'
    })
  }
}
</script>

<style lang="postcss">
*,::after,::before {
    -webkit-box-sizing: border-box;
    box-sizing: border-box
}

*{
  margin: 0;
  padding: 0;
}
body {
    position: relative;
    -webkit-user-select: none;
    color: #333;
    -webkit-tap-highlight-color: rgba(0,0,0,.05);
    -webkit-text-size-adjust: none;
    -webkit-touch-callout: none;
    -webkit-overflow-scrolling: touch
}
html,input,pre,select,textarea {
    font-family: fsans;
    -webkit-font-smoothing: antialiased
}

body,html {
  height: 100%;
}
#app{
  height: 100%;
}
body {
    position: relative;
    -webkit-user-select: none;
    color: #333;
    -webkit-tap-highlight-color: rgba(0,0,0,.05);
    -webkit-text-size-adjust: none;
    -webkit-touch-callout: none;
    -webkit-overflow-scrolling: touch;
     background-color: #e5dcbf;
}



html,input,pre,select,textarea {
    font-family: fsans;
    -webkit-font-smoothing: antialiased
}

textarea {
    display: block;
    width: 100%;
    margin: 0;
    resize: none;
    border: none;
    border-radius: 0
}

body,dd,dl,figure,form,ol,p,pre,ul {
    margin: 0
}

h1,h2,h3,h4,h5,h6 {
    font-size: 100%;
    font-weight: inherit;
    margin: 0
}

ol,ul {
    padding: 0;
    list-style: none
}

a {
    text-decoration: none;
    color: inherit;
    outline: 0
}

table {
    border-spacing: 0;
    border-collapse: collapse
}

th {
    font-weight: 400;
    text-align: left
}

a[href],button,label {
    transition: .2s
}

a[href]:active,button:active,label:active {
    background-image: -webkit-linear-gradient(to top,rgba(0,0,0,.05),rgba(0,0,0,.05));
    background-image: -webkit-linear-gradient(bottom,rgba(0,0,0,.05),rgba(0,0,0,.05));
    background-image: linear-gradient(to top,rgba(0,0,0,.05),rgba(0,0,0,.05))
}

body.iphone a[href]:active,body.iphone button:active {
    background-image: none
}

em,i {
    font-style: normal
}

strong {
    font-weight: inherit
}

input,select,small,textarea {
    font-size: 100%
}

img {
    width: 100%;
    height: auto;
    color: transparent;
    border: none 0
}

label {
    cursor: pointer
}

input:focus,textarea:focus {
    outline: 0
}

svg {
    display: inline-block;
    width: 1em;
    height: 1em;
    vertical-align: middle;
    stroke-width: 0;
    stroke: currentColor;
    fill: currentColor
}

body {
    position: relative
}

pre {
    white-space: pre-wrap;
    word-wrap: break-word
}

p {
    word-wrap: break-word
}

::-webkit-input-placeholder {
    color: #ccc
}
@media screen and (min-width: 375px) {
    html {
        /* iPhone6的375px尺寸作为16px基准，414px正好18px大小, 600 20px */
        font-size: calc(100% + 2 * (100vw - 375px) / 39);
        font-size: calc(16px + 2 * (100vw - 375px) / 39);
    }
}
@media screen and (min-width: 414px) {
    html {
        /* 414px-1000px每100像素宽字体增加1px(18px-22px) */
        font-size: calc(112.5% + 4 * (100vw - 414px) / 586);
        font-size: calc(18px + 4 * (100vw - 414px) / 586);
    }
}
@media screen and (min-width: 600px) {
    html {
        /* 600px-1000px每100像素宽字体增加1px(20px-24px) */
        font-size: calc(125% + 4 * (100vw - 600px) / 400);
        font-size: calc(20px + 4 * (100vw - 600px) / 400);
    }
}
@media screen and (min-width: 1000px) {
    html {
        /* 1000px往后是每100像素0.5px增加 */
        font-size: calc(137.5% + 6 * (100vw - 1000px) / 1000);
        font-size: calc(22px + 6 * (100vw - 1000px) / 1000);
    }
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}
.vue-toast-manager_container {
  position: fixed;
  width: 100%;
  max-width: 750px;/*rem*/
  z-index:1500;
  bottom:2rem;
  font-size: 26px;/*rem*/
}
.vue-toast-manager_toasts {
  position: relative;
}
.vue-toast_container {
  position: absolute;
  display: none;
  transform: translateY(0);
  -webkit-transition: -webkit-transform .2s ease-out;
  transition: -webkit-transform .2s ease-out;
  transition: transform .2s ease-out;
  transition: transform .2s ease-out, -webkit-transform .2s ease-out;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  text-align: center;
  bottom: 2rem;
  left: 0;
  right: 0;
  &:last-child{
    display: block;
  }
}

.vue-toast_container .vue-toast_message {
  background-color: rgba(0,0,0, .7);
  display: inline-block;
}
.vue-toast_message {
  padding: .6rem .8rem ;
  border-radius: 1rem;
  color: white;
  font-size: .8rem;
  line-height: 1

}
.toast-enter-active, .toast-leave-active {
  transition: all .5s;
}
.toast-enter, .toast-leave-active {
  opacity: 0;
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: rgb(85, 84, 84); opacity:1;
}

::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: rgb(85, 84, 84);opacity:1;
}

input:-ms-input-placeholder{
    color: rgb(85, 84, 84);opacity:1;
}

input::-webkit-input-placeholder{
    color: rgb(85, 84, 84);opacity:1;
}
</style>
