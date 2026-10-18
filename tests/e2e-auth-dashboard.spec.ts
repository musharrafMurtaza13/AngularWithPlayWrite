import { test, expect } from '@playwright/test';

test.describe('Angular Auth & Dashboard - Comprehensive E2E Scenarios', () => {

  test.beforeEach(async ({ page }) => {
    // Har test se pehle login page par navigate karein
    await page.goto('http://localhost:4200/login');
  });

  // Test 1: Empty Form Submission Validation
  test('should show validation or prevent submit on empty inputs', async ({ page }) => {
    // Directly click submit without filling inputs
    const submitBtn = page.locator('button[type="submit"]');
    await submitBtn.click();

    // Verify user stays on login page
    await expect(page).toHaveURL('http://localhost:4200/login');
  });

  // Test 2: Invalid Password / Wrong Credentials Error Check
  test('should display error message on incorrect password', async ({ page }) => {
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'wrongpassword123');
    await page.click('button[type="submit"]');

    // Verify error message is visible
    const errorMsg = page.locator('.error-msg');
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toHaveText('Invalid email or password');
  });

  // Test 3: Unregistered Email Error Check
  test('should display error message for unregistered email', async ({ page }) => {
    await page.fill('input[type="email"]', 'unknown@example.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');

    const errorMsg = page.locator('.error-msg');
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toHaveText('Invalid email or password');
  });

  // Test 4: Successful Login and Dashboard Data Verification
  test('should login successfully with valid credentials and verify dashboard mock data', async ({ page }) => {
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');

    // Verify redirection to dashboard
    await expect(page).toHaveURL('http://localhost:4200/dashboard');

    // Verify dashboard metrics and mock data items are rendered
    await expect(page.locator('text=Enterprise Dashboard')).toBeVisible();
    await expect(page.locator('text=Microservices Architecture Migration')).toBeVisible();
    await expect(page.locator('text=$5000')).toBeVisible();
  });

  // Test 5: Logout Functionality Flow
  test('should successfully logout and redirect back to login page', async ({ page }) => {
    // Login first
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('http://localhost:4200/dashboard');

    // Click Logout button
    await page.click('.logout-btn');

    // Verify redirection back to login
    await expect(page).toHaveURL('http://localhost:4200/login');
  });

});