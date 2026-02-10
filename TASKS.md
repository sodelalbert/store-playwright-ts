# Tasks to be implemented

- [x] Make sure that tests are opening base URL from config and not hardcoded in tests.
- [x] Create Base Test class
- [x] Create HomePage class and use it in tests instead of page object.
- [x] Create BasePage class and use it in HomePage instead of Page object.

- [ ] Test tags
- [ ] Backedn tests implementation.
- [ ] Configurations for prod and staging environments.

- POM Implementation
  - [x] HomePage
  - [ ] Register Page
  - [ ] Login Page
  - [ ] Search Results Page <https://demowebshop.tricentis.com/search?q=laptop>
  - [ ] Product Page <https://demowebshop.tricentis.com/141-inch-laptop>
  - [ ] Wishlist Page
  - [ ] Shoping Cart Page

---

- [ ] Write about static code analysis in docs - this should be documented what and how it works (in details).
  - [ ] Fix it first 😊
- [ ] Create serious POM structure for the tests.
  - Pages to be created as composition of components or layouts.
  - Components to be reused across pages.
  - Base classes to be abstracted (BaseTest)
- [ ] Use Playwright expects instad of plain asserts.
- [ ] Environemtns split <https://playwright.dev/docs/test-projects#configure-projects-for-multiple-environments>
- [ ] Smoke test definition and implementation.

```typescript
import { test, expect } from "@playwright/test";

test(
  "user can log in",
  {
    tag: "@smoke",
  },
  async ({ page }) => {
    await page.goto("/login");
    await expect(page).toHaveTitle(/Login/);
  },
);
```

Modeling tags for tests might be usefull

```typescript
export const TAGS = {
  SMOKE: "@smoke",
  REGRESSION: "@regression",
  CRITICAL: "@critical",
};
```

## References

- [Test annotations with issue ID](https://playwright.dev/docs/test-annotations#annotate-tests)
- [Environment configuration split](https://playwright.dev/docs/test-projects#configure-projects-for-multiple-environments)
