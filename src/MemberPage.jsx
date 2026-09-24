import { useState } from 'react'
import quizData from './data/quizData'
import { AVATARS, DEFAULT_AVATAR } from './data/avatarsData'

const LEVELS = [
  { key: 'bronze', name: '銅級會員', emoji: '🥉', range: '0 - 799 積分', color: 'bg-amber-200' },
  { key: 'silver', name: '銀級會員', emoji: '🥈', range: '800 - 1999 積分', color: 'bg-slate-200' },
  { key: 'gold', name: '金級會員', emoji: '🥇', range: '2000+ 積分', color: 'bg-yellow-300' },
]

function computeLevel(points) {
  if (points >= 2000) return { key: 'gold', name: '金級會員', color: 'bg-yellow-300', next: null }
  if (points >= 800) return { key: 'silver', name: '銀級會員', color: 'bg-slate-200', next: 2000 }
  return { key: 'bronze', name: '銅級會員', color: 'bg-amber-200', next: 800 }
}

const inputClass =
  'w-full border-2 border-slate-800 rounded-xl px-4 py-3 bg-white font-semibold text-slate-800 placeholder:text-slate-400 placeholder:font-normal shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:bg-slate-50'

const MAX_NICKNAME_WIDTH = 10
const MIN_PASSWORD_LENGTH = 6

function nicknameWidth(name) {
  let w = 0
  for (const ch of name) w += /[^\x00-\xff]/.test(ch) ? 2 : 1
  return w
}

export default function MemberPage({
  isLoggedIn,
  member,
  onLogin,
  onRegister,
  onLogout,
  onUpdateAvatar,
  onNavigate,
}) {
  const [tab, setTab] = useState('history')
  const [mode, setMode] = useState('login')
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showAvatarModal, setShowAvatarModal] = useState(false)
  const [showLevelModal, setShowLevelModal] = useState(false)

  if (!isLoggedIn || !member) {
    const submit = (e) => {
      e.preventDefault()
      if (mode === 'register') {
        if (nicknameWidth(nickname.trim()) > MAX_NICKNAME_WIDTH) {
          setError('暱稱最多 5 個中文字或 10 個英文字母')
          return
        }
        if (password.length < MIN_PASSWORD_LENGTH) {
          setError('密碼長度至少需要 6 個字元')
          return
        }
      }
      const err = mode === 'login' ? onLogin(nickname, password) : onRegister(nickname, password)
      setError(err || '')
    }

    const switchMode = (m) => {
      setMode(m)
      setError('')
    }

    return (
      <div className="relative min-h-screen bg-cover bg-center bg-no-repeat bg-[url('/images/mobile.png')] md:bg-[url('/images/comp.png')] flex flex-col items-center justify-center px-4 py-10 pt-24 md:pt-28">
        <div className="w-full max-w-md">
          <div className="bg-white border-2 border-slate-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-6 md:p-8">
            <div className="text-center mb-6">
              <p className="text-xs font-bold text-slate-400 mb-1">MEMBER CENTER</p>
              <h1 className="text-2xl font-bold text-slate-800">
                {mode === 'login' ? '👋 會員登入' : '📝 會員註冊'}
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                {mode === 'login'
                  ? '登入後即可累積積分同兌換小食！'
                  : '用暱稱同密碼，即刻開個會員！'}
              </p>
            </div>

            <div className="flex gap-2 mb-6">
              <button
                onClick={() => switchMode('login')}
                className={`flex-1 py-2.5 rounded-xl border-2 border-slate-800 font-bold text-sm transition-all cursor-pointer ${
                  mode === 'login'
                    ? 'bg-slate-800 text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                    : 'bg-white text-slate-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                }`}
              >
                🔑 登入
              </button>
              <button
                onClick={() => switchMode('register')}
                className={`flex-1 py-2.5 rounded-xl border-2 border-slate-800 font-bold text-sm transition-all cursor-pointer ${
                  mode === 'register'
                    ? 'bg-slate-800 text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                    : 'bg-white text-slate-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                }`}
              >
                ✨ 註冊
              </button>
            </div>

            <form onSubmit={submit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-1">
                  暱稱 Nickname
                </label>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="輸入你嘅暱稱"
                  maxLength={10}
                  className={inputClass}
                />
                <p className="text-[11px] font-semibold text-slate-400 mt-1">
                  最多 5 個中文字或 10 個英文字母
                </p>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-1">
                  密碼 Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="最少 6 個字元"
                  maxLength={64}
                  className={inputClass}
                />
                <p className="text-[11px] font-semibold text-slate-400 mt-1">
                  密碼長度至少需要 6 個字元
                </p>
              </div>

              {error && (
                <p className="text-sm font-bold text-red-600 bg-red-50 border-2 border-red-300 rounded-xl px-4 py-2">
                  ⚠️ {error}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-slate-800 text-white font-bold text-lg py-3.5 rounded-xl border-2 border-slate-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer"
              >
                {mode === 'login' ? '🔑 登入會員' : '✨ 註冊會員'}
              </button>
            </form>

            <p className="text-center text-xs text-slate-400 mt-4">
              {mode === 'login' ? (
                <>
                  未有帳戶？
                  <button
                    onClick={() => switchMode('register')}
                    className="font-bold text-slate-700 underline cursor-pointer"
                  >
                    即刻註冊
                  </button>
                </>
              ) : (
                <>
                  已經有帳戶？
                  <button
                    onClick={() => switchMode('login')}
                    className="font-bold text-slate-700 underline cursor-pointer"
                  >
                    返去登入
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    )
  }

  const level = computeLevel(member.points)
  const lastHistory = member.history[0]
  const lastResult = lastHistory ? quizData.results[lastHistory.winner] : null
  const avatar = member.avatar || lastResult?.image || DEFAULT_AVATAR

  const RESULT_KEYS = ['A', 'B', 'C', 'AB', 'AC', 'BC']

  const unlockedResults = new Set(member.history.map((h) => h.winner))

  const progress = level.next
    ? Math.min(100, Math.round((member.points / level.next) * 100))
    : 100

  return (
    <div className="relative min-h-screen bg-cover bg-center bg-no-repeat bg-[url('/images/mobile.png')] md:bg-[url('/images/comp.png')] flex flex-col items-center px-4 py-10 pt-24 md:pt-28">
      <div className="w-full max-w-4xl flex flex-col gap-6">
        <div className="bg-white border-2 border-slate-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-6 flex flex-col md:flex-row gap-6">
          <div className="shrink-0 flex flex-col items-center gap-2">
            <button
              onClick={() => setShowAvatarModal(true)}
              className="relative group cursor-pointer"
              aria-label="更換頭像"
            >
              <img
                src={avatar}
                alt="會員頭像"
                className="w-28 h-28 md:w-32 md:h-32 object-contain border-2 border-slate-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rounded-2xl bg-white p-1 transition-transform group-hover:scale-105"
                onError={(e) => {
                  e.target.src = DEFAULT_AVATAR
                }}
              />
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[11px] font-bold rounded-lg px-2 py-0.5 border-2 border-slate-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] whitespace-nowrap">
                ✏️ 換頭像
              </span>
            </button>
          </div>

          <div className="w-full">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-slate-800">👤 {member.nickname}</h1>
              <button
                onClick={() => setShowLevelModal(true)}
                title="撳入去睇會員等級"
                className={`${level.color} border-2 border-slate-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-full px-3 py-1 text-sm font-bold text-slate-700 transition-all cursor-pointer hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]`}
              >
                {level.name} ℹ️
              </button>
            </div>
            <p className="text-xs font-bold text-slate-400 mb-4">MEMBER CENTER · 會員中心</p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
              <div className="bg-yellow-200 border-2 border-slate-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-xl px-4 py-2 text-center">
                <p className="text-2xl font-extrabold text-slate-800">{member.points}</p>
                <p className="text-xs font-bold text-slate-600">目前積分 🪙</p>
              </div>
              <div className="bg-pink-100 border-2 border-slate-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-xl px-4 py-2 text-center">
                <p className="text-2xl font-extrabold text-slate-800">{member.tickets || 0}</p>
                <p className="text-xs font-bold text-slate-600">抽獎券 🎰</p>
              </div>
              <div className="bg-white border-2 border-slate-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-xl px-4 py-2 text-center">
                <p className="text-2xl font-extrabold text-slate-800">{member.history.length}</p>
                <p className="text-xs font-bold text-slate-600">測驗次數 📝</p>
              </div>
              <div className="bg-white border-2 border-slate-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-xl px-4 py-2 text-center">
                <p className="text-2xl font-extrabold text-slate-800">{member.coupons.length}</p>
                <p className="text-xs font-bold text-slate-600">獎品/兌換券 🎟️</p>
              </div>
              <div className="bg-white border-2 border-slate-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-xl px-4 py-2 text-center">
                <p className="text-2xl font-extrabold text-slate-800">{member.highScore || 0}</p>
                <p className="text-xs font-bold text-slate-600">救救慈雲山 🧺</p>
              </div>
            </div>

            <button
              onClick={() => setShowLevelModal(true)}
              title="撳入去睇會員等級"
              className="block w-full text-left cursor-pointer mb-4"
            >
              <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
                <span>
                  升到「{level.next ? (level.next === 800 ? '銀級' : '金級') : '金級'}」
                </span>
                <span>{level.next ? `${member.points} / ${level.next}` : '已到頂級'}</span>
              </div>
              <div className="w-full h-4 bg-slate-100 border-2 border-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full ${level.color} transition-all duration-700 ease-out`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </button>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={onLogout}
                className="bg-red-50 text-red-600 font-bold text-sm py-2 px-4 rounded-xl border-2 border-slate-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
              >
                🚪 登出
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white border-2 border-slate-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <button
              onClick={() => setTab('history')}
              className={`px-4 py-2 rounded-xl border-2 border-slate-800 font-bold text-sm transition-all cursor-pointer ${
                tab === 'history'
                  ? 'bg-slate-800 text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                  : 'bg-white text-slate-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
              }`}
            >
              📝 測驗歷史
            </button>
            <button
              onClick={() => setTab('coupons')}
              className={`px-4 py-2 rounded-xl border-2 border-slate-800 font-bold text-sm transition-all cursor-pointer ${
                tab === 'coupons'
                  ? 'bg-slate-800 text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                  : 'bg-white text-slate-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
              }`}
            >
              🎟️ 我的兌換券 ({member.coupons.length})
            </button>
          </div>

          {tab === 'history' ? (
            member.history.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-4xl mb-2">📝</p>
                <p className="text-sm font-bold text-slate-500 mb-4">
                  未有測驗紀錄，快啲去做心理測驗啦！
                </p>
                <button
                  onClick={() => onNavigate('quiz')}
                  className="bg-slate-800 text-white font-bold text-sm py-2 px-5 rounded-xl border-2 border-slate-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                >
                  開始認識自己 →
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {member.history[0]?.rewarded ? (
                  <p className="bg-green-50 border-2 border-green-300 rounded-xl px-4 py-2 text-sm font-bold text-green-700">
                    🎉 呢次係本週第一次測驗，已獎勵 +50 分
                  </p>
                ) : (
                  <p className="bg-yellow-100 border-2 border-amber-400 rounded-xl px-4 py-2 text-sm font-bold text-amber-700">
                    🔁 本週已領取過測驗獎勵 50 分，今次測驗 +0 分（每週限一次）
                  </p>
                )}
                {member.history.map((h) => {
                  const r = quizData.results[h.winner]
                  return (
                    <div
                      key={h.id}
                      className={`${r?.color || 'bg-white'} border-2 border-slate-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rounded-xl px-4 py-3 flex items-center gap-4`}
                    >
                      <img
                        src={r?.image}
                        alt={h.charName}
                        className="w-12 h-12 object-contain shrink-0"
                        onError={(e) => {
                          e.target.style.display = 'none'
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-slate-800">
                          {h.charName}
                          {h.tag && <span className="text-slate-600 font-semibold"> - {h.tag}</span>}
                        </p>
                        <p className="text-xs text-slate-500">
                          {h.at} · {r?.name || h.title}
                        </p>
                      </div>
                      <span
                        className={`text-xs font-bold shrink-0 ${
                          h.rewarded ? 'text-green-600' : 'text-slate-400'
                        }`}
                      >
                        {h.rewarded ? '+50 分' : '+0 分（本週已領取）'}
                      </span>
                    </div>
                  )
                })}
              </div>
            )
          ) : member.coupons.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-4xl mb-2">🎟️</p>
<p className="text-sm font-bold text-slate-500 mb-4">
                  未有獎品或兌換券，去抽獎區或小食圈用積分換嘢啦！
                </p>
              <button
                onClick={() => onNavigate('circle')}
                className="bg-slate-800 text-white font-bold text-sm py-2 px-5 rounded-xl border-2 border-slate-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
              >
                🍢 去小食圈
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {member.coupons.map((c) => (
                <div
                  key={c.id}
                  className="bg-white border-2 border-slate-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rounded-xl px-4 py-3 flex items-center gap-4"
                >
                  <span className="text-3xl shrink-0">{c.emoji || '🎟️'}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-800">{c.title}</p>
                    <p className="text-xs text-slate-500 truncate">{c.desc}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="inline-block bg-yellow-200 border-2 border-slate-800 rounded-lg px-2 py-0.5 text-xs font-bold text-slate-700">
                      {c.code}
                    </span>
                    <p className="text-xs text-slate-400 mt-1">{c.date}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white border-2 border-slate-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-6">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
            <p className="text-xs font-bold text-slate-400 mb-1">角色公仔圖鑑</p>
            <span className="text-xs font-bold text-slate-500">
              已解鎖 {unlockedResults.size} / {RESULT_KEYS.length}
            </span>
          </div>
          <p className="text-sm text-slate-500 mb-4">
            完成心理測驗解鎖對應角色，撳已解鎖嘅角色卡即可快速設為會員頭像！
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {RESULT_KEYS.map((k) => {
              const r = quizData.results[k]
              if (!r) return null
              const isUnlocked = unlockedResults.has(k)
              const isActive = avatar === r.image
              return (
                <button
                  key={k}
                  onClick={() => isUnlocked && onUpdateAvatar(r.image)}
                  disabled={!isUnlocked}
                  title={isUnlocked ? '撳一下設為頭像' : '未解鎖'}
                  className={`${r.color} border-2 border-slate-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rounded-xl p-3 text-center transition-all ${
                    isUnlocked
                      ? 'cursor-pointer hover:scale-105 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                      : 'opacity-40 grayscale cursor-not-allowed'
                  } ${isActive ? 'ring-2 ring-slate-800' : ''}`}
                >
                  {isUnlocked ? (
                    <img
                      src={r.image}
                      alt={r.name}
                      className="w-14 h-14 mx-auto object-contain mb-1"
                      onError={(e) => {
                        e.target.style.display = 'none'
                      }}
                    />
                  ) : (
                    <div className="w-14 h-14 mx-auto mb-1 flex items-center justify-center text-3xl">
                      ❓
                    </div>
                  )}
                  <p className="text-sm font-bold text-slate-700">
                    {r.name.split(' - ')[0].trim()}
                  </p>
                  <p className="text-[11px] text-slate-500 mb-1">{r.traits?.[0] || ''}</p>
                  <span
                    className={`inline-block px-2 py-0.5 rounded-lg border-2 border-slate-800 text-[10px] font-bold ${
                      isUnlocked ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {isUnlocked ? (isActive ? '✅ 使用中頭像' : '✅ 已解鎖') : '🔒 未解鎖'}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {showLevelModal && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setShowLevelModal(false)}
        >
          <div
            className="bg-white border-2 border-slate-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-xs font-bold text-slate-400 mb-1">MEMBER LEVEL</p>
            <h2 className="text-xl font-bold text-slate-800 mb-1">📊 會員等級說明</h2>
            <p className="text-sm text-slate-500 mb-5">
              你的等級由累積積分決定，積分可以透過心理測驗同小遊戲獲得！
            </p>
            <div className="flex flex-col gap-3 mb-6">
              {LEVELS.map((lv) => {
                const isCurrent = level.key === lv.key
                return (
                  <div
                    key={lv.key}
                    className={`rounded-xl p-4 border-2 ${
                      isCurrent
                        ? `${lv.color} border-slate-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ring-2 ring-slate-800`
                        : 'bg-white border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-bold text-slate-800">
                        {lv.emoji} {lv.name}
                      </p>
                      <span className="bg-white border-2 border-slate-800 rounded-lg px-2 py-0.5 text-[11px] font-bold text-slate-700">
                        {lv.range}
                      </span>
                    </div>
                    {isCurrent && (
                      <p className="mt-2 text-xs font-bold text-slate-700">
                        ◎ 你係呢個等級！儲多啲積分升上去啦～
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
            <button
              onClick={() => setShowLevelModal(false)}
              className="w-full bg-slate-800 text-white font-bold text-base py-3 rounded-xl border-2 border-slate-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
            >
              收埋 Tips
            </button>
          </div>
        </div>
      )}

      {showAvatarModal && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setShowAvatarModal(false)}
        >
          <div
            className="bg-white border-2 border-slate-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-xs font-bold text-slate-400 mb-1">CHOOSE YOUR AVATAR</p>
            <h2 className="text-xl font-bold text-slate-800 mb-1">✏️ 揀個頭像</h2>
            <p className="text-sm text-slate-500 mb-5">
              心理測驗 6 款結果對應嘅角色公仔，揀一個做你嘅會員頭像
            </p>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {AVATARS.map((a) => (
                <button
                  key={a.id}
                  onClick={() => {
                    onUpdateAvatar(a.image)
                    setShowAvatarModal(false)
                  }}
                  className={`${a.color} border-2 rounded-xl p-3 text-center cursor-pointer transition-all hover:scale-105 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${
                    avatar === a.image
                      ? 'border-slate-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                      : 'border-slate-300'
                  }`}
                >
                  <img
                    src={a.image}
                    alt={a.name}
                    className="w-16 h-16 object-contain mx-auto mb-1"
                    onError={(e) => {
                      e.target.style.display = 'none'
                    }}
                  />
                  <p className="text-xs font-bold text-slate-700">{a.name}</p>
                  {avatar === a.image && (
                    <p className="text-[10px] font-bold text-slate-500 mt-1">使用中 ✅</p>
                  )}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowAvatarModal(false)}
              className="w-full bg-slate-800 text-white font-bold text-base py-3 rounded-xl border-2 border-slate-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
            >
              完成
            </button>
          </div>
        </div>
      )}
    </div>
  )
}