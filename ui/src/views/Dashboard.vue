<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <word-cloud/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import WordCloud from '../components/WordCloud'
export default {
  name: 'Dashboard',
  components: {
    WordCloud
  }
}
</script>

<style scoped>

</style>
