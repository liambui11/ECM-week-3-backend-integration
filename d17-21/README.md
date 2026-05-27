# Product CRUD API

This project is a RESTful API built with ExpressJS, TypeScript, and Prisma (PostgreSQL). It provides basic CRUD operations for managing a product catalog.

## Project Structure

```text
src/
├── config/       # Application configuration and constants
├── controllers/  # Business logic for each resource
├── lib/          # Database client initialization (Prisma)
├── routes/       # API route definitions
├── utils/        # Common utility functions (e.g., Response handlers)
└── index.ts      # Application entry point
```

## API Endpoints

### Products (`/api/products`)
- `GET /` - Fetch all products with pagination, sorting, search, and category filtering.
- `GET /:id` - Get a single product by ID (includes category data).
- `POST /` - Create a new product (requires `categoryId`).
- `PUT /:id` - Update an existing product.
- `DELETE /:id` - Delete a product.

### Categories (`/api/categories`)
- `GET /` - Fetch all categories.
- `GET /:id` - Get a single category by ID (includes product count).
- `POST /` - Create a new category.
- `PUT /:id` - Update an existing category.
- `DELETE /:id` - Delete a category.

## Design Decisions

1.  **TypeScript:** Used for type safety and better developer experience.
2.  **Prisma ORM:** Selected for its excellent TypeScript support and ease of database management.
3.  **Database Normalization:** Extracted `Category` into its own table to support dynamic categories and enforce referential integrity.
4.  **Standardized Responses:** All API responses follow a consistent `{ status, message, data, error }` format.
5.  **Production Rules:** The codebase follows strict rules including small file sizes, short functions, and no "magic numbers".

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- Docker (optional, for PostgreSQL)

### Installation
1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure environment variables in `.env`.

### Database Setup
1.  Start PostgreSQL using Docker:
    ```bash
    docker-compose up -d
    ```
2.  Run Prisma migrations to initialize the schema:
    ```bash
    npx prisma migrate dev --name init
    npx prisma migrate dev --name extract_category_table
    ```

### Running the App
- Development mode: `npm run dev`
- Build & Start: `npm run build && npm start`

## API Usage & Parameters

The `GET /api/products` endpoint supports full server-side sorting, pagination, search, and filtering:

- **Pagination:** `?page=1&limit=10` (Default: page 1, limit 10. Max limit is capped at 100)
- **Sorting:** `?sort=price&order=desc` (Valid sort fields: `id`, `name`, `price`, `createdAt`. Order is `asc` or `desc`)
- **Search:** `?search=keyword` (Case-insensitive matching against product name and description)
- **Filtering by Category ID:** `?categoryId=1` (Filters products by their unique category identifier)
- **Filtering by Price Range:** `?minPrice=10&maxPrice=500` (Filters product price between min and max range)

