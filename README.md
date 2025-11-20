# 🚗 TuAutoCom - Vehicle Catalog Platform

> Plataforma web moderna para catálogo de vehículos (compra/venta) con arquitectura monorepo, diseñada como proyecto educativo enfocado en MongoDB y desarrollo full-stack con JavaScript.

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-green.svg)](https://www.mongodb.com/)
[![pnpm](https://img.shields.io/badge/pnpm-8.0+-orange.svg)](https://pnpm.io/)
[![License](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)

---

## 📖 Descripción

**TuAutoCom** es una aplicación web full-stack para gestión y visualización de catálogos de vehículos. El proyecto está diseñado con fines **educativos**, con énfasis en:

- 🎯 **MongoDB como objetivo principal**: Aprendizaje de operaciones CRUD, modelado de datos y agregaciones
- 🎨 **Frontend como visualizador**: Interfaz moderna que visualiza las operaciones de base de datos
- 🏗️ **Arquitectura modular**: Preparada para migración futura a React/React Native
- 📚 **Código educativo**: Comentarios explicativos y patrones claros para facilitar aprendizaje

### Características Principales

- ✅ **Catálogo de vehículos** con filtros y búsqueda
- ✅ **Gestión de vehículos** (CRUD completo)
- ✅ **Sistema de comentarios** y reservas
- ✅ **Formularios de contacto**
- ✅ **Upload de imágenes** de vehículos
- ✅ **Interfaz responsive** con Tailwind CSS
- ✅ **API REST** con Node.js + Express

### Stack Tecnológico

| Capa | Tecnología | Propósito |
|------|-----------|-----------|
| **Frontend** | Vanilla JavaScript (ES6+) | Sin frameworks - fundamentos primero |
| **Estilos** | Tailwind CSS + SASS | Diseño moderno y mantenible |
| **Backend** | Node.js + Express v5.1 | API REST para operaciones MongoDB |
| **Base de Datos** | MongoDB + Mongoose | **Objetivo principal de aprendizaje** |
| **Package Manager** | pnpm | Gestión eficiente de dependencias |

---

## ⚡ Quick Start

```bash
# 1. Instalar dependencias
pnpm install

# 2. Configurar ambiente
pnpm setup

# 3. Backend (Terminal 1)
cd backend && pnpm run dev

# 4. Frontend (Terminal 2)
cd tuautocom.UI && pnpm run dev
```

📖 **Documentación completa de setup:** [`docs/setup/`](./docs/setup/)

---

## 🏗️ Estructura del Proyecto

```
tuautocom/
├── docs/
│   └── setup/            # 📚 Documentación de setup
│       ├── INDEX.md      # Índice y navegación
│       ├── QUICKSTART.md # Guía rápida (5 pasos)
│       ├── ENVIRONMENT.md    # Configuración de ambiente
│       ├── WINDOWS.md    # Setup Windows
│       └── SCRIPTS.md    # Detalles técnicos
│
├── backend/              # API Node.js + Express + MongoDB
├── frontend/             # Frontend de producción (Vanilla JS)
├── tuautocom.UI/         # DESARROLLO ACTIVO - UI con Tailwind CSS
├── scripts/              # Scripts de setup automático
└── package.json          # Scripts del monorepo
```

---

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

---

## 📋 Requisitos

- **Node.js**: v18+ (LTS recomendado)
- **MongoDB**: v6.0+ (local o Atlas)
- **pnpm**: v8.0+
- **Git**: Para control de versiones

### Instalación Rápida

```bash
# Node.js + pnpm
npm install -g pnpm

# MongoDB (Linux)
sudo apt-get install mongodb

# MongoDB (macOS)
brew install mongodb-community

# MongoDB (Windows)
# Descargar desde https://www.mongodb.com/try/download/community
```

---

## 🎯 Características del Proyecto

### Frontend (tuautocom.UI/)

- 🎨 **Vanilla JavaScript** - Sin frameworks, control total del código
- 🎨 **Tailwind CSS** - Estilos utilitarios modernos
- 🏗️ **Arquitectura modular** - Components, Views, Services
- 📱 **Responsive Design** - Mobile-first con Tailwind
- 🎯 **ES Modules** - Imports nativos del navegador

**Patrones implementados:**
- Component pattern (clases con método `render()`)
- View pattern (composición de componentes)
- Service pattern (comunicación API)
- Centralized theming (`js/config/theme.js`)

### Backend (backend/)

- 🚀 **Express v5.1.0** - Framework web moderno
- 🗄️ **MongoDB + Mongoose** - ODM para MongoDB
- 🔐 **Variables de ambiente** - Configuración segura
- 📁 **Upload de archivos** - Multer para imágenes
- 🛡️ **Error handling** - Middleware centralizado

**Estructura API:**
```
/api/vehicles      - CRUD de vehículos
/api/comments      - Comentarios de vehículos
/api/reservations  - Sistema de reservas
```

### MongoDB (Objetivo Principal)

El proyecto está **diseñado para aprender MongoDB**:

- ✅ Modelado de datos con Mongoose Schemas
- ✅ Operaciones CRUD completas
- ✅ Relaciones entre colecciones (references)
- ✅ Queries avanzadas y filtros
- ✅ Agregaciones y pipelines
- ✅ Validaciones a nivel de esquema

---

## 🏗️ Arquitectura del Proyecto

### Monorepo Structure

```
tuautocom/
├── docs/setup/           # 📚 Documentación de configuración
├── backend/              # 🚀 API Node.js + Express + MongoDB
│   ├── src/
│   │   ├── models/       # Mongoose Schemas
│   │   ├── controllers/  # Lógica de negocio
│   │   ├── routes/       # Endpoints API
│   │   ├── middleware/   # Error handling, uploads
│   │   └── config/       # Configuración DB y ambiente
│   └── public/uploads/   # Imágenes subidas
│
├── tuautocom.UI/         # 🎨 Frontend activo (Tailwind)
│   ├── js/
│   │   ├── components/   # Componentes reutilizables
│   │   ├── views/        # Vistas/páginas completas
│   │   ├── services/     # Comunicación con API
│   │   ├── utils/        # Utilidades
│   │   └── config/       # Tema y configuración
│   ├── styles/           # SASS + Tailwind
│   └── designs/          # Diseños de referencia (Stitch)
│
├── frontend/             # 📦 Frontend de referencia (estable)
└── scripts/              # 🔧 Scripts de setup automático
```

### Flujo de Datos

```
Usuario → Frontend (Vanilla JS) → API REST (Express) → MongoDB (Mongoose)
                ↓                         ↓
           Visualización            Operaciones CRUD
```

---

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

3. **Los cambios se reflejan automáticamente** en el navegador

### Desarrollo de Backend:

```bash
pnpm backend:dev
```

**Operaciones MongoDB visualizables:**
- Crear vehículo → Frontend muestra en catálogo
- Filtrar vehículos → Query MongoDB con filtros
- Agregar comentario → Insert en colección Comments
- Reservar vehículo → Update de disponibilidad

## 🛠️ Stack Tecnológico

- **Frontend**: Vanilla JavaScript (ES Modules), Tailwind CSS, HTML
- **Backend**: Node.js, Express v5.1.0, Mongoose ODM
- **Base de Datos**: MongoDB
- **Build**: SASS, Tailwind CLI, pnpm
- **Server**: http-server

---

## 📚 Documentación

### Configuración y Setup
- 📘 **[Índice de Setup](./docs/setup/INDEX.md)** - Punto de entrada para configuración
- 🚀 **[Quick Start](./docs/setup/QUICKSTART.md)** - Guía rápida en 5 pasos
- 🔐 **[Variables de Ambiente](./docs/setup/ENVIRONMENT.md)** - Configuración de .env.dev
- 🪟 **[Setup Windows](./docs/setup/WINDOWS.md)** - Específico para Windows
- 🔧 **[Scripts](./docs/setup/SCRIPTS.md)** - Documentación técnica de scripts

### Componentes del Proyecto
- 🎨 **Frontend UI**: `tuautocom.UI/README.md`
- 🏛️ **Frontend Producción**: `frontend/MODULAR_STRUCTURE.md`
- 🚀 **Backend API**: `backend/README.md`
- 🤖 **Guía para AI Agents**: `.github/copilot-instructions.md`

---

## 🔑 Convenciones y Estándares

### Package Manager
```bash
# ✅ SIEMPRE usar pnpm
pnpm install
pnpm run dev

# ❌ NUNCA usar npm o yarn
```

### ES Modules
```javascript
// ✅ SIEMPRE incluir extensión .js
import { Header } from './components/Header.js';

// ❌ NUNCA omitir extensión (no funciona en browser)
import { Header } from './components/Header';
```

### Idioma
- **Código**: Inglés (variables, funciones, clases)
- **Comentarios**: Español (documentación y explicaciones)
- **Commits**: Español
- **JSDoc**: Español con ejemplos en inglés

### Arquitectura
- **Componentes**: Clases con método `render()` que retorna `HTMLElement`
- **Vistas**: Clases con `init()` async y `render()` que compone componentes
- **Servicios**: Clases singleton para API
- **Estilos**: Tailwind inline + SASS para custom CSS

---

## 🌐 Puertos y URLs

| Servicio | Puerto | URL |
|----------|--------|-----|
| **Backend API** | 8000 | http://localhost:8000 |
| **Frontend UI** | 8000 | http://localhost:8000 |
| **MongoDB** | 27017 | mongodb://localhost:27017 |

**Nota:** Los puertos son configurables en `.env.dev`

---

## 🚧 Estado del Proyecto

### Fase Actual
**✨ Desarrollo Full-Stack Activo** - Frontend con Tailwind CSS + Backend con MongoDB Atlas

### ✅ Implementado y Funcional

**Backend (MongoDB + Express):**
- ✅ **Conexión a MongoDB Atlas** - Configurada y funcional
- ✅ **Modelos Mongoose** - Vehicle, Comment, Reservation
- ✅ **API REST completa** - CRUD de vehículos
- ✅ **Upload de imágenes** - Multer para múltiples archivos
- ✅ **Error handling** - Middleware centralizado
- ✅ **Validaciones** - Mongoose Schema validations

**Frontend (Vanilla JS + Tailwind):**
- ✅ **API Client** - Fetch wrapper para backend
- ✅ **Services integrados** - vehicleService, commentService, inquiryService
- ✅ **Comunicación Frontend-Backend** - Conectado y funcional
- ✅ **CatalogView** - Vista de catálogo con datos desde MongoDB
- ✅ **VehicleCard** - Componente con datos reales
- ✅ **FilterSidebar** - Filtros funcionales
- ✅ **SearchBar** - Búsqueda integrada
- ✅ **CategoryFilters** - Categorías desde backend
- ✅ **SortTabs** - Ordenamiento aplicado
- ✅ **Pagination** - Paginación de resultados
- ✅ **Header** / **Footer** - Navegación completa

**Infraestructura:**
- ✅ **Variables de ambiente** - `.env.dev` protegido
- ✅ **Scripts de setup** - Multiplataforma (Node.js, PowerShell, Batch, Bash)
- ✅ **Documentación** - Setup completo en `docs/setup/`
- ✅ **CORS configurado** - Comunicación frontend-backend

### 🚧 En Desarrollo

- 🚧 `VehicleDetailView` - Ficha detallada desde MongoDB
- 🚧 `ContactModal` - Modal de consulta/contacto
- 🚧 `AdminVehicleFormView` - Formulario CRUD admin
- 🚧 `CommentsSection` - Sistema de comentarios integrado

### 📋 Próximas Fases

1. **Sistema de Autenticación** - Login y roles de usuario
2. **Panel Admin Completo** - CRUD visual de vehículos
3. **Sistema de Reservas** - Integración completa con backend
4. **Carrito de Compras** - Funcionalidad de compra
5. **Pagos** - Integración de pasarela de pagos
6. **Deploy** - Producción en cloud (Vercel/Railway + MongoDB Atlas)

---

## 🤝 Contribuir

### Flujo de Desarrollo

1. **Fork del repositorio**
2. **Crear rama feature**:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. **Hacer cambios y commits**:
   ```bash
   git commit -m "feat: agregar nueva funcionalidad"
   ```
4. **Push a tu fork**:
   ```bash
   git push origin feature/nueva-funcionalidad
   ```
5. **Crear Pull Request**

### Estándares de Commits

Usar [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: nueva característica
fix: corrección de bug
docs: cambios en documentación
style: formato, estilo (no afecta funcionalidad)
refactor: refactorización de código
test: agregar o actualizar tests
chore: cambios en build, deps, etc.
```

---

## 📄 Licencia

ISC License - Ver [LICENSE](LICENSE) para más detalles

---

## 👥 Equipo

**Proyecto educativo** desarrollado por el equipo TuAutoCom.

### Contacto

- 📧 **Email**: [contacto@tuautocom.com](mailto:contacto@tuautocom.com)
- 🌐 **GitHub**: [github.com/rofernandezm/tuautocom](https://github.com/rofernandezm/tuautocom)

---

## 🙏 Agradecimientos

- **MongoDB University** - Por recursos educativos
- **Tailwind Labs** - Por Tailwind CSS
- **Stitch (Google)** - Por diseños de referencia
- **Comunidad Open Source** - Por herramientas y librerías

---

<div align="center">

**⭐ Si este proyecto te ayudó en tu aprendizaje, considera darle una estrella!**

[Documentación](./docs/setup/) · [Reportar Bug](https://github.com/rofernandezm/tuautocom/issues) · [Solicitar Feature](https://github.com/rofernandezm/tuautocom/issues)

</div>
