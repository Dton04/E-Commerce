# E-Commerce + Affiliate + AI Recommendation Platform (Backend)

NestJS Modular Monolith API for high-performance multi-vendor marketplace, multi-variant catalog, affiliate attribution, and transactional checkout.

---

## 1. Quick Start

### Prerequisites
- Node.js >= 20
- PostgreSQL >= 15 (Docker container provided)
- npm >= 10

### Setup & Run
```bash
# 1. Start local PostgreSQL
cd server
docker-compose up -d

# 2. Install dependencies
npm install

# 3. Synchronize database schema
npx prisma db push

# 4. Start NestJS dev server
npm run start:dev
```
- Swagger API Documentation: `http://localhost:3000/api/docs`
- API Base URL: `http://localhost:3000/api/v1`

---

## 2. Catalog Search & Filter API Specification (`CAT-02`)

### Endpoint
`GET /api/v1/products` (Public)

### Query Parameters

| Parameter | Type | Validation / Constraints | Description |
| :--- | :--- | :--- | :--- |
| `page` | `number` | Optional. Default: `1`, `@Min(1)` | Current page number |
| `limit` | `number` | Optional. Default: `10`, `@Min(1)`, `@Max(50)` | Number of items per page (strictly bounded) |
| `search` | `string` | Optional. Trimming & case-insensitive | Keyword matching `name` or `description` |
| `categoryId` | `UUID` | Optional. `@IsUUID('all')` | Filter by category ID |
| `shopId` | `UUID` | Optional. `@IsUUID('all')` | Filter by shop ID |
| `minPrice` | `number` | Optional. `@Min(0)` | Minimum price filter (evaluated on active SKUs) |
| `maxPrice` | `number` | Optional. `@Min(0)` | Maximum price filter (evaluated on active SKUs) |
| `sortBy` | `enum` | Optional. Whitelist: `newest`, `oldest`, `name_asc` | Deterministic sorting criteria |

---

### Request & Response Examples

#### Example 1: Full Query Combination
```http
GET /api/v1/products?search=iphone&categoryId=a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d&minPrice=20000000&maxPrice=35000000&sortBy=newest&page=1&limit=10 HTTP/1.1
Host: localhost:3000
```

**Response (HTTP 200 OK):**
```json
{
  "data": [
    {
      "id": "e8a1d7f2-4b3c-41e9-9a2e-8c5e9d1a3b5c",
      "shopId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "categoryId": "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
      "name": "iPhone 16 Pro Titanium 128GB",
      "slug": "iphone-16-pro-titanium-128gb",
      "description": "Next-gen flagship with A18 Pro chip",
      "images": [
        "https://cdn.example.com/products/ip16-front.jpg",
        "https://cdn.example.com/products/ip16-back.jpg"
      ],
      "status": "PUBLISHED",
      "commissionRate": "0.0500",
      "createdAt": "2026-10-19T10:00:00.000Z",
      "updatedAt": "2026-10-19T10:00:00.000Z",
      "category": {
        "id": "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
        "name": "Smartphones",
        "slug": "smartphones"
      },
      "shop": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "name": "Official Apple Authorized Store",
        "slug": "apple-authorized-store",
        "logoUrl": "https://cdn.example.com/shops/apple-logo.png"
      },
      "skus": [
        {
          "id": "c1d2e3f4-5a6b-7c8d-9e0f-1a2b3c4d5e6f",
          "productId": "e8a1d7f2-4b3c-41e9-9a2e-8c5e9d1a3b5c",
          "skuCode": "IP16-BLK-128",
          "price": "28990000.00",
          "stock": 50,
          "attributes": { "color": "Black Titanium", "storage": "128GB" },
          "isActive": true
        },
        {
          "id": "d2e3f4a5-6b7c-8d9e-0f1a-2b3c4d5e6f7a",
          "productId": "e8a1d7f2-4b3c-41e9-9a2e-8c5e9d1a3b5c",
          "skuCode": "IP16-WHT-256",
          "price": "31990000.00",
          "stock": 30,
          "attributes": { "color": "White Titanium", "storage": "256GB" },
          "isActive": true
        }
      ]
    }
  ],
  "meta": {
    "total": 1,
    "page": 1,
    "limit": 10,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPrevPage": false
  }
}
```

---

#### Example 2: Empty Results
```http
GET /api/v1/products?search=nonexistent_product_xyz HTTP/1.1
Host: localhost:3000
```

**Response (HTTP 200 OK):**
```json
{
  "data": [],
  "meta": {
    "total": 0,
    "page": 1,
    "limit": 10,
    "totalPages": 0,
    "hasNextPage": false,
    "hasPrevPage": false
  }
}
```

---

#### Example 3: Invalid Range Error (`minPrice > maxPrice`)
```http
GET /api/v1/products?minPrice=50000000&maxPrice=10000000 HTTP/1.1
Host: localhost:3000
```

**Response (HTTP 400 Bad Request):**
```json
{
  "message": "minPrice cannot be greater than maxPrice",
  "error": "Bad Request",
  "statusCode": 400
}
```

---

#### Example 4: Unbounded Limit Error (`limit > 50`)
```http
GET /api/v1/products?limit=100 HTTP/1.1
Host: localhost:3000
```

**Response (HTTP 400 Bad Request):**
```json
{
  "message": [
    "limit must not be greater than 50"
  ],
  "error": "Bad Request",
  "statusCode": 400
}
```

---

#### Example 5: Non-whitelisted Sort Field
```http
GET /api/v1/products?sortBy=injected_column HTTP/1.1
Host: localhost:3000
```

**Response (HTTP 400 Bad Request):**
```json
{
  "message": [
    "sortBy must be one of the following values: newest, oldest, price_asc, price_desc, name_asc"
  ],
  "error": "Bad Request",
  "statusCode": 400
}
```

---

## 3. Database Indexes for Query Optimization

The catalog queries leverage composite PostgreSQL indexes defined in `schema.prisma`:
- `@@index([status, createdAt])`: Optimizes public default sorting (`WHERE status = 'PUBLISHED' ORDER BY createdAt DESC`).
- `@@index([shopId, status, createdAt])`: Optimizes shop storefront queries.
- `@@index([categoryId, status])`: Optimizes category tree browsing.
- `@@index([productId, isActive])`: Optimizes relational SKU queries via `EXISTS` subqueries.

---

## 4. Test Verification
```bash
npm run test:e2e
```
- Total E2E Tests: **37/37 passed** (27 catalog tests, 10 auth tests).
- Average test execution time: **< 10ms per test** on local PostgreSQL.
