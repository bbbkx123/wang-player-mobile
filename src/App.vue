<template>
  <div class="app">
    <div
      class="background-image"
      :style="{
        'background-image': bgImage ? `url(${bgImage}?param=375y700,)` : '',
      }"
    ></div>
    <div class="views">
      <Header :show="showHeader" :mode="headerMode"></Header>
      <router-view style="height:calc(100% - 50px);"  v-slot="{ Component }">
        <transition :name="transitionName">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    <div class="mini">
      <MiniPlayerViews />
    </div>
    <Player />
  </div>
</template>

<script>
import MiniPlayerViews from "./components/MiniPlayerViews"
import Player from "./components/Player"
import Header from "./components/Header"
import { useStore } from "vuex"
import {useRouter, useRoute} from "vue-router"

export default {
  components: {
    MiniPlayerViews,
    Player,
    Header,
  },
  data() {
    return {
      show: true,
      store1: useStore(),
      router: useRouter(),
      route: useRoute()
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
      
      this.route.name !== 'listdetail' ? this.router.push({name: 'listdetail'}) : this.router.push({name: 'recommend'})
      
    },
  },
}
</script>

<style lang="less">
@duration: .2s;

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
    // position: relative;
    height: calc(100% - 8%);
    .slide-right-enter {
      opacity: 1;
      transform: translateX(-100%);
    }
    .slide-right-leave-to {
      opacity: 0;
      transform: translateX(100%);
    }
    .slide-right-enter-active, .slide-right-leave-active {
      position: absolute;
      transition: all @duration cubic-bezier(1.0, 0.5, 0.8, 1.0) ;
    }

    .slide-left-enter {
      opacity: 1;
      transform: translateX(100%);
    }
    .slide-left-leave-to {
      opacity: 0;
      transform: translateX(-100%);
    }
    .slide-left-enter-active, .slide-left-leave-active {
      position: absolute;
      transition: all @duration cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
  }
  .mini {
    position: relative;
    bottom: 0;
    width: 100%;
    height: 8%;
  }
}
</style>
