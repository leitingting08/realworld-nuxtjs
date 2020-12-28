import axios from 'axios'
const cookieparser = process.server ? require('cookieparser') : undefined

export const request =  axios.create({
  baseURL: 'http://realworld.api.fed.lagounews.com'
})

export default function ({ req, store }) {
  request.interceptors.request.use(function (config) {
    let { user } = store.state
    // 在发送请求之前做些什么
    if (user && user.token) {
      config.headers.Authorization = `Token ${user.token}`
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
}
