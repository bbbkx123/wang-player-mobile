<template>
  <div id="app">
    <router-view/>
    <MiniPlayerViews />
    <Player/>
  </div>
</template>

<script>
import MiniPlayerViews from "./components/MiniPlayerViews"
import Player from "./components/Player"

export default {
  components: {
    MiniPlayerViews, Player
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
