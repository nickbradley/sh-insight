<template>
  <v-list-item three-line>
    <v-list-item-content>
      <div class="overline mb-4">Submission</div>
      <v-list-item-title class="headline mb-1">{{ submissionId }}</v-list-item-title>
      <v-list-item-subtitle>

        <p>You'll need this code if you what to look at your data again, or if you need to contact the
          researchers.</p>
        <p>If you'd like, we can email it to you.</p>
        <v-text-field
          v-model="_email"
          :rules="[emailRules.email]"
          label="E-mail"
          @update:error="updateErrorStatus"
        ></v-text-field>
        <v-checkbox v-model="_contact"
                    label="Researchers may contact me with questions or additional opportunities to participant."></v-checkbox>
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
  import {Vue, Component, Prop, PropSync, Watch} from "vue-property-decorator";

  @Component
  export default class ReportUploadWizardSummary extends Vue {
    @Prop() readonly submissionId!: string;
    @PropSync("email") _email!: string;
    @PropSync("contact") _contact!: boolean;
    @PropSync("isValidEmail") _isValidEmail!: boolean;

    emailRules = {
      required: (value: string) => !!value || 'Required.',
      counter: (value: string) => value.length <= 20 || 'Max 20 characters',
      email: (value: string) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return !value || pattern.test(value) || 'Invalid e-mail.'
      }
    };

    updateErrorStatus(isError: boolean) {
      this._isValidEmail = !isError;
    }
  }
</script>

<style scoped>

</style>
