import api from '@api'

const state = {
  detail: null,
  category: {
    id: 0,
    type: 0,
    data: []
  },
  note: {
    data: []
  }
}

const getters = {

  noteDetail (state) {
    return state.detail
  },
  getCategory (state) {
    return state.category
  }
}

const actions = {
  getDetail ({commit, rootState: {route}}) {
    const books = api.store('books')
    const id = parseInt(route.params.id, 10)
    books
      .get(id, (e, data) => {
        commit('updateDetail', data)
      })
  },
  getCategory ({commit, state}) {
    const category = api.store('category')
    category
      .index('byType')
      .get(state.category.type, (e, data) => {
        if (data.length > 0) {
          commit('updateCategory', data)
          commit('updateCategoryId', data[0].id)
        }
      })
  },
  addCategory ({commit, state, dispatch}, title) {
    return new Promise((resolve, reject) => {
      const category = api.store('category')
      return category.put({
        title,
        type: state.type
      }, e => {
        if (e) {
          reject(e)
          return
        }
        resolve()
        dispatch('getCategory')
      })
    })
  }
}

const mutations = {
  updateDetail (state, detail) {
    state.detail = detail
  },
  updateNoteType (state, noteType) {
    state.category.type = noteType
  },
  updateCategory  (state, list) {
    state.category.data = list
  },
  updateCategoryId (state, cId) {
    state.category.index = cId
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
