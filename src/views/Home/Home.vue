<template>
  <div class="home" ref="">
    <div class="home-wrapper">
      <div ref="pullDownWrapper" class="pull-down-wrapper">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, shallowReactive, toRefs, onMounted, onUnmounted, onUpdated } from "vue";
import { useRouter } from "vue-router";
import {useStore} from "vuex"
import BScroll from "@better-scroll/core"
import PullDown from "@better-scroll/pull-down"

BScroll.use(PullDown)

export default {
  name: "Mine",
  components: {},
  setup(props, ctx) {
    let router = useRouter();
    let store = useStore()
    let state = reactive({
      pullDownWrapper: null
    });

    let state1 = shallowReactive({bscroll: null})

    store.dispatch('page/intoPage', { pageType: 'home'})
    onMounted(() => {
      state1.bscroll = new BScroll(state.pullDownWrapper, {
        scrollY: true,
        scrollX: false,
        // 锁定方向
        directionLockThreshold: 0,
        freeScroll: false,
        pullDownRefresh: {
          // stop: 200
        },
        // click: true,
      })

      state1.bscroll.on("pullingDown", () => {
        console.log("pull-down");
        setTimeout(() => state1.bscroll.finishPullDown(), 2000)
      })

      state1.bscroll.on("scroll", () => {
        // console.log("scroll");
      })
    })

    onUpdated(() => {
      store.dispatch('page/intoPage', {pageType: 'home'})
    })


    onUnmounted(() => {
      store.dispatch('page/leavePage')
    })

    return { ...toRefs(state), state1 };
  },
};
</script>

<style lang="less">
@headerHeight: 50px;

.home {
  width: 100%;
  height: 100%;
  .home-wrapper {
    position: relative;
    overflow-x: hidden;
    height: 100%;
    .pull-down-wrapper {
      height: calc(100% - @headerHeight);
    }
  }
}
</style>
