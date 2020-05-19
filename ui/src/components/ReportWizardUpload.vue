<template>
  <div>
    <v-card flat>
      <v-card-title>Step 1</v-card-title>
      <v-card-subtitle>
        Download the script corresponding to your primary shell.
        The script simply prints your shell aliases, variables, and history so that it can be captured in a file
        and submitted to generate your dashboard.
      </v-card-subtitle>
      <v-card-text>
        <v-simple-table>
          <thead>
          <tr>
            <th class="text-left">Shell*</th>
            <th class="text-left">Link</th>
            <th class="text-link">Curl</th>
          </tr>
          </thead>
          <tfoot>
          <tr>
            <td class="text--secondary">*To get your shell, run <code>echo $SHELL</code></td>
          </tr>
          </tfoot>
          <tbody>
          <tr>
            <td>BASH</td>
            <td><a href="scripts/insight.bash" download="insight.sh">insight.sh</a></td>
            <td><code>curl -L "{{origin}}/scripts/insight.bash" -o insight.sh</code></td>
          </tr>
          <tr>
            <td>ZSH</td>
            <td><a href="scripts/insight.zsh" download="insight.sh">insight.sh</a></td>
            <td><code>curl -L "{{origin}}/scripts/insight.zsh" -o insight.sh</code></td>
          </tr>
          </tbody>
        </v-simple-table>
      </v-card-text>
    </v-card>

    <v-card flat>
      <v-card-title>Step 2</v-card-title>
      <v-card-subtitle>Apply executable permissions to the script.</v-card-subtitle>
      <v-card-text>
        <code>chmod +x insight.sh</code>
      </v-card-text>
    </v-card>

    <v-card flat>
      <v-card-title>Step 3</v-card-title>
      <v-card-subtitle>Generate the report.</v-card-subtitle>
      <v-card-text>
        <code>./insight.sh >| report.dat</code>
        <v-alert type="info" border="left" dense outlined class="mt-5">
          Edit the report to remove any sensitive or personally identifying information in your favorite text
          editor.
        </v-alert>
      </v-card-text>
    </v-card>

    <v-card flat>
      <v-card-title>Step 4</v-card-title>
      <v-card-subtitle>
        Upload the report locally in your browser for review before submission.
      </v-card-subtitle>
      <v-card-text>
        <v-file-input
          show-size accept=".dat"
          label="File input"
          :error-messages="error"
          @change="load">
        </v-file-input>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
  import {Vue, Component, PropSync} from "vue-property-decorator";

  @Component
  export default class ReportWizardUpload extends Vue {
    @PropSync("errorMessage") error!: string;

    origin = location.origin;

    load(file: File) {
      this.$emit("change", file);
      this.error = "";
    }
  }
</script>

<style scoped>

</style>
