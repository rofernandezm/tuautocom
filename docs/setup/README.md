# 🚀 Setup - TuAutoCom

Guía completa para configurar y ejecutar el proyecto.  
**Tiempo:** ~5 minutos

---

## 📋 Requisitos Previos

- **Node.js** v18+ ([descargar](https://nodejs.org/))
- **pnpm** v8+ ([instalar](https://pnpm.io/installation))
- **MongoDB** (local o [Atlas](https://www.mongodb.com/cloud/atlas))
- **Git** ([descargar](https://git-scm.com/))

---

## 🚀 Quick Start (5 Pasos)

### 📍 Paso 1: Clonar Repositorio

```bash
git clone https://github.com/rofernandezm/tuautocom.git
cd tuautocom
```

### 📍 Paso 2: Instalar Dependencias

```bash
pnpm install
```

Esto instala dependencias en:
- `/` (workspace root)
- `/backend/`
- `/tuautocom.UI/`

### 📍 Paso 3: Configurar Variables de Ambiente

#### Opción A: Automático (Recomendado)

```bash
pnpm setup
```

✅ **Un comando que funciona en Windows/macOS/Linux**

El script:
- Detecta tu sistema operativo
- Crea `.env.dev` en backend
- Pregunta si deseas editarlo
- Abre tu editor favorito

#### Opción B: Manual

1. **Copiar template:**
   ```bash
   # macOS/Linux
   cp backend/.env.dev.example backend/.env.dev
   
   # Windows (cmd)
   copy backend\.env.dev.example backend\.env.dev
   
   # Windows (PowerShell)
   Copy-Item backend\.env.dev.example backend\.env.dev
   ```

2. **Editar archivo:**
   ```bash
   # VS Code
   code backend/.env.dev
   
   # Nano (Linux/macOS)
   nano backend/.env.dev
   
   # Notepad (Windows)
   notepad backend\.env.dev
   ```

3. **Configurar credenciales:**
   ```env
   # MongoDB Atlas (recomendado para desarrollo)
   DATABASE_URL=mongodb+srv://usuario:password@cluster.mongodb.net
   DATABASE_NAME=tuautocom_dev
   
   # O MongoDB local
   DATABASE_URL=mongodb://localhost:27017
   DATABASE_NAME=tuautocom_dev
   
   # Servidor
   PORT=8000
   NODE_ENV=development
   
   # CORS (frontend)
   CORS_ORIGIN=http://localhost:8000
   ```

### 📍 Paso 4: Iniciar Backend

```bash
cd backend
pnpm run dev
```

🎯 Backend corriendo en `http://localhost:8000`  
📡 API disponible en `http://localhost:8000/api`

**Deja esta terminal corriendo.**

### 📍 Paso 5: Iniciar Frontend

Abre **nueva terminal**:

```bash
cd tuautocom.UI

# Compilar Tailwind en watch mode
pnpm run dev
```

En **otra terminal**:

```bash
cd tuautocom.UI

# Servir archivos estáticos
npx http-server -p 8000

# O con auto-reload
npx live-server --port=8000
```

🎨 Frontend disponible en `http://localhost:8000`

---

## 🔧 Scripts Disponibles

### Root (Workspace)

| Comando | Descripción |
|---------|-------------|
| `pnpm install` | Instala todas las dependencias |
| `pnpm setup` | Setup automático de .env.dev |
| `pnpm setup:win` | Setup para Windows (PowerShell) |

### Backend

| Comando | Descripción |
|---------|-------------|
| `pnpm run dev` | Iniciar con nodemon (auto-reload) |
| `pnpm start` | Iniciar en producción |

### Frontend (tuautocom.UI)

| Comando | Descripción |
|---------|-------------|
| `pnpm run dev` | Compilar SASS + Tailwind (watch) |
| `pnpm run build` | Build para desarrollo |
| `pnpm run build:prod` | Build optimizado (minificado) |

---

## 🔐 Variables de Ambiente

### Archivos de Ambiente

| Archivo | Propósito | Versionado |
|---------|-----------|------------|
| `.env.dev.example` | Template sin credenciales | ✅ Sí (Git) |
| `.env.dev` | Desarrollo local | ❌ No (.gitignore) |
| `.env` | Producción | ❌ No (.gitignore) |

### Variables Requeridas

```env
# MongoDB
DATABASE_URL=mongodb+srv://user:pass@cluster.mongodb.net
DATABASE_NAME=tuautocom_dev

# Servidor
PORT=8000
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:8000
```

### Obtener Credenciales MongoDB Atlas

1. Ir a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crear cuenta gratuita
3. Crear cluster (tier gratuito)
4. Database Access → Crear usuario
5. Network Access → Agregar IP (0.0.0.0/0 para desarrollo)
6. Clusters → Connect → "Connect your application"
7. Copiar connection string

---

## 🐛 Troubleshooting

### Error: "pnpm: command not found"

```bash
# Instalar pnpm
npm install -g pnpm

# Verificar instalación
pnpm --version
```

### Error: "Cannot find module"

```bash
# Reinstalar dependencias
rm -rf node_modules backend/node_modules tuautocom.UI/node_modules
pnpm install
```

### Error: "EADDRINUSE: address already in use"

Puerto 8000 ocupado. Opciones:

```bash
# Matar proceso en puerto 8000 (Linux/macOS)
lsof -ti:8000 | xargs kill -9

# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# O cambiar puerto en backend/.env.dev
PORT=3000
```

### Error: MongoDB Connection

```bash
# Verificar que MongoDB esté corriendo (local)
mongod --version

# Verificar connection string (Atlas)
# Debe incluir usuario:password y nombre de base de datos
```

### Frontend no carga estilos

```bash
cd tuautocom.UI
pnpm run build

# Verificar que output.css se generó
ls -la styles/output.css
```

---

## 📂 Estructura del Proyecto

```
tuautocom/
├── backend/              # Node.js + Express + MongoDB
│   ├── src/
│   │   ├── models/       # Mongoose schemas
│   │   ├── controllers/  # Business logic
│   │   ├── routes/       # API endpoints
│   │   ├── middleware/   # Error handling, uploads
│   │   ├── config/       # DB, environment
│   │   ├── app.js        # Express setup
│   │   └── server.js     # Server start
│   ├── .env.dev         # Variables de ambiente (local)
│   └── package.json
│
├── tuautocom.UI/         # Frontend (Vanilla JS + Tailwind)
│   ├── js/
│   │   ├── components/   # UI components
│   │   ├── views/        # Page views
│   │   ├── services/     # API integration
│   │   ├── config/       # Theme, config
│   │   └── main.js       # Entry point
│   ├── styles/
│   │   ├── input.scss    # SASS source
│   │   └── output.css    # Compiled Tailwind
│   ├── index.html
│   └── package.json
│
├── frontend/             # Versión estable (referencia)
├── scripts/              # Setup scripts
└── docs/                 # Documentación
    ├── setup/            # Esta guía
    ├── project/          # Estado técnico
    └── changelog/        # Historial de cambios
```

---

## 🎓 Recursos Adicionales

- **Documentación Técnica:** Ver [`docs/project/ESTADO.md`](../project/ESTADO.md)
- **Próximos pasos:** Ver [`docs/project/ROADMAP.md`](../project/ROADMAP.md)
- **Changelog:** Ver [`docs/changelog/`](../changelog/)
- **Backend API:** Ver [`backend/README.md`](../../backend/README.md)
- **Frontend:** Ver [`tuautocom.UI/README.md`](../../tuautocom.UI/README.md)
- **Instrucciones AI:** Ver [`.github/copilot-instructions.md`](../../.github/copilot-instructions.md)

---

## ⚠️ Notas Importantes

### Seguridad

- ⚠️ **NUNCA** commitear archivos `.env*` con credenciales reales
- ✅ `.env.dev` está en `.gitignore` por defecto
- ✅ Usar `.env.dev.example` como template sin secrets

### ES Modules

- ✅ Todos los proyectos usan `"type": "module"`
- ⚠️ **SIEMPRE** incluir extensión `.js` en imports
  ```javascript
  // ✅ CORRECTO
  import { Header } from './components/Header.js';
  
  // ❌ INCORRECTO (no funciona en browser)
  import { Header } from './components/Header';
  ```

### Package Manager

- ✅ **Usar SOLO pnpm** (no npm ni yarn)
- ⚠️ Evita mezclar package managers

---

## 🆘 Ayuda

¿Problemas con el setup?

1. Ver sección [Troubleshooting](#-troubleshooting)
2. Revisar logs de error completos
3. Verificar versiones de Node.js y pnpm
4. Consultar documentación específica:
   - Windows: [`WINDOWS.md`](./WINDOWS.md)
   - Scripts: Archivos en [`/scripts/`](../../scripts/)

---

**Última actualización:** 2025-11-20  
**Versión:** 1.0
