import { test, expect } from '@playwright/test';

test.describe('Auth and Dashboard Flow', () => {
  test('should login successfully and view dashboard data', async ({ page }) => {
    // 1. Navigate to login page
    await page.goto('http://localhost:4200/login');

    // 2. Fill login form
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');

    // 3. Verify redirection to dashboard
    await expect(page).toHaveURL('http://localhost:4200/dashboard');

    // 4. Check if dummy data table is visible
    const tableRow = page.locator('table tbody tr');
    await expect(tableRow.first()).toBeVisible();
    
    // 5. Verify specific mock data text exists
    await expect(page.locator('text=Enterprise Dashboard')).toBeVisible();
  });
});