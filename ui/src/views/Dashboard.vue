<template>
  <div>
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
            @click="fetchReport"
            >
            Load
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-container v-if="report" fluid>
      <v-banner
        sticky
      >
        Once you've had a chance to explore your dashboard, please consider taking our short survey about how you use
        your shell.
        <template v-slot:actions>
          <v-btn
            color="secondary"
            :href="'https://ubc.ca1.qualtrics.com/jfe/form/SV_578RmtmqxrKrZoV?submission=' + inputSubmissionId"
            target="_blank"
          >
            Take Survey
            <v-icon right>mdi-open-in-new</v-icon>
          </v-btn>

        </template>
      </v-banner>
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
  import WordCloud from "../components/WordCloud.vue"
  import {Vue, Component, Prop} from "vue-property-decorator";
  import {Report} from "@common/Report";

  @Component({
    components: {
      WordCloud
    }
  })
  export default class Dashboard extends Vue {
    @Prop({default: ""}) readonly submissionId!: string;

    report: Report | null = null;
    isReportLoading = false;




    snackbar = false;
    snackbarText = "";

    inputSubmissionId = this.submissionId;
    showSubmissionDialog = false

    async fetchReport() {
      this.isReportLoading = true;
      this.showSubmissionDialog = false;
      await new Promise(resolve => setTimeout(resolve, 1000));
      try {
        this.report = await this.$reportService.get(this.inputSubmissionId);
      } catch (err) {
        this.snackbarText = err;
        this.snackbar = true;
      } finally {
        this.isReportLoading = false;
      }
    }


    async mounted() {
      if (this.submissionId) {
        await this.fetchReport();
      } else {
        this.showSubmissionDialog = true;
      }
    }
  }
</script>

<style scoped>

</style>
