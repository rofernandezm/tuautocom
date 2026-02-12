Language: [Spanish](README.md) | **English**

# TuAutoCom

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-green.svg)](https://www.mongodb.com/)
[![pnpm](https://img.shields.io/badge/pnpm-8.0+-orange.svg)](https://pnpm.io/)

Full-stack application (API + UI) developed from an open-ended assignment focused on NoSQL databases. 
The objective was to define a domain where a document-oriented model provided advantages over a traditional relational schema, and to design a complete solution applying architectural thinking, technology selection criteria, and technical risk management.

The result is a monorepo-based system composed of a Node.js backend with MongoDB and a modular web interface built with native ES Modules.

---

## What This Repository Demonstrates

This project is not only about functionality, but about applied engineering:

- Conscious evaluation and selection of technologies.
- Domain-driven NoSQL modeling.
- Structured REST API design.
- Clear separation of responsibilities between backend and frontend.
- Modular architecture without unnecessary dependencies.
- Risk-aware decision-making prioritizing stability over experimentation.
- Development discipline and traceability throughout the build process.

---

## Documentation

Complete technical documentation is available in the `/docs` directory:

- [Tech Stack](docs/TECH_STACK_EN.md)
- [Architecture](docs/ARCHITECTURE_EN.md)
- [Project Evolution](docs/PROJECT_EVOLUTION_EN.md)
- [Features](docs/FEATURES_EN.md)
- 
[See complete documentation](docs/README_EN.md)

---

## Monorepo Structure

```
tuAutoComApp
├── backend/
│   ├── public/
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       └── scripts/
├── tuautocom.UI/
│   ├── assets/
│   ├── js/
│   │   ├── components/
│   │   ├── config/
│   │   ├── services/
│   │   ├── utils/
│   │   └── views/
│   └── styles/
└── scripts/
```

- **backend/**: Node.js REST API.
- **tuautocom.UI/**: modular ES Modules-based web interface.
- **scripts/**: auxiliary tooling and environment support.

---

## Key Technical Decisions

### Unified JavaScript Stack (Node.js + ES Modules)

A homogeneous JavaScript ecosystem was chosen for both backend and frontend layers.

**Reasoning**

- Broad industry adoption.
- Mature and battle-tested ecosystem.
- Extensive documentation and community support.
- Cross-layer technological coherence.

**Impact**

- More direct backend–frontend integration.
- Reduced technological friction.
- Lower risk compared to experimental stacks.

---

### MongoDB as Document Model

The project is based on modeling flexible and heterogeneous information where a document-based schema provides advantages over rigid relational structures.

**Reasoning**

- Schema flexibility.
- Natural representation of nested data.
- Use of aggregation pipelines for derived queries.

**Impact**

- Domain-aligned data model.
- Simplified handling of certain complex queries.
- Technically coherent response to the original assignment.

---

### Cloud Cluster Instead of Local Database

A cloud-hosted MongoDB cluster (Atlas) was used instead of a local database.

**Reasoning**

- Environment portability.
- Shared and reproducible setup.
- Alignment with real-world deployment practices.

**Impact**

- Environment independence from local machines.
- Closer approximation to production scenarios.

---

### Modular Frontend Without Heavy Framework

The UI was built using native ES Modules and custom components rather than a full frontend framework.

**Reasoning**

- Explicit architectural control.
- Full understanding of rendering and composition flow.
- Avoid unnecessary complexity for the defined scope.

**Impact**

- Clear structure across `components/`, `views/`, and `services/`.
- Explicit modularization.
- Separation between presentation, logic, and data access.

---

## Architecture Overview

### Backend

- Layered structure: routes, controllers, models, middleware.
- Dedicated configuration module.
- Centralized route handling.
- Persistence using Mongoose-defined models.
- Organized for incremental evolution.

### Frontend

- Native ES Modules in the browser.
- Reusable components under `js/components/`.
- Views under `js/views/`.
- API communication handled in `js/services/`.
- Centralized configuration (theme, constants).
- Build process using pnpm + Tailwind CSS + SASS.

---

## Development Methodology

During development, an internal documentation structure (versioned in a development branch and not included in the final release) was used to maintain:

- Decision traceability.
- Architectural consistency.
- Session tracking.
- Continuity in tool-assisted environments.

This structure acted as a shared technical log, allowing the project to be resumed across environments without context loss and reducing the risk of inconsistencies.

It is part of the development process, not of the system runtime.

---

## How to Run the Project

### Backend

1. Install dependencies:

```bash
pnpm install
```

2. Configure environment variables (including MongoDB URI).
3. Start the server:

```bash
pnpm start
```

### Frontend

1. Install dependencies:

```bash
pnpm install
```

2. Run development environment:

```bash
pnpm run dev
```

3. Serve the application:

```bash
pnpm run serve
```

(See `/docs` for detailed configuration instructions.)

---

## Current Limitations

- No advanced authentication implemented.
- No automated test suite.
- No containerization (Docker).
- Not designed for full production deployment.

These constraints reflect the defined scope of the project.

---

## Context

This project originated from an open academic assignment focused on identifying a scenario where NoSQL would provide advantages over SQL.  
The solution was designed and extended by applying software engineering principles, prioritizing sound technical decisions and architectural coherence over technological experimentation.
