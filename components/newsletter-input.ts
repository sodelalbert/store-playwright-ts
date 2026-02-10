import { Locator, Page } from "@playwright/test";

export class NewsletterInput {
  readonly root: Locator;
  readonly emailInput: Locator;
  readonly subscribeButton: Locator;

  constructor(page: Page) {
    this.root = page.locator(".block-newsletter");
    this.emailInput = this.root.locator("#newsletter-email");
    this.subscribeButton = this.root.locator("#newsletter-subscribe-button");
  }

  async subscribe(email: string) {
    await this.emailInput.fill(email);
    await this.subscribeButton.click();
  }
}
