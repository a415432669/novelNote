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
  async getBooks ({commit, state}) {
    const data = await api.books.toArray()
    commit('updateBooks', data)
  },
  addBook ({commit, state, dispatch}, title) {
    // return new Promise((resolve, reject) => {
    //   const books = api.store('books')
    //   const date = new Date().getTime()
    //   return books.put({
    //     title,
    //     date
    //   }, (e, id) => {
    //     if (e) {
    //       reject(e)
    //       return
    //     }
    //     commit('addBooks', {
    //       id,
    //       title,
    //       date
    //     })
    //     resolve()
    //   })
    // })
    return new Promise(async (resolve, reject) => {
      const date = new Date().getTime()
      const id = await api.books.add({
        title,
        date
      })
      commit('addBooks', {
        id,
        title,
        date
      })
      resolve()
    })
  },
  delBook ({commit, state, dispatch}, id) {

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
