<template>
  <div>
    <wordcloud
      :data="words"
      nameKey="name"
      valueKey="value"
      :color="myColors"
      :showTooltip="true"
      :wordClick="wordClickHandler">
    </wordcloud>
  </div>
</template>

<script>
import wordcloud from 'vue-wordcloud'

export default {
  name: 'WordCloud',
  components: {
    wordcloud
  },
  props: {
    report: Object
  },
  data () {
    return {
      myColors: ['#1f77b4', '#629fc9', '#94bedb', '#c9e0ef'],
      commandCount: this.report.history.getCommandCount()
    }
  },
  computed: {
    words: function () {
      return Object.entries(this.commandCount).map(([name, value]) => {
        return { name, value }
      })
    }
  }
}
</script>

<style scoped>

</style>
