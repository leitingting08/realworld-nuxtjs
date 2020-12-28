<template>
  <div class="article-preview">
    <div class="article-meta">
      <nuxt-link :to="{
        name: 'profile',
        params: {
          username: article.author.username
        }
      }">
        <img :src="article.author.image || '/images/default_avatar.png'" />
      </nuxt-link>
      <div class="info">
        <nuxt-link class="author"
          :to="{
            name: 'profile',
            params: {
              username: article.author.username
            }
          }">
          {{ article.author.username }}
        </nuxt-link>
        <span class="date">{{ article.createdAt | date('MMM D, YYYY') }}</span>
      </div>
      <button class="btn btn-outline-primary btn-sm pull-xs-right"
        :class="{
          active: article.favorited
        }"
        :disabled="disabledFavorite"
        @click="likeHandler(article)">
        <i class="ion-heart"></i> {{ article.favoritesCount }}
      </button>
    </div>
    <nuxt-link :to="{
      name: 'article',
      params: {
        slug: article.slug
      }
    }" class="preview-link">
      <h1>{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <span>Read more...</span>
      <ul class="tag-list">
        <li v-for="tag in article.tagList"
          :key="tag"
          class="tag-default tag-pill tag-outline">
          {{ tag }}
        </li>
      </ul>
    </nuxt-link>
  </div>
</template>

<script>
import { favoriteArticle, unFavoriteArticle } from '@/api/article'

export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true,
      default: function () {
        return {}
      }
    },
    isLogin: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return  {
      disabledFavorite: false
    }
  },

  methods: {
    async likeHandler (article) {
      if (!this.isLogin) {
        this.$router.push('/register')
        return
      }
      this.disabledFavorite = true
      if (article.favorited) {
        await unFavoriteArticle(article.slug)
        article.favorited = false
        article.favoritesCount--
      } else {
        await favoriteArticle(article.slug)
        article.favorited = true
        article.favoritesCount++
      }
      this.disabledFavorite = false
    }
  }
}
</script>
