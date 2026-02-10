import { Locator, Page } from "@playwright/test";

export class CategoryNavigation {
  readonly root: Locator;
  readonly list: Locator;

  constructor(page: Page) {
    this.root = page.locator(".block-category-navigation");
    this.list = this.root.locator(".listbox");
  }

  async openCategory(name: string) {
    await this.list.getByRole("link", { name }).first().click();
  }
}
