import { defineComponent, ref, reactive, unref, computed, onMounted } from "vue"
import { props } from "./define"

import { ApiPlayListDetail, ApiSongsDetail } from "api"

import SongList from "components/SongList"

import "./index.less"
import BScroll from "@better-scroll/core"

export default defineComponent({
  props,
  components: { SongList },
  setup(props) {
    let detail = ref({})
    let ListData = ref([])
    let listDetailRef = ref(null)

    function getPlayListDetail() {
      return ApiPlayListDetail(3159790268).then((res) => {
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

        ListData.value = detail.value.tracks.map((item) => {
          return {
            name: item.name,
            artist: item.ar,
            album: item.al,
          }
        })
      })
    }

    getPlayListDetail()

    function Detail() {
      let _detail = unref(detail)
      return (
        <div className="detail-wrapper">
          <div
            className="detail-background"
            style={{
              backgroundImage: `url(http://p1.music.126.net/_OeJZZUF-MGLVh66X5FNXQ==/109951165423758223.jpg)`,
              // opacity: 0.5,
              // filter: "blur(10px)",
              // width: "100%",
              // height: "100%",
              // overflow: 'hidden'
            }}
          ></div>
          <div className="detail">
            <div className="coverImg">
              <img src={_detail.coverImgUrl} alt="" />
            </div>
            <div className="info">
              <div>{_detail.name}</div>
              <div>{_detail.nickname}</div>
              <div>
                <img
                  style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                  src={_detail.avatarUrl}
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="edit"></div>
        </div>
      )
    }

    onMounted(() => {
      setTimeout(() => {
        // 此步骤快于数据设置
        let scroll = new BScroll(listDetailRef.value, {
          probeType: 3,
          click: true,
          scrollX: false,
          scrollY: true,
          momentum: true,
        })

        scroll.on("scroll", ({ y }) => {
          console.log("scrolling-")
        })
      }, 200)
    })

    return () => (
      // <div>
        <div className="list-detail" ref={listDetailRef}>
          <div className="list-detail-content">
            {Detail()}
            <div className="song-list">
              {ListData.value.map((item, index) => {
                return (
                  <div className="song-item">
                    <div className="index"></div>
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
      // </div>
    )
  },
})
