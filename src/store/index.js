import { createStore } from 'vuex'
import * as types from './mutation_types'

const player = {
  state: {
    url: ''
  },
  mutations: {
    [types.PLAYER_URL] (state, url) {
      state.url = url
    }
  },
  getter: {
    url () {
      return this.state.url
    }
  },
  actions: {
  },
}

export default createStore({
  modules: {
    player
  }
})
