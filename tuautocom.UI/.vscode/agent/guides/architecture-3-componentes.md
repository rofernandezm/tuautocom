# 🏗️ Arquitectura - Parte 3: Componentes y Configuración

> **LÍMITE**: Máximo 300 líneas
> **Parte**: 3 de 3
> **Anterior**: architecture-2-patrones.md

---

## 🎯 COMPONENTES IDENTIFICADOS

### Componentes Base (Reusables)
- [x] `Header.js` - Navegación principal
- [x] `Footer.js` - Footer con links y redes sociales
- [x] `VehicleCard.js` - Tarjeta de vehículo
- [x] `VehicleCarousel.js` - Carrusel horizontal
- [x] `CategoryFilters.js` - Pills/badges de categorías
- [x] `HeroSection.js` - Banner hero
- [x] `SearchBar.js` - Barra de búsqueda
- [x] `Button.js` - Botón reutilizable
- [x] `Modal.js` - Modal genérico
- [x] `ContactForm.js` - Formulario de contacto

### Vistas Planificadas
- [x] `HomeView.js` - Página principal (implementada)
- [ ] `CatalogView.js` - Listado de vehículos
- [ ] `VehicleDetailView.js` - Detalle de vehículo
- [ ] `LoginView.js` - Inicio de sesión
- [ ] `RegisterView.js` - Registro de usuario
- [ ] `UploadVehicleView.js` - Cargar vehículo

### Servicios Necesarios
- [ ] `api.js` - Cliente HTTP base
- [x] `vehicleService.js` - CRUD de vehículos (mock data)
- [ ] `authService.js` - Autenticación
- [ ] `categoryService.js` - Categorías
- [ ] `userService.js` - Gestión de usuarios

---

## ⚙️ CONFIGURACIÓN

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

### package.json (scripts relevantes)

```json
{
  "scripts": {
    "dev": "concurrently \"pnpm:sass:watch\" \"pnpm:tailwind:watch\"",
    "build": "pnpm run sass:build && pnpm run tailwind:build",
    "build:prod": "pnpm run sass:build && pnpm run tailwind:build:prod",
    "sass:watch": "sass --watch styles/input.scss:styles/temp.css",
    "sass:build": "sass styles/input.scss:styles/temp.css",
    "tailwind:watch": "tailwindcss -i ./styles/temp.css -o ./styles/output.css --watch",
    "tailwind:build": "tailwindcss -i ./styles/temp.css -o ./styles/output.css",
    "tailwind:build:prod": "tailwindcss -i ./styles/temp.css -o ./styles/output.css --minify"
  }
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
styles/temp.css
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

## 📖 NAVEGACIÓN

- **Parte 1**: [architecture-1-stack.md](architecture-1-stack.md) - Stack y diseño
- **Parte 2**: [architecture-2-patrones.md](architecture-2-patrones.md) - Patrones de código
- **Parte 3**: [architecture-3-componentes.md](architecture-3-componentes.md) - Componentes (este archivo)
- **Índice general**: [../INDEX.md](../INDEX.md)
- **Agente principal**: [../core/AGENT.md](../core/AGENT.md)

---

**Volver al índice**: [../core/AGENT.md](../core/AGENT.md) | [../INDEX.md](../INDEX.md)
