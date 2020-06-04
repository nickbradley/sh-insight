<template>
  <v-skeleton-loader type="card" v-if="loading">
  </v-skeleton-loader>
  <v-card v-else>
    <v-card-title>{{title}}</v-card-title>
    <v-card-text>
      <slot></slot>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
  import {Vue, Component, Prop} from "vue-property-decorator";

  @Component
  export default class DashboardGridCard extends Vue {
    @Prop() readonly title!: string;
    @Prop() readonly loading!: boolean;
  }
</script>

<style scoped>

</style>
