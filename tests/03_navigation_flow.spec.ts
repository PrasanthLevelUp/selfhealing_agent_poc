/**
 * TEST 03: Navigation Flow — Using HREF + TEXT selectors
 * Tests sidebar navigation across modules.
 */
import { test, expect } from '@playwright/test';

test.describe('Navigation Flows', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/web/index.php/auth/login');
    await page.fill('input[name="username"]', 'Admin');
    await page.fill('input[name="password"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForSelector('.oxd-topbar-header-breadcrumb');
  });

  test('TC03-01: Navigate through all main menu items', async ({ page }) => {
    const menuLinks = [
      { text: 'Admin', urlPart: 'admin' },
      { text: 'PIM', urlPart: 'pim' },
      { text: 'Leave', urlPart: 'leave' },
      { text: 'Time', urlPart: 'time' },
      { text: 'Recruitment', urlPart: 'recruitment' },
    ];

    for (const link of menuLinks) {
      await page.click(`.oxd-main-menu-item:has-text("${link.text}")`);
      await expect(page).toHaveURL(new RegExp(link.urlPart));
      await expect(page.locator('h6.oxd-text--h6')).toContainText(link.text);
    }
  });

  test('TC03-02: Navigate to Dashboard via logo/brand click', async ({ page }) => {
    // Navigate away first
    await page.click('.oxd-main-menu-item:has-text("Admin")');
    
    // Click sidebar brand to go back to dashboard
    await page.click('.oxd-sidepanel-header');
    await expect(page).toHaveURL(/dashboard/);
  });

  test('TC03-03: Sidebar collapse and expand', async ({ page }) => {
    const sidebar = page.locator('.oxd-sidepanel');
    
    // Toggle sidebar
    const toggleButton = page.locator('.oxd-main-menu-button');
    await toggleButton.click();
    
    // Sidebar should be collapsed
    await expect(sidebar).toHaveClass(/toggled/);
    
    // Toggle back
    await toggleButton.click();
    await expect(sidebar).not.toHaveClass(/toggled/);
  });

  test('TC03-04: Navigate to My Info from user dropdown', async ({ page }) => {
    await page.click('.oxd-userdropdown-tab');
    await page.click('a:has-text("About")');
    
    // About modal should appear
    const modal = page.locator('.oxd-dialog-sheet');
    await expect(modal).toBeVisible();
    
    // Close modal
    await modal.locator('.oxd-dialog-close-button, button:has-text("OK")').click();
  });

  test('TC03-05: Search in sidebar menu', async ({ page }) => {
    const searchInput = page.locator('.oxd-main-menu-search input');
    await searchInput.fill('Leave');
    
    // Verify filtered menu shows only matching items
    const visibleItems = page.locator('.oxd-main-menu-item:visible');
    await expect(visibleItems).toHaveCount(1);
    await expect(visibleItems.first()).toContainText('Leave');
  });
});
