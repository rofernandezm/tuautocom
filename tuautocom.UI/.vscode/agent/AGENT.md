# 🤖 Agent Instructions - TuAutoCom Frontend

> **Propósito**: Este documento sirve como guía de desarrollo para mantener consistencia en arquitectura, tecnologías, patrones y estándares del proyecto TuAutoCom Frontend.

---

## ⚠️ INSTRUCCIONES CRÍTICAS PARA EL AGENTE

### 📌 USO DE ESTE DOCUMENTO

1. **SIEMPRE consultar este documento** antes de implementar cualquier funcionalidad
2. **SIEMPRE proponer actualizaciones** cuando se tomen nuevas decisiones arquitectónicas
3. **SIEMPRE pedir confirmación** antes de actualizar este documento
4. **NUNCA ignorar** los patrones y estándares establecidos aquí
5. **NUNCA implementar** sin antes validar contra estas instrucciones

### 🔄 Proceso de Actualización

```
1. Detectar nueva decisión/patrón durante desarrollo
2. Proponer actualización al AGENT.md
3. Esperar confirmación del usuario
4. Actualizar documento
5. Continuar con implementación siguiendo el nuevo estándar
```

### 📍 Ubicación y Recursos

- **Path**: `.vscode/agent/AGENT.md` (este archivo)
- **Contexto**: `.vscode/agent/CONTEXT.md` - Estado del proyecto
- **Historial**: `.vscode/agent/sessions/` - Log de sesiones de desarrollo
  - **Última sesión**: `sessions/2025-10-18-setup-inicial.md`
  
**Para recuperar contexto completo**: Leer archivo de sesión más reciente

- **Siempre usar** estos documentos como fuente de verdad

---

## 📋 INFORMACIÓN DEL PROYECTO

### Descripción
Aplicación web frontend para catálogo de vehículos (compra/venta de autos). Interfaz moderna con JavaScript vanilla y Tailwind CSS, integrada con backend Node.js.

### Ubicación Final
```
[proyecto-raiz]/
├── backend/              # Node.js API (existente)
└── frontend/             # tuautocom.UI (este proyecto)
    ├── designs/          # Diseños raw de Stitch
    ├── js/               # Código fuente JavaScript
    ├── styles/           # Estilos CSS
    └── index.html
```

**Nota**: Actualmente en desarrollo en `/home/rodrigo/blds/nosql/project/tuautocom.UI/`, se moverá después.

---

## 🏗️ STACK TECNOLÓGICO

### Core
- **JavaScript**: Vanilla JS con ES Modules (ES6+)
  - No frameworks (React, Vue, Angular, etc.)
  - Módulos nativos del navegador
  - Sintaxis moderna: async/await, destructuring, arrow functions, etc.

- **CSS**: Tailwind CSS v3.4+ con SASS
  - Instalación local (NO CDN en producción)
  - PostCSS + Autoprefixer
  - SASS para estilos custom avanzados
  - Utility-first approach

- **Package Manager**: pnpm
  - Consistencia con backend
  - Eficiencia en espacio y velocidad

### Build Tools
- **SASS**: Preprocesador CSS para estilos custom
- **Tailwind CLI**: Compilación de clases de utilidad
- **Concurrently**: Ejecutar múltiples watchers en paralelo
- **Sin bundler**: ES Modules nativos (por ahora)
- **Servidor de desarrollo**: Python http.server o similar

### Build Pipeline
```
SCSS → (SASS) → temp.css → (Tailwind) → output.css
```

---

## 🎨 DISEÑO Y ESTILOS

### Sistema de Tema Centralizado

**⚠️ IMPORTANTE**: La paleta de colores está centralizada en un único archivo:

```javascript
// js/config/theme.js - ÚNICA FUENTE DE VERDAD
export const theme = {
  colors: {
    primaryDark: '#10231c',
    primaryMedium: '#214a3c',
    primaryLight: '#8ecdb7',
  }
};
```

**Este archivo es usado por:**
1. ✅ `tailwind.config.js` - Genera clases de Tailwind (bg-primary-dark, text-primary-light, etc.)
2. ✅ `styles/input.scss` - CSS variables (:root --color-primary-dark)
3. ✅ Componentes JS - Import directo (theme.colors.primaryDark)

**Para cambiar colores del proyecto:**
- Editar SOLO `js/config/theme.js`
- Ejecutar `pnpm build`
- Todo se actualiza automáticamente

### Uso de Colores en el Código

**En componentes JS:**
```javascript
import { theme } from '../config/theme.js';

// Usar valores directamente
element.style.backgroundColor = theme.colors.primaryDark;
```

**En templates HTML (clases de Tailwind):**
```javascript
// ✅ CORRECTO: Usar clases de Tailwind
element.className = 'bg-primary-dark text-primary-light';
```

**En SCSS custom:**
```scss
// Usar CSS variables
.my-component {
  background-color: var(--color-primary-dark);
  border-color: var(--color-primary-medium);
  
  &:hover {
    color: var(--color-primary-light);
  }
}
```
```

### Tipografía
- **Fuentes principales**: Inter, Noto Sans (Google Fonts)
- **Pesos disponibles**: 400, 500, 700, 900

### Origen de Diseños
- **Herramienta**: Stitch (stitch.withgoogle.com)
- **Formato**: HTML con clases de Tailwind
- **Proceso**: 
  1. Diseños raw → `/designs/`
  2. Análisis y extracción de componentes
  3. Implementación modular → `/js/components/` y `/js/views/`

---

## 📐 ARQUITECTURA DE CÓDIGO

### Estructura de Directorios

```
tuautocom.UI/
├── .vscode/                    # 🔧 VS Code configuration
│   ├── agent/                 # 📚 Agent documentation
│   │   ├── AGENT.md          # 🤖 Este archivo - Instrucciones del agente
│   │   ├── CONTEXT.md        # 📋 Contexto del proyecto
│   │   └── README.md
│   └── mcp.json              # Model Context Protocol config
│
├── designs/                    # 📁 Temporal - Diseños raw de Stitch
│   ├── README.md
│   └── code.html              # Diseño Home
│
├── js/
│   ├── main.js                # 🚀 Entry point de la aplicación
│   │
│   ├── config/
│   │   ├── config.js          # ⚙️ Configuración global (API URL, etc.)
│   │   └── theme.js           # 🎨 TEMA - Única fuente de verdad para colores
│   │
│   ├── components/            # 🧩 Componentes reutilizables
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   ├── VehicleCard.js
│   │   ├── VehicleCarousel.js
│   │   └── ...
│   │
│   ├── views/                 # 📄 Vistas/Páginas completas
│   │   ├── HomeView.js
│   │   ├── CatalogView.js
│   │   ├── VehicleDetailView.js
│   │   └── ...
│   │
│   ├── services/              # 🔌 Comunicación con API
│   │   ├── api.js             # Cliente HTTP base
│   │   ├── vehicleService.js
│   │   ├── authService.js
│   │   └── ...
│   │
│   └── utils/                 # 🛠️ Utilidades y helpers
│       ├── helpers.js
│       ├── validators.js
│       └── ...
│
├── styles/
│   ├── input.scss             # 📝 Source SASS (editar este)
│   ├── temp.css               # 🔄 Temporal (generado por SASS, no editar)
│   └── output.css             # 🎨 Final (generado por Tailwind, no editar)
│
├── .gitignore
├── index.html                 # 🏠 HTML principal
├── package.json               # 📦 Dependencias y scripts
├── pnpm-lock.yaml             # 🔒 Lock file de pnpm
├── postcss.config.js          # ⚙️ Configuración PostCSS
├── tailwind.config.js         # ⚙️ Configuración Tailwind (usa theme.js)
└── README.md                  # 📖 Documentación pública
```

---

## 🧩 PATRONES DE CÓDIGO

### 1. Componentes (Component Pattern)

**Estructura de un componente:**
```javascript
// js/components/VehicleCard.js

/**
 * VehicleCard Component
 * Tarjeta para mostrar información de un vehículo
 */

export class VehicleCard {
  constructor(vehicleData) {
    this.data = vehicleData;
  }

  /**
   * Renderiza el componente y retorna el elemento DOM
   * @returns {HTMLElement}
   */
  render() {
    const card = document.createElement('div');
    card.className = 'flex h-full flex-1 flex-col gap-4 rounded-lg min-w-60';
    
    card.innerHTML = `
      <div class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg"
           style="background-image: url('${this.data.image}')">
      </div>
      <div>
        <p class="text-white text-base font-medium leading-normal">
          ${this.data.title}
        </p>
        <p class="text-primary-light text-sm font-normal leading-normal">
          ${this.data.description}
        </p>
      </div>
    `;
    
    this._attachEventListeners(card);
    return card;
  }

  _attachEventListeners(element) {
    element.addEventListener('click', () => {
      console.log('Vehicle clicked:', this.data.id);
    });
  }
}
```

**Reglas:**
- ✅ Usar clases ES6
- ✅ Constructor recibe datos
- ✅ Método `render()` retorna HTMLElement
- ✅ Eventos en métodos privados (`_attachEventListeners`)
- ✅ Clases de Tailwind inline (no CSS separado para componentes)

---

### 2. Vistas (View Pattern)

**Estructura de una vista:**
```javascript
// js/views/HomeView.js

import { Header } from '../components/Header.js';
import { VehicleCarousel } from '../components/VehicleCarousel.js';
import { Footer } from '../components/Footer.js';
import { vehicleService } from '../services/vehicleService.js';

/**
 * Home View
 * Vista principal de la aplicación
 */

export class HomeView {
  constructor() {
    this.container = null;
  }

  async init() {
    // Cargar datos necesarios
    this.featuredVehicles = await vehicleService.getFeatured();
    this.cheapestVehicles = await vehicleService.getCheapest();
  }

  render() {
    const view = document.createElement('div');
    view.className = 'relative flex h-auto min-h-screen w-full flex-col bg-primary-dark';
    
    // Componer vista con componentes
    const header = new Header();
    const carousel = new VehicleCarousel(this.featuredVehicles);
    const footer = new Footer();
    
    view.appendChild(header.render());
    view.appendChild(this._renderHeroSection());
    view.appendChild(carousel.render());
    view.appendChild(footer.render());
    
    return view;
  }

  _renderHeroSection() {
    // Renderizar sección específica de la vista
    const hero = document.createElement('div');
    hero.className = '...';
    hero.innerHTML = `...`;
    return hero;
  }

  destroy() {
    // Limpieza: remover event listeners, timers, etc.
  }
}
```

**Reglas:**
- ✅ Una clase por vista/página
- ✅ Método `init()` async para cargar datos
- ✅ Método `render()` compone componentes
- ✅ Método `destroy()` para cleanup
- ✅ Importar componentes necesarios

---

### 3. Servicios (Service Pattern)

**Estructura de un servicio:**
```javascript
// js/services/vehicleService.js

import { api } from './api.js';

/**
 * Vehicle Service
 * Maneja todas las operaciones relacionadas con vehículos
 */

class VehicleService {
  /**
   * Obtiene vehículos destacados
   * @returns {Promise<Array>}
   */
  async getFeatured() {
    try {
      const response = await api.get('/vehicles/featured');
      return response.data;
    } catch (error) {
      console.error('Error fetching featured vehicles:', error);
      throw error;
    }
  }

  /**
   * Obtiene detalles de un vehículo
   * @param {string} id - ID del vehículo
   * @returns {Promise<Object>}
   */
  async getById(id) {
    const response = await api.get(`/vehicles/${id}`);
    return response.data;
  }

  /**
   * Busca vehículos por filtros
   * @param {Object} filters - Filtros de búsqueda
   * @returns {Promise<Array>}
   */
  async search(filters) {
    const response = await api.post('/vehicles/search', filters);
    return response.data;
  }
}

// Exportar instancia única (Singleton)
export const vehicleService = new VehicleService();
```

**Reglas:**
- ✅ Una clase por dominio/entidad
- ✅ Métodos async para llamadas API
- ✅ Manejo de errores con try/catch
- ✅ Documentación JSDoc
- ✅ Exportar como singleton
- ✅ Usar cliente HTTP centralizado (`api.js`)

---

### 4. Cliente HTTP Base

```javascript
// js/services/api.js

import { config } from '../config/config.js';

/**
 * HTTP Client
 * Cliente base para comunicación con API
 */

class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, { ...defaultOptions, ...options });
      
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  async get(endpoint, options = {}) {
    return this.request(endpoint, { method: 'GET', ...options });
  }

  async post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options,
    });
  }

  async put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options,
    });
  }

  async delete(endpoint, options = {}) {
    return this.request(endpoint, { method: 'DELETE', ...options });
  }
}

export const api = new ApiClient(config.apiUrl);
```

**Reglas:**
- ✅ Cliente centralizado (único punto de configuración)
- ✅ Métodos para cada verbo HTTP
- ✅ Manejo de errores unificado
- ✅ Headers por defecto
- ✅ Usar Fetch API nativo

---

## 📝 ESTÁNDARES DE CÓDIGO

### Nomenclatura

**Archivos:**
- Componentes: `PascalCase.js` → `VehicleCard.js`
- Servicios: `camelCase.js` → `vehicleService.js`
- Utilidades: `camelCase.js` → `helpers.js`
- Vistas: `PascalCaseView.js` → `HomeView.js`

**Variables y Funciones:**
- Variables/constantes: `camelCase`
- Clases: `PascalCase`
- Métodos privados: `_camelCase` (prefijo underscore)
- Constantes globales: `UPPER_SNAKE_CASE`

**CSS (Tailwind):**
- Usar clases de utilidad directamente
- Custom classes en `input.css` solo si es absolutamente necesario
- Preferir componentes JS sobre @apply en CSS

### Imports/Exports

```javascript
// ✅ CORRECTO: Named exports
export class VehicleCard { }
export const vehicleService = new VehicleService();

// ✅ CORRECTO: Imports con extensión .js
import { VehicleCard } from './components/VehicleCard.js';
import { vehicleService } from './services/vehicleService.js';

// ❌ INCORRECTO: Sin extensión (no funciona en navegador)
import { VehicleCard } from './components/VehicleCard';
```

### Comentarios y Documentación

```javascript
/**
 * Descripción breve del componente/función
 * 
 * @param {Type} paramName - Descripción del parámetro
 * @returns {Type} Descripción del retorno
 * @throws {Error} Cuándo puede lanzar error
 */
```

### Manejo de Errores

```javascript
// ✅ CORRECTO: Try/catch en operaciones async
async loadData() {
  try {
    const data = await vehicleService.getFeatured();
    this.renderData(data);
  } catch (error) {
    console.error('Error loading data:', error);
    this.renderError('No se pudieron cargar los datos');
  }
}

// ✅ CORRECTO: Validación de datos
render(data) {
  if (!data || !Array.isArray(data)) {
    console.warn('Invalid data provided to render');
    return this.renderEmpty();
  }
  // ... render logic
}
```

---

## 🎯 COMPONENTES IDENTIFICADOS

### Componentes Base (Reusables)
- [ ] `Header.js` - Navegación principal
- [ ] `Footer.js` - Footer con links y redes sociales
- [ ] `VehicleCard.js` - Tarjeta de vehículo
- [ ] `VehicleCarousel.js` - Carrusel horizontal
- [ ] `CategoryFilter.js` - Pills/badges de categorías
- [ ] `HeroSection.js` - Banner hero
- [ ] `SearchBar.js` - Barra de búsqueda
- [ ] `Button.js` - Botón reutilizable
- [ ] `Modal.js` - Modal genérico

### Vistas Planificadas
- [ ] `HomeView.js` - Página principal (diseño ✅)
- [ ] `CatalogView.js` - Listado de vehículos
- [ ] `VehicleDetailView.js` - Detalle de vehículo
- [ ] `LoginView.js` - Inicio de sesión
- [ ] `RegisterView.js` - Registro de usuario
- [ ] `UploadVehicleView.js` - Cargar vehículo

### Servicios Necesarios
- [ ] `api.js` - Cliente HTTP base
- [ ] `vehicleService.js` - CRUD de vehículos
- [ ] `authService.js` - Autenticación
- [ ] `categoryService.js` - Categorías
- [ ] `userService.js` - Gestión de usuarios

---

## 🚀 FLUJO DE TRABAJO

### 1. Agregar un Nuevo Componente

```bash
# 1. Crear archivo en /js/components/
touch js/components/NewComponent.js

# 2. Implementar siguiendo el patrón establecido
# 3. Exportar la clase
# 4. Importar donde se necesite
# 5. Probar en navegador
```

### 2. Agregar una Nueva Vista

```bash
# 1. Crear archivo en /js/views/
touch js/views/NewView.js

# 2. Implementar init() y render()
# 3. Importar componentes necesarios
# 4. Conectar con router (cuando exista)
# 5. Probar navegación
```

### 3. Trabajar con Diseños de Stitch

```bash
# 1. Recibir HTML de Stitch → guardar en /designs/
# 2. Analizar estructura y componentes
# 3. Identificar patrones reutilizables
# 4. Extraer a componentes JS
# 5. Implementar en /js/components/ y /js/views/
# 6. Mantener diseño raw como referencia
```

### 4. Desarrollo con SASS y Tailwind

```bash
# Terminal 1: Watch mode (SASS + Tailwind simultáneamente)
pnpm dev

# Terminal 2: Servidor de desarrollo
pnpm serve

# Navegador: http://localhost:8000
```

**El comando `pnpm dev` ejecuta:**
- `sass --watch` → Compila SCSS a CSS
- `tailwindcss --watch` → Procesa clases de Tailwind
- Ambos en paralelo con `concurrently`

### 5. Modificar Colores del Proyecto

```bash
# 1. Editar js/config/theme.js
# 2. Guardar cambios
# 3. Si estás en dev mode, recarga automáticamente
# 4. Si no, ejecutar: pnpm build
```

---

## ⚙️ CONFIGURACIÓN

### package.json Scripts

```json
{
  "scripts": {
    "dev:sass": "sass --watch styles/input.scss:styles/temp.css",
    "dev:tailwind": "pnpm exec tailwindcss -i ./styles/temp.css -o ./styles/output.css --watch",
    "dev": "concurrently \"pnpm:dev:sass\" \"pnpm:dev:tailwind\"",
    "build:sass": "sass styles/input.scss:styles/temp.css",
    "build:tailwind": "pnpm exec tailwindcss -i ./styles/temp.css -o ./styles/output.css",
    "build": "pnpm build:sass && pnpm build:tailwind",
    "build:prod": "pnpm build:sass && pnpm exec tailwindcss -i ./styles/temp.css -o ./styles/output.css --minify",
    "serve": "python3 -m http.server 8000"
  }
}
```

### tailwind.config.js

```javascript
import { theme } from './js/config/theme.js';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        'primary-dark': theme.colors.primaryDark,
        'primary-medium': theme.colors.primaryMedium,
        'primary-light': theme.colors.primaryLight,
      },
      fontFamily: {
        sans: theme.fonts.sans,
      },
    },
  },
  plugins: [],
}
```

### .gitignore

```
node_modules/
.pnpm-store/
.DS_Store
*.log
.env
styles/output.css
dist/
```

---

## 🔄 DECISIONES PENDIENTES

### Próximas Decisiones a Tomar
- [ ] **Router**: ¿Hash-based (#/) o History API?
- [ ] **State Management**: ¿Necesario? ¿Patrón Observer/PubSub?
- [ ] **Build System**: ¿Agregar Vite/esbuild más adelante?
- [ ] **Testing**: ¿Framework? (Vitest, Jest, etc.)
- [ ] **Validación de formularios**: ¿Librería o custom?

### Decisiones que DEBEN Confirmarse
⚠️ **IMPORTANTE**: No implementar ninguna de estas sin confirmación explícita:
- Nuevas dependencias/librerías
- Cambios en la estructura de carpetas
- Nuevos patrones de código
- Modificaciones a la arquitectura base

---

## 📋 CHECKLIST DE DESARROLLO

### Antes de Crear un Componente
- [ ] ¿Ya existe un componente similar?
- [ ] ¿Es realmente reutilizable o es específico de una vista?
- [ ] ¿Qué props/datos necesita?
- [ ] ¿Tiene eventos/interacciones?

### Antes de Hacer Commit
- [ ] Código sigue los estándares establecidos
- [ ] Nombres de variables/funciones son descriptivos
- [ ] Comentarios JSDoc en funciones públicas
- [ ] Sin console.logs de debug
- [ ] **SASS y Tailwind CSS compilados** correctamente (`pnpm build`)
- [ ] Probado en navegador
- [ ] **theme.js actualizado** si cambiaron colores

### Antes de Integrar con Backend
- [ ] Endpoints documentados
- [ ] Manejo de errores implementado
- [ ] Loading states considerados
- [ ] Validación de datos del servidor

---

## 🆘 TROUBLESHOOTING

### CSS no se actualiza
```bash
# Verificar que el watch esté corriendo
pnpm dev

# Forzar rebuild
pnpm build
```

### Módulos no se cargan
```bash
# Verificar que uses .js en imports
import { X } from './file.js'  # ✅
import { X } from './file'     # ❌

# Verificar que el servidor esté corriendo
pnpm serve
```

### Tailwind classes no funcionan
```bash
# Verificar que el path esté en tailwind.config.js content
# Verificar que output.css esté linkeado en index.html
# Reconstruir CSS
pnpm build
```

---

## 📚 RECURSOS Y REFERENCIAS

### Documentación
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [MDN Web Docs - ES Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [MDN Web Docs - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

### Diseños
- Diseños raw: `/designs/`
- Stitch: https://stitch.withgoogle.com

---

## 🔄 VERSIONADO DE ESTE DOCUMENTO

**v1.2.0** - 2025-10-18
- Implementado sistema de tema centralizado (`js/config/theme.js`)
- Agregado SASS para estilos custom
- Actualizado build pipeline (SASS → Tailwind)
- Documentado uso de colores en diferentes contextos

**v1.1.0** - 2025-10-18
- Actualizada estructura de directorios (agent movido a .vscode/)
- Agregadas instrucciones críticas para el agente
- Enfatizado proceso de actualización del documento

**v1.0.0** - 2025-10-18
- Versión inicial
- Stack tecnológico definido
- Patrones de código establecidos
- Arquitectura base documentada

---

**Última actualización**: 2025-10-18
**Próxima revisión**: Después de implementar los primeros 3 componentes

---

## 💡 NOTA IMPORTANTE PARA EL AGENT AI

### Este documento es tu FUENTE DE VERDAD

1. **CONSULTA este documento** antes de cada implementación
2. **SIGUE estrictamente** los patrones establecidos
3. **PROPÓN actualizaciones** cuando detectes nuevas decisiones
4. **PIDE CONFIRMACIÓN** antes de actualizar
5. **MANTÉN CONSISTENCIA** con lo documentado aquí

### Recuperar Contexto de Sesiones Anteriores

**Al inicio de cada sesión**:
1. Leer `.vscode/agent/sessions/[última-sesión].md`
2. Consultar este AGENT.md para patrones y estándares
3. Revisar CONTEXT.md para estado actual del proyecto

### Workflow de Actualización
```
Cambio detectado → Proponer actualización → Confirmar → Actualizar → Implementar
```

### Al Final de cada Sesión

**🎯 Comando Rápido para Cerrar Sesión:**
```
"Cierra sesion y documenta todo"
```

**Esto automáticamente ejecutará:**
1. ✅ Generar resumen completo de la sesión
2. ✅ Crear archivo en `.vscode/agent/sessions/YYYY-MM-DD-descripcion.md`
3. ✅ Documentar decisiones tomadas
4. ✅ Listar cambios realizados
5. ✅ Incluir próximos pasos sugeridos
6. ✅ Proponer actualizaciones a AGENT.md/CONTEXT.md si aplica
7. ✅ Sugerir commits con los cambios

**Checklist Manual (si no usas el comando):**
- [ ] Documentar decisiones tomadas
- [ ] Listar cambios realizados
- [ ] Incluir próximos pasos
- [ ] Guardar en `.vscode/agent/sessions/YYYY-MM-DD-descripcion.md`
- [ ] Actualizar CONTEXT.md si cambió el estado del proyecto
- [ ] Actualizar AGENT.md si hay nuevos patrones/estándares

**Este documento debe evolucionar con el proyecto, pero siempre con confirmación explícita.**
