import { test as base } from "@playwright/test";
import { HomePage } from "../../pages/home-page";

type myFixtures = {
  homePage: HomePage;
};

export const test = base.extend<myFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
});

export { expect } from "@playwright/test";
