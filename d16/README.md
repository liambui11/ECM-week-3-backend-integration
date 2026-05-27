# CRUD API Practice — Express.js + TypeScript

A full RESTful CRUD API for managing products, built with Express.js and TypeScript using in-memory data storage. This project focuses on proper HTTP verbs, status codes, field-level validation, type safety, and clean code architecture.

## Setup

```bash
# Install dependencies
npm install

# Start development server (ts-node, auto-compiles)
npm run dev

# Start dev server with auto-reload on file changes
npm run dev:watch

# Build TypeScript to JavaScript
npm run build

# Start production server (requires build first)
npm start

# Lint code
npm run lint

# Format code
npm run format
```

The server runs on `http://localhost:3000`.

## Folder Structure

```
src/
├── app.ts                     # Express app setup & middleware
├── server.ts                  # Server entry point
├── types/
│   ├── index.ts               # Barrel export for all types
│   ├── product.ts             # Product, ProductCategory, CreateProductInput
│   ├── validation.ts          # ValidationError interface
│   └── apiResponse.ts         # ApiSuccessResponse<T>, ApiErrorResponse
├── constants/
│   ├── httpStatus.ts          # Named HTTP status code constants (200, 201, etc.)
│   └── productConstants.ts    # Allowed categories list (typed)
├── data/
│   └── mockProducts.ts        # In-memory array with 5 seed products
├── routes/
│   └── productRoutes.ts       # Route definitions: maps HTTP verbs to handlers
├── controllers/
│   └── productController.ts   # Thin request handlers (validate → service → response)
├── services/
│   └── productService.ts      # Business logic for CRUD operations
├── validators/
│   └── productValidator.ts    # Field-level validation + sanitization
├── middleware/
│   └── errorHandler.ts        # Global error handler (catches unhandled errors)
└── utils/
    └── idGenerator.ts         # Auto-incrementing ID generator
```

## Design Decisions

1. **TypeScript strict mode** — `tsconfig.json` has `strict: true`, `noUnusedLocals`, `noImplicitReturns`. No `any` types are used anywhere.
2. **Dedicated `types/` directory** — All interfaces and types are in `src/types/` with a barrel export (`index.ts`). Any file can import from `'../types'`.
3. **Generic API responses** — `ApiSuccessResponse<T>` is a generic type that ensures consistent response shapes while allowing typed `data` fields.
4. **`unknown` over `any` for validation** — Validator functions accept `unknown` parameters and use type narrowing, not `any`.
5. **Service layer pattern** — Controllers are thin (validate + respond). All business logic lives in the service layer.
6. **PUT = full replacement** — PUT requires all fields. Missing fields return 400. Use PATCH for partial updates.
7. **Unknown fields stripped** — The sanitizer only keeps known fields. Extra fields are silently ignored.
8. **Idempotent operations** — PUT and DELETE produce the same result when called multiple times.

## API Documentation

Base URL: `http://localhost:3000/api/products`

### Endpoints

| Method | Endpoint              | Description          | Status Codes       |
|--------|-----------------------|----------------------|--------------------|
| GET    | `/api/products`       | List all products    | 200                |
| GET    | `/api/products/:id`   | Get product by ID    | 200, 404           |
| POST   | `/api/products`       | Create a product     | 201, 400           |
| PUT    | `/api/products/:id`   | Update a product     | 200, 400, 404      |
| DELETE | `/api/products/:id`   | Delete a product     | 204, 400, 404      |
| GET    | `/api/health`         | Health check         | 200                |

### Request Body (POST & PUT)

```json
{
  "name": "Wireless Mouse",
  "price": 25.99,
  "category": "electronics",
  "stock": 50
}
```

**Validation Rules:**

| Field      | Type    | Rules                                                      |
|------------|---------|------------------------------------------------------------|
| `name`     | string  | Required, 2–100 characters                                 |
| `price`    | number  | Required, must be > 0                                      |
| `category` | string  | Required, must be: electronics, clothing, food, books, toys |
| `stock`    | integer | Required, must be >= 0                                     |

### Example Requests (curl)

**Create a product:**
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Wireless Mouse","price":25.99,"category":"electronics","stock":50}'
```

**Get all products:**
```bash
curl http://localhost:3000/api/products
```

**Get one product:**
```bash
curl http://localhost:3000/api/products/1
```

**Update a product (full replacement):**
```bash
curl -X PUT http://localhost:3000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Headphones","price":69.99,"category":"electronics","stock":20}'
```

**Delete a product:**
```bash
curl -X DELETE http://localhost:3000/api/products/1
```

### Error Response Example

```json
{
  "status": 400,
  "message": "Validation failed.",
  "errors": [
    { "field": "name", "message": "Name is required." },
    { "field": "price", "message": "Price must be greater than 0." }
  ]
}
```
