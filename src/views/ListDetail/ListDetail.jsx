import { defineComponent, ref, reactive, unref, computed, onMounted } from "vue"
import { props } from "./define"

import { ApiPlayListDetail, ApiSongsDetail } from "api"

import SongList from "components/SongList"
import Header from "components/Header"

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

        // scroll.on("scroll", ({ y }) => {
        //   console.log("scrolling-")
        // })
      }, 500)
    })

    return () => (
      <div style="height:100%;">
        <Header mode="list-detail"></Header>
        <div className="list-detail" ref={listDetailRef}>
          <div className="list-detail-content">
          <div className="detail-wrapper">
          <div
            className="detail-background"
            style={{
              backgroundImage: `url(http://p1.music.126.net/_OeJZZUF-MGLVh66X5FNXQ==/109951165423758223.jpg)`
            }}
          ></div>
          <div className="detail">
            <div className="coverImg">
              <img src={detail.value.coverImgUrl} alt="" />
            </div>
            <div className="info">
              <div>{detail.value.name}</div>
              <div>{detail.value.nickname}</div>
              <div>
                <img
                  style={{ width: "30px", height: "30px", borderRadius: "50%" }}
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
      </div>
    )
  },
})
