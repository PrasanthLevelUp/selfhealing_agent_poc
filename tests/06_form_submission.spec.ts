// /**
//  * TEST 06: Form Submission — Using FORM > INPUT chains + CSS CLASS selectors
//  * Tests My Info personal details form.
//  */
// import { test, expect } from '@playwright/test';

// test.describe('Form Submission - My Info', { tag: ['@form-submission', '@pim'] }, () => {

//   test.beforeEach(async ({ page }) => {
//     await page.goto('/web/index.php/auth/login');
//     await page.fill('input[name="username"]', 'Admin');
//     await page.fill('input[name="password"]', 'admin123');
//     await page.click('button[type="submit"]');
//     await page.waitForSelector('.oxd-topbar-header-breadcrumb');
//     await page.click('a[href="/web/index.php/pim/viewMyDetails"]');
//     await page.waitForLoadState('networkidle');
//   });

//   test('TC06-01: Verify personal details form loads', async ({ page }) => {
//     const form = page.locator('form.oxd-form').first();
//     await expect(form).toBeVisible();
    
//     // Verify form fields using chained selectors
//     await expect(form.locator('.oxd-input-group .oxd-input--active').first()).toBeVisible();
//     await expect(form.locator('button[type="submit"]').first()).toBeVisible();
//   });

//   test('TC06-02: Edit first name and save', async ({ page }) => {
//     const form = page.locator('form.oxd-form').first();
    
//     // Clear and fill first name
//     const firstNameInput = form.locator('input.oxd-input--active').first();
//     await firstNameInput.clear();
//     await firstNameInput.fill('AdminUpdated');
    
//     // Click save
//     await form.locator('button[type="submit"]').first().click();
    
//     // Wait for success toast
//     await expect(page.locator('.oxd-toast--success')).toBeVisible({ timeout: 10000 });
//   });

//   test('TC06-03: Verify date picker interaction', async ({ page }) => {
//     // Find date input in the form
//     const dateInputs = page.locator('.oxd-date-input .oxd-input--active');
    
//     if (await dateInputs.count() > 0) {
//       await dateInputs.first().click();
//       // Calendar popup should appear
//       await expect(page.locator('.oxd-date-input-calendar')).toBeVisible();
//     }
//   });

//   test('TC06-04: Verify dropdown selections', async ({ page }) => {
//     // Find dropdown selectors in the form
//     const dropdowns = page.locator('.oxd-select-text');
    
//     if (await dropdowns.count() > 0) {
//       await dropdowns.first().click();
//       const options = page.locator('.oxd-select-dropdown .oxd-select-option');
//       await expect(options.first()).toBeVisible();
//     }
//   });

//   test('TC06-05: Restore original first name', async ({ page }) => {
//     const form = page.locator('form.oxd-form').first();
//     const firstNameInput = form.locator('input.oxd-input--active').first();
//     await firstNameInput.clear();
//     await firstNameInput.fill('Admin');
//     await form.locator('button[type="submit"]').first().click();
//     await expect(page.locator('.oxd-toast--success')).toBeVisible({ timeout: 10000 });
//   });
// });
