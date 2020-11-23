
export default {
  namespaced: true,
  state: {
    showHeader: false,
    backgroundImage: null
  },
  mutations: {
    "SHOW_HEADER" (state, showHeader) {
      state.showHeader = showHeader
    },
    "BACKGROUND_IMAGE" (state, backgroundImage) {
      state.backgroundImage = backgroundImage
    }
  }
}