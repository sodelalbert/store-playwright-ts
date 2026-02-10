import { Locator, Page } from "@playwright/test";

export class SearchInput {
  readonly root: Locator;
  readonly searchTermInput: Locator;
  readonly advancedSearchCheckbox: Locator;
  readonly categoryDropdown: Locator;
  readonly automaticallySearchSubCategoriesCheckbox: Locator;
  readonly manufacturerDropdown: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    this.root = page.locator(".search-input");
    this.searchTermInput = page.locator("#Q");
    this.advancedSearchCheckbox = page.locator("#As");
    this.categoryDropdown = page.locator("#Cid");
    this.automaticallySearchSubCategoriesCheckbox = page.locator("#Isc");
    this.manufacturerDropdown = page.locator("#Mid");
    this.searchButton = page.locator('input[type="submit"][value="Search"]');
  }

  async search(term: string) {
    await this.searchTermInput.fill(term);
    await this.searchButton.click();
  }

  async enableAdvancedSearch() {
    await this.advancedSearchCheckbox.check();
  }

  async disableAdvancedSearch() {
    await this.advancedSearchCheckbox.uncheck();
  }

  async selectCategory(category: string) {
    await this.categoryDropdown.selectOption({ label: category });
  }

  async selectManufacturer(manufacturer: string) {
    await this.manufacturerDropdown.selectOption({ label: manufacturer });
  }

  async enableSearchSubCategories() {
    await this.automaticallySearchSubCategoriesCheckbox.check();
  }

  async disableSearchSubCategories() {
    await this.automaticallySearchSubCategoriesCheckbox.uncheck();
  }

  async advancedSearch(options: {
    term: string;
    category?: string;
    manufacturer?: string;
    searchSubCategories?: boolean;
  }) {
    await this.searchTermInput.fill(options.term);
    await this.enableAdvancedSearch();

    if (options.category) {
      await this.selectCategory(options.category);
    }

    if (options.manufacturer) {
      await this.selectManufacturer(options.manufacturer);
    }

    if (options.searchSubCategories !== undefined) {
      if (options.searchSubCategories) {
        await this.enableSearchSubCategories();
      } else {
        await this.disableSearchSubCategories();
      }
    }

    await this.searchButton.click();
  }
}
