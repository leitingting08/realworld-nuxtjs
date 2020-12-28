import { request } from '@/plugins/request'

// 用户登录
export const login = ({ user = {} }) => {
  return request({
    method: 'POST',
    url: '/api/users/login',
    data: {
      user: {
        "email": user.email,
        "password": user.password
      }
    }
  })
}

// 用户注册
export const register = ({ user = {} }) => {
  return request({
    method: 'POST',
    url: '/api/users',
    data: {
      user: {
        "username": user.username,
        "email": user.email,
        "password": user.password
      }
    }
  })
}

// 更新用户信息
export const updateUser = ({ user = {} }) => {
  return request({
    method: 'PUT',
    url: '/api/user',
    data: {
      user: {
        "username": user.username,
        "email": user.email,
        "password": user.password,
        "bio": user.bio,
        "image": user.image
      }
    }
  })
}
