import { useMemo, useState } from 'react'

const CATEGORIES = ['全部', '小食', '粉麵', '甜品', '茶餐廳', '燒味']
const AREAS = ['全部', '慈雲山中心', '毓華街', '雲華街', '慈正邨街市']

const SHOPS = [
  {
    id: 'eggu-tsz',
    name: '街角雞蛋仔',
    emoji: '🧇',
    category: '小食',
    area: '雲華街',
    address: '慈雲山雲華街 8 號地舖',
    rating: 5,
    signature: '原味雞蛋仔、格仔餅',
    note: '外脆內軟，半糖先係精髓！',
    color: 'bg-amber-100',
  },
  {
    id: 'spicy-chicken',
    name: '辣媽鹽水雞',
    emoji: '🍗',
    category: '小食',
    area: '慈雲山中心',
    address: '慈雲山中心 3 樓小食店',
    rating: 4,
    signature: '三杯雞、藥膳鍋',
    note: '雞件嫩滑，惹味指數爆燈，無辣不歡必試！',
    color: 'bg-red-100',
  },
  {
    id: 'old-yee-noodles',
    name: '老余魚蛋粉',
    emoji: '🍜',
    category: '粉麵',
    area: '毓華街',
    address: '慈雲山毓華街 12 號',
    rating: 4,
    signature: '招牌魚蛋粉、雲吞麵',
    note: '湯底濃郁，魚蛋夠彈牙，凌晨都有人排隊。',
    color: 'bg-blue-100',
  },
  {
    id: 'wonton-king',
    name: '雲吞麵世家',
    emoji: '🥟',
    category: '粉麵',
    area: '雲華街',
    address: '慈雲山雲華街 21 號',
    rating: 4,
    signature: '大蓉雲吞、水餃',
    note: '雲吞皮薄餡足，食完仲想打包一斤走。',
    color: 'bg-pink-100',
  },
  {
    id: 'cafe-tsz',
    name: '慈雲冰室',
    emoji: '🥤',
    category: '茶餐廳',
    area: '慈雲山中心',
    address: '慈雲山中心 2 樓',
    rating: 4,
    signature: '熱奶茶、蛋撻',
    note: '懷舊鐵板餐，奶茶夠晒香濃，行過必飲。',
    color: 'bg-yellow-100',
  },
  {
    id: 'sweet-drip',
    name: '甜到漏糖水',
    emoji: '🥣',
    category: '甜品',
    area: '毓華街',
    address: '慈雲山毓華街 27 號',
    rating: 4,
    signature: '楊枝甘露、生磨芝麻糊',
    note: '足料唔吝嗇，芝麻糊即磨超香口。',
    color: 'bg-purple-100',
  },
  {
    id: 'chi-tsing-roast',
    name: '慈正燒臘',
    emoji: '🍚',
    category: '燒味',
    area: '慈正邨街市',
    address: '慈正邨街市燒味舖',
    rating: 4,
    signature: '叉燒、燒鵝',
    note: '油雞叉燒日日清，汁撈飯一流，街坊首選。',
    color: 'bg-orange-100',
  },
  {
    id: 'iced-egg',
    name: '冰火燉蛋',
    emoji: '🍮',
    category: '甜品',
    area: '慈雲山中心',
    address: '慈雲山中心 4 樓美食廣場',
    rating: 3,
    signature: '古法燉蛋、焦糖布甸',
    note: '滑溜綿密，燉蛋即叫即整。',
    color: 'bg-green-100',
  },
]

function Stars({ rating }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={n <= rating ? 'text-amber-400' : 'text-slate-300'}>
          ★
        </span>
      ))}
    </span>
  )
}

export default function SnackCirclePage() {
  const [category, setCategory] = useState('全部')
  const [area, setArea] = useState('全部')

  const filtered = useMemo(
    () =>
      SHOPS.filter(
        (s) =>
          (category === '全部' || s.category === category) &&
          (area === '全部' || s.area === area)
      ),
    [category, area]
  )

  const chip = (active) =>
    `px-3 py-1.5 rounded-xl border-2 border-slate-800 font-bold text-xs transition-all cursor-pointer ${
      active
        ? 'bg-slate-800 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
        : 'bg-white text-slate-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none'
    }`

  return (
    <div className="relative min-h-screen bg-cover bg-center bg-no-repeat bg-[url('/images/mobile.png')] md:bg-[url('/images/comp.png')] flex flex-col items-center px-4 py-10 pt-24 md:pt-28">
      <div className="w-full max-w-5xl flex flex-col gap-6">
        <div className="text-center mb-2">
          <p className="text-xs font-bold text-slate-400 mb-1">SNACK CIRCLE · OPENRICE STYLE</p>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">🍢 慈雲山小食圈</h1>
          <p className="text-sm text-slate-500 mt-1">
            由動物朋友同街坊一齊推薦嘅慈雲山在地小食指南！
          </p>
        </div>

        <div className="bg-white border-2 border-slate-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-2xl overflow-hidden">
          <div className="px-6 pt-5 pb-3 flex items-center justify-between gap-3 flex-wrap">
            <h2 className="text-lg font-bold text-slate-800">🗺️ 慈雲山位置地圖</h2>
            <a
              href="https://www.google.com/maps/place/Tsz+Wan+Shan"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-bold text-blue-600 underline"
            >
              喺 Google Maps 開啟 ↗
            </a>
          </div>
          <div className="px-6 pb-6">
            <iframe
              title="慈雲山地圖"
              src="https://www.google.com/maps?q=Tsz%20Wan%20Shan%20Kowloon%20Hong%20Kong&z=15&output=embed"
              className="w-full h-72 md:h-96 border-2 border-slate-800 rounded-xl"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <p className="text-[11px] text-slate-400 px-6 pb-5 -mt-2">
            📍 慈雲山 Tsz Wan Shan · 九龍黃大仙區，近保良局第一張永慶中學周邊
          </p>
        </div>

        <div className="bg-white border-2 border-slate-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
            <h2 className="text-lg font-bold text-slate-800">🔥 街坊推薦小店</h2>
            <span className="text-xs font-bold text-slate-400">
              顯示 {filtered.length} / {SHOPS.length} 間
            </span>
          </div>

          <div className="mb-5">
            <p className="text-xs font-bold text-slate-500 mb-2">類別</p>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button key={c} onClick={() => setCategory(c)} className={chip(category === c)}>
                  {c === '全部' ? '🗂️ 全部' : c}
                </button>
              ))}
            </div>
            <p className="text-xs font-bold text-slate-500 mb-2 mt-4">區域</p>
            <div className="flex flex-wrap gap-2">
              {AREAS.map((a) => (
                <button key={a} onClick={() => setArea(a)} className={chip(area === a)}>
                  {a === '全部' ? '📍 全部區域' : a}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-4xl mb-2">🤷</p>
              <p className="text-sm font-bold text-slate-500">呢個組合搵唔到店舖，試下其他篩選啦！</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((s) => (
                <div
                  key={s.id}
                  className="bg-white border-2 border-slate-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rounded-2xl overflow-hidden flex flex-col"
                >
                  <div
                    className={`${s.color} h-28 flex items-center justify-center text-6xl border-b-2 border-slate-800`}
                  >
                    {s.emoji}
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-bold text-slate-800">{s.name}</h3>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Stars rating={s.rating} />
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="bg-slate-100 border-2 border-slate-800 rounded-lg px-2 py-0.5 text-[11px] font-bold text-slate-700">
                        {s.category}
                      </span>
                      <span className="bg-blue-50 border-2 border-slate-800 rounded-lg px-2 py-0.5 text-[11px] font-bold text-blue-700">
                        📍 {s.area}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-600 mb-1">
                      ❤️ 推薦：{s.signature}
                    </p>
                    <p className="text-xs text-slate-500 mb-3">{s.note}</p>
                    <div className="mt-auto">
                      <p className="text-[11px] text-slate-400">🏠 {s.address}</p>
                    </div>
                    <a
                      href={`https://www.google.com/maps/search/${encodeURIComponent(
                        `${s.name} ${s.address} 慈雲山`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 w-full bg-white text-slate-800 font-bold text-sm py-2 rounded-xl border-2 border-slate-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all text-center cursor-pointer"
                    >
                      🧭 搵路去呢間
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          <p className="text-center text-[11px] text-slate-400 mt-6">
            📮 資料由管理員透過 Google Forms 收集整理，如有錯漏歡迎話俾我哋知，會持續更新！
          </p>
        </div>
      </div>
    </div>
  )
}