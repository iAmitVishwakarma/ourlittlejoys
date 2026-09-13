/**
 * Application Route Paths Constants
 */
export const ROUTES = {
  HOME: '/',
  SHOP: '/shop/all',
  SHOP_CATEGORY: (cat = ':category') => `/shop/${cat}`,
  PRODUCT_DETAIL: (slug = ':slug') => `/product/${slug}`,
  CART: '/cart',
  CHECKOUT: '/checkout',
  CHECKOUT_ADDRESS: '/checkout/address',
  CHECKOUT_PAYMENT: '/checkout/payment',
  CHECKOUT_SUCCESS: '/checkout/success',
  PROFILE: '/profile',
  ORDERS: '/orders',
  HONEST_REPORT: '/honest-report',
  WALLET_RECHARGE: '/wallet-recharge',
  ABOUT_US: '/aboutus',
  FAQ: '/faq',
  CONTACT: '/contact',
  LOGIN: '/login',
  SIGNUP: '/signup',
  WISHLIST: '/wishlist',
  RETURNS: '/returns',
  TERMS: '/terms',
  PRIVACY: '/privacy',
};
