import { expect, test } from "./base-test";

const generateUniqueEmail = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `testuser${timestamp}${random}@example.com`;
};

test.describe("User Registration", () => {
  test("should successfully register a new user with all valid data", async ({
    registerPage,
  }) => {
    const testEmail = generateUniqueEmail();
    const testPassword = "SecurePass@123";

    await registerPage.goto();

    await registerPage.register({
      gender: "male",
      firstName: "John",
      lastName: "Doe",
      email: testEmail,
      password: testPassword,
    });

    // Verify successful registration message
    await expect(registerPage.registrationResult).toBeVisible();
    await expect(registerPage.registrationResult).toContainText(
      "Your registration completed",
    );

    // Verify navigation shows continue button
    await expect(registerPage.continueButton).toBeVisible();

    // Verify user is logged in
    await registerPage.continueButton.click();
    await expect(registerPage.headerLinks.accountLink).toBeVisible();
    await expect(registerPage.headerLinks.logoutLink).toBeVisible();
  });

  test("should show validation error when first name is missing", async ({
    registerPage,
  }) => {
    const testEmail = generateUniqueEmail();
    const testPassword = "SecurePass@123";

    await registerPage.goto();

    // Leave first name empty
    await registerPage.lastNameInput.fill("Doe");
    await registerPage.emailInput.fill(testEmail);
    await registerPage.passwordInput.fill(testPassword);
    await registerPage.confirmPasswordInput.fill(testPassword);
    await registerPage.registerButton.click();

    // Verify validation error for first name
    const firstNameError = registerPage.page.locator(
      "#FirstName-error, .field-validation-error[data-valmsg-for='FirstName']",
    );
    await expect(firstNameError).toBeVisible();
    await expect(firstNameError).toContainText(/First name is required/i);
  });

  test("should show validation error when last name is missing", async ({
    registerPage,
  }) => {
    const testEmail = generateUniqueEmail();
    const testPassword = "SecurePass@123";

    await registerPage.goto();

    await registerPage.firstNameInput.fill("John");
    // Leave last name empty
    await registerPage.emailInput.fill(testEmail);
    await registerPage.passwordInput.fill(testPassword);
    await registerPage.confirmPasswordInput.fill(testPassword);
    await registerPage.registerButton.click();

    // Verify validation error for last name
    const lastNameError = registerPage.page.locator(
      "#LastName-error, .field-validation-error[data-valmsg-for='LastName']",
    );
    await expect(lastNameError).toBeVisible();
    await expect(lastNameError).toContainText(/Last name is required/i);
  });

  test("should show validation error for invalid email format", async ({
    registerPage,
  }) => {
    const testPassword = "SecurePass@123";

    await registerPage.goto();

    await registerPage.firstNameInput.fill("John");
    await registerPage.lastNameInput.fill("Doe");
    // Use invalid email format
    await registerPage.emailInput.fill("invalid-email-format");
    await registerPage.passwordInput.fill(testPassword);
    await registerPage.confirmPasswordInput.fill(testPassword);
    await registerPage.registerButton.click();

    // Verify validation error for email
    const emailError = registerPage.page.locator(
      "#Email-error, .field-validation-error[data-valmsg-for='Email']",
    );
    await expect(emailError).toBeVisible();
    await expect(emailError).toContainText(/Wrong email/i);
  });

  test("should show validation error when password does not meet requirements", async ({
    registerPage,
  }) => {
    const testEmail = generateUniqueEmail();
    const weakPassword = "12345"; // Too short

    await registerPage.goto();

    await registerPage.firstNameInput.fill("John");
    await registerPage.lastNameInput.fill("Doe");
    await registerPage.emailInput.fill(testEmail);
    await registerPage.passwordInput.fill(weakPassword);
    await registerPage.confirmPasswordInput.fill(weakPassword);
    await registerPage.registerButton.click();

    // Verify validation error for password
    const passwordError = registerPage.page.locator(
      "#Password-error, .field-validation-error[data-valmsg-for='Password']",
    );

    // Check if error is visible (password requirements vary by site)
    const errorVisible = await passwordError.isVisible();

    if (errorVisible) {
      // Verify error message contains password requirement info
      await expect(passwordError).toContainText(
        /must have at least|minimum|characters/i,
      );
    } else {
      // Some sites may show validation summary
      const validationSummary = registerPage.page.locator(
        ".validation-summary-errors",
      );
      await expect(validationSummary).toBeVisible();
    }
  });

  test("should show validation error when passwords do not match", async ({
    registerPage,
  }) => {
    const testEmail = generateUniqueEmail();
    const password1 = "SecurePass@123";
    const password2 = "DifferentPass@456";

    await registerPage.goto();

    await registerPage.firstNameInput.fill("John");
    await registerPage.lastNameInput.fill("Doe");
    await registerPage.emailInput.fill(testEmail);
    await registerPage.passwordInput.fill(password1);
    await registerPage.confirmPasswordInput.fill(password2);
    await registerPage.registerButton.click();

    // Verify validation error for password confirmation
    const confirmPasswordError = registerPage.page.locator(
      "#ConfirmPassword-error, .field-validation-error[data-valmsg-for='ConfirmPassword']",
    );
    await expect(confirmPasswordError).toBeVisible();
    await expect(confirmPasswordError).toContainText(
      /do not match|must match/i,
    );
  });
});
