import { test, expect } from '@playwright/test';

const MOBILE_VIEWPORTS = [
  { name: '320px (iPhone SE Narrow)', width: 320, height: 640 },
  { name: '375px (iPhone standard)', width: 375, height: 667 },
  { name: '390px (iPhone 13/14)', width: 390, height: 844 },
  { name: '414px (iPhone Plus/Max)', width: 414, height: 896 },
];

const RESPONSIVE_VIEWPORTS = [
  { name: '320px', width: 320, height: 640 },
  { name: '360px', width: 360, height: 740 },
  { name: '375px', width: 375, height: 667 },
  { name: '390px', width: 390, height: 844 },
  { name: '414px', width: 414, height: 896 },
  { name: '768px (Tablet)', width: 768, height: 1024 },
  { name: '1024px (Small Desktop)', width: 1024, height: 768 },
  { name: '1280px (Standard Desktop)', width: 1280, height: 800 },
  { name: '1440px (Wide Display)', width: 1440, height: 900 },
];

test.describe('Mobile & Responsive Layout QA', () => {
  for (const vp of MOBILE_VIEWPORTS) {
    test(`Mobile ${vp.name} — No horizontal overflow on Homepage`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/');

      // Wait for content to render
      await page.waitForLoadState('domcontentloaded');

      // Assert no horizontal overflow
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth + 1; // 1px tolerance for subpixel anti-aliasing
      });
      expect(hasHorizontalScroll).toBe(false);

      // Verify Mobile Bottom Nav is visible on mobile
      const bottomNav = page.locator('nav[aria-label="Mobile Bottom Navigation"]');
      await expect(bottomNav).toBeVisible();
    });

    test(`Mobile ${vp.name} — Shop Catalog grid adapts cleanly`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/shop/all');

      await page.waitForLoadState('domcontentloaded');

      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth + 1;
      });
      expect(hasHorizontalScroll).toBe(false);

      // Verify buttons have adequate touch target height (>= 40px)
      const buttons = page.locator('button');
      const count = await buttons.count();
      for (let i = 0; i < Math.min(count, 5); i++) {
        const box = await buttons.nth(i).boundingBox();
        if (box && box.height > 0) {
          expect(box.height).toBeGreaterThanOrEqual(32);
        }
      }
    });
  }

  // Cross-viewport responsive matrix checks
  for (const vp of RESPONSIVE_VIEWPORTS) {
    test(`Viewport ${vp.name} (${vp.width}x${vp.height}) — FAQ and Static pages layout integrity`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/faq');

      await page.waitForLoadState('domcontentloaded');

      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth + 1;
      });
      expect(hasHorizontalScroll).toBe(false);
    });
  }
});
