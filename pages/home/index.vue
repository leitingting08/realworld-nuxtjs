<template>
  <div class="home-page">

    <div class="banner">
      <div class="container">
        <h1 class="logo-font">nuxt</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">

        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li v-if="isLogin"
                class="nav-item">
                <nuxt-link :to="{
                    name: 'home',
                    query: {
                      tab: 'your_feed'
                    }
                  }"
                  exact
                  class="nav-link"
                  :class="{
                    active: tab === 'your_feed'
                  }">Your Feed</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link :to="{
                    name: 'home',
                    query: {
                      tab: 'global_feed'
                    }
                  }"
                  exact
                  class="nav-link"
                  :class="{
                    active: tab === 'global_feed'
                  }">Global Feed</nuxt-link>
              </li>
              <li v-if="tab === 'popular_tag'"
                class="nav-item">
                <nuxt-link :to="{
                    name: 'home',
                    query: {
                      tab: 'global_feed'
                    }
                  }"
                  exact
                  class="nav-link"
                  :class="{
                    active: tab === 'popular_tag'
                  }"><i class="ion-pound"></i> {{ tag }}</nuxt-link>
              </li>
            </ul>
          </div>

          <article-item
            v-for="article in articles"
            :key="article.slug"
            :article="article"
            :isLogin="isLogin" />

          <!-- 分页列表 -->
          <nav v-if="totalPage > 1">
            <ul class="pagination">
              <li class="page-item"
                :class="{
                  active: pageNumber === currentPage
                }"
                v-for="pageNumber in totalPage"
                :key="pageNumber"
              >
                <nuxt-link :to="{
                    name: 'home',
                    query: {
                      page: pageNumber,
                      tab: tab,
                      tag: tag
                    }
                  }"
                  class="page-link">{{ pageNumber }}</nuxt-link>
              </li>
            </ul>
          </nav>

        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list" style="max-height: 350px; overflow-y: auto;">
              <nuxt-link v-for="tag in tags"
                :key="tag"
                href=""
                :to="{
                  name: 'home',
                  query: {
                    tab: 'popular_tag',
                    tag: tag,
                  }
                }"
                class="tag-pill tag-default">{{ tag }}</nuxt-link>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { getArticles, getTags, getFeedArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'

export default {
  name: 'HomeIndex',
  watchQuery: ['page', 'tab', 'tag'],
  async asyncData ({ query, store }) {
    const page = Number.parseInt(query.page || 1)
    const limit = 20
    const tab = query.tab || 'global_feed'
    const tag = query.tag
    const isLogin = !!store.state.user
    const getArticleApi = tab === 'your_feed' ? getFeedArticles : getArticles

    const [ articleRes, tagRes ] = await Promise.all([
      getArticleApi({
        limit: limit,
        offset: (page - 1) * limit,
        tag: tag,
      }),
      getTags()
    ])

    const { articles, articlesCount } = articleRes.data
    const { tags } = tagRes.data

    return {
      articles: articles,
      currentPage: page,
      totalPage: Math.ceil(articlesCount / limit),
      tags: tags,
      tab: tab,
      tag: tag,
      isLogin: isLogin,
    }
  },

  components: {
    ArticleItem
  },
}
</script>

<style>

</style>
