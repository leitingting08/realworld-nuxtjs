<template>
<div class="editor-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-10 offset-md-1 col-xs-12">
        <form>
          <fieldset>
            <fieldset class="form-group">
                <input v-model="article.title"
                  type="text" class="form-control form-control-lg" placeholder="Article Title">
            </fieldset>
            <fieldset class="form-group">
                <input v-model="article.description"
                  type="text" class="form-control" placeholder="What's this article about?">
            </fieldset>
            <fieldset class="form-group">
                <textarea v-model="article.body"
                  class="form-control" rows="8" placeholder="Write your article (in markdown)"></textarea>
            </fieldset>
            <fieldset class="form-group">
                <input maxlength="16"
                  v-model="tagIpt"
                  @keyup.enter="addTag"
                  type="text" class="form-control" placeholder="Enter tags">
                <div class="tag-list">
                  <span v-for="tag in article.tagList"
                    :key="tag"
                    class="tag-default tag-pill">
                    <i class="ion-close-round" @click="removeTag(tag)"></i>
                    {{ tag }}
                  </span>
                </div>
            </fieldset>
            <button @click.prevent="publishArticle"
              :disabled="disabledPublish"
              class="btn btn-lg pull-xs-right btn-primary" type="button">
                Publish Article
            </button>
          </fieldset>
        </form>
      </div>

    </div>
  </div>
</div>
</template>

<script>
import { getArticleDetail, createArticle, updateArticle } from '@/api/article'

export default {
  // 在路由匹配组件渲染前会先执行中间件进行处理
  middleware: 'authenticated',
  name: 'EditorIndex',

  data () {
    return {
      article: {
        slug: '',
        title: '',
        description: '',
        body: '',
        tagList: [],
      },
      tagIpt: '',
      disabledPublish: false,
    }
  },

  async mounted () {
    if (this.$route.params.slug) {
      const { data } = await getArticleDetail(this.$route.params.slug)
      const { article } = data
      for (const key in this.article) {
        this.article[key] = article[key]
      }
    }
  },

  methods: {
    addTag () {
      if (!this.tagIpt.trim()) {
        return
      }

      if (this.article.tagList.some(tag => tag === this.tagIpt)) {
        return
      }

      if (this.article.tagList.length >= 6) {
        alert('No more than six labels')
        return
      }

      this.article.tagList.push(this.tagIpt)
      this.tagIpt = ''
    },
    removeTag (tag) {
      this.article.tagList = this.article.tagList.filter(hasTag => hasTag !== tag)
    },
    async publishArticle () {
      this.disabledPublish = true
      const { data } = !this.article.slug ?
        await createArticle({ article: this.article }) :
        await updateArticle({ article: this.article })
      this.$router.push(`/article/${data.article.slug}`)
    }
  }
}
</script>
