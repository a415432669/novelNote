import Vue from 'vue'
import ConfirmComponent from './tpl'
import merge from 'lodash.merge'

let instance
let globalConfig = {}
let ConfirmConstructor = Vue.extend(ConfirmComponent)

let initInstance = () => {
  instance = new ConfirmConstructor({
    el: document.createElement('div')
  })
  document.body.appendChild(instance.$el)
}

let Confirm = (content, options = {}) => {
  initInstance()
  options.content = content
  merge(instance.$data, globalConfig)
  merge(instance.$data, options)
  return new Promise((resolve, reject) => {
    instance.show = true
    let inputs = Array.prototype.slice.call(document.querySelectorAll('input'))
    inputs.forEach((input) => {
      input.blur()
    })
    let success = instance.success
    let cancel = instance.cancel
    instance.success = () => {
      success()
      resolve('ok')
    }
    instance.cancel = () => {
      cancel()
      reject(new Error('cancel'))
    }
  })
}

export default {
  install (Vue, options = {}) {
    globalConfig = options
    Vue.prototype.$confirm = Confirm
  }
}
