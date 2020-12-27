import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _01eaa3c5 = () => interopDefault(import('../pages/article/index.vue' /* webpackChunkName: "pages/article/index" */))
const _4ec0fad8 = () => interopDefault(import('../pages/editor/index.vue' /* webpackChunkName: "pages/editor/index" */))
const _7969d7de = () => interopDefault(import('../pages/layout/index.vue' /* webpackChunkName: "pages/layout/index" */))
const _d0aa6110 = () => interopDefault(import('../pages/login/index.vue' /* webpackChunkName: "pages/login/index" */))
const _27e34690 = () => interopDefault(import('../pages/profile/index.vue' /* webpackChunkName: "pages/profile/index" */))
const _755abd6c = () => interopDefault(import('../pages/register/index.vue' /* webpackChunkName: "pages/register/index" */))
const _15464eca = () => interopDefault(import('../pages/settings/index.vue' /* webpackChunkName: "pages/settings/index" */))
const _1157c277 = () => interopDefault(import('../pages/article/components/article-comments.vue' /* webpackChunkName: "pages/article/components/article-comments" */))
const _687190f0 = () => interopDefault(import('../pages/article/components/article-meta.vue' /* webpackChunkName: "pages/article/components/article-meta" */))
const _5b9ab5aa = () => interopDefault(import('../pages/home' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'hash',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/article",
    component: _01eaa3c5,
    name: "article"
  }, {
    path: "/editor",
    component: _4ec0fad8,
    name: "editor"
  }, {
    path: "/layout",
    component: _7969d7de,
    name: "layout"
  }, {
    path: "/login",
    component: _d0aa6110,
    name: "login"
  }, {
    path: "/profile",
    component: _27e34690,
    name: "profile"
  }, {
    path: "/register",
    component: _755abd6c,
    name: "register"
  }, {
    path: "/settings",
    component: _15464eca,
    name: "settings"
  }, {
    path: "/article/components/article-comments",
    component: _1157c277,
    name: "article-components-article-comments"
  }, {
    path: "/article/components/article-meta",
    component: _687190f0,
    name: "article-components-article-meta"
  }, {
    path: "/",
    component: _5b9ab5aa,
    name: "home"
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decode(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}
