import { useCallback, useEffect, useRef, useState } from 'react'
import quizData from './data/quizData'
import { TICKET_REWARD_SCORE, SCORE_PER_POINT } from './data/lotteryData'

const GAME_TIME = 15
const BASKET_W = 96
const BASKET_H = 72
const ITEM_SIZE = 52
const FLOOR_H = 24

const ITEM_TYPES = [
  ...quizData.landing.characters.map((c, i) => ({
    id: c.id,
    label: c.name,
    image: c.image,
    chipColor: c.color,
    points: i === 2 ? 15 : 10,
    minSpeed: i === 2 ? 120 : 150,
    maxSpeed: i === 2 ? 175 : 200,
  })),
  {
    id: 'bomb',
    label: '炸彈',
    emoji: '💣',
    chipColor: 'bg-red-100',
    points: -15,
    minSpeed: 200,
    maxSpeed: 260,
  },
]

function pickType() {
  const r = Math.random()
  if (r < 0.3) return ITEM_TYPES[0]
  if (r < 0.6) return ITEM_TYPES[1]
  if (r < 0.82) return ITEM_TYPES[2]
  return ITEM_TYPES[3]
}

function makeItem(fieldW) {
  const type = pickType()
  return {
    id: Math.random().toString(36).slice(2),
    type,
    x: Math.random() * Math.max(1, fieldW - ITEM_SIZE),
    speed: type.minSpeed + Math.random() * (type.maxSpeed - type.minSpeed),
    y: -ITEM_SIZE,
  }
}

export default function CatchGamePage({ highScore = 0, isLoggedIn, onGameEnd, onNavigate }) {
  const [status, setStatus] = useState('idle')
  const [timeLeft, setTimeLeft] = useState(GAME_TIME)
  const [score, setScore] = useState(0)
  const [items, setItems] = useState([])
  const [basketX, setBasketX] = useState(0)
  const [best, setBest] = useState(highScore)
  const [credited, setCredited] = useState(false)
  const [gainedTicket, setGainedTicket] = useState(false)
  const [earnedPoints, setEarnedPoints] = useState(0)
  const [hitFx, setHitFx] = useState(null)

  const fieldRef = useRef(null)
  const itemsRef = useRef([])
  const scoreRef = useRef(0)
  const basketXRef = useRef(0)
  const timeLeftRef = useRef(GAME_TIME)
  const endedRef = useRef(false)
  const fieldRectRef = useRef(null)

  const moveBasket = useCallback((newX, width) => {
    const maxX = Math.max(0, (width || 600) - BASKET_W)
    const x = Math.max(0, Math.min(maxX, newX))
    basketXRef.current = x
    setBasketX(x)
  }, [])

  useEffect(() => {
    const w = fieldRef.current?.clientWidth || 600
    moveBasket(w / 2 - BASKET_W / 2, w)
  }, [moveBasket])

  useEffect(() => {
    setBest((b) => Math.max(b, highScore))
  }, [highScore])

  const startGame = () => {
    endedRef.current = false
    itemsRef.current = []
    scoreRef.current = 0
    timeLeftRef.current = GAME_TIME
    setItems([])
    setScore(0)
    setTimeLeft(GAME_TIME)
    setHitFx(null)
    setEarnedPoints(0)
    const w = fieldRef.current?.clientWidth || 600
    moveBasket(w / 2 - BASKET_W / 2, w)
    setStatus('playing')
  }

  const pointerMove = (e) => {
    if (status !== 'playing') return
    const rect = fieldRectRef.current || fieldRef.current?.getBoundingClientRect()
    if (!rect) return
    moveBasket(e.clientX - rect.left - BASKET_W / 2, rect.width)
  }

  const pointerDown = (e) => {
    if (status !== 'playing') return
    const rect = fieldRef.current?.getBoundingClientRect()
    fieldRectRef.current = rect
    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch (_) {
      /* noop */
    }
    pointerMove(e)
  }

  useEffect(() => {
    if (status !== 'playing') return
    const onKey = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') e.preventDefault()
      const w = fieldRef.current?.clientWidth || 600
      if (e.key === 'ArrowLeft') moveBasket(basketXRef.current - 28, w)
      if (e.key === 'ArrowRight') moveBasket(basketXRef.current + 28, w)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [status, moveBasket])

  useEffect(() => {
    if (status !== 'playing') return

    let raf = null
    let last = performance.now()
    let spawnAcc = 0
    const fieldH = fieldRef.current?.clientHeight || 480
    const fieldW = fieldRef.current?.clientWidth || 600
    const basketTop = fieldH - FLOOR_H - BASKET_H

    const endGame = (theScore) => {
      if (endedRef.current) return
      endedRef.current = true
      const res = onGameEnd(theScore)
      setCredited(!!(res && res.ok))
      setGainedTicket(!!(res && res.gainedTicket))
      setEarnedPoints(res && res.points ? res.points : 0)
      setBest((b) => Math.max(b, theScore))
      setStatus('ended')
    }

    const step = (now) => {
      const dt = Math.min(now - last, 100)
      last = now

      timeLeftRef.current -= dt / 1000
      if (timeLeftRef.current <= 0) {
        timeLeftRef.current = 0
        setTimeLeft(0)
        endGame(scoreRef.current)
        return
      }
      setTimeLeft(Math.ceil(timeLeftRef.current))

      const elapsed = GAME_TIME - timeLeftRef.current
      const speedFactor = 1 + (elapsed / GAME_TIME) * 1.1

      spawnAcc += dt
      while (spawnAcc >= 700) {
        spawnAcc -= 700
        itemsRef.current.push(makeItem(fieldW))
      }

      const keep = []
      for (const item of itemsRef.current) {
        item.y += item.speed * speedFactor * (dt / 1000)
        if (item.y >= basketTop) {
          const overlap =
            item.x + ITEM_SIZE > basketXRef.current && item.x < basketXRef.current + BASKET_W
          if (overlap) {
            const next = Math.max(0, scoreRef.current + item.type.points)
            scoreRef.current = next
            setScore(next)
            setHitFx({ key: Date.now(), x: item.x, delta: item.type.points })
          }
          continue
        }
        keep.push(item)
      }
      itemsRef.current = keep
      setItems([...keep])

      raf = requestAnimationFrame(step)
    }

    raf = requestAnimationFrame(step)
    return () => {
      if (raf) cancelAnimationFrame(raf)
    }
  }, [status, onGameEnd])

  useEffect(() => {
    if (!hitFx) return
    const id = setTimeout(() => setHitFx(null), 650)
    return () => clearTimeout(id)
  }, [hitFx])

  return (
    <div className="relative min-h-screen bg-cover bg-center bg-no-repeat bg-[url('/images/mobile.png')] md:bg-[url('/images/comp.png')] flex flex-col items-center px-4 py-10 pt-24 md:pt-28">
      <div className="w-full max-w-md">
        <div className="text-center mb-5">
          <p className="text-xs font-bold text-slate-400 mb-1">MINI GAME</p>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">🏔️ 救救慈雲山</h1>
          <p className="text-sm text-slate-500 mt-1">
            用籃仔接住三位主角，記得避開炸彈喎！⏱ {GAME_TIME} 秒一局
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-white border-2 border-slate-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rounded-xl px-4 py-2 text-center">
            <p className="text-2xl font-extrabold text-slate-800">⏱️ {timeLeft}s</p>
            <p className="text-xs font-bold text-slate-500">剩餘時間</p>
          </div>
          <div className="bg-yellow-200 border-2 border-slate-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rounded-xl px-4 py-2 text-center">
            <p className="text-2xl font-extrabold text-slate-800">{score}</p>
            <p className="text-xs font-bold text-slate-600">目前得分</p>
          </div>
          <div className="bg-white border-2 border-slate-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rounded-xl px-4 py-2 text-center">
            <p className="text-2xl font-extrabold text-slate-800">🏅 {best}</p>
            <p className="text-xs font-bold text-slate-500">最高紀錄</p>
          </div>
        </div>

        <div
          ref={fieldRef}
          onPointerDown={pointerDown}
          onPointerMove={pointerMove}
          className="relative w-full h-[60vh] min-h-[420px] max-h-[520px] overflow-hidden bg-slate-100 border-2 border-slate-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-2xl touch-none select-none"
        >
          <div className="absolute bottom-0 left-0 right-0 h-6 bg-slate-200 border-t-2 border-slate-800" />

          {items.map((item) =>
            item.type.image ? (
              <img
                key={item.id}
                src={item.type.image}
                alt={item.type.label}
                className="absolute pointer-events-none select-none"
                style={{ left: item.x, top: item.y, width: ITEM_SIZE, height: ITEM_SIZE }}
                onError={(e) => {
                  e.target.style.visibility = 'hidden'
                }}
              />
            ) : (
              <span
                key={item.id}
                className="absolute text-4xl leading-none"
                style={{ left: item.x, top: item.y }}
              >
                {item.type.emoji}
              </span>
            )
          )}

          <div
            className="absolute bottom-0 flex items-end justify-center"
            style={{ left: basketX, width: BASKET_W, height: FLOOR_H + BASKET_H }}
          >
            <span className="text-6xl leading-none">🧺</span>
          </div>

          {hitFx && (
            <div
              key={hitFx.key}
              className="absolute pointer-events-none animate-float-up text-2xl font-extrabold"
              style={{ left: hitFx.x, top: '30%' }}
            >
              {hitFx.delta > 0 ? `+${hitFx.delta}` : hitFx.delta}
            </div>
          )}

<div className="absolute top-2 left-3 text-xs font-bold text-slate-700 bg-white/80 border border-slate-300 rounded-lg px-2 py-1">
              呀慈/呀雲 +10 · 呀山 +15 · 💣 -15
            </div>

          {status === 'idle' && (
            <div className="absolute inset-0 bg-white/85 flex items-center justify-center overflow-y-auto p-4 z-10">
              <div className="bg-white border-2 border-slate-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-5 text-center max-w-sm w-full max-h-full overflow-y-auto">
                <h2 className="text-xl font-bold text-slate-800 mb-3">點樣玩？</h2>
<p className="text-sm text-slate-600 leading-relaxed mb-4">
                  用底部個籃仔接住掉落嘅三位主角！
                  <br />
                  ⬅️➡️ 鍵盤方向鍵 ／ 用手指或滑鼠拖曳移動
                  <br />
                  接到主角加分，掂到炸彈即扣 15 分
                </p>
                <div className="flex flex-wrap justify-center gap-2 mb-5">
                  {ITEM_TYPES.map((t) => (
                    <span
                      key={t.id}
                      className={`${t.chipColor} border-2 border-slate-800 rounded-lg px-2 py-1 text-xs font-bold text-slate-700 flex items-center gap-1`}
                    >
                      {t.image ? (
                        <img
                          src={t.image}
                          alt={t.label}
                          className="w-5 h-5 object-contain"
                          onError={(e) => {
                            e.target.style.display = 'none'
                          }}
                        />
                      ) : (
                        <span>{t.emoji}</span>
                      )}
                      {t.label} {t.points > 0 ? `+${t.points}` : t.points}
                    </span>
                  ))}
                </div>
                <p className="bg-yellow-100 border-2 border-amber-400 rounded-xl px-3 py-2 text-xs font-bold text-amber-700 mb-4">
                  🎟️ 單局達 {TICKET_REWARD_SCORE} 分，即送 1 張抽獎券！
                  <br />
                  💡 積分換算：每 {SCORE_PER_POINT} 分 = 1 🪙
                </p>
                <button
                  onClick={startGame}
                  className="w-full bg-slate-800 text-white font-bold text-lg py-3 rounded-xl border-2 border-slate-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer"
                >
                  🎮 開始遊戲（{GAME_TIME} 秒）
                </button>
              </div>
            </div>
          )}

          {status === 'ended' && (
            <div className="absolute inset-0 bg-white/85 flex items-center justify-center overflow-y-auto p-4 z-10">
              <div className="bg-white border-2 border-slate-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-5 text-center max-w-sm w-full max-h-full overflow-y-auto">
                <h2 className="text-xl font-bold text-slate-800 mb-3">時間到！</h2>
                <div className="bg-yellow-200 border-2 border-slate-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-xl px-4 py-3 mb-4">
                  <p className="text-2xl font-extrabold text-slate-800">{score}</p>
                  <p className="text-xs font-bold text-slate-600">最終得分 🏆</p>
                </div>
                {credited ? (
                  gainedTicket ? (
                    <p className="bg-yellow-100 border-2 border-amber-400 rounded-xl px-4 py-3 font-bold text-amber-700 mb-4">
                      🎉 恭喜獲得 1 張抽獎券！
                      <br />
                      積分 +{earnedPoints} 🪙，去抽獎區試下運氣啦！
                    </p>
                  ) : (
                    <p className="text-sm font-bold text-green-700 mb-4">
                      ✅ 已轉換成會員積分：+{earnedPoints} 🪙
                      <br />
                      <span className="text-slate-500 font-semibold text-xs">
                        （{score} 分 ÷ {SCORE_PER_POINT} ＝ {earnedPoints} 🪙，儲夠 {TICKET_REWARD_SCORE}{' '}
                        分即送抽獎券）
                      </span>
                    </p>
                  )
                ) : (
                  <p className="text-sm font-bold text-slate-600 mb-4">
                    🔒 登入會員後，今次得分就會累積成會員積分！
                  </p>
                )}
                <button
                  onClick={startGame}
                  className="w-full bg-slate-800 text-white font-bold text-lg py-3 rounded-xl border-2 border-slate-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer mb-3"
                >
                  🔄 再玩一次
                </button>
                <button
                  onClick={() => onNavigate(gainedTicket && credited ? 'lottery' : 'member')}
                  className="w-full bg-white text-slate-800 font-bold text-base py-2.5 rounded-xl border-2 border-slate-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                >
                  {credited && gainedTicket
                    ? '🎰 去抽獎區抽獎！'
                    : `👤 去會員中心${credited ? '' : '登入'}`}
                </button>
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-xs font-bold text-slate-400 mt-3">
          {isLoggedIn
            ? `遊戲得分會以「每 ${SCORE_PER_POINT} 分 = 1 🪙」換成會員積分，單局達 ${TICKET_REWARD_SCORE} 分即送抽獎券！`
            : '🔒 未登入會員，今次得分唔會儲存⋯ 去會員中心登入先啦！'}
        </p>
      </div>
    </div>
  )
}