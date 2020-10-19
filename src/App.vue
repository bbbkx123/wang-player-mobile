<template>
  <div id="app">
    <router-view/>
    <Player />
  </div>
</template>

<script>
import Player from "./components/Player"

export default {
  components: {
    Player
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
}
</style>
