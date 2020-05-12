<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >

      <v-img
        alt="Vuetify Name"
        class="shrink mt-1 hidden-sm-and-down"
        contain
        min-width="100"
        :src="require('./assets/name.png')"
        width="100"
      />

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
import Landing from './components/Landing.vue'

export default Vue.extend({
  name: 'App',

  components: {
    // Landing
  },

  data: () => ({
    //
  })
})
</script>
