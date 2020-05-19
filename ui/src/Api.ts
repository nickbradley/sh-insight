import axios, {AxiosInstance, AxiosRequestConfig, Method} from "axios"

export class Api {
  private readonly client: AxiosInstance

  constructor(config?: AxiosRequestConfig) {
    this.client = axios.create(config)
  }

  async execute(method: Method, resource: string, request?: {data?: any; headers?: {[name: string]: string}}) {
    return this.client({
      method,
      url: resource,
      data: request!.data,
      headers: request!.headers
    })
  }
}
