<template>
  <v-card>
    <v-card-title> {{ title }} </v-card-title>
    <v-card-text> {{ text }}</v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <slot></slot>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
  import {Vue, Component, Prop} from "vue-property-decorator";

  @Component
  export default class Notification extends Vue {
    @Prop() readonly title!: string;
    @Prop() readonly text!: string;
  }
</script>

<style scoped>

</style>
