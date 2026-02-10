import { Locator, Page } from "@playwright/test";

export class FooterMenu {
  readonly root: Locator;
  readonly columns: Locator;

  constructor(page: Page) {
    this.root = page.locator(".footer");
    this.columns = this.root.locator(".column");
  }

  async openLink(sectionTitle: string, linkText: string) {
    await this.section(sectionTitle).getByRole("link", { name: linkText }).first().click();
  }

  section(sectionTitle: string) {
    return this.columns.filter({
      has: this.root.getByRole("heading", { name: sectionTitle }),
    }).first();
  }
}
