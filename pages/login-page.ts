import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";
import { CategoryNavigation } from "../components/category-navigation";
import { FooterMenu } from "../components/footer-menu";
import { HeaderLinks } from "../components/header-links";
import { HeaderMenu } from "../components/header-menu";
import { HeaderSearchBox } from "../components/header-search-box";

type LoginData = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export class LoginPage extends BasePage {
  readonly headerSearchBox: HeaderSearchBox;
  readonly headerLinks: HeaderLinks;
  readonly headerMenu: HeaderMenu;
  readonly categoryNavigation: CategoryNavigation;
  readonly footerMenu: FooterMenu;

  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly loginButton: Locator;
  readonly errorSummary: Locator;

  constructor(page: Page) {
    super(page);

    this.pageURL = "/login";

    // Page components objects initialization
    this.headerSearchBox = new HeaderSearchBox(page);
    this.headerLinks = new HeaderLinks(page);
    this.headerMenu = new HeaderMenu(page);

    this.categoryNavigation = new CategoryNavigation(page);
    this.footerMenu = new FooterMenu(page);

    this.emailInput = page.locator("#Email");
    this.passwordInput = page.locator("#Password");
    this.rememberMeCheckbox = page.locator("#RememberMe");
    this.loginButton = page.locator(
      '.login-button, input[type="submit"][value="Log in"]',
    );
    this.errorSummary = page.locator(".validation-summary-errors");
  }

  async goto() {
    await this.page.goto(this.pageURL);
  }

  async login(data: LoginData) {
    await this.emailInput.fill(data.email);
    await this.passwordInput.fill(data.password);

    if (data.rememberMe) {
      await this.rememberMeCheckbox.check();
    }

    await this.loginButton.click();
  }
}
