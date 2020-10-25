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

    // let ListData = ref([])
    let ListData = ref([
      {
        name: "もらい泣き",
        artist: [{ id: 16407, name: "一青窈", tns: [], alias: [] }],
        album: {
          id: 2076088,
          name: "月天心",
          picUrl:
            "http://p4.music.126.net/TGCYmrkJ0hGl12zDZVyA7g==/109951163968115491.jpg",
          tns: [],
          pic_str: "109951163968115491",
          pic: 109951163968115490,
        },
      },
      {
        name:
          "my long forgotten cloistered sleep (unreleased work of Xenosaga)",
        artist: [{ id: 29809121, name: "Emily Bindiger", tns: [], alias: [] }],
        album: {
          id: 55827,
          name: "FICTION II",
          picUrl:
            "http://p4.music.126.net/AOF4o3Wnbp_GGmu4ufLWDg==/767459116199756.jpg",
          tns: [],
          pic: 767459116199756,
        },
      },
      {
        name: "Pleasant Place",
        artist: [{ id: 17423, name: "のみこ", tns: [], alias: [] }],
        album: {
          id: 35498665,
          name: "STRUCTURED DANCEHALL",
          picUrl:
            "http://p3.music.126.net/ykC-o7dtiukeDyGA4yvw-g==/18504780697388941.jpg",
          tns: [],
          pic_str: "18504780697388941",
          pic: 18504780697388940,
        },
      },
      {
        name: "Lunatic Kaleidoscope",
        artist: [{ id: 28900393, name: "みぃ", tns: [], alias: [] }],
        album: {
          id: 3095055,
          name: '"Activity"Case:04 -Cosmic Horoscope-',
          picUrl:
            "http://p3.music.126.net/fpRItSlwXQQG_DdoaqrLYg==/7850513022428447.jpg",
          tns: [],
          pic: 7850513022428447,
        },
      },
      {
        name: "宇宙分解",
        artist: [
          { id: 12175308, name: "はるまきごはん", tns: [], alias: [] },
          { id: 159692, name: "初音ミク", tns: [], alias: [] },
        ],
        album: {
          id: 35829121,
          name: "BLUE ENDING NOVA",
          picUrl:
            "http://p4.music.126.net/_5WjsxMpQ-fSM0pD5lkl6A==/18999560928225758.jpg",
          tns: [],
          pic_str: "18999560928225758",
          pic: 18999560928225760,
        },
      },
      {
        name: "Important Lie",
        artist: [{ id: 17601, name: "茶太", tns: [], alias: [] }],
        album: {
          id: 2999776,
          name: "Radical Destruction",
          picUrl:
            "http://p3.music.126.net/oe033ILZcceSASIurinZcA==/18807146394882292.jpg",
          tns: [],
          pic_str: "18807146394882292",
          pic: 18807146394882292,
        },
      },
      {
        name: "ドララドラ~畑の唄~",
        artist: [{ id: 912099, name: "渕上舞", tns: [], alias: [] }],
        album: {
          id: 3111794,
          name: "ネコガミ様に聞いてみて！＆ドララドラ",
          picUrl:
            "http://p3.music.126.net/loBvsMaS-EmFP6-6ZazT-A==/7834020348605414.jpg",
          tns: [],
          pic: 7834020348605414,
        },
      },
      {
        name: "雲海",
        artist: [{ id: 16215, name: "柴田淳", tns: [], alias: [] }],
        album: {
          id: 2396068,
          name: "あなたと見た夢 君のいない朝",
          picUrl:
            "http://p3.music.126.net/yfzZmGccWXd853QuDvQ06Q==/2514583092748673.jpg",
          tns: [],
          pic: 2514583092748673,
        },
      },
      {
        name: "sweet dream",
        artist: [{ id: 191035, name: "山本椛", tns: [], alias: [] }],
        album: {
          id: 3377192,
          name: "叛逆のファンタスマゴリア",
          picUrl:
            "http://p3.music.126.net/AxJATa12iqi8vFtQrwsOcA==/3382097768414028.jpg",
          tns: [],
          pic: 3382097768414028,
        },
      },
      {
        name: "Love Potion（翻自 初音ミク＆GUMI） ",
        artist: [
          { id: 12420565, name: "MEON", tns: [], alias: [] },
          { id: 12227422, name: "Noi!", tns: [], alias: [] },
        ],
        album: {
          id: 80789794,
          name: "ラブポーション",
          picUrl:
            "http://p4.music.126.net/hfF1cJBWAcTRszl5xyiBxw==/109951164270143080.jpg",
          tns: [],
          pic_str: "109951164270143080",
          pic: 109951164270143070,
        },
      },
    ])
    
    let listDetailRef = ref(null)
    let emojis = ref([
      "😀 😁 😂 🤣 😃",
      "😄 😅 😆 😉 😊",
      "😫 😴 😌 😛 😜",
      "👆🏻 😒 😓 😔 👇🏻",
      "😑 😶 🙄 😏 😣",
      "😞 😟 😤 😢 😭",
      "🤑 😲 🙄 🙁 😖",
      "👍 👎 👊 ✊ 🤛",
      "🙄 ✋ 🤚 🖐 🖖",
      "👍🏼 👎🏼 👊🏼 ✊🏼 🤛🏼",
      "☝🏽 ✋🏽 🤚🏽 🖐🏽 🖖🏽",
      "🌖 🌗 🌘 🌑 🌒",
      "💫 💥 💢 💦 💧",
      "🐠 🐟 🐬 🐳 🐋",
      "😬 😐 😕 😯 😶",
      "😇 😏 😑 😓 😵",
      "🐥 🐣 🐔 🐛 🐤",
      "💪 ✨ 🔔 ✊ ✋",
      "👇 👊 👍 👈 👆",
      "💛 👐 👎 👌 💘",
      "👍🏼 👎🏼 👊🏼 ✊🏼 🤛🏼",
      "☝🏽 ✋🏽 🤚🏽 🖐🏽 🖖🏽",
      "🌖 🌗 🌘 🌑 🌒",
      "💫 💥 💢 💦 💧",
      "🐠 🐟 🐬 🐳 🐋",
      "😬 😐 😕 😯 😶",
      "😇 😏 😑 😓 😵",
      "🐥 🐣 🐔 🐛 🐤",
      "💪 ✨ 🔔 ✊ ✋",
      "👇 👊 👍 👈 👆",
      "💛 👐 👎 👌 💘",
    ])

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
        ListData.value = []

        setTimeout(() => {
          ListData.value = detail.value.tracks.map((item) => {
            return {
              name: item.name,
              artist: item.ar,
              album: item.al,
            }
          })
        }, 5000)
        console.log(JSON.stringify(ListData.value))
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
              backgroundImage: `url(${detail.value.coverImgUrl})`,
              opacity: 0.5,
              filter: "blur(100px)",
              width: "100%",
              height: "100%",
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
      // debugger
      setTimeout(() => {
        // 此步骤快于数据设置
        let scroll = new BScroll(listDetailRef.value, {
          probeType: 3,
          click: true,
          // scrollX: true,
          // scrollY: true,
          // momentum: true,
          // probeType:3,
          // directionLockThreshold: 0,
        })
  
        scroll.on("scroll", ({ y }) => {
          console.log("scrolling-")
        })
      }, 10200)
    })

    return () => (
      // <Header mode="list-detail"></Header>\
      // ref={listDetailRef}
      <div className="list-detail">
        <div className="core-container">
          
            <div className="scroll-wrapper" ref={listDetailRef}>
            <div className="scroll-content">
              {ListData.value.map((item, index) => {
                return (
                  <div className="scroll-item" key={index}>
                    {index}
                  </div>
                )
              })}
            </div>
          </div>
          
        </div>
        {/* {Detail()} */}
        {/* <div className="song-list">
            {listData.value.map((item, index) => {
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
          </div> */}
      </div>
    )
  },
})
