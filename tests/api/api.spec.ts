import { expect, test } from "../e2e/base-test";

test("API test", async ({ httpClient }) => {
  const response = await httpClient.get("/search?q=laptop");
  const status = await response.status();
  const text = await response.text();

  expect(status).toBe(200);
  expect(text).toBeDefined();
});
