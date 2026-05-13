import type { StoryMilestone } from '@/types'
import { storyImageAssets } from './imageAssets'

export const storyMilestones: StoryMilestone[] = [
  {
    id: 1,
    date: new Date('2016-04-18'),
    title: '初次相遇',
    chapter: '心动开始',
    place: '街角咖啡店',
    description:
      '那天的天气、桌上的杯子、你说话时的神情，后来都成了我反复回想的开头。我们以为只是一次普通见面，却悄悄走进了彼此后来的很多年。',
    icon: 'Heart',
    image: storyImageAssets[0],
    quote: '有些相遇看起来很轻，却会在心里留很久。',
  },
  {
    id: 2,
    date: new Date('2016-09-03'),
    title: '把喜欢说出口',
    chapter: '关系确认',
    place: '深夜通话',
    description:
      '我们终于不再绕着心事打转，而是认真地把喜欢说了出来。从那天开始，很多事情第一次有了“我们”的名字。',
    icon: 'Sparkles',
    image: storyImageAssets[1],
    quote: '爱不是突然发生的，是无数次靠近之后终于坦白。',
  },
  {
    id: 3,
    date: new Date('2018-03-15'),
    title: '第一次旅行',
    chapter: '一起看世界',
    place: '北京',
    description:
      '第一次为了同一个目的地收行李、做攻略、赶车赶路。城市的风景当然好看，但更珍贵的是，我开始习惯了每一段路上都有你。',
    icon: 'Plane',
    image: storyImageAssets[2],
    quote: '原来旅行最动人的部分，不是风景，是同行的人。',
  },
  {
    id: 4,
    date: new Date('2020-12-25'),
    title: '把日常过成节日',
    chapter: '温柔生活',
    place: '深圳湾',
    description:
      '后来我们慢慢明白，纪念感不只属于特别的节日。一起做饭、一起散步、一起在深夜分享一首歌，也一样值得被认真记住。',
    icon: 'Gift',
    quote: '真正的仪式感，是把平凡也过得值得纪念。',
  },
  {
    id: 5,
    date: new Date('2025-09-03'),
    title: '第九个纪念日',
    chapter: '此刻与未来',
    place: '属于我们的现在',
    description:
      '时间让我们不再只是热烈心动，也学会了理解、包容和一起规划未来。比起“永远”，更打动我的是我们一次次认真地选择彼此。',
    icon: 'Cake',
    image: storyImageAssets[3],
    quote: '最浪漫的事情，是很多年后依然愿意并肩往前走。',
  },
]
