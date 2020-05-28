<template>
  <v-card>
    <v-card-title>Thank You!</v-card-title>
    <v-card-subtitle>
      Your submission id <b>{{ submissionId }}</b>.
      <v-alert type="info" border="left" dense outlined class="mt-5">
        You'll need this code if you want to look at your data again, or if you need to contact the researchers.
      </v-alert>
    </v-card-subtitle>
    <v-card-text>
      <p>We can send it to you if you leave you email address.</p>
      <v-text-field
        v-model="_email"
        :rules="[emailRules.email]"
        label="E-mail"
        @update:error="updateErrorStatus"
      ></v-text-field>
      <v-checkbox v-model="_contact"
                  label="Researchers may contact me with questions or additional opportunities to participant.">
      </v-checkbox>
    </v-card-text>
  </v-card>
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
