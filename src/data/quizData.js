// src/data/quizData.js

const quizData = {
  // 1. 首頁配置（已整理並整合港式風格資訊）
  landing: {
    badgeText: "5 分鐘 · 10 條問題 · 廣東話",
    categoryTag: "PERSONALITY CHECK",
    noticeText: "冇標準答案，得你嘅答案",
    
    title: "你個心入面，住咗邊位？",
    subtitle: "用十個生活情境，撞見你最自然、最真實嗰一面。唔使諗太耐，第一個彈入腦嘅答案，就最似你。",
    
    startButtonText: "開始認識自己 →",
    subHint: "完全匿名 · 輕鬆玩",
    
    // 更新這裡的圖片路徑：
    heroImage: "/images/homepage.png",
    
    // 底部三個角色小卡片
    characters: [
      { id: 'A', name: '呀慈', tag: '熱情派', avatar: '/images/char-orange.png', color: 'bg-pink-200' },
      { id: 'B', name: '呀雲', tag: '溫柔派', avatar: '/images/char-blue.png', color: 'bg-blue-200' },
      { id: 'C', name: '呀山', tag: '穩重派', avatar: '/images/char-green.png', color: 'bg-green-200' },
    ],
  },

  // 2. 測驗題目 (共 10 題)
  questions: [
    {
      id: 1,
      text: '星期五晚收工，朋友 WhatsApp 問你今晚去邊玩？',
      options: [
        { id: 'A', text: '去最嘈嗰間！', label: '直覺派', emoji: '🎉' },
        { id: 'B', text: '唔太想去，想煲劇。', label: '感覺派', emoji: '🏠' },
        { id: 'C', text: '睇下聽日有無嘢做先。', label: '思考派', emoji: '🤔' },
      ],
    },
    {
      id: 2,
      text: '你最喜歡的時刻是？',
      options: [
        { id: 'A', text: '踏上未知旅途的那一刻', emoji: '✈️' },
        { id: 'B', text: '深夜一個人思考人生', emoji: '🌙' },
        { id: 'C', text: '和家人一起吃晚餐', emoji: '🍽️' },
      ],
    },
    {
      id: 3,
      text: '面對困難時，你通常會？',
      options: [
        { id: 'A', text: '直接衝上去解決', emoji: '💪' },
        { id: 'B', text: '先分析所有可能性', emoji: '🔍' },
        { id: 'C', text: '找人商量再做決定', emoji: '🤝' },
      ],
    },
    {
      id: 4,
      text: '你理想中的旅行方式是？',
      options: [
        { id: 'A', text: '一個人背包旅行', emoji: '🎒' },
        { id: 'B', text: '做詳細攻略再出發', emoji: '📋' },
        { id: 'C', text: '和親朋好友一起出遊', emoji: '👨‍👩‍👧‍👦' },
      ],
    },
    {
      id: 5,
      text: '朋友會怎麼形容你？',
      options: [
        { id: 'A', text: '充滿活力、說走就走', emoji: '⚡' },
        { id: 'B', text: '冷靜沉著、有深度', emoji: '🧊' },
        { id: 'C', text: '溫暖體貼、值得信賴', emoji: '🤗' },
      ],
    },
    {
      id: 6,
      text: '下班/放學後你最想做什麼？',
      options: [
        { id: 'A', text: '嘗試一家新的餐廳', emoji: '🍜' },
        { id: 'B', text: '追一部紀錄片或影集', emoji: '🎬' },
        { id: 'C', text: '打電話問朋友最近好嗎', emoji: '📱' },
      ],
    },
    {
      id: 7,
      text: '如果有一百萬，你會？',
      options: [
        { id: 'A', text: '環遊世界一圈', emoji: '🌍' },
        { id: 'B', text: '投資或存起來', emoji: '💰' },
        { id: 'C', text: '分享給身邊的人', emoji: '🎁' },
      ],
    },
    {
      id: 8,
      text: '你最欣賞的特質是？',
      options: [
        { id: 'A', text: '勇氣與冒險精神', emoji: '🦁' },
        { id: 'B', text: '智慧與洞察力', emoji: '🦉' },
        { id: 'C', text: '善良與同理心', emoji: '🕊️' },
      ],
    },
    {
      id: 9,
      text: '在團隊中你通常擔任什麼角色？',
      options: [
        { id: 'A', text: '提出新點子的領頭羊', emoji: '🚀' },
        { id: 'B', text: '分析問題的軍師', emoji: '🧠' },
        { id: 'C', text: '協調大家的和事佬', emoji: '🌈' },
      ],
    },
    {
      id: 10,
      text: '你希望别人記住你的什麼？',
      options: [
        { id: 'A', text: '「他活得好精彩！」', emoji: '🌟' },
        { id: 'B', text: '「他說的話很有道理」', emoji: '💡' },
        { id: 'C', text: '「跟他在一起很安心」', emoji: '💛' },
      ],
    },
  ],

  // 3. 測驗結果 (A/B/C 三種角色分析)
  results: {
    A: {
      name: '呀慈',
      title: '熱情派 · 呀慈',
      image: '/images/ESFP.jpeg',
      color: 'bg-pink-200',
      borderColor: 'border-pink-400',
      shadowColor: 'shadow-pink-300',
      description:
        '你係天生嘅熱情派！對你嚟講，生活就是要充滿新鮮感同刺激。你隨性、直接，最鍾意直覺行事，身邊嘅朋友都會被你嘅活力渲染！',
      traits: ['直覺型', '熱情開朗', '行動力強', '隨心所欲'],
    },
    B: {
      name: '呀雲',
      title: '溫柔派 · 呀雲',
      image: '/images/INFP.jpeg',
      color: 'bg-blue-200',
      borderColor: 'border-blue-400',
      shadowColor: 'shadow-blue-300',
      description:
        '你係溫柔嘅獨處大師！比起熱鬧，你更享受內心嘅平靜。你心思細膩、懂得照顧自己同別人的情緒，跟你相處總令人覺得好舒服。',
      traits: ['重視感覺', '細心體貼', '享受獨處', '溫柔沉穩'],
    },
    C: {
      name: '呀山',
      title: '穩重派 · 呀山',
      image: '/images/ISTJ.jpeg',
      color: 'bg-green-200',
      borderColor: 'border-green-400',
      shadowColor: 'shadow-green-300',
      description:
        '你係最可靠嘅思考派！遇到任何事你都可以冷靜分析，係團隊或者朋友眼中的「定海神針」。理性又踏實嘅你，非常值得信任。',
      traits: ['邏輯清晰', '踏實可靠', '深思熟慮', '值得信賴'],
    },
  },
};

export default quizData;