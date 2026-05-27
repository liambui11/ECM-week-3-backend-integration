# Backend Basics (REST) — Express.js + TypeScript

A simple but properly structured REST API for managing products, built with Express.js and TypeScript. This project demonstrates clean architecture using the **Controller → Service → Model** pattern.

## Setup

```bash
# Install dependencies
npm install

# Start development server (with hot reload)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Format code
npm run format
```

## API Endpoints

| Method | URL                    | Description              | Status Codes |
| ------ | ---------------------- | ------------------------ | ------------ |
| GET    | `/api/products`        | Get all products         | 200          |
| GET    | `/api/products/:id`    | Get a product by ID      | 200, 404     |

### Example Requests

```bash
# Get all products
curl http://localhost:3000/api/products

# Get a specific product
curl http://localhost:3000/api/products/1

# Get a product that doesn't exist (returns 404)
curl http://localhost:3000/api/products/999
```

### Example Responses

**Success (GET /api/products/1):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Wireless Bluetooth Headphones",
    "description": "Premium noise-cancelling headphones with 30-hour battery life",
    "price": 79.99,
    "category": "Electronics",
    "inStock": true
  }
}
```

**Error (GET /api/products/999):**
```json
{
  "success": false,
  "error": "Product not found",
  "message": "Product not found"
}
```

## Folder Structure

```
backend/
├── src/
│   ├── constants/
│   │   └── app.constants.ts       # Named constants (port, status codes, messages)
│   ├── types/
│   │   ├── product.types.ts       # Product interface & API response types
│   │   └── error.types.ts         # Custom AppError class
│   ├── models/
│   │   └── product.model.ts       # Mock data & data access functions
│   ├── services/
│   │   └── product.service.ts     # Business logic & validation
│   ├── controllers/
│   │   └── product.controller.ts  # HTTP request/response handling
│   ├── middlewares/
│   │   ├── requestLogger.middleware.ts  # Logs every request
│   │   └── errorHandler.middleware.ts   # Catches & formats errors
│   ├── routes/
│   │   └── product.routes.ts      # Route definitions
│   ├── app.ts                     # Express app assembly
│   └── server.ts                  # Entry point
├── .eslintrc / eslint.config.js
├── .prettierrc
├── tsconfig.json
├── package.json
└── README.md
```

## Design Decisions

### Why Controller → Service → Model?

- **Controller** handles HTTP concerns only (parse request, send response)
- **Service** contains business logic and validation
- **Model** manages data access (mock data now, database later)

This separation makes it easy to:
- Swap mock data for a real database without changing controllers
- Test business logic independently from HTTP layer
- Keep each file small and focused

### Why a Custom AppError Class?

Instead of throwing generic `Error` objects, `AppError` carries a `statusCode` so the error middleware knows exactly which HTTP status to return. This avoids the mistake of returning `200` for errors or exposing stack traces.

### Why Request Logging Middleware?

A centralized logger that runs on every request makes debugging easier. It logs: HTTP method, URL, response status code, and response time in milliseconds.
