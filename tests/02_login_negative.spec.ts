/**
 * TEST 02: Login Negative — Using PLACEHOLDER + CSS CLASS selectors
 * Verifies error handling for invalid login attempts.
 */
import { test, expect } from '@playwright/test';

test.describe('Login - Negative Scenarios', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/web/index.php/auth/login');
  });

  test('TC02-01: Login with invalid username', async ({ page }) => {
    await page.fill('input[placeholder="Username"]', 'InvalidUser');
    await page.fill('input[placeholder="Password"]', 'admin123');
    await page.click('.orangehrm-login-button');
    
    // Verify error message
    const alert = page.locator('.oxd-alert-content--error');
    await expect(alert).toBeVisible();
    await expect(alert).toContainText('Invalid credentials');
  });

  test('TC02-02: Login with invalid password', async ({ page }) => {
    await page.fill('input[placeholder="Username"]', 'Admin');
    await page.fill('input[placeholder="Password"]', 'wrongpassword');
    await page.click('.orangehrm-login-button');
    
    const alert = page.locator('.oxd-alert-content--error');
    await expect(alert).toBeVisible();
  });

  test('TC02-03: Login with empty username', async ({ page }) => {
    await page.fill('input[placeholder="Password"]', 'admin123');
    await page.click('.orangehrm-login-button');
    
    // Verify required field validation
    const requiredError = page.locator('.oxd-input-field-error-message');
    await expect(requiredError).toBeVisible();
    await expect(requiredError).toContainText('Required');
  });

  test('TC02-04: Login with empty password', async ({ page }) => {
    await page.fill('input[placeholder="Username"]', 'Admin');
    await page.click('.orangehrm-login-button');
    
    const requiredError = page.locator('.oxd-input-field-error-message');
    await expect(requiredError).toBeVisible();
    await expect(requiredError).toContainText('Required');
  });

  test('TC02-05: Login with both fields empty', async ({ page }) => {
    await page.click('.orangehrm-login-button');
    
    const requiredErrors = page.locator('.oxd-input-field-error-message');
    await expect(requiredErrors).toHaveCount(2);
  });
});
