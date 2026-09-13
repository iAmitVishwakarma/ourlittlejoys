import React, { useEffect } from 'react';

/**
 * High-Performance Client-Side SEO Management Component
 * Dynamically injects title, description, canonical link, Open Graph, Twitter Cards, and JSON-LD schema.
 */
export default function SEO({
  title = "Little Joys | Expert-Formulated Nutrition & Wellness For Kids",
  description = "India's #1 Pediatrician-backed nutrition brand for kids. Nutrimix sprouted millets, 12 essential multivitamin gummies, brain health kits & clean treats with zero refined sugar.",
  keywords = "kids nutrition, sprouted millets, multivitamin gummies for kids, pediatric nutrition India, children health drink, clean ragi chocolate drink, Little Joys",
  canonical = null,
  ogImage = "https://ourlittlejoys.com/favicon.svg",
  ogType = "website",
  schemaData = null
}) {
  useEffect(() => {
    // 1. Update Title
    const formattedTitle = title.includes("Little Joys") ? title : `${title} | Little Joys`;
    document.title = formattedTitle;

    // Helper to update or create meta tags
    const updateMeta = (selector, attribute, value) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        const [attrName] = selector.replace(/[[\]]/g, '').split('=');
        element.setAttribute(attrName, selector.split('=')[1].replace(/['"]/g, ''));
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, value);
    };

    // 2. Standard Meta Tags
    updateMeta('meta[name="description"]', 'content', description);
    updateMeta('meta[name="keywords"]', 'content', keywords);

    // 3. Open Graph Tags
    updateMeta('meta[property="og:title"]', 'content', formattedTitle);
    updateMeta('meta[property="og:description"]', 'content', description);
    updateMeta('meta[property="og:type"]', 'content', ogType);
    updateMeta('meta[property="og:image"]', 'content', ogImage);
    updateMeta('meta[property="og:url"]', 'content', window.location.href);

    // 4. Twitter Card Tags
    updateMeta('meta[name="twitter:title"]', 'content', formattedTitle);
    updateMeta('meta[name="twitter:description"]', 'content', description);
    updateMeta('meta[name="twitter:image"]', 'content', ogImage);

    // 5. Canonical Link
    const targetCanonical = canonical || window.location.origin + window.location.pathname;
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', targetCanonical);

    // 6. Dynamic JSON-LD Structured Data
    if (schemaData) {
      const existingScript = document.getElementById('dynamic-seo-schema');
      if (existingScript) existingScript.remove();

      const script = document.createElement('script');
      script.id = 'dynamic-seo-schema';
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schemaData);
      document.head.appendChild(script);
    }

    return () => {
      const script = document.getElementById('dynamic-seo-schema');
      if (script) script.remove();
    };
  }, [title, description, keywords, canonical, ogImage, ogType, schemaData]);

  return null;
}
