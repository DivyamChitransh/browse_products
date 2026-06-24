# Product Browser API

Backend service for browsing a large product catalog with fast pagination and category filtering.

## Tech Stack

- Node.js
- Express.js
- PostgreSQL (Neon)
- Render

## Features

- Browse products ordered by latest updates
- Category filtering
- Cursor-based pagination
- Efficient handling of large datasets
- Product creation endpoint

## Setup

Install dependencies:

```bash
npm install
```

Create `.env`:

```env
DATABASE_URL=<your_neon_connection_string>
PORT= <>
```

Run locally:

```bash
npm run dev
```

## API Endpoints

### Get Products

```http
GET /api/products
```

Query Params:

- limit
- category
- cursor

Example:

```http
GET /api/products?category=sports
```

---

### Create Product

```http
POST /api/products
```

Body:

```json
{
  "name": "iPhone 16",
  "category": "electronics",
  "price": 99999
}
```

## Pagination Strategy

This project uses cursor-based pagination with:

```text
updated_at
id
```

instead of OFFSET pagination.

Benefits:

- Faster on large datasets
- Stable ordering
- Prevents duplicate or missing records while data changes

## Future Improvements

- Snapshot-based pagination for stronger consistency guarantees.
- Request validation and error handling improvements.
- Automated testing.
- Docker support.
- Redis caching.
- API documentation.

## Seed Data

Product generation script:

```bash
npm run seed
```

## Deployment

Backend: Render

Database: Neon PostgreSQL

## Live URL

https://browse-products.onrender.com/
