
import actions from "./actions"
import mutations from "./mutations"

export default {
  state: {
    url: ''
  },
  mutations,
  getters: {
    url () {
      return this.state.url
    }
  },
  actions
}