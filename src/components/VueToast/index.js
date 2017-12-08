import Toast from './toast'

const install = function (Vue) {
  Vue.prototype.$toast = Toast
}

Toast.install = install
export default Toast
