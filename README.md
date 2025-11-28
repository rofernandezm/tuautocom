# 🚗 TuAutoCom - Vehicle Catalog Platform

> Plataforma web para catálogo de vehículos (compra/venta) con arquitectura monorepo construida con Vanilla JavaScript, Tailwind CSS, Node.js, Express y MongoDB.

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-green.svg)](https://www.mongodb.com/)
[![pnpm](https://img.shields.io/badge/pnpm-8.0+-orange.svg)](https://pnpm.io/)
[![License](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)

---

## 📖 Descripción

**TuAutoCom** es una aplicación web full-stack para gestión y visualización de catálogos de vehículos.

### Características Principales

- ✅ Catálogo de vehículos con filtros y búsqueda
- ✅ Gestión de vehículos (CRUD completo)
- ✅ Sistema de comentarios y reservas
- ✅ Upload de imágenes
- ✅ Interfaz responsive con Tailwind CSS
- ✅ API REST con Node.js + Express

### Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | Vanilla JavaScript (ES6+) + Tailwind CSS |
| Backend | Node.js + Express v5.1 |
| Base de Datos | MongoDB + Mongoose |
| Package Manager | pnpm |

---

## ⚡ Instalación Rápida

### Requisitos Previos

- **Node.js** v18+ (LTS)
- **pnpm** v8.0+
- **MongoDB** v6.0+ (local o [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### Pasos de Instalación

```bash
# 1. Clonar repositorio
git clone https://github.com/rofernandezm/tuautocom.git
cd tuautocom

# 2. Instalar dependencias
pnpm install:all

# 3. Configurar variables de ambiente
# Crear archivo backend/.env.dev con tu conexión MongoDB
cp backend/.env.example backend/.env.dev

# 4. Iniciar Backend (Terminal 1)
cd backend
pnpm run dev

# 5. Iniciar Frontend (Terminal 2)
cd tuautocom.UI
pnpm run dev
```

### URLs de Acceso

- **Frontend**: http://localhost:8000
- **Backend API**: http://localhost:3000
- **MongoDB**: mongodb://localhost:27017 (si es local)

---

## �� Estructura del Proyecto

```
tuautocom/
├── backend/              # API Node.js + Express + MongoDB
│   ├── src/
│   │   ├── models/       # Mongoose Schemas
│   │   ├── controllers/  # Lógica de negocio
│   │   ├── routes/       # Endpoints API
│   │   ├── middleware/   # Error handling, uploads
│   │   └── config/       # Configuración
│   └── public/uploads/   # Imágenes subidas
│
├── tuautocom.UI/         # Frontend con Tailwind CSS
│   ├── js/
│   │   ├── components/   # Componentes reutilizables
│   │   ├── views/        # Vistas/páginas
│   │   ├── services/     # Comunicación con API
│   │   ├── utils/        # Utilidades
│   │   └── config/       # Configuración
│   └── styles/           # SASS + Tailwind
│
├── frontend/             # Frontend de referencia
└── scripts/              # Scripts de setup
```

---

## 🚀 Scripts Disponibles

### Desde la raíz del proyecto:

```bash
# Instalar todas las dependencias
pnpm install:all

# Frontend UI
pnpm ui:dev        # Watch mode con servidor
pnpm ui:build      # Build para desarrollo
pnpm ui:serve      # Solo servidor

# Backend API
pnpm backend:dev   # Servidor de desarrollo
pnpm backend:start # Servidor de producción

# Frontend (Referencia)
pnpm frontend:serve # Servidor simple
```

### Dentro de cada carpeta:

#### `tuautocom.UI/`
```bash
pnpm run dev       # Watch SASS + Tailwind
pnpm run build     # Build para desarrollo
pnpm run build:prod # Build con minificación
pnpm run serve     # Servidor en http://localhost:8000
```

#### `backend/`
```bash
pnpm run dev   # Desarrollo con nodemon
pnpm run start # Producción
```

---

## 🔐 Variables de Ambiente

### Backend (`backend/.env.dev`)

```env
# Base de Datos
DATABASE_URL=mongodb+srv://usuario:contraseña@cluster.mongodb.net/tuautocom

# Servidor
PORT=3000
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:8000
```

Copiar `backend/.env.example` y actualizar con tus valores.

---

## 📚 API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-----------|
| GET | `/api/vehicles` | Listar vehículos |
| GET | `/api/vehicles/:id` | Obtener vehículo |
| POST | `/api/vehicles` | Crear vehículo |
| PUT | `/api/vehicles/:id` | Actualizar vehículo |
| DELETE | `/api/vehicles/:id` | Eliminar vehículo |
| GET | `/api/comments` | Listar comentarios |
| POST | `/api/comments` | Crear comentario |
| GET | `/api/reservations` | Listar reservas |
| POST | `/api/reservations` | Crear reserva |

---

## 🛠️ Configuración de MongoDB

### Opción 1: MongoDB Local

```bash
# Linux/macOS
brew install mongodb-community
brew services start mongodb-community

# Windows
# Descargar desde https://www.mongodb.com/try/download/community
```

### Opción 2: MongoDB Atlas (Cloud)

1. Crear cuenta en [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Crear cluster gratuito
3. Obtener connection string
4. Actualizar `DATABASE_URL` en `backend/.env.dev`

---

## 📋 Convenciones

### Package Manager

```bash
# ✅ USAR pnpm
pnpm install
pnpm run dev

# ❌ NO usar npm o yarn
```

### ES Modules

```javascript
// ✅ SIEMPRE incluir extensión .js
import { Header } from './components/Header.js';

// ❌ NO omitir extensión
import { Header } from './components/Header';
```