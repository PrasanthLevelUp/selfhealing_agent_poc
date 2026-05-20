/**
 * TEST 07: Leave Management — Using ROLE/ARIA + TEXT selectors
 * Tests Leave module functionality.
 */
import { test, expect } from '@playwright/test';

test.describe('Leave Management', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/web/index.php/auth/login');
    await page.fill('input[name="username"]', 'Admin');
    await page.fill('input[name="password"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForSelector('.oxd-topbar-header-breadcrumb');
    await page.click('.oxd-main-menu-item:has-text("Leave")');
    await page.waitForLoadState('networkidle');
  });

  test('TC07-01: Navigate to Leave List', async ({ page }) => {
    await expect(page.locator('h6.oxd-text--h6')).toContainText('Leave');
    
    // Verify top nav tabs
    const topNav = page.locator('.oxd-topbar-body-nav');
    await expect(topNav.locator('a:has-text("Leave List")')).toBeVisible();
    await expect(topNav.locator('a:has-text("Assign Leave")')).toBeVisible();
  });

  test('TC07-02: Filter leave records', async ({ page }) => {
    // Leave list filter form
    const filterForm = page.locator('.oxd-form');
    await expect(filterForm).toBeVisible();
    
    // Find and interact with status dropdown
    const dropdowns = filterForm.locator('.oxd-select-text');
    if (await dropdowns.count() > 0) {
      await dropdowns.first().click();
      const options = page.locator('.oxd-select-dropdown .oxd-select-option');
      await expect(options.first()).toBeVisible();
      await options.first().click();
    }
    
    // Click search
    await filterForm.locator('button[type="submit"]').click();
    await page.waitForLoadState('networkidle');
  });

  test('TC07-03: Navigate to Assign Leave page', async ({ page }) => {
    await page.click('.oxd-topbar-body-nav a:has-text("Assign Leave")');
    await page.waitForLoadState('networkidle');
    
    // Verify assign leave form
    await expect(page.locator('h6.oxd-text--h6')).toContainText('Assign Leave');
    await expect(page.locator('.oxd-form')).toBeVisible();
  });

  test('TC07-04: Verify leave type dropdown options', async ({ page }) => {
    await page.click('.oxd-topbar-body-nav a:has-text("Assign Leave")');
    await page.waitForLoadState('networkidle');
    
    // Click leave type dropdown
    const leaveTypeDropdown = page.locator('.oxd-select-text').first();
    await leaveTypeDropdown.click();
    
    const options = page.locator('.oxd-select-dropdown .oxd-select-option');
    const optionCount = await options.count();
    expect(optionCount).toBeGreaterThan(0);
  });

  test('TC07-05: Navigate to Leave Entitlements', async ({ page }) => {
    // Click on Entitlements in top nav
    const entitlementsNav = page.locator('.oxd-topbar-body-nav a:has-text("Entitlements")');
    await entitlementsNav.click();
    
    // Should show sub-menu
    const subMenu = page.locator('.oxd-dropdown-menu');
    await expect(subMenu).toBeVisible();
  });
});
