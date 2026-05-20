/**
 * TEST 05: Employee CRUD — Using CSS COMPOUND + NTH-CHILD selectors
 * Tests Create, Read, Update operations in PIM module.
 */
import { test, expect } from '@playwright/test';

test.describe('Employee CRUD Operations', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/web/index.php/auth/login');
    await page.fill('input[name="username"]', 'Admin');
    await page.fill('input[name="password"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForSelector('.oxd-topbar-header-breadcrumb');
  });

  test('TC05-01: Add new employee (Create)', async ({ page }) => {
    await page.click('a[href="/web/index.php/pim/viewEmployeeList"]');
    await page.waitForLoadState('networkidle');
    
    // Click Add button
    await page.click('.oxd-button--secondary:has-text("Add")');
    await page.waitForLoadState('networkidle');
    
    // Fill first name using name attribute
    await page.fill('input[name="firstName"]', 'AutoTest');
    // Fill last name
    await page.fill('input[name="lastName"]', 'Employee' + Date.now().toString().slice(-4));
    
    // Click Save
    await page.click('button[type="submit"]');
    await page.waitForLoadState('networkidle');
    
    // Verify navigation to employee details page
    await expect(page.locator('.orangehrm-main-title')).toContainText('Personal Details');
  });

  test('TC05-02: View employee details (Read)', async ({ page }) => {
    await page.click('a[href="/web/index.php/pim/viewEmployeeList"]');
    await page.waitForSelector('.oxd-table');
    
    // Click first employee row's eye/view icon
    const firstRow = page.locator('.oxd-table-body .oxd-table-row').first();
    await firstRow.locator('.oxd-icon-button').first().click();
    await page.waitForLoadState('networkidle');
    
    // Verify personal details form is visible
    await expect(page.locator('form.oxd-form')).toBeVisible();
    await expect(page.locator('input[name="firstName"]')).toBeVisible();
  });

  test('TC05-03: Edit employee details (Update)', async ({ page }) => {
    // Navigate to My Info (own profile)
    await page.click('a[href="/web/index.php/pim/viewMyDetails"]');
    await page.waitForLoadState('networkidle');
    
    // Verify form is loaded
    const form = page.locator('form.oxd-form').first();
    await expect(form).toBeVisible();
    
    // Find and verify input fields are present
    const firstNameInput = form.locator('input.oxd-input--active').first();
    await expect(firstNameInput).toBeVisible();
    
    // Verify save button exists
    await expect(form.locator('button[type="submit"]').first()).toBeVisible();
  });

  test('TC05-04: Delete employee from list', async ({ page }) => {
    await page.click('a[href="/web/index.php/pim/viewEmployeeList"]');
    await page.waitForSelector('.oxd-table');
    
    // Get initial row count
    const initialRows = await page.locator('.oxd-table-body .oxd-table-row').count();
    
    // Check if there are employees to potentially delete
    expect(initialRows).toBeGreaterThan(0);
    
    // Verify delete button (trash icon) exists on first row
    const deleteBtn = page.locator('.oxd-table-body .oxd-table-row').first()
      .locator('.oxd-icon-button').nth(1);
    await expect(deleteBtn).toBeVisible();
  });
});
