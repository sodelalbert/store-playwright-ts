import { Page } from "@playwright/test";

export abstract class BasePage {
  readonly page: Page;
  protected pageURL: string;

  constructor(page: Page) {
    this.page = page;
    this.pageURL = "";
  }

  goto?(): Promise<void>;
  
}
