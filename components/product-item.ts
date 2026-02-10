import { Locator } from "@playwright/test";

export class ProductItem {
  readonly root: Locator;
  readonly title: Locator;
  readonly titleLink: Locator;
  readonly price: Locator;
  readonly image: Locator;
  readonly addToCartButton: Locator;
  readonly addToWishlistButton: Locator;
  readonly addToCompareButton: Locator;

  constructor(productItemLocator: Locator) {
    this.root = productItemLocator;
    this.title = this.root.locator(".product-title");
    this.titleLink = this.title.locator("a");
    this.price = this.root.locator(".price");
    this.image = this.root.locator(".picture img");
    this.addToCartButton = this.root.locator('input[value="Add to cart"]');
    this.addToWishlistButton = this.root.locator(
      'input[value="Add to wishlist"]',
    );
    this.addToCompareButton = this.root.locator(
      'input[value="Add to compare list"]',
    );
  }

  async getProductId(): Promise<string | null> {
    return await this.root.getAttribute("data-productid");
  }

  async getTitle(): Promise<string> {
    return (await this.titleLink.textContent()) || "";
  }

  async getPrice(): Promise<string> {
    return (await this.price.textContent()) || "";
  }

  async open() {
    await this.titleLink.click();
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async addToWishlist() {
    await this.addToWishlistButton.click();
  }

  async addToCompare() {
    await this.addToCompareButton.click();
  }
}
