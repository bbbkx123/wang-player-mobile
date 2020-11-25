<template>
  <div class="app" >
    <div class="background-image" :style="{'background-image': bgImage ? `url(${bgImage}?param=375y700,)` : ''}"></div>
    <Header :show="showHeader" :mode="headerMode"></Header>
    <router-view class="views"/>
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
    headerMode () {
      let store = useStore()
      return store.state.page.headerMode
    },
    bgImage () {
      let store = useStore()
      return store.state.page.bgImage
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
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: rgb(21,21,21);
  .background-image {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    z-index: -100;
    filter: blur(15px);
  }
  .views {
    height: calc(100% - 8% - 50px);
  }
}
</style>
