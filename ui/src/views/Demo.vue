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

  <v-container v-if="report" fluid>
    <v-row>
      <v-col>
        <word-cloud :report="report"></word-cloud>
      </v-col>
    </v-row>
  </v-container>

  <v-container v-else fluid>
    <v-skeleton-loader type="card">

    </v-skeleton-loader>
  </v-container>
</div>
</template>

<script lang="ts">
  import {Vue,Component} from "vue-property-decorator";
  import {Report} from "@common/Report";
  import WordCloud from "@/components/WordCloud.vue";

  @Component({
    components: {
      WordCloud
    }
  })
  export default class Demo extends Vue {
    report: Report | null = null;
    isReportLoading = false;

    snackbar = false;
    snackbarText = "";

    async fetchReport() {
      this.isReportLoading = true;
      await new Promise(resolve => setTimeout(resolve, 1000));
      try {
        this.report = await this.$reportService.get("demo");
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
