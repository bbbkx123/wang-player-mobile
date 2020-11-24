
export default {
  namespaced: true,
  state: {
    showHeader: false,
    headerMode: null,
    bgImage: null
  },
  mutations: {
    "SHOW_HEADER" (state, showHeader) {
      state.showHeader = showHeader
    },
    "HEADER_MODE" (state, headerMode) {
      state.headerMode = headerMode
    },
    "BG_IMG" (state, bgImage) {
      state.bgImage = bgImage
    }
  }
}