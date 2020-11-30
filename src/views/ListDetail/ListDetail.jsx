import { defineComponent, ref, onMounted, onUpdated, onBeforeUnmount } from "vue"
import { useStore } from 'vuex';
import { props } from "./define"

import { ApiPlayListDetail, ApiSongUrl } from "api"

import SongList from "components/SongList"

import BScroll from "@better-scroll/core"
import "./index.less"

export default defineComponent({
  props,
  components: { SongList },
  setup(props) {
    let detail = ref({})
    let ListData = ref([])
    let listDetailRef = ref(null)    
    let store = useStore()

    const getPlayListDetail = () => {
      // 3185023336   纯音乐 453208524
      return ApiPlayListDetail(3185023336).then((res) => {
        let { coverImgUrl, name, trackIds, tracks } = res.data.playlist
        let { avatarUrl, nickname } = res.data.playlist.creator
        detail.value = {
          avatarUrl,
          nickname,
          name,
          coverImgUrl,
          trackIds,
          tracks,
        }

        ListData.value = tracks.map((item) => {
          return {
            name: item.name,
            artist: item.ar,
            album: item.al,
          }
        })
      })
    }

    const handlePlay = (index) => {
      return () => {
        let {id} = detail.value.trackIds[index]
        ApiSongUrl(id).then(res => {
          store.dispatch('player/selectPlay', {
            url: res.data.data[0].url,
            pic: ListData.value[index].album.picUrl
          })
          console.log('开始播放了');
        }, err => {
          console.log('报错了');
        })
      }
    }

    onMounted(() => {
      setTimeout(() => {
        // 此步骤快于数据设置, 保证在最后执行
        let scroll = new BScroll(listDetailRef.value, {
          probeType: 3,
          click: true,
          scrollX: false,
          scrollY: true,
          momentum: true,
        })
      }, 500)
    })

    onUpdated(() => {
      store.dispatch('page/intoPage', {backgroundImage: detail.value.coverImgUrl, pageType: 'list-details'})
    })

    onBeforeUnmount(() => {
      store.dispatch('page/leavePage')
    })

    getPlayListDetail()

    return () => (
      <div>
        <div className="list-detail" ref={listDetailRef}>
          <div className="list-detail-content">
            <div className="detail-wrapper">
              <div className="detail">
                <div className="coverImg">
                  {/* <img src={detail.value.coverImgUrl} alt="" /> */}
                </div>
                <div className="info">
                  {/* <div>{detail.value.name}</div>
                  <div>{detail.value.nickname}</div> */}
                  <div>
                    <img
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                      }}
                      src={detail.value.avatarUrl}
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="edit"></div>
            </div>
            <div className="song-list">
              {ListData.value.map((item, index) => {
                return (
                  <div className="song-item" onClick={handlePlay(index)}>
                    <div className="index">{index + 1}</div>
                    <div className="main">
                      <div className="song-name">{item.name}</div>
                      <div className="other-info">
                        <span className="info">
                          {`${item.artist.reduce(
                            (prev, cur) => prev + " " + cur.name,
                            ""
                          )} - ${item.album.name}`}
                        </span>
                        <span>{}</span>
                      </div>
                    </div>
                    <div className="edit"></div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  },
})
