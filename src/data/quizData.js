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
    

    heroImage: "/images/homepage.png",
    

    characters: [
      { id: 'A', name: '呀慈', tag: '熱情派', avatar: '/images/char-orange.png', image: '/images/imgtsz.png', color: 'bg-pink-200' },
      { id: 'B', name: '呀雲', tag: '溫柔派', avatar: '/images/char-blue.png', image: '/images/imgwan.png', color: 'bg-blue-200' },
      { id: 'C', name: '呀山', tag: '穩重派', avatar: '/images/char-green.png', image: '/images/imgshan.png', color: 'bg-green-200' },
    ],
  },


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


  results: {
    A: {
      name: '呀慈',
      title: ' 呀慈 -「破冰者」',
      image: '/images/tsz.png',
      color: 'bg-pink-200',
      borderColor: 'border-pink-400',
      shadowColor: 'shadow-pink-300',
      description:
        '你係團體入面嘅氣氛擔當，呢種熱情好難得！但請記住，強大嘅社交能量有時會令你忽略咗自己嘅『電量』。\n\n小叮嚀：\n當派對散場、全世界都靜晒嘅時候，試下容許自己有空間去感受嗰份空虛，嗰刻嘅你，其實都值得被溫柔對待。即使唔開派對，你自己本身就已經好精彩。',
      traits: ['人間小太陽', '社交達人', '唔會冷場', '夜深怕孤單'],
    },
    B: {
      name: '呀雲',
      title: '呀雲 -「飄浮者」',
      image: '/images/wan.png',
      color: 'bg-blue-200',
      borderColor: 'border-blue-400',
      shadowColor: 'shadow-blue-300',
      description:
        '你嘅心思細膩同靈魂嘅深度，係呢個嘈吵世界嘅避風港。你容易因為顧及人哋感受而壓抑自己，辛苦喇！\n\n小叮嚀：\n記住，『隨便』係你嘅溫柔，但唔係你嘅義務。下次試下喺細微處為自己發聲，哪怕只係簡單一句『我想食呢樣』，其實都係愛自己嘅表現。唔使急，慢慢飄，都會有人睇到你嘅光芒。',
      traits: ['靈魂出竅', '精神內耗', '隨便唔隨便', '溫柔飄過'],
    },
    C: {
      name: '呀山',
      title: '呀山 -「守護者」',
      image: '/images/shan.png',
      color: 'bg-green-200',
      borderColor: 'border-green-400',
      shadowColor: 'shadow-green-300',
      description:
        '你嘅穩重同細心，係好多人生命中嘅定海神針。你將責任孭喺身，好多時忽略咗自己其實都可以卸下重擔。\n\n小叮嚀：\n世界不需要你 24/7 都咁完美，適度嘅『不完美』同埋適度嘅休息，先係你繼續守護大家嘅長久之道。放心，你已經做得很好了，今日試下淨係為自己安排一件開心嘅事啦。',
      traits: ['人體筆記本', '高冷神燈', '責任感爆棚', '值得信賴'],
    },
    AB: {
      name: '呀雲 & 呀慈',
      title: ' 呀雲 & 呀慈\n浪漫熱情嘅「感性冒險家」',
      image: '/images/tszwan.png',
      color: 'bg-[#eac5ab]',
      borderColor: 'border-[#eac5ab]',
      shadowColor: 'shadow-[#eac5ab]',
      description:
        '你同時擁有呀慈嘅熱情同呀雲嘅細膩！你一方面好鍾意同人接觸、想去感受世界嘅精彩，但另一方面又好需要獨處嘅空間去沉澱。呢種『又熱情又敏感』嘅特質，令你特別有同理心同藝術靈感。\n\n小叮嚀：\n唔好矛盾自己既想衝又想停，呢個平衡得嚟帶點詩意嘅你，本身就非常迷人～',
      traits: ['又衝又靜', '浪漫感性', '靈感發電機', '矛盾又迷人'],
    },
    AC: {
      name: '呀慈 & 呀山',
      title: ' 呀慈 & 呀山\n外向穩重嘅「可靠搞手」',
      image: '/images/tszshan.png',
      color: 'bg-amber-100',
      borderColor: 'border-amber-800',
      shadowColor: 'shadow-amber-900',
      description:
        '你集結咗呀慈嘅行動力同呀山嘅責任感！你係嗰啲『講得出做得到』，而且仲可以帶動全場氣氛嘅靈魂人物。大家有咩大project都會想搵你幫手，因為你既靠得住又好玩。\n\n小叮嚀：\n不過，千祈唔好畀『要做到最好』同『要照顧所有人』嘅心態綁架咗。偶爾允許自己hea吓，你嘅光芒會更持久～',
      traits: ['靠得住又玩得', '全場氣氛組', '最強行動派', '講得出做到'],
    },
    BC: {
      name: '呀雲 & 呀山',
      title: ' 呀雲 & 呀山\n內省深思嘅「安靜守護者」',
      image: '/images/wanshan.png',
      color: 'bg-[#b6c69a]',
      borderColor: 'border-[#b6c69a]',
      shadowColor: 'shadow-[#b6c69a]',
      description:
        '你擁有呀雲嘅靈魂深度同呀山嘅實踐精神！你外表可能比較安靜、文陣，甚至有啲慢熱，但你嘅內心世界其實好豐富，對身邊嘅人有無限嘅溫柔同默默嘅付出。你唔鍾意出風頭，但係最信得過嘅聆聽者。\n\n小叮嚀：\n辛苦你成日將心事收喺心入面，記得都要好好擁抱同欣賞自己嘅靜謐之美～',
      traits: ['外冷內熱', '最強樹洞', '默默守護', '靜謐力量'],
    },


  },
};

export default quizData;