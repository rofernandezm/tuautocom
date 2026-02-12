🌐 Idioma: **Español** | [Inglés](FEATURES_EN.md)

# Funcionalidades

Este documento describe las capacidades funcionales implementadas en TuAutoCom, sustentadas en evidencia directa del código backend y frontend.

El sistema fue concebido como un catálogo web de vehículos orientado a demostrar el uso de un modelo documental flexible y consultas propias de MongoDB.

---

## 1. Catálogo Dinámico de Vehículos

### Endpoint principal
GET /api/vehicles

### Capacidades implementadas

- Listado paginado.
- Filtros combinables.
- Búsqueda textual.
- Ordenamiento dinámico.
- Conteo total de resultados.

### Parámetros soportados

Query params:

- page
- limit
- category
- brand
- minPrice
- maxPrice
- year
- fuel
- condition
- search

### Operaciones MongoDB utilizadas

- find(filter)
- countDocuments(filter)
- skip()
- limit()
- sort()
- Operadores:
  - $regex (búsqueda case-insensitive)
  - $gte / $lte (rangos de precio)
  - $or (condiciones múltiples)

Las consultas se construyen dinámicamente en función de los parámetros recibidos.

---

## 2. Detalle de Vehículo

### Endpoint
GET /api/vehicles/:id

### Operación DB
- findById()

Permite obtener:

- Información base.
- Especificaciones extendidas.
- Múltiples imágenes.
- Comentarios asociados.

La estructura del documento permite que cada vehículo tenga atributos adicionales sin requerir migraciones de esquema.

---

## 3. Agregaciones MongoDB

Se implementan pipelines de agregación explícitos para demostrar capacidades del motor NoSQL.

### 3.1 Vehículos Destacados
GET /api/vehicles/featured

Pipeline:
- $match (condition.use = 'new' OR price < 30000)
- $sort (createdAt desc)
- $limit (8)

Objetivo:
Mostrar vehículos nuevos o económicos ordenados por fecha de creación.

---

### 3.2 Vehículos Económicos
GET /api/vehicles/cheapest

Pipeline:
- $sort (price asc)
- $limit (8)

Objetivo:
Obtener los 8 vehículos con menor precio.

---

### 3.3 Vehículos Recientes
GET /api/vehicles/recent

Pipeline:
- $sort (createdAt desc)
- $limit (8)

Objetivo:
Mostrar los últimos vehículos agregados.

---

### 3.4 Catálogos Dinámicos

GET /api/catalogs/:type/items

Pipeline:

- $match (type)
- $unwind (items[])
- $match (items.metadata.active ≠ false)
- $sort (items.label asc)
- $group (reconstrucción del array)
- $project (exposición de items)

Objetivo:

- Filtrar ítems activos.
- Ordenarlos alfabéticamente.
- Reconstruir la colección para respuesta limpia.

Este pipeline demuestra manipulación de arrays anidados dentro de documentos.

---

## 4. Gestión de Vehículos (CRUD)

Endpoints implementados:

- POST /api/vehicles
- PUT /api/vehicles/:id
- DELETE /api/vehicles/:id

Operaciones Mongo:

- create()
- findByIdAndUpdate()
- findByIdAndDelete()

### Carga de imágenes

Se utiliza middleware multer para:

- Permitir múltiples imágenes.
- Guardarlas en /public/uploads.
- Persistir sus rutas en el documento del vehículo.

---

## 5. Comentarios por Vehículo

Endpoints:

- GET /api/comments
- GET /api/comments/:id
- GET /api/comments/vehicle/:vehicleId
- POST /api/comments
- DELETE /api/comments/:id

Operaciones Mongo:

- find()
- findById()
- create()
- findByIdAndDelete()
- sort({createdAt: -1})

Permite asociar comentarios a vehículos mediante ObjectId.

No requiere autenticación.

---

## 6. Consultas / Reservas

Endpoints:

- GET /api/reservations
- GET /api/reservations/:id
- POST /api/reservations
- DELETE /api/reservations/:id

Operaciones Mongo:

- find()
- findById()
- create()
- findByIdAndDelete()

Permite registrar consultas asociadas a vehículos sin lógica de pago o transacción.

---

## 7. Gestión de Catálogos

Se implementa un sistema dinámico de catálogos para:

- Categorías
- Marcas
- Combustibles
- Transmisiones
- Otros tipos extensibles

Incluye:

- CRUD de catálogos
- CRUD de ítems dentro del catálogo
- Soft-disable mediante metadata.active

Permite mantener valores configurables sin hardcode en frontend.

---

## 8. Evidencia Frontend

El frontend consume los endpoints mediante servicios dedicados:

- vehicleService
- catalogService
- commentService
- inquiryService

Implementa:

- Renderizado dinámico mediante ES Modules.
- Actualización de grillas al cambiar filtros.
- Carga dinámica de catálogos.
- Renderización de comentarios mediante map().
- Formularios para envío de consultas.

La interfaz no accede directamente a la base de datos; toda comunicación ocurre vía API REST.

---

## 9. Funcionalidades Deliberadamente No Incluidas

No se implementaron:

- Autenticación o gestión de usuarios.
- JWT o middleware de autorización.
- Carrito de compras.
- Procesamiento de pagos.
- Checkout.
- Órdenes o transacciones.

Estas funcionalidades fueron excluidas intencionalmente para mantener el foco en:

- Modelado documental.
- Consultas dinámicas.
- Uso de agregaciones.
- Flexibilidad del esquema.

---

## 10. Alcance Funcional

TuAutoCom se posiciona como un sistema demostrativo enfocado en:

- Consultas avanzadas sobre MongoDB.
- Manipulación de documentos flexibles.
- Agregaciones controladas.
- Integración API–UI desacoplada.

El alcance fue definido para priorizar arquitectura y decisiones técnicas sobre expansión funcional innecesaria.
