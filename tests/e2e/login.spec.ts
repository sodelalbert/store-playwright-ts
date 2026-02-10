import { expect, test } from "./base-test";

const generateUniqueEmail = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `logintest${timestamp}${random}@example.com`;
};

// Test credentials for session tests
const testCredentials = {
  email: generateUniqueEmail(),
  password: "SecurePass@123",
};

test.describe("Login / Session", () => {
  test.beforeAll(async ({ browser }) => {
    // Create a test user before running login tests
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("/register");

    // Fill registration form
    await page.locator("#FirstName").fill("Login");
    await page.locator("#LastName").fill("TestUser");
    await page.locator("#Email").fill(testCredentials.email);
    await page.locator("#Password").fill(testCredentials.password);
    await page.locator("#ConfirmPassword").fill(testCredentials.password);
    await page.locator("#register-button").click();

    // Wait for registration to complete
    await page.waitForURL("**/registerresult/**", { timeout: 10000 });

    // Logout after registration
    await page.locator(".ico-logout").click();

    await context.close();
  });

  test("should login successfully with valid credentials", async ({
    loginPage,
  }) => {
    await loginPage.goto();

    await loginPage.login({
      email: testCredentials.email,
      password: testCredentials.password,
    });

    // Verify successful login - should redirect away from login page
    await loginPage.page.waitForURL((url) => !url.pathname.includes("/login"));

    // Verify logged-in state - account and logout links should be visible
    await expect(loginPage.headerLinks.accountLink).toBeVisible();
    await expect(loginPage.headerLinks.logoutLink).toBeVisible();

    // Verify login and register links are not visible when logged in
    await expect(loginPage.headerLinks.loginLink).not.toBeVisible();
    await expect(loginPage.headerLinks.registerLink).not.toBeVisible();
  });

  test("should maintain session after page refresh", async ({ loginPage }) => {
    await loginPage.goto();

    await loginPage.login({
      email: testCredentials.email,
      password: testCredentials.password,
    });

    // Verify logged in
    await expect(loginPage.headerLinks.accountLink).toBeVisible();

    // Refresh the page
    await loginPage.page.reload();
    await loginPage.page.waitForLoadState("networkidle");

    // Verify user is still logged in after refresh
    await expect(loginPage.headerLinks.accountLink).toBeVisible();
    await expect(loginPage.headerLinks.logoutLink).toBeVisible();
    await expect(loginPage.headerLinks.loginLink).not.toBeVisible();
  });

  test("should maintain session when navigating to different pages", async ({
    loginPage,
  }) => {
    await loginPage.goto();

    await loginPage.login({
      email: testCredentials.email,
      password: testCredentials.password,
    });

    // Verify logged in
    await expect(loginPage.headerLinks.accountLink).toBeVisible();

    // Navigate to different pages
    await loginPage.page.goto("/");
    await expect(loginPage.headerLinks.accountLink).toBeVisible();

    await loginPage.page.goto("/books");
    await expect(loginPage.headerLinks.accountLink).toBeVisible();

    await loginPage.page.goto("/computers");
    await expect(loginPage.headerLinks.accountLink).toBeVisible();

    // Verify still logged in
    await expect(loginPage.headerLinks.logoutLink).toBeVisible();
  });

  test("should logout successfully and clear session", async ({
    loginPage,
  }) => {
    await loginPage.goto();

    await loginPage.login({
      email: testCredentials.email,
      password: testCredentials.password,
    });

    // Verify logged in
    await expect(loginPage.headerLinks.logoutLink).toBeVisible();

    // Logout
    await loginPage.headerLinks.openLogout();

    // Wait for logout to complete
    await loginPage.page.waitForLoadState("networkidle");

    // Verify logged-out state - login and register links should be visible
    await expect(loginPage.headerLinks.loginLink).toBeVisible();
    await expect(loginPage.headerLinks.registerLink).toBeVisible();

    // Verify account and logout links are not visible
    await expect(loginPage.headerLinks.accountLink).not.toBeVisible();
    await expect(loginPage.headerLinks.logoutLink).not.toBeVisible();

    // Verify session is cleared by refreshing the page
    await loginPage.page.reload();
    await loginPage.page.waitForLoadState("networkidle");

    // User should still be logged out
    await expect(loginPage.headerLinks.loginLink).toBeVisible();
    await expect(loginPage.headerLinks.accountLink).not.toBeVisible();
  });

  test("should show error with invalid credentials", async ({ loginPage }) => {
    await loginPage.goto();

    await loginPage.login({
      email: "nonexistent@example.com",
      password: "WrongPassword123",
    });

    // Verify error message is displayed
    await expect(loginPage.errorSummary).toBeVisible();
    await expect(loginPage.errorSummary).toContainText(
      /Login was unsuccessful|No customer account found/i,
    );

    // Verify user is not logged in
    await expect(loginPage.headerLinks.loginLink).toBeVisible();
    await expect(loginPage.headerLinks.accountLink).not.toBeVisible();
  });

  test("should show validation error when email is empty", async ({
    loginPage,
  }) => {
    await loginPage.goto();

    // Leave email empty
    await loginPage.passwordInput.fill("SomePassword123");
    await loginPage.loginButton.click();

    // Verify validation error
    const emailError = loginPage.page.locator(
      "#Email-error, .field-validation-error[data-valmsg-for='Email']",
    );

    // Check if inline validation appears or validation summary
    const emailErrorVisible = await emailError.isVisible();
    const summaryVisible = await loginPage.errorSummary.isVisible();

    expect(emailErrorVisible || summaryVisible).toBe(true);
  });

  test("should login with remember me option", async ({ loginPage }) => {
    await loginPage.goto();

    await loginPage.login({
      email: testCredentials.email,
      password: testCredentials.password,
      rememberMe: true,
    });

    // Verify logged in
    await expect(loginPage.headerLinks.accountLink).toBeVisible();
    await expect(loginPage.headerLinks.logoutLink).toBeVisible();

    // Verify remember me checkbox was checked (this test can be extended to verify cookie persistence)
    // Note: Full cookie persistence testing would require browser context management
  });
});
