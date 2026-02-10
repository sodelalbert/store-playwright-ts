import { Locator, Page } from "@playwright/test";

export class HeaderLinks {
  readonly root: Locator;
  readonly registerLink: Locator;
  readonly loginLink: Locator;
  readonly accountLink: Locator;
  readonly logoutLink: Locator;
  readonly cartLink: Locator;
  readonly wishlistLink: Locator;

  constructor(page: Page) {
    this.root = page.locator(".header-links");
    this.registerLink = this.root.locator(".ico-register");
    this.loginLink = this.root.locator(".ico-login");
    this.accountLink = this.root.locator(".ico-account");
    this.logoutLink = this.root.locator(".ico-logout");
    this.cartLink = this.root.locator(".ico-cart");
    this.wishlistLink = this.root.locator(".ico-wishlist");
  }

  async openRegister() {
    await this.registerLink.click();
  }

  async openLogin() {
    await this.loginLink.click();
  }

  async openAccount() {
    await this.accountLink.click();
  }

  async openLogout() {
    await this.logoutLink.click();
  }

  async openCart() {
    await this.cartLink.click();
  }

  async openWishlist() {
    await this.wishlistLink.click();
  }
}
