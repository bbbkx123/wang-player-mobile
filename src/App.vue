<template>
  <div class="app">
    <div
      class="background-image"
      :style="{
        'background-image': bgImage ? `url(${bgImage}?param=375y700,)` : '',
      }"
    ></div>
    <button style="color:red;" @click="() => isHide = !isHide">isHide</button>
    <div class="views">
      <Header :show="showHeader" :mode="headerMode"></Header>
      <router-view style="height:calc(100% - 50px);" v-slot="{ Component }">
        <transition :name="transitionName">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>

    <transition :name="transitionName1">
      <div v-if="isHide" class="mini-container">
        <MiniPlayerViews />
      </div>
    </transition>
    <div class="play-page">
      
    </div>
    <Player />
  </div>
  
</template>

<script>
// import VueRouteTransition from "./components/vue-route-transition/transition"


import MiniPlayerViews from "./components/MiniPlayerViews"
import PlayPage from "./components/PlayPage"
import Player from "./components/Player"
import Header from "./components/Header"
import { useStore } from "vuex"
import { useRouter, useRoute } from "vue-router"

export default {
  components: {
    MiniPlayerViews,
    Player,
    Header,
    PlayPage,
    // VueRouteTransition
  },
  data() {
    return {
      show: true,
      store1: useStore(),
      router: useRouter(),
      route: useRoute(),
      isHide: true
    }
  },
  computed: {
    showHeader() {
      return this.store1.state.page.showHeader
    },
    headerMode() {
      return this.store1.state.page.headerMode
    },
    bgImage() {
      return this.store1.state.page.bgImage
    },
    transitionName() {
      return this.store1.state.page.direction === "go"
        ? "slide-left"
        : "slide-right"
    },
    transitionName1 () {
      // return this.isHide ? 'mini-player-hide' : 'mini-player-show'
      return 'mini-player-hide'
    }
  },
  watch: {
  },
  methods: {
    handleClick() {
      this.route.name !== "listdetail"
        ? this.router.push({ name: "listdetail" })
        : this.router.push({ name: "recommend" })
    },
  },
}
</script>

<style lang="less">
@duration: 0.2s;

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
    height: calc(100% - 8%);
    .slide-right-enter {
      opacity: 1;
      transform: translateX(-100%);
    }
    .slide-right-leave-to {
      opacity: 0;
      transform: translateX(100%);
    }
    .slide-right-enter-active,
    .slide-right-leave-active {
      // position: absolute;
      transition: all @duration cubic-bezier(1, 0.5, 0.8, 1);
    }

    .slide-left-enter {
      opacity: 1;
      transform: translateX(100%);
    }
    .slide-left-leave-to {
      opacity: 0;
      transform: translateX(-100%);
    }
    .slide-left-enter-active,
    .slide-left-leave-active {
      // position: absolute;
      transition: all @duration cubic-bezier(1, 0.5, 0.8, 1);
    }
  }
  .mini-container {
    position: relative;
    bottom: 0;
    width: 100%;
    height: 8%;
    // .mini-player {
    //   &-enter, &-leave-to {
    //     opacity: 1;
    //     transform: translateY(8%);
    //   }
    //   // &-enter-to, &-leave {

    //   // }
    //   &-enter-active, &-leave-active {
    //     transition: all 15s linear;
    //   }
      
    // }
  }
  
  .mini-player-hide-enter, .mini-player-hide-leave-to{
    opacity: 0;
    // height: 0;
    transform: translateY(100px);
  }

  .mini-player-hide-enter-to, .mini-player-hide-leave{
    opacity: 1;
    // height: 8%;
    transform: translateY(-100px);
  }

  .mini-player-hide-enter-active, .mini-player-hide-leave-active {
    transition: all .5s linear;
  }
}
</style>
