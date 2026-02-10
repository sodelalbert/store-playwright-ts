import { expect, test } from "./base-test";

test("Search for laptop", async ({ homePage }) => {
  await homePage.goto();
  await homePage.searchBox.searchFor("laptop");

  // Expect a title "to contain" a substring.
  await expect(homePage.page).toHaveTitle(/Demo Web Shop/);
});
