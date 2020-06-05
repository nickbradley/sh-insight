<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          <v-icon left>mdi-home</v-icon>
          sh>Insight</router-link>
      </v-toolbar-title>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer app>
      <span>
You can read the full details of our study on our <router-link :to="{name: 'About'}">About</router-link> page.
      </span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
  import {Vue, Component, Watch} from 'vue-property-decorator'


  @Component({})
  export default class App extends Vue {
    submissionId = this.$reportService.reportId;

    get cWindowTitle() {
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

    @Watch("cWindowTitle")
    setWindowTitle() {
      document.title = this.cWindowTitle
    }


    created() {
      this.setWindowTitle()
    }

  }
</script>
