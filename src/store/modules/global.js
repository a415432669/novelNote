let maxToastId = 0

const state = {
  toast: []
}

const getters = {
  getGlobal (state) {
    return state
  }
}

const actions = {
  toast ({commit}, text) {
    let id = maxToastId + 1
    maxToastId += 1
    commit('addToast', {id, text: text})
    setTimeout(() => commit('removeToast', id), 2000)
  }
}

const mutations = {
  addToast (state, message) {
    state.toast.push(message)
  },
  removeToast (state, id) {
    state.toast = state.toast.filter(m => m.id !== id)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
