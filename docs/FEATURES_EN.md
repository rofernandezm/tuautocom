🌐 Language: [Spanish](FEATURES.md) | **English**

# Features

This document describes the functional capabilities implemented in TuAutoCom, supported by direct evidence from backend and frontend code.

The system was conceived as a vehicle web catalog designed to demonstrate the use of a flexible document model and MongoDB-specific query capabilities.

---

## 1. Dynamic Vehicle Catalog

### Main Endpoint
GET /api/vehicles

### Implemented Capabilities

- Paginated listing.
- Combinable filters.
- Text search.
- Dynamic sorting.
- Total results count.

### Supported Query Parameters

- page
- limit
- category
- brand
- minPrice
- maxPrice
- year
- fuel
- condition
- search

### MongoDB Operations Used

- find(filter)
- countDocuments(filter)
- skip()
- limit()
- sort()
- Operators:
  - $regex (case-insensitive search)
  - $gte / $lte (price range)
  - $or (multiple conditions)

Queries are dynamically constructed based on incoming parameters.

---

## 2. Vehicle Detail

### Endpoint
GET /api/vehicles/:id

### Database Operation
- findById()

Returns:

- Base information.
- Extended specifications.
- Multiple associated images.
- Related comments.

The document structure allows each vehicle to include additional attributes without requiring schema migrations.

---

## 3. MongoDB Aggregations

Explicit aggregation pipelines are implemented to demonstrate advanced NoSQL querying capabilities.

### 3.1 Featured Vehicles
GET /api/vehicles/featured

Pipeline:
- $match (condition.use = 'new' OR price < 30000)
- $sort (createdAt desc)
- $limit (8)

Purpose:
Display new or affordable vehicles ordered by creation date.

---

### 3.2 Cheapest Vehicles
GET /api/vehicles/cheapest

Pipeline:
- $sort (price asc)
- $limit (8)

Purpose:
Retrieve the 8 lowest-priced vehicles.

---

### 3.3 Recent Vehicles
GET /api/vehicles/recent

Pipeline:
- $sort (createdAt desc)
- $limit (8)

Purpose:
Display the most recently added vehicles.

---

### 3.4 Dynamic Catalogs

GET /api/catalogs/:type/items

Pipeline:

- $match (type)
- $unwind (items[])
- $match (items.metadata.active ≠ false)
- $sort (items.label asc)
- $group (reconstruct array)
- $project (expose filtered items)

Purpose:

- Filter active items.
- Sort alphabetically.
- Reconstruct the response structure.

This pipeline demonstrates manipulation of nested arrays within documents.

---

## 4. Vehicle Management (CRUD)

Implemented Endpoints:

- POST /api/vehicles
- PUT /api/vehicles/:id
- DELETE /api/vehicles/:id

Mongo Operations:

- create()
- findByIdAndUpdate()
- findByIdAndDelete()

### Image Upload Handling

Multer middleware is used to:

- Accept multiple image uploads.
- Store files in /public/uploads.
- Persist image paths within the vehicle document.

---

## 5. Vehicle Comments

Endpoints:

- GET /api/comments
- GET /api/comments/:id
- GET /api/comments/vehicle/:vehicleId
- POST /api/comments
- DELETE /api/comments/:id

Mongo Operations:

- find()
- findById()
- create()
- findByIdAndDelete()
- sort({ createdAt: -1 })

Comments are associated with vehicles via ObjectId references.

No authentication layer is implemented.

---

## 6. Inquiries / Reservations

Endpoints:

- GET /api/reservations
- GET /api/reservations/:id
- POST /api/reservations
- DELETE /api/reservations/:id

Mongo Operations:

- find()
- findById()
- create()
- findByIdAndDelete()

Allows registering inquiries associated with vehicles without payment or transactional logic.

---

## 7. Catalog Management

A dynamic catalog system is implemented for:

- Categories
- Brands
- Fuel types
- Transmissions
- Extensible additional types

Capabilities include:

- Catalog CRUD.
- Item CRUD within catalogs.
- Soft-disable using metadata.active.

This avoids hardcoded values in the frontend and maintains configurability within the database.

---

## 8. Frontend Evidence

The frontend consumes the API via dedicated services:

- vehicleService
- catalogService
- commentService
- inquiryService

Implements:

- Dynamic rendering using ES Modules.
- Grid updates when filters change.
- Runtime catalog loading.
- Comment rendering using array mapping.
- Inquiry submission forms.

The UI never accesses the database directly; all communication occurs through the REST API.

---

## 9. Deliberately Excluded Features

The system does not implement:

- Authentication or user management.
- JWT or authorization middleware.
- Shopping cart.
- Payment processing.
- Checkout flow.
- Orders or transactions.

These were intentionally excluded to maintain focus on:

- Document modeling.
- Dynamic queries.
- Aggregation pipelines.
- Schema flexibility.

---

## 10. Functional Scope

TuAutoCom positions itself as a demonstrative system focused on:

- Advanced MongoDB querying.
- Flexible document manipulation.
- Controlled aggregation usage.
- Decoupled API–UI integration.

The defined scope prioritizes architectural coherence and technical decision-making over unnecessary functional expansion.
