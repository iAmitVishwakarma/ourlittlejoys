# Data Schemas

## Product Schema
```javascript
{
  id: string,              // Unique identifier (e.g., 'nutrimix-nutrition-powder')
  name: string,            // Product name (e.g., 'Nutrimix Chocolate Nutrition Powder')
  slug: string,            // URL-friendly identifier
  description: string,     // Full product description
  category: string,        // Category (e.g., 'Daily Nutrition', 'Gummies')
  subCategory: string,     // Sub-category badge
  price: number,           // Current selling price in INR
  originalPrice: number,   // Maximum retail price (MRP) in INR
  discount: number,        // Discount percentage
  rating: number,          // Average customer rating (0 to 5)
  reviews: string,         // Review count string (e.g., '3.4k')
  visualType: string,      // Packaging visual key ('nutrimix', 'gummies', 'combo', 'spread')
  flavor: string,          // Flavor profile ('chocolate', 'strawberry', etc.)
  ageGroup: string,        // Recommended age bracket (e.g., '2-6 Yr', '4+ Yr')
  weight: string,          // Weight or count (e.g., '350g', '30N')
  tag: string,             // Ribbon tag (e.g., 'BESTSELLER', 'COMBO SAVE ₹200')
  badgeColor: string,      // Tailwind CSS badge color class
  benefits: string[],      // Bullet points of key nutritional benefits
  ingredients: string[],   // List of natural ingredients
  nutritionalInfo: {       // Nutrition per 100g or per serving
    protein: string,
    energy: string,
    carbohydrates: string,
    calcium: string,
    iron: string,
    vitamins: string[]
  },
  labTested: boolean,      // Honest report verification flag
  isBestSeller: boolean,   // Best seller status
  isNew: boolean,          // New launch status
  createdAt: string,       // ISO timestamp
  updatedAt: string        // ISO timestamp
}
```

## Category Schema
```javascript
{
  id: string,              // Unique category ID
  name: string,            // Display name (e.g., 'Daily Nutrition', 'Gummies')
  slug: string,            // URL path parameter
  description: string,     // Short category summary
  icon: string,            // Category icon key or emoji
  productCount: number,    // Number of products in category
  order: number            // Display order sequence
}
```

## User Schema
```javascript
{
  id: string,              // Unique user ID
  name: string,            // User full name
  email: string,           // Email address
  phone: string,           // Mobile number (+91 format)
  avatar: string,          // Avatar image URL
  addresses: [{
    id: string,            // Address ID
    label: string,         // 'Home' | 'Work' | 'Other'
    line1: string,         // Address line 1
    line2: string,         // Flat / Apartment number
    city: string,          // City (e.g., 'Bhopal', 'Mumbai')
    state: string,         // State (e.g., 'Madhya Pradesh')
    pincode: string,       // 6-digit postal code
    isDefault: boolean     // Default shipping address flag
  }],
  wallet: {
    balance: number,       // Available LJ Wallet balance in INR
    currency: "INR",
    transactions: [{
      id: string,
      type: "credit" | "debit",
      amount: number,
      description: string,
      timestamp: string
    }]
  },
  orders: [string],        // Array of order IDs
  wishlist: [string],      // Array of product slugs
  createdAt: string,
  updatedAt: string
}
```

## Cart Schema
```javascript
{
  userId: string,          // User ID or 'guest'
  items: [{
    productId: string,     // Product ID
    slug: string,          // Product slug
    name: string,          // Product name
    price: number,         // Unit price
    originalPrice: number, // Original MRP
    quantity: number,      // Selected quantity
    weight: string,        // Pack size
    visualType: string     // Visual key
  }],
  couponCode: string,      // Applied coupon (e.g., 'JOY30')
  discountAmount: number,  // Total discount deducted
  subtotal: number,        // Total before discount
  shippingFee: number,     // Free shipping if subtotal >= ₹499
  total: number,           // Final payable amount
  updatedAt: string
}
```

## Order Schema
```javascript
{
  id: string,              // Order ID (e.g., 'LJ-ORD-9824')
  userId: string,          // Associated user ID
  items: [{
    productId: string,
    name: string,
    quantity: number,
    price: number,
    weight: string
  }],
  shippingAddress: {
    name: string,
    phone: string,
    email: string,
    address: string,
    city: string,
    state: string,
    pincode: string
  },
  paymentMethod: "UPI" | "Card" | "NetBanking" | "COD" | "Wallet",
  paymentStatus: "completed" | "pending" | "failed",
  orderStatus: "confirmed" | "packed" | "shipped" | "delivered",
  subtotal: number,
  discount: number,
  shipping: number,
  total: number,
  trackingNumber: string,
  createdAt: string,
  updatedAt: string
}
```

## Review Schema
```javascript
{
  id: string,              // Review ID
  productId: string,       // Product slug or ID
  userName: string,        // Parent / Reviewer name
  rating: number,          // 1 to 5 stars
  verified: boolean,       // Verified buyer flag
  childAge: string,        // Child age (e.g., 'Mother of 4-year-old Kabir')
  title: string,           // Review headline
  comment: string,         // Review feedback text
  date: string             // Date of review
}
```

## API Response Format
```javascript
// Standard Success Response
{
  "success": true,
  "data": { ... },
  "message": "Operation completed successfully"
}

// Standard Error Response
{
  "success": false,
  "error": {
    "code": "BAD_REQUEST" | "UNAUTHORIZED" | "NOT_FOUND" | "PAYMENT_FAILED",
    "message": "Detailed error explanation for the client",
    "details": {}
  }
}
```
