import { Locator, Page } from "@playwright/test";

export class PopularTags {
  readonly root: Locator;
  readonly list: Locator;
  readonly viewAllLink: Locator;

  constructor(page: Page) {
    this.root = page.locator(".block-popular-tags");
    this.list = this.root.locator(".listbox");
    this.viewAllLink = this.root.getByRole("link", { name: "View all" });
  }

  async openTag(name: string) {
    await this.list.getByRole("link", { name }).first().click();
  }

  async viewAll() {
    await this.viewAllLink.click();
  }
}
