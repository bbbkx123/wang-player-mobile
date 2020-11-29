<template>
  <div class="app" >
    <button @click="handleClick" style="color:red;">click - {{'' + show}}</button>
    <div class="background-image" :style="{'background-image': bgImage ? `url(${bgImage}?param=375y700,)` : ''}"></div>
    <Header :show="showHeader" :mode="headerMode"></Header>
    <transition name="slide">
      <router-view v-if="show" class="views"/>
    </transition>
    <!-- <MiniPlayerViews /> -->
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
  data () {
    return {
      show: true
    }
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
  },
  methods: {
    handleClick () {
      this.show = !this.show
    }
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
    // height: calc(100% - 8% - 50px);
    &.slide-enter {
      opacity: 0;
      transform: translateY(0);
    }
    &.slide-enter-to {
      opacity: 1;
      transform: translateY(1000px);
    }
    &.slide-leave {
      opacity: 1;
      transform: translateY(0);
    }
    &.slide-leave-to {
      opacity: 0;
      transform: translateY(1000px);
    }
    &.slide-enter-active {
      transition: all 3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    &.slide-leave-active  {
      transition: all 3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
  }
}
</style>
