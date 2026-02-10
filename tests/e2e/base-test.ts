import { test as base } from "@playwright/test";
import { HomePage } from "../../pages/home-page";
import { LoginPage } from "../../pages/login-page";
import { ProductPage } from "../../pages/product-page";
import { RegisterPage } from "../../pages/register-page";
import { SearchResultPage } from "../../pages/search-result-page";
import { ShoppingCartPage } from "../../pages/shopping-cart-page";

type myFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  productPage: ProductPage;
  registerPage: RegisterPage;
  searchResultPage: SearchResultPage;
  shoppingCartPage: ShoppingCartPage;
};

export const test = base.extend<myFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
  searchResultPage: async ({ page }, use) => {
    await use(new SearchResultPage(page));
  },
  shoppingCartPage: async ({ page }, use) => {
    await use(new ShoppingCartPage(page));
  },
});

export { expect } from "@playwright/test";
