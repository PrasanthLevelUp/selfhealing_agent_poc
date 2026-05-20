/**
 * TEST 04: Employee Search — Using XPATH + DOM PATH selectors
 * Tests PIM module search functionality.
 */
import { test, expect } from '@playwright/test';

test.describe('Employee Search - PIM Module', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/web/index.php/auth/login');
    await page.fill('input[name="username"]', 'Admin');
    await page.fill('input[name="password"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForSelector('.oxd-topbar-header-breadcrumb');
    await page.click('//a[contains(@href,"pim/viewEmployeeList")]');
    await page.waitForSelector('.oxd-table');
  });

  test('TC04-01: Search employee by name', async ({ page }) => {
    // XPath to find the employee name input
    const nameInput = page.locator('//div[contains(@class,"oxd-form")]//input[contains(@class,"oxd-input")]').first();
    await nameInput.fill('Admin');
    
    // Submit search
    await page.click('//button[@type="submit"]');
    await page.waitForLoadState('networkidle');
    
    // Verify table has results
    await expect(page.locator('.oxd-table-body .oxd-table-row')).toHaveCount(1, { timeout: 10000 });
  });

  test('TC04-02: Search with no results', async ({ page }) => {
    const nameInput = page.locator('//div[contains(@class,"oxd-form")]//input[contains(@class,"oxd-input")]').first();
    await nameInput.fill('NonExistentEmployee12345');
    
    await page.click('//button[@type="submit"]');
    await page.waitForLoadState('networkidle');
    
    // Verify "No Records Found" message or empty table
    const noRecords = page.locator('//span[contains(text(),"No Records Found")]');
    await expect(noRecords).toBeVisible({ timeout: 10000 });
  });

  test('TC04-03: Reset search filters', async ({ page }) => {
    const nameInput = page.locator('//div[contains(@class,"oxd-form")]//input[contains(@class,"oxd-input")]').first();
    await nameInput.fill('TestSearch');
    
    // Click reset button
    await page.click('//button[normalize-space()="Reset"]');
    
    // Verify input is cleared
    await expect(nameInput).toHaveValue('');
  });

  test('TC04-04: Verify employee list table structure', async ({ page }) => {
    // Check table headers exist
    const headers = page.locator('//div[contains(@class,"oxd-table-header")]//div[contains(@class,"oxd-table-cell")]');
    await expect(headers).toHaveCount(7); // Checkbox + Id + First Name + Last Name + Job Title + Employment Status + Sub Unit + Actions
    
    // Verify data rows exist
    const rows = page.locator('//div[contains(@class,"oxd-table-body")]//div[contains(@class,"oxd-table-row")]');
    const rowCount = await rows.count();
    expect(rowCount).toBeGreaterThan(0);
  });
});
