<template>
  <div id="app">
    <router-view/>
    <!-- <MiniPlayer /> -->
  </div>
</template>

<script>
import MiniPlayer from "./components/MiniPlayer"

export default {
  components: {
    // MiniPlayer
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
