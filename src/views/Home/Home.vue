<template>
  <div class="home" ref="">
    <div class="home-wrapper" ref="homeWrapper">
      <div class="header">
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
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// import Slider from "components/Slider"
// import Mine from "views/Mine"
// import Recommend from "views/Recommend"
import { reactive, shallowReactive, toRefs, onMounted } from "vue";
import { useRouter } from "vue-router";
import BScroll from "@better-scroll/core"
import ScrollBar from "@better-scroll/scroll-bar"

BScroll.use(ScrollBar)

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
      homeWrapper: null
    });

    let state1 = shallowReactive({scroll: null})

    onMounted(() => {
      state1.scroll = new BScroll(state.homeWrapper, {
        scrollY: true,
        scrollX: false,
        scrollbar: true
      })

      setTimeout(() => {
        state1.scroll.scrollTo(0, 10000)
      }, 2000)
    })

    return { ...toRefs(state), state1 };
  },
};
</script>

<style lang="less">
@headerHeight: 50px;

.home {
  width: 100%;
  .home-wrapper {
    position: relative;
    overflow-x: hidden;
    overflow-y: scroll;
    height: 100%;
    .header {
      width: 100%;
      height: @headerHeight;
      display: flex;
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
  } 
}
</style>
