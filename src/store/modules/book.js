import api from '@api'

const state = {
  list: []
}

const getters = {
  getBooks (state) {
    return state.list.reverse()
  }
}

const actions = {
  getBooks ({commit, state}) {
    const books = api.store('books')
    books.all(function (e, data) {
      if (data !== null) {
        commit('updateBooks', data)
      }
    })
  },
  addBook ({commit, state, dispatch}, title) {
    return new Promise((resolve, reject) => {
      const books = api.store('books')
      const date = new Date().getTime()
      return books.put({
        title,
        date
      }, (e, id) => {
        if (e) {
          reject(e)
          return
        }
        commit('addBooks', {
          id,
          title,
          date
        })
        resolve()
      })
    })
  }
}

const mutations = {
  updateBooks (state, books) {
    state.list = books
  },
  addBooks (state, book) {
    state.list.push(book)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
