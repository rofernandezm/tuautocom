# TuAutoCom - AI Coding Agent Instructions

## Project Overview

TuAutoCom is a vehicle catalog web application (buy/sell cars) with a **monorepo structure** containing three distinct frontend implementations and one backend API. All projects use **pnpm** as package manager and ES Modules (`"type": "module"`).

### Current Development Phase

**Active**: Frontend implementation with Tailwind CSS based on designs from Stitch (Google). Once UI/styling is complete, backend integration will connect to MongoDB via Mongoose.

**Tech Stack:**
- **Frontend**: Vanilla JS with ES Modules (no framework - by design for learning curve), Tailwind CSS, HTML
- **Backend**: Node.js + Express (MongoDB operations handler)
- **Database**: MongoDB with Mongoose ODM (primary focus of the project)
- **Deployment**: Local server first, cloud deployment TBD

**Project Context:**
- **Educational focus**: MongoDB as primary learning objective
- **Team experience**: Minimal/no prior experience with JavaScript ecosystem and Node.js
- **Frontend/Backend role**: Means to validate and visualize MongoDB operations, not the end goal
- **Future scalability**: Modular architecture designed for easy migration to React (web) or React Native (mobile), and feature expansion (shopping cart, payments, user management)

### Communication Standards

- **Documentation & Comments**: Spanish (for team communication and learning)
- **Code**: English (variable names, function names, classes, etc.)
- **Commit messages**: Spanish
- **JSDoc**: Spanish descriptions with English code examples

## Repository Structure

```
tuautocom/
├── backend/              # Node.js + Express API (MongoDB operations)
├── frontend/             # Production frontend (Vanilla JS)
├── tuautocom.UI/         # Active development (Vanilla JS + Tailwind)
└── .github/              # Repository configuration
```

### Three Frontend Projects

1. **`frontend/`** - Production catalog with modular architecture
   - Vanilla JavaScript with ES6+ modules
   - Class-based components (`CatalogApp`, `Navbar`, `VehicleCard`, etc.)
   - Service layer pattern (`VehicleService`, `AnalyticsService`)
   - Static data (no backend integration yet)

2. **`tuautocom.UI/`** - **ACTIVE DEVELOPMENT** - Tailwind CSS implementation from Stitch designs
   - Vanilla JavaScript (NO frameworks - intentional for learning fundamentals)
   - SASS → Tailwind build pipeline: `input.scss → temp.css → output.css`
   - Centralized theme in `js/config/theme.js` (SINGLE SOURCE OF TRUTH)
   - Component/View/Service pattern
   - Educational comments for learning purposes
   - **Focus**: Complete UI/styling before backend integration

3. **`backend/`** - Express API for MongoDB operations (integration pending)
   - Express v5.1.0 + Mongoose ODM
   - Environment-aware config (`config/env.js` loads `.env.dev` or `.env`)
   - Centralized error handling middleware
   - API routes under `/api` prefix
   - **Will handle**: All database operations via Mongoose

## Critical Development Rules

### Package Manager: pnpm ONLY
```bash
# ✅ Always use pnpm
pnpm install
pnpm run dev

# ❌ Never use npm or yarn
```

### ES Modules Requirements
- All projects use `"type": "module"` in package.json
- **ALWAYS include `.js` extension in imports** (browser requirement)
```javascript
// ✅ CORRECT
import { Header } from './components/Header.js';
import { theme } from '../config/theme.js';

// ❌ WRONG - won't work in browser
import { Header } from './components/Header';
```

### Development Servers
No bundler used - serve files directly:
```bash
# Frontend projects (Node.js HTTP server)
npx http-server -p 8000
# Alternative with auto-reload:
npx live-server --port=8000

# Backend (Node.js)
cd backend && pnpm run dev

# tuautocom.UI (with watch mode)
cd tuautocom.UI && pnpm run dev
```

## Architecture Patterns

### Frontend Component Pattern (tuautocom.UI & frontend)

All components follow this structure:
```javascript
export class ComponentName {
  constructor(data) {
    this.data = data;
  }

  render() {
    const element = document.createElement('div');
    element.className = 'tailwind-classes-here';
    element.innerHTML = `...`;
    this._attachEventListeners(element);
    return element;  // Always return HTMLElement
  }

  _attachEventListeners(element) {
    // Private methods use underscore prefix
  }
}
```

**Key Rules:**
- Components return `HTMLElement` from `render()` method
- Use Tailwind classes inline (avoid separate CSS)
- Private methods prefixed with `_`
- Event listeners in separate method

### View Pattern (Page Components)

```javascript
export class HomeView {
  constructor() { }

  async init() {
    // Async data loading
    this.data = await vehicleService.getFeatured();
  }

  render() {
    // Compose components into full page
    const view = document.createElement('div');
    view.appendChild(new Header().render());
    view.appendChild(this._renderContent());
    return view;
  }

  destroy() {
    // Cleanup: remove listeners, timers
  }
}
```

### Service Pattern (API Layer)

```javascript
class VehicleService {
  async getFeatured() {
    try {
      const response = await api.get('/vehicles/featured');
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}

// Export singleton
export const vehicleService = new VehicleService();
```

**Service Rules:**
- One class per domain/entity
- Always async methods for API calls
- Export as singleton instance
- JSDoc comments on all public methods
- Use try/catch for error handling

## Styling System (tuautocom.UI)

### Centralized Theme Configuration

**⚠️ CRITICAL:** All colors defined in ONE file: `tuautocom.UI/js/config/theme.js`

```javascript
export const theme = {
  colors: {
    primaryDark: '#10231c',    // Main background
    primaryMedium: '#214a3c',   // Buttons, borders
    primaryLight: '#8ecdb7',    // Links, accents
  },
  fonts: {
    sans: ['Inter', 'Noto Sans', 'sans-serif'],
  }
};
```

**This file is used by:**
1. `tailwind.config.js` - Generates Tailwind classes
2. `styles/input.scss` - CSS variables
3. JS components - Direct imports

**To change colors:** Edit ONLY `theme.js`, run `pnpm build`, everything updates automatically.

### Build Pipeline (tuautocom.UI)

```
SCSS → (SASS) → temp.css → (Tailwind) → output.css
```

**Commands:**
```bash
pnpm run dev        # Watch mode: both SASS + Tailwind
pnpm run build      # Build for development
pnpm run build:prod # Build with minification
```

**File roles:**
- `styles/input.scss` - Edit this (custom SASS)
- `styles/temp.css` - Generated (don't edit)
- `styles/output.css` - Final output (don't edit)

## Backend Patterns

### Configuration (backend/src/config/env.js)

Environment-aware configuration system:
- Development: loads `.env.dev`
- Production: loads `.env`
- Falls back to process.env if file missing

```javascript
import config from './config/env.js';
// config.PORT, config.DATABASE_URL, config.NODE_ENV, etc.
```

### API Structure

```javascript
// backend/src/app.js
app.use('/api', apiRouter);  // All routes under /api prefix
```

**Current example routes:**
- `GET /api/json` - JSON response
- `GET /api/html` - HTML response
- `POST /api/` - Echo JSON data

### Error Handling

Centralized middleware in `middleware/errorHandler.js`:
- Catches all unhandled errors
- Logs with stack trace in development
- Returns consistent JSON format
- Hides details in production

## Naming Conventions

### File Naming

```javascript
js/components/VehicleCard.js        // PascalCase for components
js/views/HomeView.js                // PascalCase + View suffix for views/pages
js/services/vehicleService.js       // camelCase for services
js/utils/formatPrice.js             // camelCase for utilities
js/config/theme.js                  // camelCase for configuration
```

### Code Naming

```javascript
// Classes - PascalCase
class VehicleCard { }
class HomeView { }

// Variables & Functions - camelCase
const vehicleData = { };
function formatPrice(amount) { }

// Constants - UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com';
const MAX_ITEMS = 100;

// Private Methods - _camelCase (underscore prefix for clarity)
class Component {
  _attachEventListeners() { }
  _validateData() { }
}

// Service Instances - camelCase (singleton exports)
export const vehicleService = new VehicleService();
export const authService = new AuthService();
```

### CSS/Tailwind Naming

```javascript
// Tailwind classes - kebab-case (framework convention)
className = 'bg-primary-dark text-primary-light border-primary-medium'

// Custom CSS classes - kebab-case (if absolutely necessary)
.vehicle-card { }
.hero-section { }
```

### Why These Conventions?

- **PascalCase for components/classes**: JavaScript standard, easy to identify constructors
- **camelCase for instances/functions**: JavaScript standard, distinguishes from classes
- **Underscore for private methods**: Visual clarity for educational purposes (vs # private fields)
- **UPPER_SNAKE_CASE for constants**: Clear distinction of immutable values
- **kebab-case for CSS**: Standard web convention, works with Tailwind

### Directory Structure Conventions

```
js/
├── components/          # Reusable UI components (PascalCase.js)
├── views/              # Full page views (PascalCaseView.js)
├── services/           # API/business logic (camelCase.js)
├── utils/              # Helper functions (camelCase.js)
└── config/             # Configuration files (camelCase.js)
```

## Documentation Standards

### JSDoc Comments

All components, views, services, and utility functions should include JSDoc documentation:

**Components:**
```javascript
/**
 * VehicleCard Component
 * Tarjeta para mostrar información de un vehículo
 * 
 * @class
 * @param {Object} vehicleData - Información del vehículo
 * @param {string} vehicleData.id - Identificador único del vehículo
 * @param {string} vehicleData.name - Nombre del vehículo
 * @param {string} vehicleData.price - Precio formateado
 * @param {string} [vehicleData.badge] - Badge opcional (popular, económico, etc.)
 * 
 * @example
 * const card = new VehicleCard({
 *   id: 'v1',
 *   name: 'Toyota Camry',
 *   price: '$29,000',
 *   badge: 'popular'
 * });
 * document.body.appendChild(card.render());
 */
export class VehicleCard {
  constructor(vehicleData) {
    this.data = vehicleData;
  }

  /**
   * Renderiza la tarjeta del vehículo como un HTMLElement
   * @returns {HTMLElement} El elemento de la tarjeta renderizado
   */
  render() {
    // ...
  }

  /**
   * Adjunta event listeners al elemento de la tarjeta
   * @private
   * @param {HTMLElement} element - El elemento de la tarjeta
   */
  _attachEventListeners(element) {
    // ...
  }
}
```

**Services:**
```javascript
/**
 * Vehicle Service
 * Maneja todas las operaciones relacionadas con vehículos
 * @class
 */
class VehicleService {
  /**
   * Obtiene vehículos destacados desde la API
   * @async
   * @returns {Promise<Array<Object>>} Array de objetos de vehículos destacados
   * @throws {Error} Cuando la petición a la API falla
   * 
   * @example
   * const vehicles = await vehicleService.getFeatured();
   */
  async getFeatured() {
    try {
      const response = await api.get('/vehicles/featured');
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}

// Exportar como singleton
export const vehicleService = new VehicleService();
```

**Utility Functions:**
```javascript
/**
 * Formatea un número como string de precio
 * @param {number} amount - La cantidad a formatear
 * @param {string} [currency='USD'] - Código de moneda
 * @returns {string} String de precio formateado
 * 
 * @example
 * formatPrice(29000) // retorna "$29,000"
 * formatPrice(29000, 'EUR') // retorna "€29,000"
 */
export function formatPrice(amount, currency = 'USD') {
  // ...
}
```

**Mejores Prácticas de JSDoc:**
- Documentar todas las clases y métodos públicos
- Usar `@param` para parámetros con información de tipos
- Usar `@returns` para describir valores de retorno
- Usar `@throws` para errores potenciales
- Usar `@example` para mostrar uso
- Usar `@private` para métodos internos
- Usar `@async` para funciones asíncronas
- Usar sintaxis `[paramName]` para parámetros opcionales
- **Escribir descripciones en español** (código en inglés)

## Common Workflows

### Agregar un Componente (tuautocom.UI)

1. Crear archivo: `js/components/NewComponent.js`
2. Agregar documentación JSDoc de la clase (en español)
3. Seguir el patrón de componentes (constructor, render, _attachEventListeners)
4. Usar colores del tema desde `js/config/theme.js`
5. Documentar métodos públicos con JSDoc (descripciones en español)
6. Exportar como named export: `export class NewComponent`
7. Importar con extensión .js

**Nota educativa**: Si el equipo no está familiarizado con ES Modules, incluir comentarios explicativos sobre el patrón.

### Agregar un Servicio (tuautocom.UI)

1. Crear archivo: `js/services/newService.js`
2. Agregar documentación JSDoc de la clase (en español)
3. Crear clase con métodos async
4. Documentar todos los métodos públicos con JSDoc (@param, @returns, @throws en español)
5. Exportar como singleton: `export const newService = new NewService()`
6. Importar en views/components con extensión .js

**Nota educativa**: Incluir explicaciones sobre async/await y manejo de promesas si es código nuevo para el equipo.

### Agregar una Ruta de Backend

1. Agregar ruta en `backend/src/routes/index.js`
2. Usar sintaxis de Express v5.1.0
3. Manejar errores en la ruta o dejar que errorHandler los capture
4. Todas las rutas auto-prefijadas con `/api`
5. Documentar el endpoint y su propósito (operación MongoDB que realiza)

**Nota educativa**: Enfocarse en explicar qué operación de MongoDB se ejecuta, no solo el código Express.

### Trabajar con Estilos (tuautocom.UI)

1. Editar `styles/input.scss` para SASS custom
2. Ejecutar `pnpm run dev` para watch de cambios
3. Usar clases de Tailwind en componentes JS
4. Referenciar tema vía `var(--color-primary-dark)` en SCSS

### Integrar Frontend con Backend (Fase 2)

**Objetivo**: Frontend como visualizador de operaciones MongoDB

1. Identificar operación MongoDB a visualizar (CRUD en colecciones)
2. Crear/actualizar endpoint en backend que ejecute operación Mongoose
3. Actualizar servicio frontend para llamar endpoint
4. Renderizar resultados en componente/vista
5. **Documentar** qué operación de MongoDB se está visualizando

**Ejemplo**: Listar vehículos = `Vehicle.find()` en MongoDB visualizado en `CatalogView`

## Project-Specific Decisions

### Why Three Frontends?

- **frontend/** - Original production version, stable reference
- **tuautocom.UI/** - **PRIMARY DEVELOPMENT** - Implementing Stitch (Google) designs with Tailwind
- Both serve as reference implementations during transition

### Why No Framework?

**Deliberate architectural decision** to use Vanilla JavaScript for:
- **Lower learning curve** - Focus on fundamentals before framework complexity
- **Educational value** - Deep understanding of web technologies
- **Full control** - No framework abstractions
- **Future flexibility** - Clean migration path to React (web) or React Native (mobile)
- **Browser-native** - ES Modules without build complexity

### Current Development Workflow

1. **Phase 1 (Current)**: Frontend UI/styling implementation from Stitch designs
2. **Phase 2 (Next)**: Backend integration - Frontend as visualization layer for MongoDB operations
3. **Phase 3 (Future)**: Feature expansion (cart, payments, user management)
4. **Phase 4 (Future)**: Framework migration if needed (React/React Native)

### Mock Data vs Backend

- **Current**: Both frontends use static mock data in services
- **Backend ready**: API exists with MongoDB/Mongoose configuration
- **Integration approach**: Backend handles ALL database operations, frontend visualizes results
- **When connecting**: Update service methods to call backend `/api/*` endpoints while maintaining service interface

## Key Documentation Files

Reference these for deeper context:
- `tuautocom.UI/.vscode/agent/AGENT.md` - Guía completa de desarrollo, patrones y estándares
- `tuautocom.UI/.vscode/agent/CONTEXT.md` - Contexto del proyecto y estado actual
- `tuautocom.UI/.vscode/agent/sessions/` - Historial de sesiones de desarrollo
- `frontend/MODULAR_STRUCTURE.md` - Explicación de arquitectura
- `backend/README.md` - Detalles de API y backend
- `tuautocom.UI/README.md` - Build pipeline y estructura

**Para AI Agents**: Consultar AGENT.md y CONTEXT.md antes de implementar. Contienen decisiones arquitectónicas, patrones establecidos y contexto educativo del proyecto.

## Running the Project

### Local Development (Current Focus)

```bash
# TuAutoCom.UI (PRIMARY - Active development)
cd tuautocom.UI
pnpm install
pnpm run dev  # Watches SASS + Tailwind changes
# In another terminal:
npx http-server -p 8000  # Serve at http://localhost:8000
# Or with auto-reload:
npx live-server --port=8000

# Backend API (Ready for integration)
cd backend
pnpm install
pnpm run dev  # http://localhost:8000/api

# Frontend (Reference - Stable version)
cd frontend
npx http-server -p 8000
```

### Deployment Strategy

- **Priority**: Local server functionality first
- **Cloud deployment**: To be evaluated later based on needs and available tools
- **Testing**: Manual testing in local environment during development

## What NOT to Do

- ❌ No usar npm/yarn (usar pnpm)
- ❌ No omitir `.js` en imports (ES Modules lo requiere)
- ❌ No editar archivos CSS generados (temp.css, output.css)
- ❌ No hardcodear colores (usar theme.js)
- ❌ No agregar frameworks (React, Vue, etc.)
- ❌ No usar bundlers (Webpack, Vite) - mantener ES Modules nativos
- ❌ No usar @apply en CSS (preferir componentes)
- ❌ No omitir documentación JSDoc en código nuevo
- ❌ No usar `var` (usar `const` o `let`)
- ❌ No crear componentes profundamente anidados (mantener plano)
- ❌ No asumir conocimiento avanzado de JS - explicar conceptos cuando sea código educativo

## AI Agent Guidelines

### Educational Context

**Remember**: El equipo tiene **experiencia mínima/nula** con JavaScript y Node.js. Al generar código:

1. **Incluir comentarios educativos** cuando sea apropiado:
   ```javascript
   // 📝 NOTA EDUCATIVA: async/await permite código asíncrono más legible
   async function fetchData() {
     const data = await api.get('/endpoint');
     return data;
   }
   ```

2. **Explicar decisiones técnicas** en JSDoc o comentarios
3. **Usar patrones consistentes** - facilita el aprendizaje
4. **Preferir código explícito sobre "clever code"**
5. **Documentar en español** - idioma del equipo

### MongoDB Focus

**Recordar**: MongoDB es el objetivo principal, frontend/backend son herramientas.

Al trabajar con backend:
- Documentar claramente qué operación MongoDB ejecuta cada endpoint
- Explicar el propósito de cada operación CRUD
- Vincular operaciones frontend con operaciones MongoDB correspondientes

Ejemplo:
```javascript
/**
 * Obtiene todos los vehículos de la base de datos
 * Operación MongoDB: Vehicle.find()
 * @returns {Promise<Array>} Lista de vehículos desde MongoDB
 */
async getAll() {
  // Esta función ejecuta Vehicle.find() en MongoDB
  const response = await api.get('/vehicles');
  return response.data;
}
```
