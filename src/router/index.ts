import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home/HomePage.vue'),
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: () => import('@/views/gallery/GalleryPage.vue'),
    },
    {
      path: '/story',
      name: 'story',
      component: () => import('@/views/story/StoryPage.vue'),
    },
    {
      path: '/love-photo',
      name: 'love-photo',
      component: () => import('@/views/LovePhotoPage.vue'),
    },
    {
      path: '/journey',
      name: 'journey',
      component: () => import('@/views/journey/JourneyPage.vue'),
    },
    {
      path: '/music',
      name: 'music',
      component: () => import('@/views/MusicPage.vue'),
    },
  ],
})

export default router
