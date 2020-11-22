
export default {
  namespaced: true,
  state: {
    showHeader: false
  },
  mutations: {
    "SHOW_HEADER" (state, showHeader) {
      state.showHeader = showHeader
    }
  }
}