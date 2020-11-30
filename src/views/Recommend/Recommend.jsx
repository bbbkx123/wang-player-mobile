import {
  defineComponent,
  ref,
  unref,
  reactive,
  shallowReactive,
  toRefs,
  onBeforeMount,
} from "vue"
import { useRouter } from "vue-router"
import {useStore} from "vuex"
import Slider from "components/Slider"

import {
  iconSlider as _iconSlider,
  bannerConf as _bannerConf,
  iconSliderConf as _iconSliderConf,
} from "./define"
import { ApiGetBanner, ApiGetTopPlayList, ApiGetPlayListTags } from "api"

import "./index.less"

export default defineComponent({
  components: {
    Slider,
  },
  setup() {
    let router = useRouter()
    const store = useStore()
    let bannerConf = ref(_bannerConf),
      iconSliderConf = ref(_iconSliderConf),
      iconSlider = ref(_iconSlider),
      banners = ref([]),
      publicPath = ref(process.env.BASE_URL)

    function getBanner() {
      return ApiGetBanner({ type: 1 })
        .then((res) => {
          banners.value = res.data.banners
        })
        .catch((err) => {
          console.log(err)
        })
    }

    function getTopPlayList() {
      // ACG
      return ApiGetTopPlayList(0, 6, "欧美")
        .then((res) => {
          //  res.data.playlists
        })
        .catch((err) => {})
    }

    function getPlayListTags() {
      return ApiGetPlayListTags()
        .then((res) => {
          
        })
        .catch((err) => {})
    }

    function handleClick(event) {
      store.commit('page/DIRECTION', 'go')
      router.push({name: 'listdetail'})
    }

    getBanner()

    onBeforeMount(() => {})

    return () => (
      <div class="recommend">
        {banners.value.length > 0 && (
          <Slider
            sliderConf={unref(bannerConf)}
            mode="Slide"
          >
            {banners.value.map((item, index) => {
              return (
                <div key={index}>
                  <a href="">
                    <img src={item.imageUrl} alt="" />
                  </a>
                </div>
              )
            })}
          </Slider>
        )}
        <Slider
          sliderConf={unref(iconSliderConf)}
          sliderItemWidth={85}
          sliderItemHeight={85}
          onClick={handleClick}
        >
          {iconSlider.value.map((item, index) => {
            return (
              <div key={index} class="icon-item">
                <img
                  style="width: 80%; height: 80%"
                  src={`${publicPath.value}image/${item.name}.png`}
                  alt=""
                />
              </div>
            )
          })}
        </Slider>
      </div>
    )
  },
})
