<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >

      <router-link :to="{name: 'Home'}">
      <v-img
        alt="Vuetify Name"
        class="shrink mt-1 hidden-sm-and-down"
        contain
        min-width="100"
        :src="require('./assets/name.png')"
        width="100"
      />
      </router-link>

      <v-spacer></v-spacer>

    </v-app-bar>

    <v-content>
      <router-view></router-view>
<!--      <Landing/>-->
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'App',
  components: {
  },
  data: () => ({

  }),
  computed: {
    cWindowTitle () {
      // route-name is part of the localisation-key
      const routeName = this.$route.name
      const home = routeName === 'home'

      let title = "sh>Insight"
      if (!home) {
        // only add title extension if this is not the main/home route
        title = `${title} - ${routeName}`
      }

      return title
    }
  },
  watch: {
    cWindowTitle: 'setWindowTitle'
  },
  created () {
    this.setWindowTitle()
  },
  methods: {
    setWindowTitle () {
      document.title = this.cWindowTitle
    }
  }
})
</script>
