/**
 * TEST 01 BROKEN: Login Positive — Intentionally broken selectors
 * Breaking pattern: name attributes renamed
 */
import { test, expect } from '@playwright/test';

test.describe('Login - Positive Scenarios [BROKEN]', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/web/index.php/auth/login');
  });

  test('TC01-01-BROKEN: Login with renamed name attributes', async ({ page }) => {
    // ❌ "user" instead of "username"
    await page.fill('input[name="user"]', 'Admin');
    // ❌ "pwd" instead of "password"
    await page.fill('input[name="pwd"]', 'admin123');
    // ❌ class instead of type
    await page.click('button.submit-btn');
    
    await expect(page).toHaveURL(/dashboard/);
    await expect(page.locator('h6')).toContainText('Dashboard');
  });

  test('TC01-02-BROKEN: Verify elements with wrong selectors', async ({ page }) => {
    // ❌ "userName" (camelCase)
    await expect(page.locator('input[name="userName"]')).toBeVisible();
    // ❌ "passwd"
    await expect(page.locator('input[name="passwd"]')).toBeVisible();
    // ❌ wrong type value
    await expect(page.locator('button[type="button"]')).toBeVisible();
    // ❌ wrong class
    await expect(page.locator('.orangehrm-login-logo img')).toBeVisible();
  });

  test('TC01-03-BROKEN: Login and verify session with wrong dropdown selector', async ({ page }) => {
    await page.fill('input[name="user_name"]', 'Admin');
    await page.fill('input[name="pass_word"]', 'admin123');
    await page.click('button.login-submit');
    
    // ❌ wrong dropdown class
    const userDropdown = page.locator('.oxd-user-dropdown-trigger');
    await expect(userDropdown).toBeVisible();
    await expect(userDropdown).toContainText('Admin');
  });

  test('TC01-04-BROKEN: Logout with wrong link selector', async ({ page }) => {
    await page.fill('input[name="user"]', 'Admin');
    await page.fill('input[name="password"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForSelector('.oxd-userdropdown-tab');
    
    await page.click('.oxd-userdropdown-tab');
    // ❌ "Sign Out" instead of "Logout"
    await page.click('a:has-text("Sign Out")');
    
    await expect(page).toHaveURL(/login/);
  });
});
