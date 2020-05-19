import {Api} from "@/Api";

export class EmailService {
  private readonly api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  async post(contactForm: {email: string; contact: boolean; submissionId: string}) {
    const request = {
      data: contactForm,
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const res = await this.api.execute('post', '/email', request);
  }
}
