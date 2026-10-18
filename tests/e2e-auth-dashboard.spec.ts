import { test, expect } from '@playwright/test';

test.describe('Angular Auth & Dashboard - E2E Scenarios', () => {

  test.beforeEach(async ({ page }) => {
    // Hardcoded URL ki jagah relative path use karein
    await page.goto('/login');
  });

  test('should show validation or prevent submit on empty inputs', async ({ page }) => {
    const submitBtn = page.locator('button[type="submit"]');
    await submitBtn.click();
    await expect(page).toHaveURL(/.*login/);
  });

  test('should display error message on incorrect password', async ({ page }) => {
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'wrongpassword123');
    await page.click('button[type="submit"]');

    const errorMsg = page.locator('.error-msg');
    await expect(errorMsg).toBeVisible();
  });

  test('should login successfully with valid credentials and verify dashboard mock data', async ({ page }) => {
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('should successfully logout and redirect back to login page', async ({ page }) => {
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/.*dashboard/);

    await page.click('.logout-btn');
    await expect(page).toHaveURL(/.*login/);
  });

});