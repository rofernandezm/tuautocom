# 🏗️ Arquitectura - Parte 1: Stack y Diseño

> **LÍMITE**: Máximo 300 líneas
> **Parte**: 1 de 3
> **Siguiente**: architecture-2-patrones.md

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

## 📐 ESTRUCTURA DE DIRECTORIOS

```
tuautocom.UI/
├── .vscode/                    # 🔧 VS Code configuration
│   ├── agent/                 # 📚 Agent documentation
│   │   ├── core/             # Documentos core (AGENT, CRITICAL-RULES)
│   │   ├── guides/           # Guías de metodología, arquitectura, workflows
│   │   ├── reference/        # Referencias (CONTEXT, LEARNING)
│   │   ├── sessions/         # 📝 Historial de sesiones
│   │   ├── INDEX.md          # Índice maestro
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

**Continúa en**: `architecture-2-patrones.md`
