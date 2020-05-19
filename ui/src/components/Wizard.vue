<template>
  <div>
    <v-toolbar dark color="primary">
      <v-btn icon dark @click="cancel">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>{{title}}</v-toolbar-title>
    </v-toolbar>

    <v-stepper v-model="step">
      <v-stepper-header>
        <template
          v-for="(name, index) in steps"
        >
          <v-stepper-step
            :complete="step > index + 1"
            :key="index"
            :step="index + 1">
            {{name}}
          </v-stepper-step>
          <v-divider v-if="index + 1< steps.length"
                     :key="`${index}-divider`">
          </v-divider>
        </template>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content
          v-for="(name, index) in steps"
          :key="index"
          :step="index + 1">

          <slot :name="name"></slot>

        </v-stepper-content>
      </v-stepper-items>

    <v-btn v-if="step < lastStep"
           color="primary"
           @click="next"
           class="mb-5 ml-5"
    >
      Continue
    </v-btn>
    <v-btn v-else color="primary" @click="done" class="mb-5 ml-5">Finish</v-btn>

    <v-btn v-if="step > 1 && step < lastStep"
           text
           @click="prev"
    class="mb-5">
      Previous
    </v-btn>

    <v-btn v-if="step < lastStep" text @click="cancel" absolute right color="error" class="mb-5">Cancel</v-btn>
    </v-stepper>
    <v-dialog
      v-model="_alert.visible"
      max-width="300"
    >
      <notification
        :title="_alert.title"
        :text="_alert.text"
      >
        <template>
          <v-btn
            color="green darken-1"
            text
            @click="_alert.visible = false"
          >
            Okay
          </v-btn>
        </template>
      </notification>
    </v-dialog>

    <v-overlay :value="wait">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script lang="ts">
  import {Vue, Component, Prop, Watch, PropSync} from "vue-property-decorator";
  import Notification from "@/components/Notification.vue";


  @Component({
    components: {Notification}
  })
  export default class Wizard extends Vue {
    @Prop() readonly title!: string;
    @Prop() readonly steps!: string[];
    @Prop({default: 1}) readonly step!: number;
    @Prop() readonly wait!: boolean;
    @PropSync("alert") _alert!: {title: string; text: string; visible: boolean};

    readonly lastStep = this.steps.length;

    next() {
      this.$emit("next");
    }

    prev() {
      this.$emit("prev");
    }

    done() {
      this.$emit("done");
    }

    cancel() {
      this.$emit("cancel");
    }
  }
</script>

<style scoped>

</style>
