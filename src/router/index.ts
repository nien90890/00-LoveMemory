import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home/HomePage.vue'),
      meta: { title: '首页' },
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: () => import('@/views/gallery/GalleryPage.vue'),
      meta: { title: '回忆相册' },
    },
    {
      path: '/story',
      name: 'story',
      component: () => import('@/views/story/StoryPage.vue'),
      meta: { title: '我们的故事' },
    },
    {
      path: '/journey',
      name: 'journey',
      component: () => import('@/views/journey/JourneyPage.vue'),
      meta: { title: '回忆旅程' },
    },
    {
      path: '/music',
      name: 'music',
      component: () => import('@/views/MusicPage.vue'),
      meta: { title: '专属歌单' },
    },
  ],
})

router.afterEach((to) => {
  const pageTitle = typeof to.meta.title === 'string' ? to.meta.title : '我们的故事'
  document.title = `LoveMemory - ${pageTitle}`
})

export default router
