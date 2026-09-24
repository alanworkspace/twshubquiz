import { useEffect, useRef, useState } from 'react'
import { PRIZES, rarityOf, TICKET_REWARD_SCORE, SCORE_PER_POINT } from './data/lotteryData'

export default function LotteryShopPage({
  isLoggedIn,
  member,
  onDraw,
  onRedeemPrize,
  onNavigate,
}) {
  const [drawing, setDrawing] = useState(false)
  const [reelIdx, setReelIdx] = useState(0)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const tickets = member?.tickets || 0
  const points = member?.points || 0
  const timerRef = useRef(null)

  useEffect(() => () => clearTimeout(timerRef.current), [])

  useEffect(() => {
    if (!error) return
    timerRef.current = setTimeout(() => setError(''), 3000)
    return () => clearTimeout(timerRef.current)
  }, [error])

  const flashError = (msg) => {
    setError(msg)
  }

  const handleDraw = () => {
    if (drawing) return
    if (tickets < 1) {
      flashError(`🎟️ 冇夠抽獎券！玩「救救慈雲山」單局夠 ${TICKET_REWARD_SCORE} 分就送一張~`)
      return
    }
    setError('')
    setResult(null)
    setDrawing(true)
    const total = 12 + Math.floor(Math.random() * 5)
    let i = 0
    const id = setInterval(() => {
      i += 1
      setReelIdx(i % PRIZES.length)
      if (i >= total) {
        clearInterval(id)
        const prize = onDraw()
        setDrawing(false)
        if (prize) {
          setResult({ prize, kind: 'draw' })
        } else {
          flashError('🎟️ 抽獎券數量可能有變，再試一次啦！')
        }
      }
    }, 90)
  }

  const handleRedeem = (prize) => {
    if (points < prize.points) {
      flashError(`🪙 積分唔夠（差 ${prize.points - points} 分），玩多啲遊戲儲分先！`)
      return
    }
    setError('')
    const ok = onRedeemPrize(prize)
    if (ok) {
      setResult({ prize, kind: 'redeem' })
    } else {
      flashError('🪙 積分唔夠，兌換失敗～')
    }
  }

  return (
    <div className="relative min-h-screen bg-cover bg-center bg-no-repeat bg-[url('/images/mobile.png')] md:bg-[url('/images/comp.png')] flex flex-col items-center px-4 py-10 pt-24 md:pt-28">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-6">
          <p className="text-xs font-bold text-slate-400 mb-1">LOTTERY & REWARDS</p>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">🎰 抽獎與獎品兌換</h1>
          <p className="text-sm text-slate-500 mt-1">
            用抽獎券抽獎，或者用積分保底直接兌換心水獎品！
          </p>
        </div>

        {!isLoggedIn || !member ? (
          <div className="bg-white border-2 border-slate-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-8 text-center max-w-md mx-auto">
            <p className="text-4xl mb-3">🔒</p>
            <h2 className="text-xl font-bold text-slate-800 mb-2">未登入會員</h2>
            <p className="text-sm text-slate-600 mb-5">
              登入會員先可以抽獎同用積分兌換獎品！抽獎券靠「救救慈雲山」單局 {TICKET_REWARD_SCORE} 分送俾你。
            </p>
            <button
              onClick={() => onNavigate('member')}
              className="w-full bg-slate-800 text-white font-bold text-base py-3 rounded-xl border-2 border-slate-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
            >
              👤 去會員中心登入
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-pink-100 border-2 border-slate-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rounded-xl px-4 py-3 text-center">
                <p className="text-3xl font-extrabold text-slate-800">{tickets}</p>
                <p className="text-xs font-bold text-slate-600">🎟️ 目前抽獎券</p>
              </div>
              <div className="bg-yellow-200 border-2 border-slate-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rounded-xl px-4 py-3 text-center">
                <p className="text-3xl font-extrabold text-slate-800">{points}</p>
                <p className="text-xs font-bold text-slate-600">🪙 目前積分</p>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border-2 border-red-300 rounded-xl px-4 py-3 mb-6 text-sm font-bold text-red-600">
                ⚠️ {error}
              </div>
            )}

            <div className="bg-white border-2 border-slate-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-6 mb-6">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-800">🎲 夾公仔式抽獎</h2>
                  <p className="text-xs text-slate-500">消耗 1 張抽獎券，抽中獎品即入你嘅獎品清單</p>
                </div>
              </div>

              <div className="bg-slate-100 border-2 border-slate-800 rounded-xl px-4 py-6 mb-5 flex flex-col items-center">
                <div className="text-7xl mb-3">{PRIZES[reelIdx].emoji}</div>
                <p className="text-sm font-bold text-slate-700 mb-1">
                  💡 玩「救救慈雲山」單局 ≥{TICKET_REWARD_SCORE} 分即送 1 張抽獎券（每 {SCORE_PER_POINT}{' '}
                  分 = 1 🪙）
                </p>
                <button
                  onClick={handleDraw}
                  disabled={drawing}
                  className={`mt-2 w-full max-w-xs bg-yellow-300 text-slate-800 font-bold text-lg py-3.5 rounded-xl border-2 border-slate-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer ${
                    drawing
                      ? 'opacity-60 cursor-not-allowed'
                      : 'hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none'
                  }`}
                >
                  {drawing ? '🎲 抽緊⋯' : `🎰 抽獎（-1 🎟️）`}
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {PRIZES.map((p, i) => {
                  const rarity = rarityOf(p)
                  return (
                    <span
                      key={p.id}
                      className={`${rarity.color} border-2 border-slate-800 rounded-lg px-2 py-1 text-[11px] font-bold text-slate-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                        i === reelIdx ? 'ring-2 ring-slate-800' : ''
                      }`}
                    >
                      {p.emoji} {rarity.label}
                    </span>
                  )
                })}
              </div>
            </div>

            <div className="bg-white border-2 border-slate-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-6">
              <h2 className="text-lg font-bold text-slate-800 mb-1">🛍️ 保底積分兌換區</h2>
              <p className="text-xs text-slate-500 mb-5">
                唔想靠運氣？直接用積分兌換同抽獎池一樣嘅獎品！
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {PRIZES.map((p) => {
                  const rarity = rarityOf(p)
                  return (
                    <div
                      key={p.id}
                      className="bg-white border-2 border-slate-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rounded-xl p-4 flex flex-col"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span
                          className={`${rarity.color} border-2 border-slate-800 rounded-lg px-2 py-0.5 text-[11px] font-bold text-slate-700`}
                        >
                          {rarity.label}
                        </span>
                        <span className="text-3xl">{p.emoji}</span>
                      </div>
                      <p className="font-bold text-slate-800 mb-1">{p.name}</p>
                      <p className="text-xs text-slate-500 flex-1 mb-3">{p.desc}</p>
                      <button
                        onClick={() => handleRedeem(p)}
                        className="bg-yellow-200 text-slate-800 font-bold text-sm py-2 rounded-lg border-2 border-slate-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
                      >
                        🪙 用 {p.points} 分兌換
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          </>
        )}
      </div>

      {result && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white border-2 border-slate-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-6 max-w-sm w-full text-center">
            <p className="text-xs font-bold text-slate-400 mb-2">
              {result.kind === 'draw' ? '🎰 抽獎結果' : '🛍️ 兌換成功'}
            </p>
            <div className="text-7xl mb-3">{result.prize.emoji}</div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">{result.prize.name}</h2>
            <p className="text-sm text-slate-500 mb-4">{result.prize.desc}</p>
            <p className="bg-green-50 border-2 border-green-300 rounded-xl px-4 py-2 text-sm font-bold text-green-700 mb-5">
              ✅ 已加入你嘅「我的獎品/兌換券」清單
            </p>
            <button
              onClick={() => setResult(null)}
              className="w-full bg-slate-800 text-white font-bold text-base py-3 rounded-xl border-2 border-slate-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer mb-2"
            >
              繼續
            </button>
            <button
              onClick={() => {
                setResult(null)
                onNavigate('member')
              }}
              className="w-full bg-white text-slate-800 font-bold text-sm py-2.5 rounded-xl border-2 border-slate-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
            >
              🎟️ 去會員中心睇我嘅獎品
            </button>
          </div>
        </div>
      )}
    </div>
  )
}