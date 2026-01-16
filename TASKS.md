# Tasks to be implemented

- [ ] Write about static code analysis in docs - this should be documented what and how it works (in details).
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
  }
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

- [ ] Data driven tests implementation.

## References

- [Test annotations with issue ID](https://playwright.dev/docs/test-annotations#annotate-tests)
- [Environment configuration split](https://playwright.dev/docs/test-projects#configure-projects-for-multiple-environments)
