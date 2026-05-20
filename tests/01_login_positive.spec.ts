/**
 * TEST 01: Login Positive — Using NAME attribute selectors
 * Verifies successful login with valid credentials.
 */
import { test, expect } from '@playwright/test';

test.describe('Login - Positive Scenarios', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/web/index.php/auth/login');
  });

  test('TC01-01: Valid login with Admin credentials', async ({ page }) => {
    await page.fill('input[name="username"]', 'Admin');
    await page.fill('input[name="password"]', 'admin123');
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL(/dashboard/);
    await expect(page.locator('h6')).toContainText('Dashboard');
  });

  test('TC01-02: Verify login page elements are present', async ({ page }) => {
    await expect(page.locator('input[name="username"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
    await expect(page.locator('.orangehrm-login-branding img')).toBeVisible();
  });

  test('TC01-03: Login and verify user session', async ({ page }) => {
    await page.fill('input[name="username"]', 'Admin');
    await page.fill('input[name="password"]', 'admin123');
    await page.click('button[type="submit"]');
    
    // Verify user dropdown shows logged-in user
    const userDropdown = page.locator('.oxd-userdropdown-tab');
    await expect(userDropdown).toBeVisible();
    await expect(userDropdown).toContainText('Admin');
  });

  test('TC01-04: Logout after successful login', async ({ page }) => {
    await page.fill('input[name="username"]', 'Admin');
    await page.fill('input[name="password"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForSelector('.oxd-userdropdown-tab');
    
    // Logout
    await page.click('.oxd-userdropdown-tab');
    await page.click('a:has-text("Logout")');
    
    await expect(page).toHaveURL(/login/);
  });
});
