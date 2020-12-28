<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <ul class="error-messages">
            <template v-for="(messages, field) in errors">
              <li v-for="(message, index) in messages"
                :key="index">
                {{field}} {{message}}
              </li>
            </template>
          </ul>

          <form>
            <fieldset>
                <fieldset class="form-group">
                  <input v-model="newUser.image"
                    class="form-control" type="text" placeholder="URL of profile picture">
                </fieldset>
                <fieldset class="form-group">
                  <input v-model="newUser.username"
                    class="form-control form-control-lg" type="text" placeholder="Your Name">
                </fieldset>
                <fieldset class="form-group">
                  <textarea v-model="newUser.bio"
                    class="form-control form-control-lg" rows="8" placeholder="Short bio about you"></textarea>
                </fieldset>
                <fieldset class="form-group">
                  <input v-model="newUser.email"
                    class="form-control form-control-lg" type="text" placeholder="Email">
                </fieldset>
                <fieldset class="form-group">
                  <input v-model="newUser.password"
                    class="form-control form-control-lg" type="password" placeholder="Password">
                </fieldset>
                <button @click.prevent="updateUserHandler"
                  :disabled="disabledUpdate"
                  class="btn btn-lg btn-primary pull-xs-right">
                  Update Settings
                </button>
            </fieldset>
          </form>

          <hr>
          <button @click="logout"
            class="btn btn-outline-danger">Or click here to logout.</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined
import { mapState } from 'vuex'
import { updateUser } from '@/api/user'

export default {
  middleware: 'authenticated',
  name: 'Settings',

  data () {
    return {
      newUser: {
        email: '',
        image: '',
        bio: '',
        username: '',
        password: undefined,
      },
      errors: {},
      disabledUpdate: false
    }
  },

  computed: {
    ...mapState(['user'])
  },

  mounted () {
    this.newUser = Object.assign(this.newUser, this.user)
  },

  methods: {
    async updateUserHandler () {
      this.disabledUpdate = true
      try {
        const { data } = await updateUser({ user: this.newUser })

        // 更新 store
        this.$store.commit('setUser', data.user)

        // 更新 cookie
        Cookie.set('user', data.user)
        this.$router.push(`/profile/${data.user.username}`)
      } catch (err) {
        this.errors = err.response.data.errors
      }
      this.disabledUpdate = false
    },
    logout () {
      // 清除登录信息并退出
      Cookie.remove('user')
      this.$store.commit('setUser', null)
      this.$router.push('/')
    }
  }
}
</script>
