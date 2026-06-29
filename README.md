# GraphOne Backend API

![Node.js](https://img.shields.io/badge/Node.js-22-green)
![Express](https://img.shields.io/badge/Express.js-Backend-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)

## Live API

https://graphone-api-w49g.onrender.com/api/v1

A production-grade REST API built with Node.js, Express, TypeScript, Prisma, and PostgreSQL for the GraphOne intelligence platform.

The API models relationships between companies, investors, founders, products, funding rounds, and news while providing search, filtering, pagination, analytics, validation, and consistent API responses.


---

# Features

- RESTful API architecture
- Prisma ORM with PostgreSQL
- TypeScript
- Layered architecture (Routes → Controllers → Services → Database)
- Full-text cross-entity search
- Autocomplete search
- Trending searches
- Pagination
- Filtering
- Sorting
- Slug-based routing
- Company analytics (view count)
- Product analytics (view count)
- News analytics (view count)
- Global error handling
- Request validation using Zod
- API Key protected POST endpoint
- Seed script
- Consistent JSON response format

---

# Architecture

```text
Client
   │
   ▼
Routes
   │
Controllers
   │
Services
   │
Prisma ORM
   │
PostgreSQL
```

---

# Tech Stack

| Technology | Purpose |
|------------|----------|
| Node.js | Runtime |
| Express.js | REST API |
| TypeScript | Language |
| PostgreSQL | Database |
| Prisma ORM | Database ORM |
| Zod | Request Validation |
| Redis *(optional)* | Caching |
| Postman | API Testing |

---

# Project Structure

```
src
│
├── controllers
├── lib
├── middleware
├── routes
├── services
├── utils
├── validators
└── server.ts
```

---

# Database Entities

## Company

- id
- name
- slug
- description
- category
- fundingTotal
- employeeCount
- foundedYear
- hqCity
- hqCountry
- logoUrl
- website
- stage
- valuation
- isUnicorn
- viewCount

---

## Founder

- id
- name
- slug
- title
- bio
- twitter
- linkedin
- location
- photoUrl

---

## Investor

- id
- name
- slug
- type
- bio
- aum
- portfolioCount
- stageFocus
- sectorFocus
- location
- logoUrl
- viewCount

---

## FundingRound

- id
- company
- leadInvestor
- amount
- currency
- roundType
- date

---

## Product

- id
- name
- slug
- description
- category
- launchDate
- upvotes
- websiteUrl
- viewCount

---

## NewsArticle

- id
- title
- url
- source
- tag
- summary
- publishedAt
- viewCount

---

# API Response Format

Every endpoint returns the same JSON structure.

Success

```json
{
  "data": {},
  "meta": {},
  "error": null
}
```

Error

```json
{
  "data": null,
  "meta": null,
  "error": {
    "code": "BAD_REQUEST",
    "message": "Invalid request"
  }
}
```

---

# API Endpoints

## Companies

### Get Companies

```
GET /api/v1/companies
```

Query Parameters

| Parameter | Description |
|----------|-------------|
| page | Page number |
| limit | Items per page |
| category | Filter by category |
| stage | Filter by funding stage |
| country | HQ country |
| sort | funded, new, trending |

---

### Get Company

```
GET /api/v1/companies/:slug
```

Returns

- Company
- Founders
- Products
- Funding Rounds

---

### Company Funding Timeline

```
GET /api/v1/companies/:slug/funding
```

---

### Company Products

```
GET /api/v1/companies/:slug/products
```

---

### Trending Companies

```
GET /api/v1/companies/trending
```

Returns top 10 companies ordered by view count.

---

### Create Company

```
POST /api/v1/companies
```

Protected by API Key.

Header

```
API-Key: your-api-key
```

---

## Investors

### List Investors

```
GET /api/v1/investors
```

Supports

- type
- stageFocus
- sector
- pagination

---

### Investor Profile

```
GET /api/v1/investors/:slug
```

Returns

- Investor
- Portfolio
- Lead Rounds
- Investments

---

### Investment History

```
GET /api/v1/investors/:slug/investments
```

Paginated.

---

### Most Active Investors

```
GET /api/v1/investors/most-active
```

Ranks investors by recent deal activity.

---

## Products

### List Products

```
GET /api/v1/products
```

Supports

- category
- popular
- newest

---

### Product Detail

```
GET /api/v1/products/:slug
```

Returns product with company information.

---

## News

### List News

```
GET /api/v1/news
```

Supports

- pagination
- tag filter

---

### Trending News

```
GET /api/v1/news/trending
```

Returns top viewed news.

---

## Search

### Global Search

```
GET /api/v1/search?q=openai
```

Searches across

- Companies
- Investors
- Founders
- Products

Uses PostgreSQL Full Text Search.

---

### Autocomplete

```
GET /api/v1/search/autocomplete?q=op
```

Returns search suggestions.

---

### Trending Searches

```
GET /api/v1/search/trending
```

Returns most searched keywords.

---

## Founders

```
GET /api/v1/founders/:slug
```

Returns founder profile with linked company.

---

## Statistics

```
GET /api/v1/stats
```

Returns

- Total Companies
- Investors
- Products
- News
- Founders
- Total Funding

---

# Search Features

Implemented

- PostgreSQL Full Text Search
- Ranking using ts_rank
- Cross Entity Search
- Autocomplete
- Trending Searches

---

# Validation

Request validation is implemented using **Zod**.

Invalid requests return

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed"
  }
}
```

---

# Pagination

Supported endpoints return

```json
{
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 120,
    "totalPages": 12,
    "hasNext": true,
    "hasPrev": false
  }
}
```

---

# Installation

Clone

```bash
git clone https://github.com/yourusername/graphone-backend.git
```

---

## Prerequisites

Before running the API locally, make sure you have:

- Node.js 22+
- PostgreSQL
- Redis (optional, used for caching/search cache)
- npm

---

## Quick Start

```bash
cd server
npm install
```

---

# Environment Variables

Create

```
.env
```

Example

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/graphone
PORT=5000
API_KEY=your-api-key
REDIS_URL=redis://localhost:6379
```

---

# Prisma

Generate Client

```bash
npx prisma generate
```

Push Database

```bash
npx prisma migrate dev
```

Seed Database

```bash
npx prisma db seed
```

---

# Run Project

Development

```bash
npm run dev
```

Production

```bash
npm run build
npm start
```

---

## Testing

A complete Postman collection is included.

📄 **Postman Collection:** [GraphOne Backend API.postman_collection.json](./GraphOne%20Backend%20API.postman_collection.json)

into Postman.

---

# Future Improvements

- JWT Authentication
- Role Based Authorization
- Swagger/OpenAPI Documentation
- Docker Support
- Kubernetes Deployment
- Elasticsearch Integration
- AI-powered Search Ranking
- Background Jobs
- Event Streaming
- Monitoring & Metrics

---

# Author

**Omkar Gudappe**

Backend Developer
