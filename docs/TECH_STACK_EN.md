🌐 Language: [Spanish](TECH_STACK.md) | **English**

# Tech Stack

This document outlines the technologies used in TuAutoCom and the reasoning behind their selection.

The goal was not to experiment with emerging tools, but to rely on a stable, widely adopted stack with architectural coherence across layers.

## Backend

### Node.js

Primary server runtime.

Reason for selection:
- Strong adoption in web development.
- Mature ecosystem.
- Natural integration with frontend JavaScript.
- Low technological risk.

### Express.js

Minimalist framework for building the REST API.

Reason for selection:
- Simplicity and explicit control.
- No unnecessary abstractions.
- Clear structure for routes, middleware, and controllers.

### MongoDB

Document-oriented database.

Reason for selection:
- Flexible schema for heterogeneous data.
- Natural representation of nested structures.
- Aggregation pipelines for derived queries.
- Direct alignment with the project’s original objective.

### MongoDB Atlas (Cloud Cluster)

Cloud-hosted MongoDB instance.

Reason for selection:
- Environment portability.
- Reproducible configuration.
- Independence from local setups.
- Closer alignment with real-world deployment scenarios.

### Mongoose

ODM for MongoDB.

Reason for selection:
- Explicit schema definitions.
- Built-in validations.
- Structured data modeling.
- Adds structural consistency on top of the document model.

## Frontend

### Native ES Modules (JavaScript)

Browser-based modular system using ECMAScript modules.

Reason for selection:
- Modular architecture without a heavy framework.
- Explicit dependency control.
- Clear separation between components, views, and services.

### Tailwind CSS

Utility-first CSS framework.

Reason for selection:
- Rapid UI construction.
- Visual consistency.
- Reduced need for custom CSS.

### SASS

CSS preprocessor.

Reason for selection:
- Structured styling.
- Variables and modular organization.
- Improved maintainability.

## Dependency Management

### pnpm

Package manager used for both backend and frontend.

Reason for selection:
- Efficient dependency handling.
- Deterministic installations.
- Performance improvements compared to traditional alternatives.

## Repository Organization

### Monorepo

Backend and frontend coexist within a single repository.

Reason for selection:
- Full system visibility.
- Direct coordination between layers.
- Simplified synchronization of changes.

## Development Tooling

During development, tool-assisted workflows were used under explicit documentation and structural guidelines (versioned in a development branch).

Purpose:
- Maintain decision traceability.
- Reduce context loss.
- Ensure architectural consistency.
- Avoid blind reliance on automation.

These tools are part of the development process, not part of the system runtime.

## Strategic Summary

The stack was selected prioritizing:
- Stability over novelty.
- Proven ecosystems over experimentation.
- Cross-layer coherence.
- Explicit architectural control.
- Environment portability.

The chosen combination enables building a complete system with low technological risk and strong maintainability.