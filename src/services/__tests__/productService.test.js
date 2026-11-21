import { describe, it, expect } from 'vitest';
import { productService } from '../productService';

describe('productService', () => {
  it('returns all products by default in mock mode', async () => {
    const products = await productService.getAllProducts();
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);
  });

  it('filters products by category', async () => {
    const powders = await productService.getProductsByCategory('nutrition-powder');
    expect(Array.isArray(powders)).toBe(true);
    powders.forEach((p) => {
      expect(p.category.toLowerCase()).toBe('nutrition-powder');
    });
  });

  it('searches products by keyword', async () => {
    const results = await productService.getAllProducts({ search: 'chocolate' });
    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBeGreaterThan(0);
    results.forEach((p) => {
      const match =
        p.title.toLowerCase().includes('chocolate') ||
        p.subtitle?.toLowerCase().includes('chocolate') ||
        p.description?.toLowerCase().includes('chocolate');
      expect(match).toBe(true);
    });
  });

  it('retrieves product by slug or id', async () => {
    const all = await productService.getAllProducts();
    const target = all[0];

    const byId = await productService.getProductBySlugOrId(target.id);
    expect(byId).toBeDefined();
    expect(byId.id).toBe(target.id);

    const bySlug = await productService.getProductBySlugOrId(target.slug);
    expect(bySlug).toBeDefined();
    expect(bySlug.slug).toBe(target.slug);
  });

  it('returns null for non-existent product slug or id', async () => {
    const result = await productService.getProductBySlugOrId('non-existent-product-12345');
    expect(result).toBeNull();
  });

  it('returns cross-sell recommendations', async () => {
    const crossSell = await productService.getCrossSellProducts();
    expect(Array.isArray(crossSell)).toBe(true);
    expect(crossSell.length).toBeGreaterThan(0);
  });

  it('returns hero slides', async () => {
    const slides = await productService.getHeroSlides();
    expect(Array.isArray(slides)).toBe(true);
    expect(slides.length).toBeGreaterThan(0);
  });
});
