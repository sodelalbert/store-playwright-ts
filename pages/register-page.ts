import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";
import { CategoryNavigation } from "../components/category-navigation";
import { FooterMenu } from "../components/footer-menu";
import { HeaderLinks } from "../components/header-links";
import { HeaderMenu } from "../components/header-menu";
import { HeaderSearchBox } from "../components/header-search-box";

type RegisterData = {
  gender?: "male" | "female";
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export class RegisterPage extends BasePage {
  readonly headerSearchBox: HeaderSearchBox;
  readonly headerLinks: HeaderLinks;
  readonly headerMenu: HeaderMenu;
  readonly categoryNavigation: CategoryNavigation;
  readonly footerMenu: FooterMenu;

  readonly genderMaleRadio: Locator;
  readonly genderFemaleRadio: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly registerButton: Locator;
  readonly registrationResult: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    super(page);

    this.pageURL = "/register";

    // Page components objects initialization
    this.headerSearchBox = new HeaderSearchBox(page);
    this.headerLinks = new HeaderLinks(page);
    this.headerMenu = new HeaderMenu(page);

    this.categoryNavigation = new CategoryNavigation(page);
    this.footerMenu = new FooterMenu(page);

    this.genderMaleRadio = page.locator("#gender-male");
    this.genderFemaleRadio = page.locator("#gender-female");
    this.firstNameInput = page.locator("#FirstName");
    this.lastNameInput = page.locator("#LastName");
    this.emailInput = page.locator("#Email");
    this.passwordInput = page.locator("#Password");
    this.confirmPasswordInput = page.locator("#ConfirmPassword");
    this.registerButton = page.locator("#register-button");
    this.registrationResult = page.locator(".result");
    this.continueButton = page.locator(".register-continue-button");
  }

  async goto() {
    await this.page.goto(this.pageURL);
  }

  async register(data: RegisterData) {
    if (data.gender === "female") {
      await this.genderFemaleRadio.check();
    } else if (data.gender === "male") {
      await this.genderMaleRadio.check();
    }

    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.emailInput.fill(data.email);
    await this.passwordInput.fill(data.password);
    await this.confirmPasswordInput.fill(data.password);
    await this.registerButton.click();
  }
}
