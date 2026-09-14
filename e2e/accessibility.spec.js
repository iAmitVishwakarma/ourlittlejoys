import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility QA Scans (Axe Core)', () => {
  test('Homepage passes automated WCAG accessibility scan', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .disableRules(['color-contrast']) // automated color contrast in CSS gradients can produce false positives; audited separately
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Shop Catalog passes automated WCAG accessibility scan', async ({ page }) => {
    await page.goto('/shop/all');
    await page.waitForLoadState('domcontentloaded');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .disableRules(['color-contrast'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('FAQ Page passes automated WCAG accessibility scan', async ({ page }) => {
    await page.goto('/faq');
    await page.waitForLoadState('domcontentloaded');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .disableRules(['color-contrast'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Login Page passes automated WCAG accessibility scan', async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('domcontentloaded');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .disableRules(['color-contrast'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Cart Page passes automated WCAG accessibility scan', async ({ page }) => {
    await page.goto('/cart');
    await page.waitForLoadState('domcontentloaded');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .disableRules(['color-contrast'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
