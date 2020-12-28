<template>
  <div class="profile-page">

    <div class="user-info">
      <div class="container">
        <div class="row">

          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image || '/images/default_avatar.png'" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>
              {{ profile.bio }}
            </p>

            <button v-if="isSelf"
              class="btn btn-sm action-btn btn-outline-secondary"
              @click="toEditProfile(profile.username)">
              &nbsp; <i class="ion-gear-a"></i> Edit Profile Settings
            </button>
            <button v-else
              class="btn btn-sm action-btn"
              @click="followHandler(profile.username)"
              :disabled="disabledFollow"
              :class="{
                'btn-outline-secondary': !profile.following,
                'btn-secondary': profile.following
              }">
              &nbsp; <i class="ion-plus-round"></i>
              {{ profile.following ? 'Unfollow' : 'Follow' }} {{ profile.username }}
            </button>
          </div>

        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link class="nav-link"
                  :to="{
                    name: 'profile',
                    query: {
                      tab: 'my_articles'
                    }
                  }"
                  exact
                  :class="{
                    active: tab === 'my_articles'
                  }">My Articles</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link class="nav-link"
                  :to="{
                    name: 'profile',
                    query: {
                      tab: 'favorited_articles'
                    }
                  }"
                  exact
                  :class="{
                    active: tab === 'favorited_articles'
                  }">Favorited Articles</nuxt-link>
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
                    name: 'profile',
                    query: {
                      page: pageNumber,
                      tab: tab,
                    }
                  }"
                  class="page-link">{{ pageNumber }}</nuxt-link>
              </li>
            </ul>
          </nav>

        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { getProfile, followUser, unFollowUser } from '@/api/profile'
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'

export default {
  name: 'ProfileIndex',
  watchQuery: ['page', 'tab'],
  async asyncData({ query, params, store }) {
    const page = Number.parseInt(query.page || 1)
    const limit = 20
    const tab = query.tab || 'my_articles'
    const username = params.username
    const isLogin = !!store.state.user
    const isSelf = store.state.user && store.state.user.username === params.username

    let articleParams = {
      limit: limit,
      offset: (page - 1) * limit,
    }

    if (tab === 'my_articles') {
      articleParams.author = username
    } else {
      articleParams.favorited = username
    }

    const [ profileRes, articleRes ] = await Promise.all([
      getProfile(username),
      getArticles(articleParams)
    ])

    const { profile } = profileRes.data
    const { articles, articlesCount } = articleRes.data

    return {
      profile: profile,
      articles: articles,
      currentPage: page,
      totalPage: Math.ceil(articlesCount / limit),
      tab: tab,
      isLogin: isLogin,
      isSelf: isSelf,
    }
  },

  components: {
    ArticleItem
  },

  data () {
    return  {
      disabledFollow: false
    }
  },

  methods: {
    async followHandler (username) {
      if (!this.isLogin) {
        this.$router.push('/register')
        return
      }

      this.disabledFollow = true
      if (this.profile.following) {
        await unFollowUser(username)
        this.profile.following = false
      } else {
        await followUser(username)
        this.profile.following = true
      }
      this.disabledFollow = false
    },

    // 去设置页
    toEditProfile () {
      this.$router.push('/settings')
    }
  }
}
</script>

<style>

</style>
