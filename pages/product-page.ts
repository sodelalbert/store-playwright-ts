import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";
import { CategoryNavigation } from "../components/category-navigation";
import { FooterMenu } from "../components/footer-menu";
import { HeaderLinks } from "../components/header-links";
import { HeaderMenu } from "../components/header-menu";
import { HeaderSearchBox } from "../components/header-search-box";
import { ManufacturersNavigation } from "../components/manufacturers-navigation";
import { NewsletterInput } from "../components/newsletter-input";
import { PopularTags } from "../components/popular-tags";

export class ProductPage extends BasePage {
  readonly headerSearchBox: HeaderSearchBox;
  readonly headerLinks: HeaderLinks;
  readonly headerMenu: HeaderMenu;
  readonly categoryNavigation: CategoryNavigation;
  readonly manufacturersNavigation: ManufacturersNavigation;
  readonly popularTags: PopularTags;
  readonly newsletterInput: NewsletterInput;
  readonly footerMenu: FooterMenu;

  readonly productName: Locator;
  readonly productSku: Locator;
  readonly stockAvailability: Locator;
  readonly productPrice: Locator;
  readonly shortDescription: Locator;
  readonly fullDescription: Locator;
  readonly mainProductImage: Locator;
  readonly productThumbnails: Locator;
  readonly quantityInput: Locator;
  readonly addToCartButton: Locator;
  readonly addToWishlistButton: Locator;
  readonly addToCompareListButton: Locator;
  readonly emailAFriendButton: Locator;
  readonly productReviewsOverview: Locator;

  constructor(page: Page) {
    super(page);

    this.pageURL = "";

    // Page components objects initialization
    this.headerSearchBox = new HeaderSearchBox(page);
    this.headerLinks = new HeaderLinks(page);
    this.headerMenu = new HeaderMenu(page);

    this.categoryNavigation = new CategoryNavigation(page);
    this.manufacturersNavigation = new ManufacturersNavigation(page);
    this.popularTags = new PopularTags(page);

    this.newsletterInput = new NewsletterInput(page);
    this.footerMenu = new FooterMenu(page);

    // Product page specific locators
    this.productName = page.locator(".product-name h1");
    this.productSku = page.locator(".sku .value");
    this.stockAvailability = page.locator(".stock .value");
    this.productPrice = page.locator(".product-price .price-value-5");
    this.shortDescription = page.locator(".short-description");
    this.fullDescription = page.locator(".full-description");
    this.mainProductImage = page.locator(".picture img");
    this.productThumbnails = page.locator(".picture-thumbs a");
    this.quantityInput = page.locator(".qty-input");
    this.addToCartButton = page.locator("#add-to-cart-button-5");
    this.addToWishlistButton = page.locator("#add-to-wishlist-button-5");
    this.addToCompareListButton = page.locator("#add-to-compare-list-button-5");
    this.emailAFriendButton = page.locator(".email-a-friend-button");
    this.productReviewsOverview = page.locator(".product-reviews-overview");
  }

  async gotoProduct(productUrl: string) {
    await this.page.goto(productUrl);
  }

  async getProductName(): Promise<string> {
    return (await this.productName.textContent()) || "";
  }

  async getSku(): Promise<string> {
    return (await this.productSku.textContent()) || "";
  }

  async getPrice(): Promise<string> {
    return (await this.productPrice.textContent()) || "";
  }

  async getStockStatus(): Promise<string> {
    return (await this.stockAvailability.textContent()) || "";
  }

  async setQuantity(quantity: number) {
    await this.quantityInput.fill(quantity.toString());
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async addToWishlist() {
    await this.addToWishlistButton.click();
  }

  async addToCompareList() {
    await this.addToCompareListButton.click();
  }

  async emailAFriend() {
    await this.emailAFriendButton.click();
  }

  async selectThumbnail(index: number) {
    await this.productThumbnails.nth(index).click();
  }
}
