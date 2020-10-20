<template>
  <div class="recommend">
    <Slider v-if="banners.length > 0" :sliderConf="bannerConf" mode="Slide">
      <div v-for="(item, index) in banners" :key="index">
        <a href="">
          <img :src="item.imageUrl" alt="" />
        </a>
      </div>
    </Slider>
    <!-- @start="hanldeClick" -->
    <Slider
      ref="iconSliderRef"
      :sliderConf="iconSliderConf"
      :sliderItemWidth="100"
      :sliderItemHeight="100"
      @start="handleStart"
    >
      <div
        v-for="(item, index) in iconSlider"
        :key="index"
        class="icon-item"
      >
        <a href="">
          <img
            style="width: 80%; height: 80%"
            :src="`${publicPath}icon/${item.name}.png`"
            alt=""
          />
        </a>
      </div>
    </Slider>
    <div class="jingxuan">懂你的精选歌单</div>
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeMount } from "vue";
import {useRouter} from "vue-router" 
import Slider from "components/Slider";
import { ApiGetBanner, ApiGetTopPlayList, ApiGetPlayListTags } from "api";

const getBanner = (state) => {
  return ApiGetBanner({ type: 1 })
    .then((res) => {
      state.banners = res.data.banners;
    })
    .catch((err) => {
      console.log(err);
    });
};

// const getTopPlayList = (state) => {
//   // ACG
//   return ApiGetTopPlayList(0, 6, "欧美").then(res => {
//     state.iconSlider = res.data.playlists
//   }).catch(err => {

//   })
// }

// const getPlayListTags = (state) => {
//   return ApiGetPlayListTags().then(res => {
//     debugger
//   }).catch(err => {

//   })
// }

const handleStart = (event) => {
  debugger
}

const setIcon = (state) => {
  state.iconSlider = [
    {
      name: "每日",
      to: "listdetail"
    },
    {
      name: "歌单",
      to: ""
    },
    {
      name: "私人FM",
      to: ""
    },
    {
      name: "排行榜",
      to: ""
    },
    {
      name: "电台",
      to: ""
    },
  ];
};

export default {
  name: "Recommend",
  components: {
    Slider,
  },
  setup() {
    let router = useRouter()
    let state = reactive({
      banners: [],
      bannerConf: {
        scrollX: true,
        scrollY: false,
        momentum: false,
        slide: {
          loop: true,
          threshold: 0.3,
          speed: 400,
          autoplay: false,
        },
      },
      iconSlider: [],
      iconSliderRef: null,
      iconSliderConf: {
        scrollX: true,
        scrollY: false,
        momentum: true,
      },
      icon: [],
      publicPath: process.env.BASE_URL,
      handleStart
    });


    // getPlayListTags(state)
    getBanner(state);
    setIcon(state);
    // getTopPlayList(state)

    onBeforeMount(() => {
      
    });

    return { ...toRefs(state) };
  },
  // emits: {
  //   start: (val) => {
  //     console.log(121233131);
  //   }
  // }
};
</script>

<style lang="less">
.recommend {
  height: 1500px;
  .icon-item {
    width: 100%;
    height: 100%;
    // background-color: rgb(44,44,44);
    // border-radius: 50%;
  }
  .jingxuan {
    font-size: 20px;
  }
}
</style>