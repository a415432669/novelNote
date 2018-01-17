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
    return new Promise(async (resolve, reject) => {
      const id = parseInt(route.params.id, 10)
      const data = await api.books.get(id)
      commit('updateDetail', data)
      resolve(data)
    })
  },
  async getCategory ({commit, state, dispatch, rootState: {route}}) {
    const bookId = parseInt(route.params.id, 10)
    const data = await api.category
      .where('bookId')
      .equals(bookId)
      .toArray()
    commit('updateCategory', data)
    if (data.length > 0) {
      commit('updateCurrent', data[0])
    } else {
      commit('updateCurrent', null)
    }
    dispatch('getNotes')
  },
  addCategory ({commit, state, dispatch, rootState: {route}}, title) {
    return new Promise(async (resolve, reject) => {
      const bookId = parseInt(route.params.id, 10)
      const id = api.category.add({
        title,
        type: state.category.type,
        bookId
      })
      const data = {
        id,
        title,
        type: state.category.type,
        bookId
      }
      commit('updateCurrent', data)
      commit('addCategory', data)
      dispatch('getNotes')
      resolve()
    })
  },
  async getNotes ({commit, state}) {
    if (state.category.current === null) {
      commit('updateNotes', [])
      return false
    }
    const cid = state.category.current.id
    const data = await api.notes.where('catId').equals(cid).toArray()
    commit('updateNotes', data)
  },
  addNote ({commit, state, dispatch, rootState: {route}}) {
    return new Promise(async (resolve, reject) => {
      const catId = state.category.current.id
      const content = state.note.currentContent
      const bookId = parseInt(route.params.id, 10)
      const id = api.notes.add({
        catId,
        content,
        bookId
      })
      dispatch('getNotes')
      resolve(id)
    })
  },
  editNote ({commit, state, dispatch}) {
    return new Promise(async (resolve, reject) => {
      const id = state.note.currentId
      const content = state.note.currentContent
      const update = await api.notes.update(id, {content})
      if (update) {
        dispatch('getNotes')
      }
      resolve()
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
