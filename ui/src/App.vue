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
        Questions or comments about this research? Contact Nick Bradley at <a href="mailto:ncbrad@cs.ubc.ca">ncbrad@cs.ubc.ca</a>.
        If you have any concerns or complaints about your rights as a research participant and/or your experiences while participating in this study, contact the Research Participant Complaint Line in the UBC Office of Research Ethics at 604-822-8598 or, if long distance, e-mail <a href="mailto:RSIL@ors.ubc.ca">RSIL@ors.ubc.ca</a> or call toll free 1-877-822-8598.
        You can read our <router-link :to="{name: 'DataPolicy'}">data policy</router-link> for details on how we will use and manage your data.
        <!--router-link :to="{name: 'Demo'}" style="display: block;">See demo</router-link-->
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
