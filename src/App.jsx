import { useState, useCallback, useMemo } from 'react'
import quizData from './data/quizData'

function shuffleArray(array) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function LandingPage({ onStart }) {
  return (
    <div className="relative min-h-screen bg-cover bg-center bg-no-repeat bg-[url('/images/mobile.png')] md:bg-[url('/images/comp.png')] flex flex-col items-center justify-center px-4 py-10 pt-20 md:pt-24">
      <div className="absolute top-4 left-4 md:top-6 md:left-8 z-10">
        <img
          src="/images/hkpa_logo.png"
          alt="HKPA Logo"
          className="h-10 md:h-14 w-auto object-contain"
          onError={(e) => {
            e.target.style.display = 'none'
          }}
        />
      </div>
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-center gap-8">
        <div className="flex-[1.3] space-y-6 w-full">
          <div className="bg-white border-2 border-slate-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3 whitespace-nowrap">
              {quizData.landing.title}
            </h1>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed">
              {quizData.landing.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 md:flex md:gap-3 w-full pb-2">
            {quizData.landing.characters.map((c) => (
              <div
                key={c.id}
                className={`${c.color} border-2 border-slate-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rounded-xl px-4 py-3 shrink-0 flex items-center justify-between gap-3`}
              >
                <span className="text-m font-bold text-slate-700">{c.name}</span>
                {c.image && (
                  <img
                    src={c.image}
                    alt={c.name}
                    className="w-12 h-12 md:w-18 md:h-18 object-contain"
                  />
                )}
              </div>
            ))}
          </div>

          <button
            onClick={onStart}
            className="w-full bg-slate-800 text-white font-bold text-lg py-4 rounded-xl border-2 border-slate-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer"
          >
            開始認識自己 →
          </button>
        </div>

        <div className="flex-1 w-full flex justify-center">
          <img
            src={quizData.landing.heroImage}
            alt="hero"
            className="w-full h-auto object-contain max-h-[380px]"
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
        </div>

      </div>
    </div>
  )
}

function QuizPage({ questions, onResult }) { 
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState([])
  const [animating, setAnimating] = useState(false)
  const [direction, setDirection] = useState('next')

  const total = questions.length
  const question = questions[current]

  const shuffledOptions = useMemo(() => {
    if (!question || !question.options) return []
    return shuffleArray(question.options)
  }, [current, question])

  const goBack = useCallback(() => {
    if (current > 0 && !animating) {
      setDirection('prev')
      setAnimating(true)
      setTimeout(() => {
        setCurrent((c) => c - 1)
        setAnimating(false)
      }, 250)
    }
  }, [current, animating])

const selectOption = useCallback(
    (optionId) => {
      if (animating) return

      const newAnswers = [...answers]
      newAnswers[current] = { qId: question.id, ans: optionId }
      setAnswers(newAnswers)

      setDirection('next')
      setAnimating(true)

      setTimeout(() => {
        if (current + 1 < total) {
          setCurrent((c) => c - 1 >= 0 ? c + 1 : c + 1)
          setAnimating(false)
        } else {
          const counts = { A: 0, B: 0, C: 0 }
          newAnswers.forEach((a) => {
            const choice = a.ans || a
            if (counts[choice] !== undefined) counts[choice] += 1
          })

          const maxScore = Math.max(...Object.values(counts))

          const topKeys = Object.keys(counts)
            .filter((k) => counts[k] === maxScore)
            .sort()

          let winnerKey = topKeys.join('')

          if (!quizData.results[winnerKey]) {
            winnerKey = topKeys[0]
          }

          onResult(winnerKey, newAnswers)
        }
      }, 300)
    },
    [answers, current, total, animating, onResult]
  )

  const progress = ((current) / total) * 100

  return (
    <div className="relative min-h-screen bg-cover bg-center bg-no-repeat bg-[url('/images/mobile.png')] md:bg-[url('/images/comp.png')] flex flex-col items-center justify-center px-4 py-10 pt-20 md:pt-24">
      <div className="absolute top-4 left-4 md:top-6 md:left-8 z-10">
        <img
          src="/images/hkpa_logo.png"
          alt="HKPA Logo"
          className="h-10 md:h-14 w-auto object-contain"
          onError={(e) => {
            e.target.style.display = 'none'
          }}
        />
      </div>
      <div className="w-full max-w-2xl">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={goBack}
            disabled={current === 0}
            className={`text-sm font-bold border-2 border-slate-800 rounded-lg px-3 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all ${
              current === 0
                ? 'opacity-30 cursor-not-allowed bg-slate-100'
                : 'bg-white hover:bg-slate-100 cursor-pointer hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]'
            }`}
          >
            ← 上一題
          </button>
          <span className="text-sm font-bold text-slate-600">
            {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>

        <div className="w-full h-3 bg-slate-200 border-2 border-slate-800 rounded-full mb-6 overflow-hidden">
          <div
            className="h-full bg-slate-800 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div
          className={`transition-all duration-250 ${
            animating
              ? direction === 'next'
                ? 'opacity-0 -translate-x-8'
                : 'opacity-0 translate-x-8'
              : 'opacity-100 translate-x-0'
          }`}
        >
          <div className="bg-white border-2 border-slate-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-6 mb-6">
            <p className="text-slate-400 text-xs font-bold mb-2">
              Question {String(current + 1).padStart(2, '0')}
            </p>
            <h2 className="text-lg font-bold text-slate-800 leading-relaxed">
              {question.text}
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {shuffledOptions.map((opt, idx) => {
              const label = String.fromCharCode(65 + idx)
              return (
                <button
                  key={opt.id}
                  onClick={() => selectOption(opt.id)}
                  className="bg-white border-2 border-slate-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rounded-xl px-5 py-4 text-left hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-slate-800 shrink-0 leading-none">
                      {label}.
                    </span>
                    <span className="font-semibold text-slate-700 group-hover:text-slate-900">
                      {opt.text}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

function ResultPage({ winner, answers, percent, onRestart }) {
  const result = quizData.results[winner]
  const total = answers.length
  const counts = { A: 0, B: 0, C: 0 }
  answers.forEach((a) => {
    counts[a] = (counts[a] || 0) + 1
  })

  return (
    <div className="relative min-h-screen bg-cover bg-center bg-no-repeat bg-[url('/images/mobile.png')] md:bg-[url('/images/comp.png')] flex flex-col items-center justify-center px-4 pb-10 pt-20 md:pt-24">
    
      <div className="absolute top-4 left-4 md:top-6 md:left-8 z-10">
        <img
          src="/images/hkpa_logo.png"
          alt="HKPA Logo"
          className="h-10 md:h-14 w-auto object-contain"
          onError={(e) => {
            e.target.style.display = 'none'
          }}
        />
      </div>

      <div className="w-full max-w-4xl flex flex-col gap-6">

        <div className="w-full flex flex-col md:flex-row items-stretch gap-6">

          <div className="w-full md:w-1/2 flex flex-col">
            <div
              className={`${result.color} border-2 border-slate-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-6 text-center h-full flex flex-col justify-between`}
            >
              <div>
                <p className="text-sm font-bold text-slate-500 mb-1">你的測驗結果是</p>
                <h1 className="text-2xl font-bold text-slate-800 mb-1 whitespace-pre-line">{result.title}</h1>

                {percent !== null ? (
                  <div className="inline-block bg-[#F3E9DC] border-2 border-slate-800 rounded-full px-4 py-1.5 text-sm md:text-base font-bold text-slate-800 mt-0 mb-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    🎉 有 <span className="text-[#C85A32] font-extrabold text-base md:text-lg">{percent}%</span> 人都係依個結果！
                  </div>
                ) : (
                  <div className="text-sm text-slate-600 mt-0 mb-1 font-bold">正在計算結果...</div>
                )}



                <div className="my-4 flex justify-center">
                  <img
                    src={result.image}
                    alt={result.name}
                    className="max-h-48 object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none'
                    }}
                  />
                </div>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed text-left mt-2 whitespace-pre-line">
                {result.description}
              </p>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex flex-col justify-between gap-4">
            <div className="bg-white border-2 border-slate-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-5">
              <p className="text-xs font-bold text-slate-500 mb-3">性格特質</p>
              <div className="flex flex-wrap gap-2">
                {result.traits.map((t) => (
                  <span
                    key={t}
                    className="bg-white border-2 border-slate-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-lg px-3 py-1 text-sm font-bold text-slate-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white border-2 border-slate-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-5">
              <p className="text-xs font-bold text-slate-500 mb-3">選擇分佈</p>
              {['A', 'B', 'C'].map((key) => {
                const r = quizData.results[key]
                const pct = total > 0 ? Math.round((counts[key] / total) * 100) : 0
                return (
                  <div key={key} className="mb-2 last:mb-0">
                    <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
                      <span>{r.name}</span>
                      <span>{pct}%</span>
                    </div>
                    <div className="w-full h-4 bg-slate-100 border-2 border-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${r.color} transition-all duration-700 ease-out`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>

            <button
              onClick={onRestart}
              className="w-full bg-white text-slate-800 font-bold text-lg py-3 rounded-xl border-2 border-slate-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer"
            >
              🔄 再測一次
            </button>
          </div>

        </div>

        <div className="w-full bg-white border-2 border-slate-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-4 flex flex-col md:flex-row items-start justify-between gap-3">
          
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/hkpa_yaccms/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer"
            >
              <img
                src="/images/iglogo1.png"
                alt="Instagram Logo"
                className="w-20 h-20 md:w-40 md:h-40 object-contain"
              />

            </a>
            <a
              href="https://www.instagram.com/hkpa_tkyouth/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer"
            >
              <img
                src="/images/iglogo2.png"
                alt="Instagram Logo"
                className="w-20 h-20 md:w-40 md:h-40 object-contain"
              />

            </a>
          </div>
        </div>

      </div>
    </div>
  )
}
export default function App() {
  const [phase, setPhase] = useState('landing')
  const [resultData, setResultData] = useState(null)
  const [shuffledQuestions, setShuffledQuestions] = useState([])
  const [userPercent, setUserPercent] = useState(null)

  const handleStart = useCallback(() => {

    setShuffledQuestions(shuffleArray(quizData.questions))
    setPhase('quiz')
  }, [])

  const handleResult = useCallback((winner, answers) => {
  setResultData({ winner, answers })
  setPhase('result')

  // 抓取網址上的 source 標籤（預設為 public）
  const urlParams = new URLSearchParams(window.location.search)
  const sourceType = urlParams.get('source') || 'public'

  // 發送資料給 Google Sheets 並取得百分比
  fetch('https://script.google.com/macros/s/AKfycbxtpAId89am0-Wo1nnq0sg0bRVsCqkK3pptWzxuwuYYTJw58FrPXR22hLCZJZDix-TD/exec', { // 👈 貼上你剛複製的 Apps Script URL
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ winner, answers, sourceType })
  })
    .then((res) => res.json())
    .then((data) => {
      if (data && data.percent !== undefined) {
        setUserPercent(data.percent) // 儲存回傳的百分比
      }
    })
    .catch((err) => console.error('Error fetching stats:', err))
}, [])

  const handleRestart = useCallback(() => {
    setResultData(null)
    setPhase('landing')
  }, [])

  if (phase === 'landing') return <LandingPage onStart={handleStart} />
  if (phase === 'quiz')
    return (
      <QuizPage
        questions={shuffledQuestions}
        onResult={handleResult}
      />
    )
  return (
    <ResultPage
      winner={resultData.winner}
      answers={resultData.answers}
      percent={userPercent}
      onRestart={handleRestart}
    />
  )
}