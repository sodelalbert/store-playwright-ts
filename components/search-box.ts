import { Locator, Page } from "@playwright/test";

export class SearchBox {
  readonly root: Locator;
  readonly input: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.root = page.locator(".search-box");
    this.input = this.root.locator("#small-searchterms");
    this.submitButton = this.root.locator('input[type="submit"], button[type="submit"]');
  }

  async searchFor(term: string) {
    await this.input.fill(term);
    await this.submitButton.click();
  }
}
