<template>
  <div>
    <form v-if="user"
      class="card comment-form">
      <div class="card-block">
        <textarea v-model="commentIpt"
          class="form-control" placeholder="Write a comment..." rows="3"></textarea>
      </div>
      <div class="card-footer">
        <img :src="user && user.image" class="comment-author-img" />
        <button class="btn btn-sm btn-primary"
          @click.prevent="addCommentHandler"
          :disabled="disabledAdd">
          Post Comment
        </button>
      </div>
    </form>
    <p v-else style="display: inherit;">
      <nuxt-link to="/login">Sign in</nuxt-link>
      or
      <nuxt-link to="/register">sign up</nuxt-link>
      to add comments on this article.
    </p>

    <div v-for="comment in comments"
      :key="comment.id"
      class="card">
      <div class="card-block">
        <p class="card-text">{{ comment.body }}</p>
      </div>
      <div class="card-footer">
        <nuxt-link :to="{
          name: 'profile',
          params: {
            username: comment.author.username
          }
        }" class="comment-author">
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link :to="{
          name: 'profile',
          params: {
            username: comment.author.username
          }
        }" class="comment-author">{{ comment.author.username }}</nuxt-link>
        <span class="date-posted">{{ comment.createdAt | date('MMMM D, YYYY') }}</span>
        <span v-if="user && comment.author.username === user.username"
          @click="delCommentHandler(comment.id)"
          class="mod-options">
          <i class="ion-trash-a"></i>
        </span>
      </div>
    </div>

  </div>
</template>

<script>
import { getComments, addComment, delComment } from '@/api/article'
import { mapState } from 'vuex'

export default {
  name: 'ArticleComments',
  props: {
    article: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },

  data () {
    return {
      comments: [],
      commentIpt: '',
      disabledAdd: false,
    }
  },

  computed: {
    ...mapState(['user'])
  },

  async mounted () {
    const { data } = await getComments(this.article.slug)
    this.comments = data.comments
  },

  methods: {
    async addCommentHandler () {
      if (!this.commentIpt.trim()) {
        return
      }

      this.disabledAdd = true
      const { data } = await addComment({
        slug: this.article.slug,
        comment: {
          body: this.commentIpt
        }
      })
      this.comments.unshift(data.comment)
      this.commentIpt = ''
      this.disabledAdd = false
    },
    async delCommentHandler (id) {
      await delComment(this.article.slug, id)
      this.comments = this.comments.filter(comment => comment.id !== id)
    }
  }
}
</script>
