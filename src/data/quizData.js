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
      text: '關於『食飯』呢個大難題，你平時係點諗？',
      options: [
        { id: 'A', text: '食辣！最緊要開心！', emoji: '✈️' },
        { id: 'B', text: '你話事啦，我隨便。', emoji: '🌙' },
        { id: 'C', text: '睇評價同衛生，要搵位坐。', emoji: '🍽️' },
      ],
    },
    {
      id: 3,
      text: '朋友突然話要搞個即興旅行，你會……',
      options: [
        { id: 'A', text: '即刻執嘢走人！', emoji: '💪' },
        { id: 'B', text: '想去但諗好多，最後無咗件事。', emoji: '🔍' },
        { id: 'C', text: '幾時去？預算幾多？我要整行程表。', emoji: '🤝' },
      ],
    },
    {
      id: 4,
      text: '當你見到有人喺地鐵站拎住好重嘅行李，你嘅反應係？',
      options: [
        { id: 'A', text: '跑過去幫手，順便傾計！', emoji: '🎒' },
        { id: 'B', text: '心痛但怕尷尬，遠處擔心。', emoji: '📋' },
        { id: 'C', text: '觀察情況，有需要就幫手。', emoji: '👨‍👩‍👧‍👦' },
      ],
    },
    {
      id: 5,
      text: '你點樣處理『靈感』或者『任務』？',
      options: [
        { id: 'A', text: '做咗先，邊玩邊撞！', emoji: '⚡' },
        { id: 'B', text: '等靈感嚟，突然爆發。', emoji: '🧊' },
        { id: 'C', text: '整清單，按部就班。', emoji: '🤗' },
      ],
    },
    {
      id: 6,
      text: '朋友講咗句無厘頭嘅冷笑話，你覺得？',
      options: [
        { id: 'A', text: '笑到碌地，炒熱氣氛！', emoji: '🍜' },
        { id: 'B', text: '覺得好得意，報以微笑。', emoji: '🎬' },
        { id: 'C', text: '分析個笑話個邏輯。', emoji: '📱' },
      ],
    },
    {
      id: 7,
      text: '喺社交場合，你最怕遇到咩情況？',
      options: [
        { id: 'A', text: '好悶，無人講嘢。', emoji: '🌍' },
        { id: 'B', text: '要做焦點，好攰。', emoji: '💰' },
        { id: 'C', text: '極度混亂、無理取鬧。', emoji: '🎁' },
      ],
    },
    {
      id: 8,
      text: '如果要你形容自己嘅『內心世界』：',
      options: [
        { id: 'A', text: '開緊派對嘅廣場。', emoji: '🦁' },
        { id: 'B', text: '飄浮喺半空嘅森林。', emoji: '🦉' },
        { id: 'C', text: '井井有條嘅圖書館。', emoji: '🕊️' },
      ],
    },
    {
      id: 9,
      text: '當你覺得好孤單或者空虛嘅時候，你會做咩？',
      options: [
        { id: 'A', text: '即刻約人出嚟飲嘢。', emoji: '🚀' },
        { id: 'B', text: '匿入被窩發白日夢。', emoji: '🧠' },
        { id: 'C', text: '整理身邊嘅雜物。', emoji: '🌈' },
      ],
    },
    {
      id: 10,
      text: '對於『人生』，你最深嘅體會係咩？',
      options: [
        { id: 'A', text: '人生苦短，去玩啦！', emoji: '🌟' },
        { id: 'B', text: '只想搵到屬於自己嘅溫柔。', emoji: '💡' },
        { id: 'C', text: '承諾同責任最重要。', emoji: '💛' },
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