import api from '@api'

const state = {
  detail: null,
  category: {
    current: null,
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
  },
  getNotes (state) {
    return state.note
  }
}

const actions = {
  getDetail ({commit, rootState: {route}}) {
    return new Promise((resolve, reject) => {
      const books = api.store('books')
      const id = parseInt(route.params.id, 10)
      books
        .get(id, (e, data) => {
          if (e) {
            reject(e)
          }
          if (data === undefined) {
            resolve(undefined)
          }
          commit('updateDetail', data)
          resolve(data)
        })
    })
  },
  getCategory ({commit, state, dispatch}) {
    const category = api.store('category')
    category
      .index('byType')
      .get(state.category.type, (e, data) => {
        commit('updateCategory', data)
        if (data.length > 0) {
          commit('updateCurrent', data[0])
          dispatch('getNotes')
        }
      })
  },
  addCategory ({commit, state, dispatch}, title) {
    return new Promise((resolve, reject) => {
      const category = api.store('category')
      return category.put({
        title,
        type: state.category.type
      }, (e, id) => {
        if (e) {
          reject(e)
          return
        }
        const data = {
          id,
          title,
          type: state.category.type
        }
        resolve()
        commit('updateCurrent', data)
        commit('addCategory', data)
        dispatch('getNotes')
      })
    })
  },
  getNotes ({commit, state}) {
    const notes = api.store('notes')
    notes
      .index('byCate')
      .get(state.category.current.id, (e, data) => {
        commit('updateNotes', data)
      })
  },
  addNote ({commit, state, dispatch}, content) {
    return new Promise((resolve, reject) => {
      const notes = api.store('notes')
      const catId = state.category.current.id
      notes.put({
        catId,
        content
      }, (e, id) => {
        if (e) {
          return reject(e)
        }
        dispatch('getNotes')
        resolve(id)
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
  updateCategory (state, list) {
    state.category.data = list
  },
  addCategory  (state, data) {
    state.category.data.push(data)
  },
  updateCurrent (state, data) {
    state.category.current = data
  },
  updateNotes (state, data) {
    state.note.data = data
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
