<template>
  <div class="home">
    <img alt="Vue logo" src="packages/uickages/ui/src/assets/logo.png">
    <Landing msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Landing from '@/components/Landing.vue'

export default {
  name: 'Home',
  components: {
    Landing
  }
}
</script>
