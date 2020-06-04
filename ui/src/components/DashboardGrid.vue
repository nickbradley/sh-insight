<template>
  <v-container  fluid>
    <v-row>
      <v-col cols="4">
        <dashboard-grid-card title="Command Usage" :loading="loading">
          <template>
            <v-data-table
              :headers="[{text: 'Command', value: 'command'}, {text: 'Count', value: 'count'}]"
              :items="commandUsage"
              :sort-by="['count']"
              :sort-desc="[true]"
            ></v-data-table>
          </template>
        </dashboard-grid-card>
      </v-col>
      <v-col cols="4">
        <dashboard-grid-card
          title="Alias Usage"
          :loading="loading"
        >
          <template>
            <v-data-table
              :headers="[{text: 'Name', value: 'name'}, {text: 'Count', value: 'count'}]"
              :items="aliasUsage"
              :sort-by="['count']"
              :sort-desc="[true]"
              item-key="name"
              show-expand
            >
              <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length"> {{ item.definition }}</td>
              </template>
            </v-data-table>
          </template>
        </dashboard-grid-card>
      </v-col>

      <v-col cols="4">
        <dashboard-grid-card
          title="Command Pairs"
          :loading="loading"
          >
          <template>
            <v-data-table
              :headers="[{text: 'Commands', value: 'sequence'}, {text: 'Count', value: 'occurrences'}]"
              :items="commandPairs"
              :sort-by="['occurrences']"
              :sort-desc="[true]"
              item-key="name"
            ></v-data-table>
          </template>
        </dashboard-grid-card>
      </v-col>

      <v-col cols="4">
        <dashboard-grid-card
          title="Command Triplets"
          :loading="loading"
        >
          <template>
            <v-data-table
              :headers="[{text: 'Commands', value: 'sequence'}, {text: 'Count', value: 'occurrences'}]"
              :items="commandTriplets"
              :sort-by="['occurrences']"
              :sort-desc="[true]"
              item-key="name"
            ></v-data-table>
          </template>
        </dashboard-grid-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
  import {Vue, Component, Prop} from "vue-property-decorator";
  import DashboardGridCard from "@/components/DashboardGridCard.vue";
  import {DashboardData} from "@common/Types";

  @Component({
    components: {
      DashboardGridCard
    }
  })
  export default class DashboardGrid extends Vue {
    @Prop() readonly dashboardData!: DashboardData | null;

    get loading() {
      return this.dashboardData === null;
    }

    get aliasUsage () {
      return this.dashboardData ? this.dashboardData.aliasUsage : [];
    }

    get commandUsage () {
      return this.dashboardData ? this.dashboardData.commandUsage : [];
    }

    get commandPairs () {
      return this.dashboardData ? this.dashboardData.commandPairs.map((v: any) => ({...v, ...{sequence: v.sequence.join(" > ")}})) : [];
    }

    get commandTriplets () {
      return this.dashboardData ? this.dashboardData.commandTriplets.map((v: any) => ({...v, ...{sequence: v.sequence.join(" > ")}})) : [];
    }

  }
</script>

<style scoped>

</style>
