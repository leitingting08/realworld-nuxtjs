const cookieparser = process.server ? require('cookieparser') : undefined

// 在服务端运行的是同一个 store 实例
// 为了防止不同用户数据冲突，需要将 state 定义成一个函数，返回数据对象，确保每一个用户都有自己单独的数据
export const state = () => {
  return {
    user: null
  }
}

export const mutations = {
  setUser (state, data) {
    state.user = data
  }
}

export const actions = {
  // nuxtServerInit 是 nuxt 中的特殊 action
  // 会在服务端渲染时自动调用
  // 用来初始化容器数据，传递数据给客户端使用
  nuxtServerInit ({ commit }, { req }) {
    let user = null

    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        user = JSON.parse(parsed.user)
      } catch (err) {}
    }

    // 初始化容器内的 user 数据
    commit('setUser', user)
  }
}
