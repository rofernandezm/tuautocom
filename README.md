# TuAutoCom - Vehicle Catalog Platform

Plataforma web de catálogo de vehículos (compra/venta) con arquitectura monorepo.

## 🏗️ Estructura del Proyecto

```
tuautocom/
├── backend/              # API Node.js + Express + MongoDB
├── frontend/             # Frontend de producción (Vanilla JS)
├── tuautocom.UI/         # DESARROLLO ACTIVO - UI con Tailwind CSS
└── package.json          # Scripts del monorepo
```

## 🚀 Scripts de Desarrollo

### Desde la raíz del proyecto (recomendado):

```bash
# TuAutoCom.UI (Desarrollo Activo)
pnpm ui:dev        # Watch mode: SASS + Tailwind + Servidor
pnpm ui:build      # Build para desarrollo
pnpm ui:serve      # Solo servidor
pnpm ui:start      # Build + Servidor

# Backend API
pnpm backend:dev   # Servidor de desarrollo
pnpm backend:start # Servidor de producción

# Frontend (Referencia)
pnpm frontend:serve # Servidor simple

# Instalar todas las dependencias
pnpm install:all
```

### Scripts individuales (dentro de cada carpeta):

#### tuautocom.UI/
```bash
cd tuautocom.UI

# Desarrollo con watch
pnpm run dev:watch      # SASS + Tailwind watch + Servidor (Recomendado)
pnpm run dev            # Solo watch de SASS + Tailwind

# Build
pnpm run build          # Build para desarrollo
pnpm run build:prod     # Build con minificación

# Servidor
pnpm run serve          # Servidor en http://localhost:8000
pnpm run start          # Build + Servidor
```

#### backend/
```bash
cd backend
pnpm run dev    # Desarrollo con nodemon
pnpm run start  # Producción
```

## 📋 Requisitos

- **Node.js**: v18+
- **pnpm**: 8.0+
- **Python**: 3.x (para http-server alternativo)

## 🎯 Flujo de Trabajo Recomendado

### Desarrollo de UI (tuautocom.UI):

1. **Desde la raíz del proyecto**:
   ```bash
   pnpm ui:dev
   ```
   Esto ejecuta:
   - Watch de SASS (input.scss → temp.css)
   - Watch de Tailwind (temp.css → output.css)
   - Servidor en http://localhost:8000

2. **Edita archivos** en `tuautocom.UI/`:
   - Componentes: `js/components/`
   - Vistas: `js/views/`
   - Estilos: `styles/input.scss`
   - Configuración: `js/config/theme.js`

3. **Los cambios se reflejan automáticamente** en el navegador (recarga manual)

### Desarrollo de Backend:

```bash
pnpm backend:dev
```

## 🛠️ Stack Tecnológico

- **Frontend**: Vanilla JavaScript (ES Modules), Tailwind CSS, HTML
- **Backend**: Node.js, Express v5.1.0, Mongoose ODM
- **Base de Datos**: MongoDB
- **Build**: SASS, Tailwind CLI, pnpm
- **Server**: http-server

## 📚 Documentación

- **Frontend UI**: `tuautocom.UI/README.md`
- **Frontend Producción**: `frontend/MODULAR_STRUCTURE.md`
- **Backend**: `backend/README.md`
- **Guías de Desarrollo**: `.github/copilot-instructions.md`

## 🔑 Convenciones

- **Package Manager**: Solo pnpm (no npm/yarn)
- **ES Modules**: Siempre incluir `.js` en imports
- **Estilos**: Tailwind CSS (no CSS separado)
- **Comentarios**: Español
- **Código**: Inglés

## 🌐 Puertos

- **tuautocom.UI**: 8000
- **frontend**: 8000
- **backend**: 8000 (configurable en .env)

## 🚧 Estado Actual

**Fase**: Implementación de UI desde diseños Stitch (Google)
**Activo**: tuautocom.UI con Tailwind CSS
**Completado**: CatalogView con filtros y ordenamiento funcionales
**Pendiente**: FichaDetallada, ModalConsultarVehiculo, CargarVehiculo
