export default {
  plugins: ['@/plugins/request.js', '@/plugins/dayjs.js'],
  router: {
    linkActiveClass: 'active',
    extendRoutes(routes, resolve) {
      // 清除默认路由表
      routes.splice(0)
      routes.push(...[
        {
          path: '/',
          component: resolve(__dirname, 'pages/layout/'),
          children: [
            {
              path: '',
              name: 'home',
              component: resolve(__dirname, 'pages/home/'),
            },
            {
              path: '/login',
              name: 'login',
              component: resolve(__dirname, 'pages/login/'),
              props: { isLogin: true }
            },
            {
              path: '/register',
              name: 'register',
              component: resolve(__dirname, 'pages/login/'),
              props: { isLogin: false }
            },
            {
              path: '/profile/:username',
              name: 'profile',
              component: resolve(__dirname, 'pages/profile/'),
            },
            {
              path: '/settings',
              name: 'settings',
              component: resolve(__dirname, 'pages/settings/'),
            },
            {
              path: '/editor/:slug?',
              name: 'editor',
              component: resolve(__dirname, 'pages/editor/'),
            },
            {
              path: '/article/:slug',
              name: 'article',
              component: resolve(__dirname, 'pages/article/'),
            },
          ]
        }
      ])
    }
  },
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  head: {
    title: 'conduit',
    meta: [
      { charset: 'utf-8' },
      { hid: 'keywords', name: 'keywords', content: 'conduit' },
      { hid: 'description', name: 'description', content: 'conduit' }
    ],
  },
}
