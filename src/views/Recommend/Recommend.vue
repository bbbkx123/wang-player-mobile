<template>
  <div class="recommend">
    <Slider v-if="banners.length > 0" :sliderConf="bannerConf" mode="Slide">
      <div v-for="(item, index) in banners" :key="index">
        <a href="">
          <img :src="item.imageUrl" alt="">
        </a>
      </div>
    </Slider>
    <Slider :sliderConf="iconSliderConf" :sliderItemWidth="100">
      <div v-for="(item, index) in iconSlider" :key="index">
        <a href="">
          <img style="width:100%;height:100%;" :src="`${publicPath}icon/${item.name}.png`" alt="">
        </a>
      </div>
    </Slider>
    <div @click="fun">click</div>
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

const setIcon = (state) =>{
  let base = 
  console.log(process.env);
  debugger
  state.iconSlider = [
    {
      name: "123",
    },
    {
      name: "歌单",
    },
    {
      name: "私人FM",
    },
    {
      name: "排行榜",
    },
    {
      name: "电台",
    }
  ]
}


export default {
  name: "Recommend",
  components: {
    Slider
  },
  setup() {
    const fun = () => {
        console.log(12122121);
      }
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
      iconSlider: [],
      iconSliderConf: {
        scrollX: true,
        scrollY: false,
        momentum: true,
      },
      icon: [],
      publicPath: process.env.BASE_URL
    })

    
    // getPlayListTags(state)
    getBanner(state)
    setIcon(state)
    // getTopPlayList(state)

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