import { createStore } from 'vuex'
import player from "./modules/player"
import page from "./modules/page"



export default createStore({
  modules: {
    player, page
  }
})
