import { Locator, Page } from "@playwright/test";

export class HeaderMenu {
  readonly root: Locator;
  readonly topMenu: Locator;

  constructor(page: Page) {
    this.root = page.locator(".header-menu, .header-menu-wrapper");
    this.topMenu = this.root.locator(".top-menu");
  }

  async openTopMenu(name: string) {
    await this.topMenu.getByRole("link", { name }).first().click();
  }

  async hoverTopMenu(name: string) {
    await this.topMenu.getByRole("link", { name }).first().hover();
  }
}
