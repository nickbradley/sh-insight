<template>
<div>
  <v-container>
    <v-banner
    single-line
    sticky
    >
      Ready to get insights into your own data?
      <template v-slot:actions>
        <v-btn
          color="primary"
          :to="{name: 'Submit'}"
        >
          Get Started
        </v-btn>

      </template>
    </v-banner>

    <v-snackbar
      v-model="snackbar"
      top
      color="error"
      :timeout="0"
    >
      {{ snackbarText }}
      <v-btn text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>

  </v-container>



</div>
</template>

<script lang="ts">
  import {Vue,Component} from "vue-property-decorator";
  import {Report} from "@common/Report";
  // import WordCloud from "@/components/WordCloud.vue";
  import DashboardCard from "@/components/DashboardGridCard.vue";

  @Component({
    components: {
      DashboardCard
    }
  })
  export default class Demo extends Vue {

    report: Report | null = null;
    isReportLoading = true;

    snackbar = false;
    snackbarText = "";

    async fetchReport() {
      this.isReportLoading = true;
      await new Promise(resolve => setTimeout(resolve, 10000));
      try {
        this.report = await this.$reportService.getDashboard("demo");
      } catch (err) {
        this.snackbarText = err;
        this.snackbar = true;
      } finally {
        this.isReportLoading = false;
      }
    }

    async mounted() {
      await this.fetchReport();
    }

  }
</script>

<style scoped>

</style>
