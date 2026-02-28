import { APIRequestContext } from "@playwright/test";

class HttpClient {
  private request: APIRequestContext;
  private baseURL: string;

  constructor(request: APIRequestContext, baseURL?: string) {
    this.request = request;
    this.baseURL = baseURL || this.getBaseURLFromEnv();
  }

  private getBaseURLFromEnv(): string {
    return process.env.API_BASE_URL || "";
  }

  async get(
    endpoint: string,
    options?: Parameters<APIRequestContext["get"]>[1],
  ) {
    const response = await this.request.get(
      `${this.baseURL}${endpoint}`,
      options,
    );
    return response;
  }

  async post(
    endpoint: string,
    options?: Parameters<APIRequestContext["post"]>[1],
  ) {
    const response = await this.request.post(
      `${this.baseURL}${endpoint}`,
      options,
    );
    return response;
  }

  async put(
    endpoint: string,
    options?: Parameters<APIRequestContext["put"]>[1],
  ) {
    const response = await this.request.put(
      `${this.baseURL}${endpoint}`,
      options,
    );
    return response;
  }

  async patch(
    endpoint: string,
    options?: Parameters<APIRequestContext["patch"]>[1],
  ) {
    const response = await this.request.patch(
      `${this.baseURL}${endpoint}`,
      options,
    );
    return response;
  }
}

export default HttpClient;
