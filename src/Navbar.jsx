import { useState } from 'react'

const NAV_ITEMS = [
  { id: 'quiz', label: '心理測驗', en: 'Quiz', emoji: '📝' },
  { id: 'game', label: '小遊戲', en: 'Mini Game', emoji: '🎮' },
  { id: 'circle', label: '小食圈', en: 'Snack Circle', emoji: '🍢' },
  { id: 'lottery', label: '抽獎', en: 'Lottery', emoji: '🎰' },
]

export default function Navbar({ currentPage, onNavigate, memberName, points }) {
  const [open, setOpen] = useState(false)
  const isLoggedIn = !!memberName
  const memberText = isLoggedIn ? `👤 ${memberName}：${points} 積分` : '👤 未登入'

  const go = (id) => {
    onNavigate(id)
    setOpen(false)
  }

  const buttonClass = (id) =>
    `px-3 py-2 rounded-xl border-2 border-slate-800 font-bold text-sm transition-all cursor-pointer ${
      currentPage === id
        ? 'bg-slate-800 text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
        : 'bg-white text-slate-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]'
    }`

  const memberBtnClass = `flex items-center gap-1 rounded-xl border-2 border-slate-800 font-bold text-xs px-3 py-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] whitespace-nowrap ${
    isLoggedIn ? 'bg-yellow-200 text-slate-800' : 'bg-white text-slate-400'
  }`

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b-2 border-slate-800 shadow-[0px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
        <button
          onClick={() => go('quiz')}
          className="flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <img
            src="/images/hkpa_logo.png"
            alt="品牌標誌"
            className="h-10 w-auto object-contain"
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
        </button>

        <nav className="hidden md:flex items-center gap-2">
          {NAV_ITEMS.map((item) => (
            <button key={item.id} onClick={() => go(item.id)} className={buttonClass(item.id)}>
              <span className="mr-1">{item.emoji}</span>
              {item.label}
            </button>
          ))}
          <button onClick={() => go('member')} className={`${memberBtnClass} ml-1`}>
            <span className="truncate">{memberText}</span>
          </button>
        </nav>

        <div className="md:hidden flex items-center gap-2 min-w-0">
          <button
            onClick={() => go('member')}
            className={`${memberBtnClass} max-w-[46vw] min-w-0`}
          >
            <span className="truncate">{memberText}</span>
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="開啟選單"
            aria-expanded={open}
            className="w-10 h-10 shrink-0 rounded-xl bg-white border-2 border-slate-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center text-xl cursor-pointer"
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden bg-white border-t-2 border-slate-800 px-4 py-3 flex flex-col gap-2">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className={`${buttonClass(item.id)} text-left`}
            >
              <span className="mr-1">{item.emoji}</span>
              {item.label}
              <span className="opacity-60 text-xs ml-2">{item.en}</span>
            </button>
          ))}
        </nav>
      )}
    </header>
  )
}