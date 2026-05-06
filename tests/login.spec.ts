import { test, expect } from '@playwright/test';

test('User can login to OrangeHRM', async ({ page }) => {
  // Navigate to login page
  await page.goto('/web/index.php/auth/login');
  
  // Fill username
  await page.fill('input[name="username"]', 'Admin');
  
  // Fill password
  await page.fill('input[name="password"]', 'admin123');
  
  // Click login button
  await page.click('button[type="submit"]');
  
  // Verify successful login - dashboard should be visible
  await expect(page.locator('h6:has-text("Dashboard")')).toBeVisible();
});