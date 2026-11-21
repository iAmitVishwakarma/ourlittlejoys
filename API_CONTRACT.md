# API Contract & Backend Specification

This document defines the REST API contract between the `ourlittlejoys` React frontend and the backend service. All endpoints expect and return JSON with standard HTTP status codes.

---

## 1. General Conventions

### Base URL
Configured via `VITE_API_BASE_URL` in frontend environment (e.g., `https://api.ourlittlejoys.com/api/v1`).

### Authentication Header
Protected endpoints require a standard Bearer token:
```http
Authorization: Bearer <jwt_token>
```

### Standard Response Envelope
All successful responses return HTTP `200 OK` (or `201 Created` for resource creation) with the envelope:
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional human-readable confirmation message"
}
```

### Standard Error Envelope
All error responses return appropriate HTTP status codes (`400`, `401`, `403`, `404`, `422`, `500`) with:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR | UNAUTHORIZED | NOT_FOUND | PAYMENT_FAILED | INTERNAL_ERROR",
    "message": "Human-readable error description for display or logging",
    "details": {}
  }
}
```

---

## 2. Authentication & User Profile (`/auth`)

### `POST /auth/otp/send`
Request an SMS OTP for phone-based login or registration.
- **Auth:** Public
- **Request Body:**
  ```json
  {
    "phone": "9876543210"
  }
  ```
- **Response `200 OK`:**
  ```json
  {
    "success": true,
    "message": "OTP sent successfully",
    "data": {
      "phone": "9876543210",
      "otpSent": true,
      "expiresInSeconds": 300
    }
  }
  ```

### `POST /auth/otp/verify`
Verify submitted OTP and exchange for JWT token.
- **Auth:** Public
- **Request Body:**
  ```json
  {
    "phone": "9876543210",
    "otp": "123456"
  }
  ```
- **Response `200 OK`:**
  ```json
  {
    "success": true,
    "data": {
      "token": "eyJhbGciOi...",
      "user": {
        "id": "usr_101",
        "name": "Priya Sharma",
        "phone": "+919876543210",
        "email": "priya@example.com",
        "avatar": "/avatar.png",
        "isNewUser": false,
        "wallet": {
          "balance": 250,
          "currency": "INR"
        }
      }
    }
  }
  ```

### `POST /auth/login`
Email and password login.
- **Auth:** Public
- **Request Body:**
  ```json
  {
    "email": "priya@example.com",
    "password": "SecurePassword123"
  }
  ```
- **Response `200 OK`:**
  ```json
  {
    "success": true,
    "data": {
      "token": "eyJhbGciOi...",
      "user": {
        "id": "usr_101",
        "name": "Priya Sharma",
        "email": "priya@example.com",
        "phone": "+919876543210"
      }
    }
  }
  ```

### `POST /auth/register`
Email or phone registration with profile creation.
- **Auth:** Public
- **Request Body:**
  ```json
  {
    "name": "Priya Sharma",
    "email": "priya@example.com",
    "phone": "9876543210",
    "password": "SecurePassword123"
  }
  ```
- **Response `201 Created`:**
  ```json
  {
    "success": true,
    "data": {
      "token": "eyJhbGciOi...",
      "user": {
        "id": "usr_101",
        "name": "Priya Sharma",
        "email": "priya@example.com",
        "phone": "+919876543210"
      }
    }
  }
  ```

### `GET /auth/me`
Retrieve currently logged-in user profile.
- **Auth:** Required (`Bearer <token>`)
- **Response `200 OK`:**
  ```json
  {
    "success": true,
    "data": {
      "user": {
        "id": "usr_101",
        "name": "Priya Sharma",
        "email": "priya@example.com",
        "phone": "+919876543210",
        "avatar": "/avatar.png",
        "childProfile": {
          "name": "Aarav",
          "age": 4,
          "gender": "boy",
          "preferences": ["chocolate", "immunity"]
        },
        "wallet": {
          "balance": 250,
          "currency": "INR"
        }
      }
    }
  }
  ```

### `PUT /auth/profile`
Update user details or child profile.
- **Auth:** Required (`Bearer <token>`)
- **Request Body:**
  ```json
  {
    "name": "Priya Sharma",
    "email": "priya@example.com",
    "phone": "9876543210",
    "childProfile": {
      "name": "Aarav",
      "age": 4,
      "gender": "boy",
      "preferences": ["chocolate"]
    }
  }
  ```
- **Response `200 OK`:**
  ```json
  {
    "success": true,
    "data": {
      "user": { ... }
    }
  }
  ```

---

## 3. Products & Catalog (`/products`, `/categories`)

### `GET /products`
List catalog products with filtering, search, and pagination.
- **Auth:** Public
- **Query Parameters:**
  - `category` (string, optional)
  - `search` (string, optional)
  - `sort` (string, optional: `price_asc`, `price_desc`, `rating`, `popular`)
  - `page` (number, default `1`)
  - `limit` (number, default `20`)
- **Response `200 OK`:**
  ```json
  {
    "success": true,
    "data": {
      "products": [
        {
          "id": "nutrimix-nutrition-powder",
          "name": "Nutrimix Chocolate Nutrition Powder",
          "slug": "nutrimix-nutrition-powder",
          "category": "Daily Nutrition",
          "subCategory": "Growth & Immunity",
          "price": 549,
          "originalPrice": 699,
          "discount": 21,
          "rating": 4.8,
          "reviews": "3.4k",
          "visualType": "nutrimix",
          "flavor": "chocolate",
          "ageGroup": "2-6 Yr",
          "weight": "350g",
          "tag": "BESTSELLER",
          "badgeColor": "bg-amber-100 text-amber-800",
          "benefits": ["Immunity Boost", "Height Growth Support", "Brain & DHA"],
          "ingredients": ["Sprouted Ragi", "Oats", "Organic Cocoa", "DHA from Microalgae"],
          "nutritionalInfo": {
            "protein": "18g",
            "energy": "380 kcal",
            "carbohydrates": "64g",
            "calcium": "450mg",
            "iron": "12mg",
            "vitamins": ["Vitamin D3", "Vitamin C", "Vitamin B12"]
          },
          "labTested": true,
          "isBestSeller": true,
          "isNew": false
        }
      ],
      "total": 1,
      "page": 1,
      "totalPages": 1
    }
  }
  ```

### `GET /products/:slug`
Retrieve single product details by slug.
- **Auth:** Public
- **Response `200 OK`:**
  ```json
  {
    "success": true,
    "data": {
      "product": { ... }
    }
  }
  ```

### `GET /categories`
Retrieve product categories.
- **Auth:** Public
- **Response `200 OK`:**
  ```json
  {
    "success": true,
    "data": {
      "categories": [
        {
          "id": "daily-nutrition",
          "name": "Daily Nutrition",
          "slug": "daily-nutrition",
          "description": "Essential macro & micronutrients for growing kids",
          "icon": "sparkles",
          "productCount": 6,
          "order": 1
        }
      ]
    }
  }
  ```

### `GET /products/:slug/reviews`
List verified customer reviews for a product.
- **Auth:** Public
- **Response `200 OK`:**
  ```json
  {
    "success": true,
    "data": {
      "reviews": [
        {
          "id": "rev_1",
          "productId": "nutrimix-nutrition-powder",
          "userName": "Ananya Roy",
          "rating": 5,
          "verified": true,
          "childAge": "Mother of 4-year-old Kabir",
          "title": "Loved the chocolate flavor!",
          "comment": "My son drinks it without any fuss every morning.",
          "date": "2026-02-14"
        }
      ]
    }
  }
  ```

---

## 4. Shopping Cart (`/cart`)

### `GET /cart`
Get current shopping cart items and calculated pricing.
- **Auth:** Optional (`Bearer <token>` for logged-in user, or `x-guest-cart-id` header)
- **Response `200 OK`:**
  ```json
  {
    "success": true,
    "data": {
      "cart": {
        "items": [
          {
            "productId": "nutrimix-nutrition-powder",
            "slug": "nutrimix-nutrition-powder",
            "name": "Nutrimix Chocolate Nutrition Powder",
            "price": 549,
            "originalPrice": 699,
            "quantity": 2,
            "weight": "350g",
            "visualType": "nutrimix"
          }
        ],
        "couponCode": "JOY30",
        "subtotal": 1098,
        "discountAmount": 150,
        "shippingFee": 0,
        "total": 948
      }
    }
  }
  ```

### `POST /cart/items`
Add item to cart or update existing quantity.
- **Auth:** Optional
- **Request Body:**
  ```json
  {
    "productId": "nutrimix-nutrition-powder",
    "quantity": 1,
    "packSize": "350g"
  }
  ```
- **Response `200 OK`:** Returns updated cart object.

### `PUT /cart/items/:productId`
Update item quantity.
- **Request Body:** `{ "quantity": 3 }`

### `DELETE /cart/items/:productId`
Remove an item from the cart.

### `POST /cart/apply-coupon`
Validate and apply a discount coupon code.
- **Request Body:** `{ "couponCode": "JOY30" }`
- **Response `200 OK`:** Returns updated discount and cart total.

### `DELETE /cart/remove-coupon`
Remove applied coupon code.

---

## 5. Addresses (`/addresses`)

### `GET /addresses`
Fetch user saved shipping addresses.
- **Auth:** Required
- **Response `200 OK`:**
  ```json
  {
    "success": true,
    "data": {
      "addresses": [
        {
          "id": "addr_101",
          "label": "Home",
          "name": "Priya Sharma",
          "phone": "+919876543210",
          "line1": "Flat 402, Sunshine Heights",
          "line2": "MG Road, Indiranagar",
          "city": "Bengaluru",
          "state": "Karnataka",
          "pincode": "560038",
          "isDefault": true
        }
      ]
    }
  }
  ```

### `POST /addresses`
Create a new shipping address.
- **Auth:** Required
- **Request Body:**
  ```json
  {
    "label": "Home",
    "name": "Priya Sharma",
    "phone": "9876543210",
    "line1": "Flat 402, Sunshine Heights",
    "line2": "MG Road",
    "city": "Bengaluru",
    "state": "Karnataka",
    "pincode": "560038",
    "isDefault": true
  }
  ```

### `PUT /addresses/:id`
Update an existing address.

### `DELETE /addresses/:id`
Delete an address.

### `PUT /addresses/:id/default`
Mark an address as the default delivery location.

---

## 6. Orders & Checkout (`/orders`)

### `GET /orders`
List past user orders.
- **Auth:** Required
- **Response `200 OK`:**
  ```json
  {
    "success": true,
    "data": {
      "orders": [
        {
          "id": "LJ-ORD-9824",
          "createdAt": "2026-03-01T10:30:00Z",
          "items": [
            {
              "productId": "nutrimix-nutrition-powder",
              "name": "Nutrimix Chocolate Nutrition Powder",
              "quantity": 1,
              "price": 549,
              "weight": "350g"
            }
          ],
          "shippingAddress": {
            "name": "Priya Sharma",
            "phone": "9876543210",
            "line1": "Flat 402, Sunshine Heights",
            "city": "Bengaluru",
            "state": "Karnataka",
            "pincode": "560038"
          },
          "paymentMethod": "UPI",
          "paymentStatus": "completed",
          "orderStatus": "confirmed",
          "subtotal": 549,
          "discount": 50,
          "shipping": 0,
          "total": 499,
          "trackingNumber": "TRK9028471"
        }
      ]
    }
  }
  ```

### `GET /orders/:id`
Get single order details and delivery status.
- **Auth:** Required

### `POST /orders`
Create a new order from active checkout state.
- **Auth:** Required
- **Request Body:**
  ```json
  {
    "items": [
      {
        "productId": "nutrimix-nutrition-powder",
        "name": "Nutrimix Chocolate Nutrition Powder",
        "quantity": 1,
        "price": 549,
        "weight": "350g"
      }
    ],
    "shippingAddress": {
      "name": "Priya Sharma",
      "phone": "9876543210",
      "line1": "Flat 402, Sunshine Heights",
      "city": "Bengaluru",
      "state": "Karnataka",
      "pincode": "560038"
    },
    "paymentMethod": "COD",
    "subtotal": 549,
    "discount": 50,
    "shipping": 0,
    "total": 499,
    "couponCode": "JOY50"
  }
  ```
- **Response `201 Created`:** Returns created order object with generated `id`.

---

## 7. Payments (`/payments`)

### `POST /payments/create-order`
Initialize Razorpay/payment gateway order instance.
- **Auth:** Required
- **Request Body:**
  ```json
  {
    "amount": 49900,
    "currency": "INR",
    "orderId": "LJ-ORD-9824"
  }
  ```
- **Response `200 OK`:**
  ```json
  {
    "success": true,
    "data": {
      "gatewayOrderId": "order_rzp_98472",
      "amount": 49900,
      "currency": "INR",
      "keyId": "rzp_test_public_key"
    }
  }
  ```

### `POST /payments/verify`
Verify digital signature from payment gateway.
- **Auth:** Required
- **Request Body:**
  ```json
  {
    "orderId": "LJ-ORD-9824",
    "gatewayPaymentId": "pay_982482",
    "gatewayOrderId": "order_rzp_98472",
    "signature": "984289abcdef..."
  }
  ```
- **Response `200 OK`:**
  ```json
  {
    "success": true,
    "data": {
      "verified": true,
      "status": "completed",
      "transactionId": "txn_847291"
    }
  }
  ```

---

## 8. Wishlist (`/wishlist`)

### `GET /wishlist`
Fetch all wishlist product items for logged-in user.
- **Auth:** Required

### `POST /wishlist`
Add item to wishlist.
- **Auth:** Required
- **Request Body:** `{ "productId": "nutrimix-nutrition-powder" }`

### `DELETE /wishlist/:productId`
Remove item from wishlist.
- **Auth:** Required

---

## 9. LJ Wallet (`/wallet`)

### `GET /wallet`
Get user wallet balance and transaction ledger.
- **Auth:** Required
- **Response `200 OK`:**
  ```json
  {
    "success": true,
    "data": {
      "balance": 250,
      "currency": "INR",
      "transactions": [
        {
          "id": "txn_w_101",
          "type": "credit",
          "amount": 250,
          "description": "Sign-up welcome cash",
          "timestamp": "2026-02-10T12:00:00Z"
        }
      ]
    }
  }
  ```

### `POST /wallet/recharge`
Recharge wallet with credit.
- **Auth:** Required
- **Request Body:** `{ "amount": 500, "paymentMethod": "UPI" }`
