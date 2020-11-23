<template>
  <div class="app" >
    <div class="background-image" :style="{'backgroundImage': backgroundImage ? `url(${backgroundImage}?param=375y700,)` : 'none'}"></div>
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
    },
    backgroundImage () {
      let store = useStore()
      return store.state.page.backgroundImage
    }
  },
  mounted () {
    // console.log(this.$store);
  }
}
</script>

<style lang="less">
.app {
  position: absolute;
  z-index: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(21,21,21);
  
  .background-image {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    z-index: -100;
    filter: blur(50px);
  }
}
</style>
