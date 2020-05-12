<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Get Started</v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="quit()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Shell usage</v-toolbar-title>
        </v-toolbar>

        <v-stepper v-model="step">
          <v-stepper-header>
            <v-stepper-step :complete="step > 1" step="1">Upload</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="step > 2" step="2">Review</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="3">Summary</v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <!--                            <upload></upload>-->
              <!--v-card class="mb-12" outlined color="grey lighten-4"-->

              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title>Step 1</v-list-item-title>
                  <v-list-item-subtitle>
                    <p>Run this command to download a script to collect information about your shell:</p>
                    <code>curl -L "https://.$(SHELL)" -o shinsight</code>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title>Step 2</v-list-item-title>
                  <v-list-item-subtitle>
                    <p>Apply executable permissions to the script:</p>
                    <code>chmod +x shinsight</code>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title>Step 3</v-list-item-title>
                  <v-list-item-subtitle>
                    <p>Select the report called <code>shinsight-report.dat</code>:</p>
                    <v-file-input show-size :loading="loading" :error-messages="loadError" accept=".dat"
                                  label="File input" @change="load"></v-file-input>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <!--/v-card-->

              <v-btn color="primary" :disabled="!fileIsValid" @click="step = 2">Continue</v-btn>
              <v-btn text @click="quit()">Cancel</v-btn>

            </v-stepper-content>

            <v-stepper-content step="2">
              <v-alert
                type="info"
                elevation="2"
                :dismissible="showReviewMsg"
              >
                You'll need to submit your data for analysis.
                Please remove any sensitive or personally identifying information and click continue.
                Your data will not be sent until you have provided consent.
              </v-alert>

              <v-textarea id="viewer" rows="15" v-model="uploadedHistory"></v-textarea>
              <v-btn
                color="primary"
                @click="consentDialog = true"
              >
                Continue
              </v-btn>

              <v-btn text @click="quit()">Cancel</v-btn>
            </v-stepper-content>

            <v-stepper-content step="3">
              <!--                            <v-card-->
              <!--                                    class="mb-12"-->
              <!--                                    color="grey lighten-1"-->
              <!--                                    height="200px"-->
              <!--                            ></v-card>-->
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="overline mb-4">Submission</div>
                  <v-list-item-title class="headline mb-1">{{ submissionId }}</v-list-item-title>
                  <v-list-item-subtitle>

                    <p>You'll need this code if you what to look at your data again, or if you need to contact the
                      researchers.</p>
                    <p>If you'd like, we can email it to you.</p>
                    <v-text-field
                      v-model="email"
                      :rules="[emailRules.email]"
                      label="E-mail"
                    ></v-text-field>
                    <v-checkbox v-model="checkbox1"
                                label="Researchers may contact me with questions or additional opportunities to participant."></v-checkbox>

                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <!--                                <div class="text-center">-->
              <!--                                <p>XXX-YYY</p>-->
              <!--                            </div>-->
              <!--                            <p>You'll need this code if you what to look at your data again, or if you need to contact the researchers.</p>-->

              <v-btn
                color="primary"
                @click="complete()"
              >
                Finish
              </v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>

        <v-dialog
          v-model="consentDialog"
          max-width="300"
        >
          <v-card>
            <v-card-title class="headline">Submit your shell data?</v-card-title>

            <v-card-text>
              Your data will be used by researchers to understand how developers interact with their shell.
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                color="green darken-1"
                text
                @click="consentDialog = false"
              >
                Disagree
              </v-btn>

              <v-btn
                color="green darken-1"
                text
                @click="agree"
              >
                Agree
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-overlay :value="submitting">
          <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>

      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

  @Component({
    components: {
    }
  })
export default class DataCollection extends Vue {
    dialog = false;
    consentDialog = false;
    step = 1;

    loading = false;
    loadError = '';
    fileIsValid = false;

    uploadedHistory = '';
    showReviewMsg = true;

    submitting = false;
    email = '';
    emailRules = {
      required: (value: string) => !!value || 'Required.',
      counter: (value: string) => value.length <= 20 || 'Max 20 characters',
      email: (value: string) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return !value || pattern.test(value) || 'Invalid e-mail.'
      }
    };

    checkbox1 = true;
    file?: File;

    submissionId = ''

    data () {
      return {
        // dialog: false,
        notifications: false,
        sound: true,
        widgets: false
        // step: 1,
      }
    }

    quit () {
      this.dialog = false
      this.step = 1
    }

    complete () {
      this.dialog = false
      this.$router.replace('Dashboard')
    }

    async load (file: File) {
      this.loading = true
      this.file = file

      try {
        this.uploadedHistory = await file.text()
        this.fileIsValid = true
      } catch (err) {
        this.loadError = err
        this.fileIsValid = false
      } finally {
        this.loading = false
      }
    }

    async agree () {
      this.consentDialog = false
      this.submitting = true
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      await this.$reportService.post(this.file)
      this.submitting = false

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      this.submissionId = this.$reportService.reportId
      this.step = 3
    }
}
</script>

<style scoped>

</style>
