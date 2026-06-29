# GraphOne Backend API

![Node.js](https://img.shields.io/badge/Node.js-22-green)
![Express](https://img.shields.io/badge/Express.js-Backend-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)

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
├── config
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
GET /companies
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
GET /companies/:slug
```

Returns

- Company
- Founders
- Products
- Funding Rounds

---

### Company Funding Timeline

```
GET /companies/:slug/funding
```

---

### Company Products

```
GET /companies/:slug/products
```

---

### Trending Companies

```
GET /companies/trending
```

Returns top 10 companies ordered by view count.

---

### Create Company

```
POST /companies
```

Protected by API Key.

Header

```
X-API-Key: your-api-key
```

---

## Investors

### List Investors

```
GET /investors
```

Supports

- type
- stageFocus
- sector
- pagination

---

### Investor Profile

```
GET /investors/:slug
```

Returns

- Investor
- Portfolio
- Lead Rounds
- Investments

---

### Investment History

```
GET /investors/:slug/investments
```

Paginated.

---

### Most Active Investors

```
GET /investors/most-active
```

Ranks investors by recent deal activity.

---

## Products

### List Products

```
GET /products
```

Supports

- category
- popular
- newest

---

### Product Detail

```
GET /products/:slug
```

Returns product with company information.

---

## News

### List News

```
GET /news
```

Supports

- pagination
- tag filter

---

### Trending News

```
GET /news/trending
```

Returns top viewed news.

---

## Search

### Global Search

```
GET /search?q=openai
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
GET /search/autocomplete?q=op
```

Returns search suggestions.

---

### Trending Searches

```
GET /search/trending
```

Returns most searched keywords.

---

## Founders

```
GET /founders/:slug
```

Returns founder profile with linked company.

---

## Statistics

```
GET /stats
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

Install

```bash
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
npx prisma db push
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

# Testing

A complete Postman collection is included.

Import

```
GraphOne.postman_collection.json
```

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

```

## A couple of suggestions specific to your project

1. Replace the GitHub URL with your repository.
2. If you deploy the API, add a **Live API** section near the top.
3. Add a **License** section if you plan to make the repository public.
4. If you include a Postman collection, mention its filename exactly (e.g., `GraphOne.postman_collection.json`).

This README is comprehensive without being unnecessarily long, and it clearly communicates the architecture, features, setup, and available endpoints.