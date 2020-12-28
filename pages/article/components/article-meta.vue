<template>
  <div class="article-meta">
    <nuxt-link :to="{
      name: 'profile',
      params: {
        username: article.author.username
      }
    }"><img :src="article.author.image" /></nuxt-link>
    <div class="info">
      <nuxt-link :to="{
        name: 'profile',
        params: {
          username: article.author.username
        }
      }" class="author">{{ article.author.username }}</nuxt-link>
      <span class="date">{{ article.createdAt | date('MMMM D, YYYY') }}</span>
    </div>

    <template v-if="user && user.username === article.author.username">
      <nuxt-link class="btn btn-outline-secondary btn-sm"
        :to="{
          name: 'editor',
          params: {
            slug: article.slug
          }
        }">
        <i class="ion-edit"></i> Edit Article
      </nuxt-link>
      &nbsp;&nbsp;
      <button @click="deleteArticleHandler"
        :disabled="disabledDelete"
        class="btn btn-outline-danger btn-sm">
        <i class="ion-trash-a"></i> Delete Article
      </button>
    </template>
    <template v-else>
      <button class="btn btn-sm btn-outline-secondary"
        :disabled="disabledFollow"
        :class="{active: article.author.following}"
        @click="$emit('follow-handler')">
        <i class="ion-plus-round"></i>
        &nbsp;
        {{ article.author.following ? 'UnFollow' : 'Follow'}} {{ article.author.username }}
      </button>
      &nbsp;&nbsp;
      <button class="btn btn-sm btn-outline-primary"
        :disabled="disabledFavorite"
        :class="{active: article.favorited}"
        @click="$emit('like-handler')">
        <i class="ion-heart"></i>
        &nbsp;
        Favorite Post <span class="counter">({{ article.favoritesCount }})</span>
      </button>
    </template>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import { delArticle } from '@/api/article'

export default {
  name: 'ArticleMeta',
  props: {
    article: {
      type: Object,
      required: true,
      default: function () {
        return {}
      }
    },
    disabledFavorite: {
      type: Boolean,
      default: false
    },
    disabledFollow: {
      type: Boolean,
      default: false
    },
  },

  data () {
    return {
      disabledDelete: false,
    }
  },

  computed: {
    ...mapState(['user'])
  },

  methods: {
    async deleteArticleHandler () {
      this.disabledDelete = true
      await delArticle(this.article.slug)
      this.$router.push({
        name: 'home',
        query: {
          tab: 'your_feed'
        }
      })
    }
  }
}
</script>
