# Backend API - NoSQL Project

Este proyecto es una API backend desarrollada con **Node.js** y **Express.js**, diseñada para trabajar con bases de datos NoSQL (MongoDB) utilizando **Mongoose** como ODM. El proyecto implementa una arquitectura modular y escalable siguiendo las mejores prácticas de desarrollo.

## 🚀 Características

- **Framework**: Express.js v5.1.0
- **Base de datos**: MongoDB con Mongoose ODM
- **Entorno**: Soporte para múltiples entornos (development/production)
- **Gestión de paquetes**: pnpm como package manager
- **Módulos ES6**: Uso de import/export nativos
- **Manejo de errores**: Middleware centralizado para gestión de errores
- **CORS**: Habilitado para comunicación cross-origin
- **Variables de entorno**: Configuración flexible con archivos .env

## 📁 Estructura del Proyecto

```
backend/
├── src/
│   ├── app.js                 # Configuración principal de Express
│   ├── server.js              # Punto de entrada del servidor
│   ├── config/
│   │   └── env.js             # Gestión de variables de entorno
│   ├── controllers/           # Controladores de rutas (vacío - preparado para expansión)
│   ├── middleware/
│   │   └── errorHandler.js    # Middleware de manejo de errores
│   ├── models/                # Modelos de Mongoose (vacío - preparado para expansión)
│   ├── routes/
│   │   └── index.js           # Definición de rutas de la API
│   ├── services/              # Servicios de negocio (vacío - preparado para expansión)
│   └── utils/                 # Utilidades y helpers (vacío - preparado para expansión)
├── package.json               # Configuración del proyecto y dependencias
├── pnpm-lock.yaml            # Lock file de pnpm
└── README.md                 # Este archivo
```

## 🏗️ Módulos y Componentes

### 1. **app.js** - Configuración de Express
Este archivo contiene la configuración principal de la aplicación Express:
- Inicialización de la aplicación
- Configuración de middlewares base (JSON parsing, URL encoding)
- Montaje de rutas en el prefijo `/api`
- Middleware de manejo de errores

### 2. **server.js** - Servidor HTTP
Punto de entrada de la aplicación que:
- Importa y configura la aplicación Express
- Inicia el servidor HTTP en el puerto configurado
- Maneja eventos de procesos no capturados (unhandledRejection, uncaughtException)

### 3. **config/env.js** - Gestión de Configuración
Sistema robusto de configuración que:
- Detecta automáticamente el entorno de ejecución
- Carga archivos de entorno específicos (`.env.dev` para desarrollo, `.env` para producción)
- Proporciona valores por defecto para todas las configuraciones
- Expone configuraciones para: Puerto, Base de datos, Entorno, Secret key

### 4. **middleware/errorHandler.js** - Manejo de Errores
Middleware centralizado que:
- Captura todos los errores no manejados en la aplicación
- Registra errores en consola con stack trace
- Responde con formato JSON consistente
- Oculta detalles del error en producción por seguridad

### 5. **routes/index.js** - Definición de Rutas
Contiene las rutas de ejemplo de la API:
- `GET /api/json` - Respuesta JSON simple
- `GET /api/html` - Respuesta HTML básica
- `GET /api/dina` - Ruta de ejemplo personalizada
- `POST /api/` - Endpoint que acepta y devuelve datos JSON

## 🛠️ Tecnologías y Dependencias

### Dependencias de Producción
- **express** (^5.1.0): Framework web rápido y minimalista
- **mongoose** (^8.18.1): ODM para MongoDB con esquemas elegantes
- **cors** (^2.8.5): Middleware para habilitar CORS
- **dotenv** (^17.2.2): Carga variables de entorno desde archivos .env

### Dependencias de Desarrollo
- **nodemon**: Auto-reinicio del servidor durante desarrollo

## 📦 Instalación y Configuración

### Prerrequisitos
- **Node.js** (versión 16 o superior)
- **pnpm** (recomendado) o npm
- **MongoDB** (local o en la nube)

### 1. Clonar el Repositorio
```bash
git clone <url-del-repositorio>
cd backend
```

### 2. Instalar Dependencias
```bash
# Usando pnpm (recomendado)
pnpm install

# O usando npm
npm install
```

### 3. Configuración de Variables de Entorno

#### Para Desarrollo
Crea un archivo `.env.dev` en la raíz del proyecto:
```env
NODE_ENV=development
PORT=8000
DATABASE_URL=mongodb://localhost:27017
DATABASE_NAME=tuautocom_db
SECRET_KEY=tu_clave_secreta_desarrollo
```

#### Para Producción
Crea un archivo `.env` en la raíz del proyecto:
```env
NODE_ENV=production
PORT=3000
DATABASE_URL=mongodb://tu-servidor-mongo:27017
DATABASE_NAME=tuautocom_db_prod
SECRET_KEY=tu_clave_secreta_super_segura
```

### 4. Configurar MongoDB
Asegúrate de tener MongoDB ejecutándose:

#### MongoDB Local
```bash
# Iniciar MongoDB
mongod

# O usando Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

#### MongoDB Atlas (Nube)
1. Crea una cuenta en [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Crea un cluster
3. Obtén la URL de conexión
4. Actualiza `DATABASE_URL` en tu archivo de entorno

### 5. Ejecutar la Aplicación

#### Modo Desarrollo
```bash
pnpm dev
# o
npm run dev
```

#### Modo Producción
```bash
pnpm start
# o
npm start
```

### 6. Verificar la Instalación
Una vez que el servidor esté ejecutándose, puedes probar los endpoints:

```bash
# Probar endpoint JSON
curl http://localhost:8000/api/json

# Probar endpoint HTML
curl http://localhost:8000/api/html

# Probar endpoint POST
curl -X POST http://localhost:8000/api/ \
  -H "Content-Type: application/json" \
  -d '{"mensaje": "Hola mundo"}'
```

## 🔧 Scripts Disponibles

- `pnpm dev` - Ejecuta el servidor en modo desarrollo con auto-reinicio
- `pnpm start` - Ejecuta el servidor en modo producción
- `pnpm test` - Placeholder para tests (por implementar)

## 📝 Notas de Desarrollo

### Arquitectura Preparada para Expansión
El proyecto incluye directorios preparados para:
- **controllers/**: Lógica de controladores para manejar requests/responses
- **models/**: Modelos de Mongoose para definir esquemas de datos
- **services/**: Lógica de negocio y servicios
- **utils/**: Funciones de utilidad y helpers

### Mejores Prácticas Implementadas
- ✅ Separación de configuración por entornos
- ✅ Manejo centralizado de errores
- ✅ Estructura modular y escalable
- ✅ Uso de ES6 modules
- ✅ Variables de entorno para configuración sensible
- ✅ Gestión adecuada de procesos no capturados

## 🚀 Próximos Pasos

Para continuar con el desarrollo, considera:
1. Implementar modelos de Mongoose en `/models`
2. Crear controladores específicos en `/controllers`
3. Añadir servicios de negocio en `/services`
4. Implementar autenticación y autorización
5. Añadir validación de datos
6. Configurar tests unitarios e integración
7. Implementar logging estructurado
8. Añadir documentación de API (Swagger/OpenAPI)

## 📄 Licencia

ISC License - ver archivo LICENSE para más detalles.
