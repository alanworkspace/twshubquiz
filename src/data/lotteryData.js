// 抽獎池獎品資料：同時用於「抽獎」隨機結果與「保底積分兌換」

export const PRIZES = [
  { id: 'coupon-fishball', name: '咖哩魚蛋兌換券', emoji: '🍢', desc: '慈雲山小食圈「咖哩魚蛋」免費兌換一份', points: 300, rarity: 'common', weight: 26 },
  { id: 'coupon-waffle', name: '雞蛋仔兌換券', emoji: '🧇', desc: '街坊雞蛋仔舖「原味雞蛋仔」一底', points: 350, rarity: 'common', weight: 24 },
  { id: 'coupon-milktea', name: '港式奶茶兌換券', emoji: '🥤', desc: '冰室「熱/凍港式奶茶」一杯', points: 320, rarity: 'common', weight: 24 },
  { id: 'sticker-tsz', name: '特製貼紙·呀慈', emoji: '😊', desc: '呀慈「人間小太陽」表情貼紙一張', points: 500, rarity: 'rare', weight: 12 },
  { id: 'sticker-wan', name: '特製貼紙·呀雲', emoji: '☁️', desc: '呀雲「溫柔飄過」表情貼紙一張', points: 500, rarity: 'rare', weight: 12 },
  { id: 'lanyard', name: '限定手機掛繩', emoji: '📱', desc: '活動限定手機掛繩一條（粉色限定版）', points: 900, rarity: 'epic', weight: 3 },
  { id: 'totebag', name: '小食圈限定帆布袋', emoji: '🛍️', desc: '「慈雲山小食圈」主題帆布袋一個（限量）', points: 1200, rarity: 'epic', weight: 1 },
]

const RARITY_LABEL = {
  common: { label: '普通', color: 'bg-slate-100' },
  rare: { label: '稀有', color: 'bg-yellow-200' },
  epic: { label: '傳說', color: 'bg-purple-200' },
}

export function rarityOf(prize) {
  return RARITY_LABEL[prize.rarity] || RARITY_LABEL.common
}

export function pickPrize() {
  const total = PRIZES.reduce((sum, p) => sum + p.weight, 0)
  let r = Math.random() * total
  for (const p of PRIZES) {
    r -= p.weight
    if (r <= 0) return p
  }
  return PRIZES[PRIZES.length - 1]
}

export const TICKET_REWARD_SCORE = 150
export const SCORE_PER_POINT = 50

export function scoreToPoints(score) {
  return Math.floor(Math.max(0, score || 0) / SCORE_PER_POINT)
}