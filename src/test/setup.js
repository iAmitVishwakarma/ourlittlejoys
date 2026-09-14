/**
 * Vitest global test setup
 * Extends expect with jest-dom custom matchers and
 * provides a minimal localStorage/sessionStorage mock for jsdom.
 */
import '@testing-library/jest-dom/vitest';

// Minimal localStorage mock (jsdom provides one, but ensure it's clean between tests)
beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
});
