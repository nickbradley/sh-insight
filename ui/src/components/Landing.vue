<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">

        <v-card flat class="ma-8">
          <v-btn
            color="primary"
            x-large
            :to="{name: 'Submit'}"
          >


            Get Started
          </v-btn>
          <DataCollection v-if="showWizard" v-on:close="showWizard=false" v-on:finish="showDashboard"></DataCollection>
          <router-link :to="{name: 'Dashboard', params: { submissionId: 'demo' }}" style="display: block;">See demo</router-link>
          <router-link :to="{name: 'Dashboard'}" style="display: block">See past submission</router-link>
        </v-card>
        <v-card flat>
          <v-btn
            color="secondary"
            href="https://ubc.ca1.qualtrics.com/jfe/form/SV_578RmtmqxrKrZoV"
            target="_blank"
          >
            Take Survey
            <v-icon right>mdi-open-in-new</v-icon>
          </v-btn>
        </v-card>


        <!--        <v-img-->
        <!--          :src="require('../assets/logo.svg')"-->
        <!--          class="my-3"-->
        <!--          contain-->
        <!--          height="200"-->
        <!--        />-->
        <!--      </v-col>-->

        <!--      <v-col class="mb-4">-->
        <!--        <h1 class="display-2 font-weight-bold mb-3">-->
        <!--          Welcome to Shell Insight-->
        <!--        </h1>-->

        <!--        <p class="subheading font-weight-regular">-->
        <!--          Our goal is to provide useful insights and recommendations to make you more efficient in your shell.-->
        <!--          <v-spacer ></v-spacer>-->

        <!--          <v-btn color="primary" dark @click="showWizard=true">Get Started</v-btn>-->
        <!--          <DataCollection v-if="showWizard" v-on:close="showWizard=false" v-on:finish="showDashboard"></DataCollection>-->
        <!--        </p>-->
        <!--        <p class="subheading font-weight-regular">-->
        <!--          Already uploaded data?  View your-->
        <!--          <a-->
        <!--            href="https://community.vuetifyjs.com"-->
        <!--            target="_blank"-->
        <!--          >dashboard</a>.-->
        <!--        </p>-->
        <!--      </v-col>-->

        <!--      <v-col-->
        <!--        class="mb-5"-->
        <!--        cols="12"-->
        <!--      >-->
        <!--        <h2 class="headline font-weight-bold mb-3">-->
        <!--          Important Links-->
        <!--        </h2>-->

        <!--        <v-row justify="center">-->
        <!--          <a-->
        <!--            v-for="(link, i) in importantLinks"-->
        <!--            :key="i"-->
        <!--            :href="link.href"-->
        <!--            class="subheading mx-3"-->
        <!--            target="_blank"-->
        <!--          >-->
        <!--            {{ link.text }}-->
        <!--          </a>-->
        <!--        </v-row>-->
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator'
  import DataCollection from './ReportWizard.vue'

  @Component({
    components: {
      DataCollection
    }
  })
  export default class Landing extends Vue {
    showWizard = false

    cancel() {
      console.log("cancel from landing");
    }

    showDashboard() {
      this.$router.replace({name: "Dashboard"});
    }
  }
</script>
