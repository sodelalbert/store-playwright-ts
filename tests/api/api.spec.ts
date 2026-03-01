// TODO: change to base-test after implementing API tests in a separate file
import { expect, test } from "../e2e/base-test"; 

test("API test", async ({ httpClient: api }) => {
  const response = await api.get("/search?q=laptop");
  const status = await response.status();
  const text = await response.text();

  expect(status).toBe(200);
  expect(text).toBeDefined();
});
