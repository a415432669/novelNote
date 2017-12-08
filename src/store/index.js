import Vuex from 'vuex'
import Vue from 'vue'
import global from './modules/global'
import book from './modules/book'
import note from './modules/note'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    global,
    book,
    note
  }
})
