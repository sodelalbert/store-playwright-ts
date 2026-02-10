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
import { ProductItem } from "../components/product-item";
import { SearchInput } from "../components/search-input";

export class SearchResultPage extends BasePage {
  readonly headerSearchBox: HeaderSearchBox;
  readonly headerLinks: HeaderLinks;
  readonly headerMenu: HeaderMenu;
  readonly categoryNavigation: CategoryNavigation;
  readonly manufacturersNavigation: ManufacturersNavigation;
  readonly popularTags: PopularTags;
  readonly searchInput: SearchInput;
  readonly newsletterInput: NewsletterInput;
  readonly footerMenu: FooterMenu;

  readonly searchResultsTitle: Locator;
  readonly searchTermInfo: Locator;
  readonly productGrid: Locator;
  readonly productItems: Locator;
  readonly noResultsMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.pageURL = "/search";

    // Page components objects initialization
    this.headerSearchBox = new HeaderSearchBox(page);
    this.headerLinks = new HeaderLinks(page);
    this.headerMenu = new HeaderMenu(page);

    this.categoryNavigation = new CategoryNavigation(page);
    this.manufacturersNavigation = new ManufacturersNavigation(page);
    this.popularTags = new PopularTags(page);

    this.searchInput = new SearchInput(page);
    this.newsletterInput = new NewsletterInput(page);
    this.footerMenu = new FooterMenu(page);

    // Search results page specific locators
    this.searchResultsTitle = page.locator(".page-title");
    this.searchTermInfo = page.locator(".search-results strong");
    this.productGrid = page.locator(".product-grid");
    this.productItems = this.productGrid.locator(".product-item");
    this.noResultsMessage = page.locator(".no-result");
  }

  async goto() {
    await this.page.goto(this.pageURL);
  }

  async getProductCount(): Promise<number> {
    return await this.productItems.count();
  }

  getProduct(index: number): ProductItem {
    return new ProductItem(this.productItems.nth(index));
  }

  getProductById(productId: string): ProductItem {
    return new ProductItem(
      this.productGrid.locator(`[data-productid="${productId}"]`),
    );
  }

  async getAllProducts(): Promise<ProductItem[]> {
    const count = await this.getProductCount();
    const products: ProductItem[] = [];
    for (let i = 0; i < count; i++) {
      products.push(this.getProduct(i));
    }
    return products;
  }

  getProductByName(name: string, index: number = 0): ProductItem {
    const matchingProduct = this.productItems
      .filter({
        has: this.page.locator(".product-title a", { hasText: name }),
      })
      .nth(index);
    return new ProductItem(matchingProduct);
  }

  async getProductCountByName(name: string): Promise<number> {
    return await this.productItems
      .filter({
        has: this.page.locator(".product-title a", { hasText: name }),
      })
      .count();
  }
}
