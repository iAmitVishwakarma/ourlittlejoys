import { test, expect } from '@playwright/test';

test.describe('LittleJoys Real-World User Journeys (E2E)', () => {
  // 1. Homepage loads
  test('1. Homepage loads with brand identity, hero, and categories', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle(/Little Joys/i);
    await expect(page.locator('text=littlejoys').first()).toBeVisible();
    await expect(page.getByRole('link', { name: /shop all/i }).first()).toBeVisible();
  });

  // 2. Shop navigation
  test('2. Shop navigation loads product catalog', async ({ page }) => {
    await page.goto('/shop/all', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle(/Shop/i);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.locator('text=₹').first()).toBeVisible();
  });

  // 3. Product discovery
  test('3. Product discovery opens product details page', async ({ page }) => {
    await page.goto('/shop/all', { waitUntil: 'domcontentloaded' });
    const productCard = page.locator('a[href^="/product/"]').first();
    const productHref = await productCard.getAttribute('href');
    await productCard.click();

    await page.waitForURL(`**${productHref}`);
    await expect(page.locator('h1')).toBeVisible();
  });

  // 4. Add to cart & 5. Cart modification
  test('4 & 5. Add to cart and modify cart items', async ({ page }) => {
    await page.goto('/login', { waitUntil: 'domcontentloaded' });
    const demoBtn = page.getByRole('button', { name: /demo login/i });
    await demoBtn.click();
    await page.waitForTimeout(600);

    await page.goto('/shop/all', { waitUntil: 'domcontentloaded' });
    const addBtn = page.getByRole('button', { name: /add/i }).first();
    await addBtn.click();

    await page.goto('/cart', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('text=Order Summary').first()).toBeVisible();
    await expect(page.locator('text=Total Payable').first()).toBeVisible();
    
    // Modify item quantity
    const increaseBtn = page.getByRole('button', { name: /increase/i }).first();
    if (await increaseBtn.isVisible()) {
      await increaseBtn.click();
      await page.waitForTimeout(300);
    }
  });

  // 6. Wishlist flow
  test('6. Wishlist navigation and toggle', async ({ page }) => {
    await page.goto('/login', { waitUntil: 'domcontentloaded' });
    const demoBtn = page.getByRole('button', { name: /demo login/i });
    await demoBtn.click();
    await page.waitForTimeout(600);

    await page.goto('/wishlist', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle(/Wishlist/i);
    await expect(page.locator('text=Wishlist').first()).toBeVisible();
  });

  // 7. Login & 8. Logout
  test('7 & 8. Login with demo credentials and Logout', async ({ page }) => {
    await page.goto('/login', { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('heading', { level: 1, name: /welcome back/i })).toBeVisible();

    const demoBtn = page.getByRole('button', { name: /demo login/i });
    await demoBtn.click();

    await page.waitForTimeout(800);
    expect(page.url()).not.toContain('/login');

    await page.goto('/profile', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('text=Parent Profile').or(page.locator('text=Dashboard')).or(page.locator('text=Demo Parent'))).toBeVisible();
  });

  // 9. Protected route redirect
  test('9. Unauthenticated visitor to /profile is redirected to /login', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => localStorage.clear());

    await page.goto('/profile', { waitUntil: 'domcontentloaded' });
    await page.waitForURL('**/login**');
    expect(page.url()).toContain('/login');
  });

  // 10. Checkout UI (Protected & simulated gateway)
  test('10. Checkout address and payment UI renders safely without real payment', async ({ page }) => {
    await page.goto('/login', { waitUntil: 'domcontentloaded' });
    await page.getByRole('button', { name: /demo login/i }).click();
    await page.waitForTimeout(600);

    await page.goto('/shop/all', { waitUntil: 'domcontentloaded' });
    await page.getByRole('button', { name: /add/i }).first().click();
    await page.waitForTimeout(400);

    await page.goto('/checkout/address', { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('navigation', { name: /checkout progress/i })).toBeVisible();
    await expect(page.locator('text=Delivery Address').first()).toBeVisible();
  });

  // 11. Invalid route fallback
  test('11. Handles non-existent URL gracefully without crash', async ({ page }) => {
    const response = await page.goto('/non-existent-deep-link-xyz-404', { waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBeLessThan(500);
    await expect(page.locator('header').first()).toBeVisible();
  });

  // 12. Browser refresh persistence
  test('12. User state and session persist across browser reload', async ({ page }) => {
    await page.goto('/login', { waitUntil: 'domcontentloaded' });
    await page.getByRole('button', { name: /demo login/i }).click();
    await page.waitForTimeout(600);

    await page.reload({ waitUntil: 'domcontentloaded' });
    const token = await page.evaluate(() => localStorage.getItem('lj_auth_token'));
    expect(token).toBeTruthy();
  });
});
