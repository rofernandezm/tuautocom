# Sistema de Catálogos - TuAutoCom

## 📋 Descripción

Sistema centralizado para gestionar datos de referencia (categorías, marcas, transmisiones, etc.) que anteriormente estaban hardcoded en el frontend. Ahora se almacenan en MongoDB y se sirven vía API REST.

## 🎯 Objetivo

**Eliminar datos hardcoded** del frontend y centralizar información de referencia en una única fuente de verdad (MongoDB), permitiendo:
- Gestión dinámica de opciones de filtrado
- Actualización sin modificar código frontend
- Consistencia entre frontend y backend
- Escalabilidad para agregar nuevos tipos de datos

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  CategoryFilters.js (componente UI)                  │   │
│  │  Usa: catalogService.getCategories()                 │   │
│  └──────────────────────────────────────────────────────┘   │
│                           ↓                                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  catalogService.js                                   │   │
│  │  - Cache en memoria (5 min TTL)                      │   │
│  │  - Fallback a datos mock                             │   │
│  │  - API: GET /api/catalogs/:type/items                │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                           ↓ HTTP
┌─────────────────────────────────────────────────────────────┐
│                        BACKEND                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  /api/catalogs (routes)                              │   │
│  └──────────────────────────────────────────────────────┘   │
│                           ↓                                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  catalogController.js                                │   │
│  │  - getCatalogItems()                                 │   │
│  │  - createCatalog(), updateCatalog()                  │   │
│  └──────────────────────────────────────────────────────┘   │
│                           ↓                                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Catalog.js (Mongoose Model)                         │   │
│  │  - Schema con type + items[]                         │   │
│  │  - Métodos: getByType(), getItems()                  │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                     MONGODB                                  │
│  Collection: catalogs                                        │
│  [                                                           │
│    {                                                         │
│      type: "categories",                                     │
│      items: [                                                │
│        { id: "suv", label: "SUV", metadata: {...} },        │
│        { id: "sedan", label: "Sedán", metadata: {...} }     │
│      ]                                                       │
│    },                                                        │
│    { type: "brands", items: [...] },                        │
│    ...                                                       │
│  ]                                                           │
└─────────────────────────────────────────────────────────────┘
```

## 📦 Estructura de Datos

### Schema de Catálogo (MongoDB)

```javascript
{
  type: String,              // 'categories', 'brands', 'transmissions', etc.
  items: [
    {
      id: String,            // Identificador único ('suv', 'toyota', etc.)
      label: String,         // Texto a mostrar ('SUV', 'Toyota')
      metadata: {
        order: Number,       // Orden de visualización
        icon: String,        // Icono opcional
        color: String,       // Color opcional
        active: Boolean,     // Si está activo
        extra: Mixed         // Datos adicionales flexibles
      }
    }
  ],
  catalogMetadata: {
    description: String,
    allowMultiple: Boolean,  // Si permite selección múltiple
    order: Number,
    extra: Mixed
  }
}
```

### Tipos de Catálogos Disponibles

| Tipo | Descripción | Ejemplo Items |
|------|-------------|---------------|
| `categories` | Categorías de vehículos | SUV, Sedán, Pick-up, Eléctricos |
| `brands` | Marcas de vehículos | Toyota, Honda, Ford |
| `transmissions` | Tipos de transmisión | Manual, Automática, CVT |
| `fuels` | Tipos de combustible | Gasolina, Diésel, Eléctrico, Híbrido |
| `colors` | Colores disponibles | Blanco, Negro, Rojo |
| `conditions` | Condición del vehículo | Nuevo, Usado |
| `tractions` | Tipos de tracción | 2WD, 4WD, AWD |

## 🚀 Uso

### Backend - Poblar Base de Datos

```bash
# 1. Asegurarse de que MongoDB está corriendo
# 2. Configurar .env o .env.dev con DATABASE_URL
# 3. Ejecutar script de seed:

cd backend
node src/scripts/seedCatalogs.js
```

**Salida esperada:**
```
🔌 Conectando a MongoDB...
✅ Conectado a MongoDB
🗑️  Eliminando catálogos existentes...
✅ Catálogos eliminados
📦 Insertando catálogos...
  ✓ Catálogo 'categories' creado con 6 items
  ✓ Catálogo 'brands' creado con 15 items
  ✓ Catálogo 'transmissions' creado con 4 items
  ...
✅ Seed completado exitosamente
```

### Backend - API Endpoints

```javascript
// Obtener todos los catálogos
GET /api/catalogs
// Respuesta: { success: true, count: 7, data: [...] }

// Obtener catálogo específico
GET /api/catalogs/categories
// Respuesta: { success: true, data: { type: 'categories', items: [...] } }

// Obtener solo items (sin metadata del catálogo)
GET /api/catalogs/categories/items
// Respuesta: { success: true, count: 6, data: [...] }

// Crear nuevo catálogo
POST /api/catalogs
Body: { type: 'new_type', items: [...] }

// Agregar item a catálogo existente
POST /api/catalogs/categories/items
Body: { id: 'minivan', label: 'Minivan', metadata: {...} }

// Actualizar item
PUT /api/catalogs/categories/items/suv
Body: { label: 'SUV Premium' }

// Eliminar item (soft delete)
DELETE /api/catalogs/categories/items/suv
```

### Frontend - Servicio de Catálogos

```javascript
import { catalogService } from './services/catalogService.js';

// Obtener todas las categorías
const categories = await catalogService.getCategories();
// [{ id: 'suv', label: 'SUV', metadata: {...} }, ...]

// Obtener todas las marcas
const brands = await catalogService.getBrands();

// Obtener tipos de transmisión
const transmissions = await catalogService.getTransmissions();

// Obtener catálogo completo con metadata
const catalog = await catalogService.getCatalog('categories');
// { type: 'categories', items: [...], catalogMetadata: {...} }

// Invalidar cache
catalogService.clearCache('categories'); // Invalida cache de categorías
catalogService.clearCache();             // Invalida todo el cache
```

### Frontend - Componente CategoryFilters

**Opción 1: Pre-cargar datos**
```javascript
import { CategoryFilters } from './components/CategoryFilters.js';

const filters = new CategoryFilters({
  onChange: (categoryId) => {
    console.log('Categoría seleccionada:', categoryId);
  }
});

// Cargar categorías desde backend
await filters.loadCategories();

// Renderizar con datos cargados
const element = filters.render();
document.body.appendChild(element);
```

**Opción 2: Renderizar primero, cargar después**
```javascript
const filters = new CategoryFilters({
  onChange: handleCategoryChange
});

// Renderizar (mostrará "Cargando categorías...")
const element = filters.render();
document.body.appendChild(element);

// Cargar y actualizar
await filters.loadCategories();
filters.updateRender(element);
```

## 🔧 Operaciones MongoDB

Cada endpoint ejecuta operaciones específicas de MongoDB:

| Endpoint | Operación MongoDB | Descripción |
|----------|-------------------|-------------|
| `GET /api/catalogs` | `Catalog.find()` | Obtiene todos los catálogos |
| `GET /api/catalogs/:type` | `Catalog.findOne({ type })` | Obtiene catálogo por tipo |
| `GET /api/catalogs/:type/items` | `Catalog.getItems(type)` | Obtiene items activos |
| `POST /api/catalogs` | `new Catalog().save()` | Crea nuevo catálogo |
| `PUT /api/catalogs/:id` | `Catalog.findByIdAndUpdate()` | Actualiza catálogo |
| `POST /api/catalogs/:type/items` | `catalog.addItem()` | Agrega item |
| `PUT /api/catalogs/:type/items/:id` | `catalog.updateItem()` | Actualiza item |
| `DELETE /api/catalogs/:type/items/:id` | `catalog.removeItem()` | Soft delete item |

## 📝 Características

### ✅ Implementado

- [x] Modelo Mongoose para catálogos flexibles
- [x] Controlador con operaciones CRUD completas
- [x] Rutas RESTful para API
- [x] Script de seed con datos iniciales
- [x] Servicio frontend con cache
- [x] Fallback a datos mock si backend no responde
- [x] Integración en componente CategoryFilters
- [x] Métodos estáticos y de instancia en modelo
- [x] Soft delete para items (metadata.active = false)
- [x] Soporte para metadata flexible (iconos, colores, etc.)

### 🔄 Cache

El `catalogService` implementa cache en memoria:
- **TTL**: 5 minutos
- **Beneficio**: Reduce requests a backend
- **Invalidación**: Manual mediante `clearCache()`

### 🛡️ Fallback

Si el backend no responde:
- Se usan datos mock definidos en `catalogService`
- La aplicación continúa funcionando
- Se registra warning en consola

## 🎓 Conceptos Educativos

### MongoDB - Operaciones Aplicadas

```javascript
// Find all (obtener todos los catálogos)
await Catalog.find();

// FindOne (obtener catálogo específico)
await Catalog.findOne({ type: 'categories' });

// Save (crear nuevo catálogo)
const catalog = new Catalog({ type: 'new_type', items: [] });
await catalog.save();

// Update (actualizar catálogo)
await Catalog.findByIdAndUpdate(id, updates, { new: true });

// Delete (eliminar catálogo)
await Catalog.findByIdAndDelete(id);
```

### Mongoose - Características Usadas

1. **Schema con subdocumentos**: `items[]` es un array de objetos embebidos
2. **Índices**: `catalogSchema.index({ type: 1 })` para búsquedas rápidas
3. **Métodos estáticos**: `Catalog.getByType()`, `Catalog.getItems()`
4. **Métodos de instancia**: `catalog.addItem()`, `catalog.updateItem()`
5. **Enums**: Tipos de catálogo restringidos
6. **Mixed type**: Metadata flexible para datos adicionales

## 📚 Archivos Creados/Modificados

### Backend

```
backend/src/
├── models/
│   └── Catalog.js                    # Modelo Mongoose
├── controllers/
│   └── catalogController.js          # Controlador CRUD
├── routes/
│   ├── catalogs.js                   # Rutas de API
│   └── index.js                      # Modificado: agregar ruta
└── scripts/
    └── seedCatalogs.js               # Script de población
```

### Frontend

```
tuautocom.UI/js/
├── services/
│   └── catalogService.js             # Servicio con cache
└── components/
    └── CategoryFilters.js            # Modificado: usar servicio
```

## 🔮 Próximos Pasos

1. **Integrar en otros componentes**:
   - FilterSidebar: usar catalogService para marcas, transmisiones, etc.
   - VehicleForm: usar catálogos para dropdowns

2. **Panel de administración**:
   - CRUD frontend para gestionar catálogos
   - Interfaz para agregar/editar items sin tocar código

3. **Validación avanzada**:
   - Vincular categorías de Vehicle con Catalog
   - Validar que category/brand existan en catálogos

4. **Internacionalización**:
   - Agregar `label_en`, `label_es` en items
   - Servir según idioma del usuario

## 🐛 Troubleshooting

**Error: "Catalog type 'X' not found"**
- Solución: Ejecutar `node src/scripts/seedCatalogs.js` para poblar base de datos

**Frontend muestra "Cargando categorías..." permanentemente**
- Verificar que backend esté corriendo en el puerto correcto
- Revisar configuración de `backendUrl` en `config/config.js`
- Verificar consola del navegador para errores de CORS

**Cache no se actualiza tras modificar catálogo**
- Solución: `catalogService.clearCache('tipo')` o esperar 5 minutos

## 📄 Licencia

Este código es parte del proyecto educativo TuAutoCom.

---

**Documentación generada**: 26 de noviembre de 2025
**Versión**: 1.0.0
