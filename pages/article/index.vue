<template>
<div class="article-page">

  <div class="banner">
    <div class="container">

      <h1>{{ article.title }}</h1>

      <article-meta
        @like-handler="likeHandler"
        @follow-handler="followHandler"
        :article="article"
        :disabledFavorite="disabledFavorite"
        :disabledFollow="disabledFollow" />

    </div>

  </div>

  <div class="container page">

    <div class="row article-content">
      <div v-html="article.body"
        class="col-md-12">
      </div>
    </div>

    <hr />

    <div class="article-actions">
      <article-meta
        @like-handler="likeHandler"
        @follow-handler="followHandler"
        :article="article"
        :disabledFavorite="disabledFavorite"
        :disabledFollow="disabledFollow" />
    </div>

    <div class="row">

      <div class="col-xs-12 col-md-8 offset-md-2">

        <article-comments :article="article" />

      </div>

    </div>

  </div>

</div>
</template>

<script>
import { getArticleDetail, favoriteArticle, unFavoriteArticle } from '@/api/article'
import { followUser, unFollowUser } from '@/api/profile'
import MarkdownIt from 'markdown-it'
import ArticleMeta from './components/article-meta'
import ArticleComments from './components/article-comments'

export default {
  name: 'ArticleDetail',
  async asyncData({ params, store }) {
    const { data } = await getArticleDetail(params.slug)
    const { article } = data
    const isLogin = !!store.state.user
    const md = new MarkdownIt()
    article.body = md.render(article.body)

    return {
      article: data.article,
      isLogin: isLogin,
    }
  },

  components: {
    ArticleMeta,
    ArticleComments,
  },

  head () {
    return {
      title: `${this.article.title} - RealWorld`,
      meta: [
        { hid: 'description', name: 'description', content: this.article.description }
      ]
    }
  },

  data () {
    return {
      disabledFavorite: false,
      disabledFollow: false
    }
  },

  methods: {
    // 文章点赞
    async likeHandler () {
      if (!this.isLogin) {
        this.$router.push('/register')
        return
      }
      this.disabledFavorite = true
      if (this.article.favorited) {
        await unFavoriteArticle(this.article.slug)
        this.article.favorited = false
        this.article.favoritesCount--
      } else {
        await favoriteArticle(this.article.slug)
        this.article.favorited = true
        this.article.favoritesCount++
      }
      this.disabledFavorite = false
    },
    // 关注作者
    async followHandler () {
      if (!this.isLogin) {
        this.$router.push('/register')
        return
      }

      this.disabledFollow = true
      if (this.article.author.following) {
        await unFollowUser(this.article.author.username)
        this.article.author.following = false
      } else {
        await followUser(this.article.author.username)
        this.article.author.following = true
      }
      this.disabledFollow = false
    },
  }
}
</script>
