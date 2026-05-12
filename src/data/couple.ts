import type { CoupleData } from '@/types'

export const coupleData: CoupleData = {
  person1: {
    name: '小龙',
    nickname: 'Long',
    avatar: '',
  },
  person2: {
    name: '小甜',
    nickname: 'Tian',
    avatar: '',
  },
  anniversary: new Date('2016-09-03T00:08:00'),
  sinceLabel: '从相识到现在',
  tagline: '两颗心，一个世界',
  intro:
    '这个网站记录的不是轰轰烈烈的大事件，而是那些被我们认真珍藏起来的小瞬间。它像一本慢慢写厚的纪念册，把日常、旅途、争吵后的拥抱，以及每一次重新牵手，都安静地留在这里。',
  footerNote: '愿很多年以后，我们再回头看这些瞬间，依然会觉得彼此是最好的选择。',
  hero: {
    eyebrow: 'A Love Story Since 2016',
    title: '把一起走过的日子，慢慢收进一座温柔的纪念馆',
    description:
      '从第一次心动，到每一个纪念日、每一次旅行和每一张照片，我们想把这些普通又珍贵的时刻，留给未来的自己重新翻阅。',
    dedication: '写给未来的我们：愿今天的喜欢，年年都有回音。',
  },
  stats: {
    photosTogether: 284,
    citiesVisited: 12,
    songsShared: 47,
  },
  promises: [
    '记住每一个值得反复回味的日子',
    '把平凡生活过成有仪式感的小宇宙',
    '以后每一年，都留下一份新的纪念',
  ],
  anniversaryMoments: [
    {
      id: 1,
      label: '初遇',
      date: new Date('2016-04-18T18:30:00'),
      description: '从那天起，世界里多了一个会让我下意识想分享一切的人。',
    },
    {
      id: 2,
      label: '确定关系',
      date: new Date('2016-09-03T00:08:00'),
      description: '把喜欢认真说出口，也把未来悄悄放进心里。',
    },
    {
      id: 3,
      label: '第一次远行',
      date: new Date('2018-03-15T09:00:00'),
      description: '我们第一次在陌生城市里牵着手，开始有了“我们一起去过”的地图。',
    },
    {
      id: 4,
      label: '今年纪念日',
      date: new Date('2025-09-03T20:00:00'),
      description: '又一年的喜欢如约而至，庆幸我们依然把彼此放在最重要的位置。',
    },
  ],
  letters: [
    '谢谢你把漫长的日子变得有期待，也让我学会了如何在爱里慢慢长大。',
    '如果以后还会有很多很多普通的一天，我也想继续和你把它们过成值得纪念的样子。',
  ],
}
