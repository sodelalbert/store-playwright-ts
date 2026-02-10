import { Locator, Page } from "@playwright/test";

export class ManufacturersNavigation {
  readonly root: Locator;
  readonly list: Locator;

  constructor(page: Page) {
    this.root = page.locator(".block-manufacturer-navigation");
    this.list = this.root.locator(".listbox");
  }

  async openManufacturer(name: string) {
    await this.list.getByRole("link", { name }).first().click();
  }
}
