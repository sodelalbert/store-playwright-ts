import { expect, test } from "./base-test";

test("Search for laptop", async ({ homePage }) => {
  await homePage.goto();
  await homePage.headerSearchBox.searchFor("laptop");
});
