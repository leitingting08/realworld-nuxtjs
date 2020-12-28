import { request } from '@/plugins/request'

// 文章列表
export const getArticles = (params = {}) => {
  return request({
    method: 'GET',
    url: '/api/articles',
    params: {
      tag: params.tag,
      author: params.author,
      favorited: params.favorited,
      limit: params.limit || 20,
      offset: params.offset || 0,
    }
  })
}

// 已关注文章列表
export const getFeedArticles = (params = {}) => {
  return request({
    method: 'GET',
    url: '/api/articles/feed',
    params: {
      limit: params.limit || 20,
      offset: params.offset || 0,
    }
  })
}

// 文章标签列表
export const getTags = () => {
  return request({
    method: 'GET',
    url: '/api/tags'
  })
}

// 点赞文章
export const favoriteArticle = (slug) => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/favorite`
  })
}

// 取消点赞文章
export const unFavoriteArticle = (slug) => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/favorite`
  })
}

// 获取文章详情
export const getArticleDetail = (slug) => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}`
  })
}

// 创建文章
export const createArticle = ({ article = {} }) => {
  return request({
    method: 'POST',
    url: '/api/articles',
    data: {
      article: {
        "title": article.title,
        "description": article.description,
        "body": article.body,
        "tagList": article.tagList
      }
    }
  })
}

// 更新文章
export const updateArticle = ({ article = {} }) => {
  return request({
    method: 'PUT',
    url: `/api/articles/${article.slug}`,
    data: {
      article: {
        "title": article.title,
        "description": article.description,
        "body": article.body,
        "tagList": article.tagList
      }
    }
  })
}

// 删除文章
export const delArticle = (slug) => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}`
  })
}

// 获取文章评论列表
export const getComments = (slug) => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`
  })
}

// 添加评论
export const addComment = ({ slug, comment }) => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/comments`,
    data: {
      comment: {
        "body": comment.body
      }
    }
  })
}

// 删除评论
export const delComment = (slug, id) => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/comments/${id}`
  })
}
