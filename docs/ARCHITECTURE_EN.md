🌐 Language: [Spanish](ARCHITECTURE.md) | **English**

# Architecture

This document describes the internal structure of TuAutoCom and the organizational decisions made to maintain separation of concerns, cross-layer coherence, and controlled system evolution.

The architecture was designed prioritizing structural clarity and explicit control over unnecessary abstraction.

---

## Overview

TuAutoCom is organized as a monorepo containing:

- Backend (REST API)
- Frontend (modular web interface)
- Auxiliary scripts

Each layer can evolve independently as long as the HTTP contract between frontend and backend is preserved.

---

## Backend

Location: `backend/src`

The API follows a layered structure:

```
routes → controllers → models → database
```

### 1. Routes

- Define exposed endpoints.
- Map each route to its corresponding controller.
- Contain no business logic.

Responsibility: HTTP request routing.

---

### 2. Controllers

- Receive incoming requests.
- Perform basic validation.
- Orchestrate calls to models.
- Build the HTTP response.

Responsibility: flow coordination.

Controllers do not directly manage persistence logic.

---

### 3. Models

- Define data schemas using Mongoose.
- Manage interaction with MongoDB.
- Apply model-level validations.

Responsibility: data structure definition and persistence access.

---

### 4. Middleware

- Cross-cutting processing functions.
- Error handling.
- Additional request processing when needed.

Responsibility: transversal logic decoupled from controllers.

---

## Request Flow

1. Client sends HTTP request.
2. Route identifies the endpoint.
3. Controller processes the request.
4. Model interacts with the database.
5. Controller builds the response.
6. Middleware completes the cycle if applicable.

This flow maintains a clear separation between transport, coordination, and persistence layers.

---

## Frontend

Location: `tuautocom.UI/js`

The UI is organized modularly using native ES Modules.

Main structure:

- `components/`
- `views/`
- `services/`
- `utils/`
- `config/`

---

### Components

Reusable UI elements.

Responsibility:
- Partial rendering.
- Encapsulation of visual structure.

---

### Views

Full pages or logical sections.

Responsibility:
- Component composition.
- Rendering orchestration.

---

### Services

API communication layer.

Responsibility:
- Perform HTTP requests.
- Centralize endpoint definitions.
- Isolate data access from rendering logic.

---

### Config

Shared configuration (theme, constants).

Responsibility:
- Avoid hardcoded values.
- Centralize global parameters.

---

## Backend / Frontend Separation

- Communication occurs exclusively via REST API.
- No direct dependency between internal codebases.
- Clear contract defined by HTTP endpoints.

This allows either layer to evolve or be replaced independently, provided the API contract remains stable.

---

## Code Organization Principles

The following principles were applied:

- Clear separation of concerns.
- Explicit modularization.
- Avoid unnecessary coupling.
- Prefer clarity over excessive abstraction.
- Prepare for incremental evolution.

---

## Evolution Considerations

The current structure allows:

- Introducing authentication.
- Adding additional validation layers.
- Integrating automated testing.
- Introducing containerization.
- Scaling the API without major restructuring.

The architecture is not optimized for high concurrency or microservices, as that was beyond the defined scope.

---

## Current Limitations

- No intermediate service layer in the backend (controllers interact directly with models).
- No domain-based modular separation.
- No authentication system.
- No explicit repository pattern implementation.
- Not designed as a microservices architecture.

These decisions reflect the defined scope and maintain appropriate complexity for the project's objectives.

---

## Architectural Summary

TuAutoCom adopts an architecture that is:

- Modular
- Explicit
- Low in coupling
- Based on clear separation of responsibilities
- Structured for controlled incremental evolution

The focus was on maintaining structural coherence and architectural discipline rather than introducing advanced patterns that were unnecessary for the project's scope.
