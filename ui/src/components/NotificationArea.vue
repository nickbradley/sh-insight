<template>
  <div>
    <v-alert
      v-for="(notification, index) in _notifications"
      :type="notification.type"
      :key="notification.id"
      :dismissible="true"
      @input="dismiss(index)">
      {{ notification.message }}
    </v-alert>
  </div>
</template>

<script lang="ts">
  import "reflect-metadata"
  import {Vue, Component, PropSync} from 'vue-property-decorator'

  export interface Notification {
    id: number;
    type: string;
    message: string;
  }

  @Component
  export default class NotificationArea extends Vue {
    @PropSync("notifications", {default: () => []}) readonly _notifications!: Notification[]

    dismiss(index: number) {
      this._notifications.splice(index, 1);
    }
  }
</script>

<style scoped>

</style>
