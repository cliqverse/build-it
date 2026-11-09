import { createRouter, createWebHistory } from 'vue-router'
import { HEADER_OFFSET, hashScrollTop } from '@/router/anchors'
import { useProductsStore } from '@/stores/products'
import type { LegalDocId } from '@/types/content'
import { prefersReducedMotion } from '@/utils/motion'
import HomeView from '@/views/HomeView.vue'

const legalRoute = (doc: LegalDocId) => ({
  path: `/${doc}`,
  name: doc,
  component: () => import('@/views/LegalView.vue'),
  props: { doc },
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/products', name: 'products', component: () => import('@/views/ProductsView.vue') },
    {
      path: '/products/:id',
      name: 'product',
      component: () => import('@/views/ProductDetailView.vue'),
      props: true,
    },
    { path: '/how-we-work', name: 'how-we-work', component: () => import('@/views/PlatformView.vue') },
    { path: '/platform', redirect: '/how-we-work' },
    { path: '/work', name: 'work', component: () => import('@/views/WorkView.vue') },
    { path: '/contact', name: 'contact', component: () => import('@/views/ContactView.vue') },
    legalRoute('privacy'),
    legalRoute('terms'),
    legalRoute('cookies'),
    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/views/NotFoundView.vue') },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) {
      const behavior = prefersReducedMotion() || to.path !== from.path ? 'auto' : 'smooth'
      const top = hashScrollTop(to.hash)
      return top === undefined ? { el: to.hash, top: HEADER_OFFSET, behavior } : { top, behavior }
    }
    return { top: 0 }
  },
})

/* A global guard (not beforeEnter) so unknown ids are caught on param changes too. */
router.beforeEach((to) => {
  if (to.name !== 'product' || useProductsStore().isProductId(String(to.params.id))) return true
  return {
    name: 'not-found',
    params: { pathMatch: to.path.slice(1).split('/') },
    query: to.query,
    hash: to.hash,
  }
})

export default router
