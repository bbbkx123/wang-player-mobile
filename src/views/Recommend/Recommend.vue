<template>
  <div class="recommend">
    <Slider v-if="banners.length > 0" :sliderConf="bannerConf" mode="Slide">
      <div v-for="(item, index) in banners" :key="index">
        <a href="">
          <img :src="item.imageUrl" alt="" />
        </a>
      </div>
    </Slider>
    <Slider
      ref="iconSliderRef"
      :sliderConf="iconSliderConf"
      :sliderItemWidth="85"
      :sliderItemHeight="85"
      @hook-click="handleClick"
    >
      <div v-for="(item, index) in iconSlider" :key="index" class="icon-item">
        <img
          style="width: 80%; height: 80%"
          :src="`${publicPath}image/${item.name}.png`"
          alt=""
        />
      </div>
    </Slider>
    <div class="jingxuan">懂你的精选歌单</div>
  </div>
</template>

<script>
import {
  defineComponent,
  reactive,
  shallowReactive,
  toRefs,
  onBeforeMount,
} from "vue";
import { useRouter } from "vue-router";
import Slider from "components/Slider";

import { iconSlider, bannerConf, iconSliderConf } from "./define";
import { ApiGetBanner, ApiGetTopPlayList, ApiGetPlayListTags } from "api";

import "./index.less";

export default defineComponent({
  components: {
    Slider,
  },
  setup() {
    let router = useRouter();
    let _state = shallowReactive({
      bannerConf,
      iconSliderConf,
    });

    let state = reactive({
      banners: [],
      iconSlider,
      iconSliderRef: null,
      icon: [],
      publicPath: process.env.BASE_URL,
      handleClick,
    });

    function getBanner() {
      return ApiGetBanner({ type: 1 })
        .then((res) => {
          state.banners = res.data.banners;
        })
        .catch((err) => {
          console.log(err);
        });
    }

    function getTopPlayList() {
      // ACG
      return ApiGetTopPlayList(0, 6, "欧美")
        .then((res) => {
          state.iconSlider = res.data.playlists;
        })
        .catch((err) => {});
    }

    function getPlayListTags() {
      return ApiGetPlayListTags()
        .then((res) => {
          debugger;
        })
        .catch((err) => {});
    }

    function handleClick(event) {
      debugger;
    }

    // getPlayListTags(state)
    getBanner();
    // getTopPlayList(state)

    onBeforeMount(() => {});

    return { ...toRefs(state), ...toRefs(_state) };
  },
});
</script>
