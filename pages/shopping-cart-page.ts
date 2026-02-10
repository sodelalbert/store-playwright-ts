import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";
import { CategoryNavigation } from "../components/category-navigation";
import { FooterMenu } from "../components/footer-menu";
import { HeaderLinks } from "../components/header-links";
import { HeaderMenu } from "../components/header-menu";
import { HeaderSearchBox } from "../components/header-search-box";

export class ShoppingCartPage extends BasePage {
  readonly headerSearchBox: HeaderSearchBox;
  readonly headerLinks: HeaderLinks;
  readonly headerMenu: HeaderMenu;
  readonly categoryNavigation: CategoryNavigation;
  readonly footerMenu: FooterMenu;

  readonly pageTitle: Locator;
  readonly cartItems: Locator;
  readonly emptyCartMessage: Locator;
  readonly removeCheckbox: Locator;
  readonly updateCartButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly estimateShippingButton: Locator;
  readonly termsOfServiceCheckbox: Locator;
  readonly checkoutButton: Locator;
  readonly subTotal: Locator;
  readonly shippingCost: Locator;
  readonly tax: Locator;
  readonly orderTotal: Locator;

  constructor(page: Page) {
    super(page);

    this.pageURL = "/cart";

    // Page components objects initialization
    this.headerSearchBox = new HeaderSearchBox(page);
    this.headerLinks = new HeaderLinks(page);
    this.headerMenu = new HeaderMenu(page);
    this.categoryNavigation = new CategoryNavigation(page);
    this.footerMenu = new FooterMenu(page);

    // Shopping cart page specific locators
    this.pageTitle = page.locator(".page-title h1");
    this.cartItems = page.locator(".cart-item-row");
    this.emptyCartMessage = page.locator(".order-summary-content");
    this.removeCheckbox = page.locator('input[name="removefromcart"]');
    this.updateCartButton = page.locator('input[name="updatecart"]');
    this.continueShoppingButton = page.locator(
      'input[name="continueshopping"]',
    );
    this.estimateShippingButton = page.locator("#open-estimate-shipping-popup");
    this.termsOfServiceCheckbox = page.locator("#termsofservice");
    this.checkoutButton = page.locator("#checkout");
    this.subTotal = page.locator(".cart-total-left .product-subtotal");
    this.shippingCost = page.locator(".shipping-cost");
    this.tax = page.locator(".tax-total");
    this.orderTotal = page.locator(".order-total");
  }

  async goto() {
    await this.page.goto(this.pageURL);
  }

  async getCartItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async isCartEmpty(): Promise<boolean> {
    return await this.emptyCartMessage.isVisible();
  }

  async getItemQuantity(index: number): Promise<string> {
    return (
      (await this.cartItems.nth(index).locator(".qty-input").inputValue()) ||
      "0"
    );
  }

  async setItemQuantity(index: number, quantity: number) {
    await this.cartItems
      .nth(index)
      .locator(".qty-input")
      .fill(quantity.toString());
  }

  async getItemName(index: number): Promise<string> {
    return (
      (await this.cartItems
        .nth(index)
        .locator(".product-name")
        .textContent()) || ""
    );
  }

  async getItemPrice(index: number): Promise<string> {
    return (
      (await this.cartItems
        .nth(index)
        .locator(".product-unit-price")
        .textContent()) || ""
    );
  }

  async getItemSubtotal(index: number): Promise<string> {
    return (
      (await this.cartItems
        .nth(index)
        .locator(".product-subtotal")
        .textContent()) || ""
    );
  }

  async removeItem(index: number) {
    await this.cartItems
      .nth(index)
      .locator('input[name="removefromcart"]')
      .check();
  }

  async updateCart() {
    await this.updateCartButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async acceptTermsOfService() {
    await this.termsOfServiceCheckbox.check();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async getOrderTotal(): Promise<string> {
    return (await this.orderTotal.textContent()) || "";
  }
}
