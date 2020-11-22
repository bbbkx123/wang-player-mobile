<template>
  <div id="app">
    <Header :show="showHeader"></Header>
    <router-view/>
    <MiniPlayerViews />
    <Player/>
  </div>
</template>

<script>
import MiniPlayerViews from "./components/MiniPlayerViews"
import Player from "./components/Player"
import Header from "./components/Header"
import {useStore} from "vuex"



export default {
  components: {
    MiniPlayerViews, Player, Header
  },
  computed: {
    showHeader () {
      let store = useStore()
      return store.state.page.showHeader
    }
  },
  mounted () {
    // console.log(this.$store);
  }
}
</script>

<style lang="less">
#app {
  position: absolute;
  z-index: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(21,21,21);
}
</style>
