const { test, expect } = require("@playwright/test");

test("Login functionality", async ({ page }) => {
  await page.goto("http://localhost:3000");

  const navbarLoginButton = page.locator("button", { hasText: "Login" }); // locate login button

  await navbarLoginButton.click(); // click button

  const emailInput = page.locator("[aria-label='email-input']");
  const passwordInput = page.locator("[aria-label='password-input']");
  const loginButton = page.locator("[aria-label='login-button']");

  // missing fields
  await loginButton.click();
  await expect(page).toHaveURL("/user/login?from=%2F");
  await expect(page.locator('"Missing fields"')).toBeVisible();

  // login
  await emailInput.fill("test@test.com");
  await passwordInput.fill("123456");
  await loginButton.click();
  await expect(page).toHaveURL("/");

  // email verify modal
  await expect(page.locator('"Verify Email"')).toBeVisible();
});
