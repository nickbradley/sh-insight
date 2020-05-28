import Vue from 'vue'
import {ReportService} from '@/services/ReportService'

declare module 'vue/types/vue' {
  interface Vue {
    $reportService: ReportService
  }
}
