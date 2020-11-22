<template>
  <div class="home" ref="">
    <div class="home-wrapper">
      <div class="navigation">
        <div class="trigger"></div>
        <div class="tabs">
          <div
            v-for="(tab, index) in tabs"
            :key="index"
            @click="() => clickTabs(tab.key)"
            class="tab-item"
            :class="{'tab-active': currentTabKey === index}"
          >
            {{ tab.name }}
          </div>
        </div>
        <div class="search"></div>
      </div>
      <div ref="pullDownWrapper" class="pull-down-wrapper">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, shallowReactive, toRefs, onMounted } from "vue";
import { useRouter } from "vue-router";
import BScroll from "@better-scroll/core"
import PullDown from "@better-scroll/pull-down"

BScroll.use(PullDown)

export default {
  name: "Mine",
  components: {},
  setup(props, ctx) {
    let router = useRouter();
    const routerMap = new Map([
      [0, "mine"],
      [1, "recommend"],
    ]);
    const clickTabs = (key) => {
      state.currentTabKey = key
      router.push({ name: routerMap.get(key) });
    };

    let state = reactive({
      tabs: [
        {
          key: 0,
          name: "我的",
        },
        {
          key: 1,
          name: "发现",
        },
        {
          key: 2,
          name: "云村",
        },
        {
          key: 3,
          name: "视频",
        },
      ],
      currentTabKey: null,
      clickTabs,
      pullDownWrapper: null
    });

    let state1 = shallowReactive({bscroll: null})

    onMounted(() => {
      // debugger
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

      // state1.bscroll.on("scroll-end", () => {
      //   console.log("scroll-end");
      // })

      // setTimeout(() => {
      //   state1.scroll.scrollTo(0, 10000)
      // }, 2000)
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
    // overflow-y: scroll;
    height: 100%;
    // &::before {
    //   display: block;
    //   content: '';
    //   overflow: hidden;
    //   height: @headerHeight;
    //   width: 100%;
    // }


    .navigation {
      // position: fixed;
      // top: 0;
      // z-index: 1000;
      display: flex;
      width: 100%;
      height: @headerHeight;
      background-color: #151515;
      .trigger {
        width: 20%;
      }
      .tabs {
        width: 60%;
        display: flex;
        flex-direction: row;
        .tab-item {
          width: 25%;
          font-size: 18px;
          line-height: @headerHeight;
          text-align: center;
          &.tab-active {
            font-weight: bold;
            font-size: 22px;
          }
        }
      }
      .search {
        width: 20%;
      }
    }
    .pull-down-wrapper {
      height: calc(100% - @headerHeight);
    }
  } 
}
</style>
