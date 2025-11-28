# Backend API

API backend desarrollada con **Node.js**, **Express.js** y **MongoDB** (Mongoose ODM).

## 📁 Estructura del Proyecto

```
backend/
├── src/
│   ├── app.js                 # Configuración de Express
│   ├── server.js              # Punto de entrada
│   ├── config/
│   │   ├── db.js              # Conexión MongoDB
│   │   └── env.js             # Variables de entorno
│   ├── controllers/           # Controladores de rutas
│   ├── middleware/            # Middleware (error handling, uploads)
│   ├── models/                # Modelos Mongoose
│   ├── routes/                # Rutas API
│   └── config/
├── public/
│   └── uploads/               # Imágenes subidas
├── package.json
└── pnpm-lock.yaml
```

## ⚡ Instalación y Configuración

### Prerrequisitos
- Node.js v18+
- pnpm v8.0+
- MongoDB v6.0+

### 1. Instalar Dependencias
```bash
cd backend
pnpm install
```

### 2. Configurar Variables de Entorno

Crear archivo `.env.dev`:
```env
NODE_ENV=development
PORT=3000
DATABASE_URL=mongodb://localhost:27017/tuautocom
CORS_ORIGIN=http://localhost:8000
```

### 3. Ejecutar la Aplicación

**Desarrollo:**
```bash
pnpm run dev
```

**Producción:**
```bash
pnpm run start
```

## 📚 API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-----------|
| GET | `/api/vehicles` | Listar vehículos |
| POST | `/api/vehicles` | Crear vehículo |
| GET | `/api/vehicles/:id` | Obtener vehículo |
| PUT | `/api/vehicles/:id` | Actualizar vehículo |
| DELETE | `/api/vehicles/:id` | Eliminar vehículo |
| GET | `/api/comments` | Listar comentarios |
| POST | `/api/comments` | Crear comentario |
| GET | `/api/reservations` | Listar reservas |
| POST | `/api/reservations` | Crear reserva |

## 🔧 Scripts Disponibles

```bash
pnpm run dev    # Desarrollo con nodemon
pnpm run start  # Producción
```