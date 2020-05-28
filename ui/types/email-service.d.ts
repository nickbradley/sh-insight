import Vue from 'vue'
import {EmailService} from '@/services/EmailService'

declare module 'vue/types/vue' {
  interface Vue {
    $emailService: EmailService
  }
}
