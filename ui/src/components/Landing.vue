<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to Shell Insight
        </h1>

        <p class="subheading font-weight-regular">
          Our goal is to provide useful insights and recommendations to make you more efficient in your shell.
          <v-spacer ></v-spacer>
<!--          <v-btn color="primary" dark v-on="on">Get started</v-btn>-->
          <DataCollection/>
        </p>
<!--        <p class="subheading font-weight-regular">-->
<!--          Already uploaded data?  View your-->
<!--          <a-->
<!--            href="https://community.vuetifyjs.com"-->
<!--            target="_blank"-->
<!--          >dashboard</a>.-->
<!--        </p>-->
      </v-col>

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
<!--      </v-col>-->
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import DataCollection from './DataCollection.vue'

export default Vue.extend({
  name: 'Landing',
  components: {
    DataCollection
  },
  data: () => ({
    importantLinks: [
      {
        text: 'Documentation',
        href: 'https://vuetifyjs.com'
      },
      {
        text: 'Chat',
        href: 'https://community.vuetifyjs.com'
      },
      {
        text: 'Made with Vuetify',
        href: 'https://madewithvuejs.com/vuetify'
      },
      {
        text: 'Twitter',
        href: 'https://twitter.com/vuetifyjs'
      },
      {
        text: 'Articles',
        href: 'https://medium.com/vuetify'
      }
    ]
  })
})
</script>
