<template>
  <div class="recommend">
    <Slider v-if="banners.length > 0" :sliderConf="bannerConf" mode="Slide">
      <div v-for="(item, index) in banners" :key="index">
        <a href="">
          <img :src="item.imageUrl" alt="">
        </a>
      </div>
    </Slider>
    <Slider v-if="recommend1.length > 0" :sliderConf="recommend1Conf" :sliderItemWidth="100">
      <div v-for="(item, index) in recommend1" :key="index">
        <a href="">
          <img :src="item.coverImgUrl" alt="">
        </a>
      </div>
    </Slider>
    <!-- <Slider v-if="recommend1.length > 0" :sliderConf="recommend1Conf" :sliderItemWidth="300">
      <div v-for="(item, index) in recommend1" :key="index">
        <a href="">
          <img :src="item.coverImgUrl" alt="">
        </a>
      </div>
    </Slider>
    <Slider v-if="recommend1.length > 0" :sliderConf="recommend1Conf" :sliderItemWidth="300">
      <div v-for="(item, index) in recommend1" :key="index">
        <a href="">
          <img :src="item.coverImgUrl" alt="">
        </a>
      </div>
    </Slider> -->
  </div>
</template>

<script>
import {reactive, toRefs, onBeforeMount} from "vue"
import Slider from 'components/Slider'
import {ApiGetBanner, ApiGetTopPlayList, ApiGetPlayListTags} from "api"

const getBanner = (state) => {
  return ApiGetBanner({type: 1}).then(res => {
    state.banners = res.data.banners
  }).catch(err => {
    console.log(err)
  })
}

const getTopPlayList = (state) => {
  // ACG
  return ApiGetTopPlayList(0, 6, "欧美").then(res => {
    state.recommend1 = res.data.playlists
  }).catch(err => {

  })
}

// const getPlayListTags = (state) => {
//   return ApiGetPlayListTags().then(res => {
//     debugger
//   }).catch(err => {

//   })
// }


export default {
  name: "Recommend",
  components: {
    Slider
  },
  setup() {
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
          autoplay: false
        }
      },
      recommend1: [],
      recommend1Conf: {
        scrollX: true,
        scrollY: false,
        momentum: true,
      }
    })
    // getPlayListTags(state)
    getBanner(state)
    getTopPlayList(state)

    onBeforeMount(() => {})

    return {...toRefs(state)}
  }
}
</script>

<style lang="less">
.recommend {
  height: 1500px;
}
</style>