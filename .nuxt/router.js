import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _1631c876 = () => interopDefault(import('../pages/layout' /* webpackChunkName: "" */))
const _5b9ab5aa = () => interopDefault(import('../pages/home' /* webpackChunkName: "" */))
const _745a489d = () => interopDefault(import('../pages/login' /* webpackChunkName: "" */))
const _bfdd3446 = () => interopDefault(import('../pages/profile' /* webpackChunkName: "" */))
const _19493322 = () => interopDefault(import('../pages/settings' /* webpackChunkName: "" */))
const _0a62eeb9 = () => interopDefault(import('../pages/editor' /* webpackChunkName: "" */))
const _f248adac = () => interopDefault(import('../pages/article' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _1631c876,
    children: [{
      path: "",
      component: _5b9ab5aa,
      name: "home"
    }, {
      path: "/login",
      component: _745a489d,
      props: {"isLogin":true},
      name: "login"
    }, {
      path: "/register",
      component: _745a489d,
      props: {"isLogin":false},
      name: "register"
    }, {
      path: "/profile/:username",
      component: _bfdd3446,
      name: "profile"
    }, {
      path: "/settings",
      component: _19493322,
      name: "settings"
    }, {
      path: "/editor/:slug?",
      component: _0a62eeb9,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _f248adac,
      name: "article"
    }]
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
