import api from '@api'

const state = {
  detail: null,
  category: {
    current: null,
    type: 0,
    data: []
  },
  note: {
    currentId: 0,
    currentContent: '',
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
  },
  getNoteContent (state) {
    return state.note.currentContent
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
  getCategory ({commit, state, dispatch, rootState: {route}}) {
    const category = api.store('category')
    const bookId = parseInt(route.params.id, 10)
    category
      .index('byBook')
      .get(bookId, (e, data) => {
        commit('updateCategory', data)
        if (data.length > 0) {
          commit('updateCurrent', data[0])
        } else {
          commit('updateCurrent', null)
        }
        dispatch('getNotes')
      })
  },
  addCategory ({commit, state, dispatch, rootState: {route}}, title) {
    return new Promise((resolve, reject) => {
      const category = api.store('category')
      const bookId = parseInt(route.params.id, 10)
      return category.put({
        title,
        type: state.category.type,
        bookId
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
    if (state.category.current === null) {
      commit('updateNotes', [])
      return false
    }
    const notes = api.store('notes')
    notes
      .index('byCate')
      .get(state.category.current.id, (e, data) => {
        commit('updateNotes', data)
      })
  },
  addNote ({commit, state, dispatch}) {
    return new Promise((resolve, reject) => {
      const notes = api.store('notes')
      const catId = state.category.current.id
      const content = state.note.currentContent
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
  },
  editNote ({commit, state, dispatch}) {
    return new Promise((resolve, reject) => {
      const notes = api.store('notes')
      const id = state.note.currentId
      const content = state.note.currentContent
      const catId = state.category.current.id
      console.log(id)
      notes.put(id, {
        catId,
        content
      }, e => {
        if (e) {
          return reject(e)
        }
        dispatch('getNotes')
        resolve()
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
  },
  updateNoteContent (state, content) {
    state.note.currentContent = content
  },
  updateNoteId (state, id) {
    state.note.currentId = id
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
