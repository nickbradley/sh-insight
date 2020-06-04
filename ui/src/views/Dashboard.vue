<template>
  <div>
    <v-banner v-if="submissionId === 'demo'"
              app
      single-line
      sticky
      elevation="3"
              color="grey lighten-3"
    >
      <template v-slot:icon>
        <v-icon>mdi-information</v-icon>
      </template>

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

    <v-dialog v-model="showSubmissionDialog" persistent max-width="400">
      <v-card>
        <v-card-title>
          View previous submission
        </v-card-title>
        <v-card-text>
          <v-text-field label="Submission ID" v-model="inputSubmissionId"></v-text-field>
          You can also
          <router-link :to="{name: 'Submit'}">make a new submission</router-link>
          .
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            text
            :to="{name: 'Home'}">
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            :loading="isReportLoading"
            @click="fetchDashboard"
          >
            Load
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  <dashboard-grid :dashboard-data="data"></dashboard-grid>

  </div>
</template>

<script lang="ts">
  import {Vue, Component, Prop} from "vue-property-decorator";
  import {DashboardData} from "@common/Types";
  import DashboardGrid from "@/components/DashboardGrid.vue";

  @Component({
    components: {
      DashboardGrid
    }
  })
  export default class Dashboard extends Vue {
    @Prop({default: ""}) readonly submissionId!: string;


    data: DashboardData | null = null;
    isReportLoading = false;




    snackbar = false;
    snackbarText = "";

    inputSubmissionId = this.submissionId;
    showSubmissionDialog = false

    async fetchDashboard() {
      this.isReportLoading = true;
      this.showSubmissionDialog = false;
      try {
        this.data = await this.$reportService.getDashboard(this.inputSubmissionId);
      } catch (err) {
        this.snackbarText = err;
        this.snackbar = true;
      } finally {
        this.isReportLoading = false;
      }
    }

    async created() {
      if (this.submissionId) {
        await this.fetchDashboard();
      } else {
        this.showSubmissionDialog = true;
      }
    }
  }
</script>

<style scoped>

</style>
