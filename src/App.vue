<template>
  <div class="app">
    <div
      class="background-image"
      :style="{
        'background-image': bgImage ? `url(${bgImage}?param=375y700,)` : '',
      }"
    ></div>
    <Header :show="showHeader" :mode="headerMode"></Header>
    <router-view class="views" v-slot="{ Component }">
      <transition :name="transitionName">
        <component :is="Component" />
      </transition>
    </router-view>
    <!-- <MiniPlayerViews /> -->
    <Player />
  </div>
</template>

<script>
import MiniPlayerViews from "./components/MiniPlayerViews"
import Player from "./components/Player"
import Header from "./components/Header"
import { useStore } from "vuex"

export default {
  components: {
    MiniPlayerViews,
    Player,
    Header,
  },
  data() {
    return {
      show: true,
      store1: useStore()
    }
  },
  computed: {
    showHeader() {
      // let store = useStore()
      return this.store1.state.page.showHeader
    },
    headerMode() {
      let store = useStore()
      return this.store1.state.page.headerMode
    },
    bgImage() {
      let store = useStore()
      return this.store1.state.page.bgImage
    },
    transitionName () {
      return this.store1.state.page.direction === 'go' ? 'slide-left' : 'slide-right'
    }
  },
  watch: {
    // $route (to, from) {
    //   // console.log(to, from, this.$router);
    //   if (to.name === "listdetail" && from.name === "recommend") {
    //   }
    // }
  },
  methods: {
    handleClick() {
      this.show = !this.show
    },
  },
}
</script>

<style lang="less">
@duration:.3s;

.app {
  position: absolute;
  z-index: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: rgb(21, 21, 21);
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
    &.slide-right-enter {
      opacity: 1;
      transform: translateX(-100%);
    }
    &.slide-right-leave-to {
      opacity: 0;
      transform: translateX(100%);
    }
    &.slide-right-enter-active, &.slide-right-leave-active {
      position: absolute;
      transition: all @duration cubic-bezier(1.0, 0.5, 0.8, 1.0) ;
    }

    &.slide-left-enter {
      opacity: 1;
      transform: translateX(100%);
    }
    &.slide-left-leave-to {
      opacity: 0;
      transform: translateX(-100%);
    }
    &.slide-left-enter-active, &.slide-left-leave-active {
      position: absolute;
      transition: all @duration cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
  }
}
</style>
