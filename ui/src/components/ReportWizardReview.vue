<template>
  <div>
    <v-alert
      type="info"
      border="left"
      dense
      outlined
    >
      You'll need to submit your data for analysis.
      Please verify that all sensitive or personally identifying information have been removed before continuing.
      Your data will not be sent until you have provided consent.
    </v-alert>

    <v-textarea
      rows="15"
      readonly
      hint="If you need to make changes, go back and upload the corrected report."
      v-model="report">
    </v-textarea>
  </div>
</template>

<script lang="ts">
  import {Vue, Component, Prop} from "vue-property-decorator";

  @Component
  export default class ReportWizardReview extends Vue {
    @Prop() readonly report!: string;
  }
</script>

<style scoped>

</style>
