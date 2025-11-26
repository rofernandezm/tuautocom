# Sesión 2025-11-26: Sistema de Catálogos

**Fecha**: 26 de noviembre de 2025  
**Objetivo**: Implementar sistema centralizado de catálogos para eliminar datos hardcoded del frontend

---

## 📋 Resumen

Se implementó un **sistema completo de catálogos** en MongoDB para gestionar dinámicamente datos de referencia (categorías, marcas, transmisiones, combustibles, colores, condiciones, tracciones) que anteriormente estaban hardcoded en el frontend.

---

## 🎯 Problema Identificado

- **Frontend con datos hardcoded**: Categorías, marcas, combustibles y otras opciones estaban escritas directamente en el código
- **Mantenimiento difícil**: Cambiar una marca requería modificar múltiples archivos
- **Sin fuente única de verdad**: Datos duplicados entre componentes
- **Escalabilidad limitada**: Agregar nuevas opciones requería modificar y redesplegar código

---

## ✅ Solución Implementada

### Backend - MongoDB

#### 1. Modelo de Datos (`backend/src/models/Catalog.js`)

```javascript
{
  type: String,              // 'categories', 'brands', 'transmissions', etc.
  items: [
    {
      id: String,            // Identificador único
      label: String,         // Texto a mostrar en UI
      metadata: {
        order: Number,       // Orden de visualización
        active: Boolean,     // Si está activo
        color: String,       // Opcional: para colores
        extra: Mixed         // Datos adicionales flexibles
      }
    }
  ],
  catalogMetadata: {
    description: String,
    allowMultiple: Boolean,
    order: Number
  }
}
```

**Características del modelo**:
- Schema flexible con subdocumentos
- Índices para búsquedas eficientes
- Métodos estáticos: `getByType()`, `getItems()`
- Métodos de instancia: `addItem()`, `updateItem()`, `removeItem()`
- Soft delete (marca items como inactivos)

#### 2. Controlador (`backend/src/controllers/catalogController.js`)

**Endpoints implementados**:
- `GET /api/catalogs` - Obtener todos los catálogos
- `GET /api/catalogs/:type` - Obtener catálogo por tipo
- `GET /api/catalogs/:type/items` - Obtener solo items (sin metadata)
- `POST /api/catalogs` - Crear nuevo catálogo
- `PUT /api/catalogs/:id` - Actualizar catálogo
- `DELETE /api/catalogs/:id` - Eliminar catálogo
- `POST /api/catalogs/:type/items` - Agregar item
- `PUT /api/catalogs/:type/items/:itemId` - Actualizar item
- `DELETE /api/catalogs/:type/items/:itemId` - Eliminar item (soft delete)

#### 3. Rutas (`backend/src/routes/catalogs.js`)

Rutas RESTful bajo `/api/catalogs` integradas en el router principal.

#### 4. Script de Seed (`backend/src/scripts/seedCatalogs.js`)

Pobla la base de datos con datos iniciales:

| Catálogo | Items | Descripción |
|----------|-------|-------------|
| `categories` | 6 | SUV, Sedán, Pick-up, Eléctricos, Deportivos, Hatchback |
| `brands` | 15 | Toyota, Honda, Ford, Chevrolet, Nissan, Mazda, etc. |
| `transmissions` | 4 | Manual, Automática, CVT, DSG |
| `fuels` | 6 | Gasolina, Diésel, Eléctrico, Híbrido, etc. |
| `colors` | 10 | Blanco, Negro, Gris, Plata, Rojo, Azul, etc. |
| `conditions` | 2 | Nuevo, Usado |
| `tractions` | 5 | 2WD, 4WD, AWD, FWD, RWD |

**Total**: 7 catálogos con 48 items

### Frontend - Servicio y Componentes

#### 1. Servicio de Catálogos (`tuautocom.UI/js/services/catalogService.js`)

**Características**:
- Cache en memoria con TTL de 5 minutos
- Fallback a datos mock si backend no responde
- Métodos específicos: `getCategories()`, `getBrands()`, `getFuels()`, etc.
- Invalidación manual de cache: `clearCache(type)`
- Patrón singleton para compartir cache

**Ejemplo de uso**:
```javascript
import { catalogService } from './services/catalogService.js';

const categories = await catalogService.getCategories();
// [{ id: 'suv', label: 'SUV', metadata: {...} }, ...]
```

#### 2. Componente CategoryFilters (`tuautocom.UI/js/components/CategoryFilters.js`)

**Cambios**:
- Eliminados datos hardcoded del constructor
- Nuevo método `loadCategories()` para cargar desde backend
- Nuevo método `updateRender()` para re-renderizar tras carga
- Estado de carga con mensaje "Cargando categorías..."

**Uso actualizado**:
```javascript
const filters = new CategoryFilters({ onChange: handleChange });
await filters.loadCategories();
const element = filters.render();
```

#### 3. Vista AdminVehicleFormView (`tuautocom.UI/js/views/AdminVehicleFormView.js`)

**Cambios**:
- Importado `catalogService`
- Estado `catalogs` para almacenar catálogos cargados
- Método `init()` actualizado para cargar catálogos en paralelo
- Eliminados `<option>` hardcoded de selectores
- Nuevo método `_renderCatalogOptions()` para generar opciones dinámicamente

**Selectores actualizados**:
- ✅ Marca → carga desde `catalogService.getBrands()`
- ✅ Categoría → carga desde `catalogService.getCategories()`
- ✅ Combustible → carga desde `catalogService.getFuels()`

---

## 🔧 Correcciones Aplicadas

### Problema: Namespace Duplicado MongoDB

**Error detectado**: 
```
MongoServerError: Invalid namespace specified: tuautocom/tuautocom.catalogs
```

**Causa raíz**:
1. `.env.dev` tenía `DATABASE_URL` terminando en `/tuautocom`
2. `db.js` concatenaba `DATABASE_URL` + `DATABASE_NAME`
3. Resultado: `mongodb://...net/tuautocom/tuautocom`

**Solución aplicada**:

1. **`.env.dev`**: Eliminada variable `DATABASE_NAME`
```bash
# Antes
DATABASE_URL=mongodb+srv://...mongodb.net/tuautocom
DATABASE_NAME=tuautocom

# Después
DATABASE_URL=mongodb+srv://...mongodb.net/tuautocom
```

2. **`backend/src/config/db.js`**: Usar directamente `DATABASE_URL`
```javascript
// Antes
const uri = `${config.DATABASE_URL}/${config.DATABASE_NAME}`;

// Después
const uri = config.DATABASE_URL;
```

3. **`backend/src/config/env.js`**: Eliminada propiedad `DATABASE_NAME`
```javascript
// Antes
const config = {
  DATABASE_URL: process.env.DATABASE_URL || 'mongodb://localhost:27017',
  DATABASE_NAME: process.env.DATABASE_NAME || 'tuautocom',
  ...
};

// Después
const config = {
  DATABASE_URL: process.env.DATABASE_URL || 'mongodb://localhost:27017/tuautocom',
  ...
};
```

### Limpieza de Código

Por solicitud del usuario, se eliminaron:
- ❌ Iconos en items de catálogos (metadata.icon)
- ❌ Console.log innecesarios en:
  - `seedCatalogs.js`
  - `catalogService.js`
  - `CategoryFilters.js`

---

## 📁 Archivos Creados

```
backend/
├── src/
│   ├── models/
│   │   └── Catalog.js                    # ✅ Modelo Mongoose
│   ├── controllers/
│   │   └── catalogController.js          # ✅ Controlador CRUD
│   ├── routes/
│   │   ├── catalogs.js                   # ✅ Rutas API
│   │   └── index.js                      # 🔄 Modificado: agregar ruta
│   └── scripts/
│       └── seedCatalogs.js               # ✅ Script de población
└── README_CATALOGS.md                    # ✅ Documentación completa

tuautocom.UI/
└── js/
    ├── services/
    │   └── catalogService.js             # ✅ Servicio con cache
    └── components/
        └── CategoryFilters.js            # 🔄 Modificado: usar servicio
```

## 📁 Archivos Modificados

```
backend/
├── src/
│   ├── config/
│   │   ├── db.js                         # 🔄 Corregido namespace
│   │   └── env.js                        # 🔄 Eliminado DATABASE_NAME
│   └── routes/
│       └── index.js                      # 🔄 Agregada ruta catalogs
├── .env.dev                              # 🔄 Eliminado DATABASE_NAME

tuautocom.UI/
└── js/
    ├── components/
    │   └── CategoryFilters.js            # 🔄 Integrado catalogService
    └── views/
        └── AdminVehicleFormView.js       # 🔄 Selectores dinámicos
```

---

## 🧪 Verificación

### Seed Exitoso
```bash
$ node src/scripts/seedCatalogs.js
categories: 6 items
brands: 15 items
transmissions: 4 items
fuels: 6 items
colors: 10 items
conditions: 2 items
tractions: 5 items
```

### API Funcionando
```bash
$ curl http://localhost:8001/api/catalogs/categories/items
{
  "success": true,
  "count": 6,
  "data": [
    { "id": "suv", "label": "SUV", "metadata": {...} },
    { "id": "sedan", "label": "Sedán", "metadata": {...} },
    ...
  ]
}
```

---

## 📊 Operaciones MongoDB

Cada endpoint ejecuta operaciones específicas:

| Endpoint | Operación MongoDB |
|----------|-------------------|
| `GET /api/catalogs` | `Catalog.find()` |
| `GET /api/catalogs/:type` | `Catalog.findOne({ type })` |
| `GET /api/catalogs/:type/items` | `Catalog.getItems(type)` |
| `POST /api/catalogs` | `new Catalog().save()` |
| `PUT /api/catalogs/:id` | `Catalog.findByIdAndUpdate()` |
| `POST /api/catalogs/:type/items` | `catalog.addItem() → save()` |
| `PUT /api/catalogs/:type/items/:id` | `catalog.updateItem() → save()` |
| `DELETE /api/catalogs/:type/items/:id` | `catalog.removeItem() → save()` |

---

## 🎓 Conceptos Aplicados

### MongoDB/Mongoose

1. **Schema con subdocumentos**: Array `items[]` embebido en documento principal
2. **Índices**: `catalogSchema.index({ type: 1 })` para búsquedas rápidas
3. **Métodos estáticos**: `Catalog.getByType()`, `Catalog.getItems()`
4. **Métodos de instancia**: `catalog.addItem()`, `catalog.updateItem()`
5. **Enums**: Tipos de catálogo restringidos
6. **Mixed type**: Metadata flexible para datos adicionales
7. **Soft delete**: Marcar items como inactivos sin eliminarlos

### Frontend

1. **Singleton pattern**: Una instancia de `catalogService` compartida
2. **Cache en memoria**: Map con timestamp y TTL
3. **Fallback pattern**: Datos mock si backend falla
4. **Async/await**: Carga asíncrona de datos
5. **Promise.all**: Carga paralela de múltiples catálogos
6. **Dynamic rendering**: Generación de HTML desde datos

---

## 🚀 Próximos Pasos Recomendados

1. **Extender uso de catálogos**:
   - [ ] FilterSidebar: usar catalogService para filtros
   - [ ] VehicleCard: validar categorías contra catálogos
   - [ ] Agregar campos de transmisión, color, tracción en formulario

2. **Panel de administración**:
   - [ ] Vista CRUD para gestionar catálogos desde UI
   - [ ] Agregar/editar/eliminar items sin tocar código
   - [ ] Ordenamiento drag & drop de items

3. **Validación avanzada**:
   - [ ] Validar que `vehicle.category` exista en catálogo
   - [ ] Validar que `vehicle.brand` exista en catálogo
   - [ ] Referencias entre colecciones (opcional)

4. **Mejoras de UX**:
   - [ ] Búsqueda en selectores largos (marcas)
   - [ ] Multiselect para filtros
   - [ ] Contadores de vehículos por categoría

5. **Internacionalización**:
   - [ ] Agregar `label_en`, `label_es` en items
   - [ ] Servir según idioma del usuario

---

## 📚 Documentación de Referencia

- **README completo**: `backend/README_CATALOGS.md`
- **Copilot Instructions**: `.github/copilot-instructions.md`
- **Código fuente**: Ver archivos listados arriba

---

## ✅ Estado Final

- ✅ Backend con 7 catálogos poblados en MongoDB
- ✅ API REST funcionando correctamente
- ✅ Frontend consumiendo catálogos dinámicamente
- ✅ CategoryFilters usando datos de backend
- ✅ AdminVehicleFormView con selectores dinámicos
- ✅ Cache implementado para optimizar requests
- ✅ Fallback a datos mock si backend falla
- ✅ Código limpio sin console.log ni datos hardcoded

---

**Sesión cerrada**: 26 de noviembre de 2025  
**Desarrollador**: AI Agent (GitHub Copilot)  
**Usuario**: rodrigo
