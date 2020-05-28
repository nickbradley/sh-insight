<template>
  <DataCollection
    @close="close"
    @finish="finish">
  </DataCollection>
</template>

<script lang="ts">
  import {Vue, Component} from "vue-property-decorator";
  import DataCollection from "../components/ReportWizard.vue";

  @Component({
    components: {
      DataCollection
    }
  })
  export default class Submit extends Vue {

    close() {
      this.$router.go(-1);
      // If we got here, then there was no where to navigate to so go home
      this.$router.replace({name: "Home"});
    }

    finish(submissionId: string) {
      this.$router.replace({name: "Dashboard", params: {submissionId}});
    }
  }
</script>

<style scoped>

</style>
