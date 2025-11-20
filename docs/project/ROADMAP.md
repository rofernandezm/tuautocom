# 🗺️ Roadmap - TuAutoCom

Plan de desarrollo y próximas funcionalidades.

---

## 🎯 Visión del Proyecto

**TuAutoCom** es una aplicación de catálogo de vehículos (compra/venta) con enfoque educativo en **MongoDB**. El frontend y backend son medios para visualizar y validar operaciones de base de datos.

### Objetivos Principales

1. **Aprendizaje de MongoDB** - Foco principal del proyecto
2. **CRUD completo** - Operaciones básicas bien implementadas
3. **Arquitectura escalable** - Fácil migración a React/React Native
4. **Código educativo** - Comentarios y documentación en español

---

## ✅ Completado (v0.1.0)

### Backend
- ✅ Conexión a MongoDB Atlas
- ✅ 3 modelos Mongoose (Vehicle, Comment, Reservation)
- ✅ 13 endpoints REST (CRUD completo)
- ✅ Upload de imágenes con Multer
- ✅ Error handling centralizado
- ✅ CORS configurado

### Frontend
- ✅ API Client (fetch wrapper)
- ✅ 3 services integrados (vehicleService, commentService, inquiryService)
- ✅ Comunicación frontend-backend operativa
- ✅ CatalogView con datos desde MongoDB
- ✅ VehicleCard component
- ✅ FilterSidebar, SearchBar, Pagination (UI)
- ✅ Header, Footer, HeroSection
- ✅ Tailwind CSS configurado
- ✅ Tema centralizado (`theme.js`)

### Infraestructura
- ✅ Monorepo con pnpm
- ✅ ES Modules en todos los proyectos
- ✅ Variables de ambiente protegidas
- ✅ Scripts de setup multiplataforma
- ✅ Documentación completa

---

## 🚧 En Desarrollo (v0.2.0)

### Alta Prioridad

#### 1. VehicleDetailView - Ficha Detallada
**Estado:** 70% completado  
**Pendiente:**
- [ ] Integrar `vehicleService.getById(id)`
- [ ] Mostrar galería de imágenes completa
- [ ] Sección de comentarios funcional (`CommentsSection`)
- [ ] Formulario de contacto/reserva integrado
- [ ] Navegación breadcrumb

**Operación MongoDB:** `Vehicle.findById(id).populate('comments')`

#### 2. AdminVehicleFormView - Panel de Administración
**Estado:** 30% completado  
**Pendiente:**
- [ ] Formulario CRUD conectado a `vehicleService`
- [ ] Upload de imágenes (FormData con Multer)
- [ ] Validaciones frontend (antes de enviar)
- [ ] Preview de imágenes antes de upload
- [ ] Confirmación antes de eliminar

**Operaciones MongoDB:**
- `Vehicle.create(data)` - Crear
- `Vehicle.findByIdAndUpdate(id, data)` - Actualizar
- `Vehicle.findByIdAndDelete(id)` - Eliminar

#### 3. Filtros y Búsqueda desde Backend
**Estado:** 50% completado (solo UI)  
**Pendiente:**
- [ ] Backend: Query parameters en `/api/vehicles`
  - `?category=SUV`
  - `?minPrice=20000&maxPrice=50000`
  - `?search=toyota`
  - `?year=2023`
- [ ] Frontend: Actualizar `FilterSidebar` para enviar queries
- [ ] Frontend: Actualizar `SearchBar` para búsqueda real
- [ ] Combinar múltiples filtros

**Operación MongoDB:** `Vehicle.find({ category: 'SUV', price: { $gte: 20000, $lte: 50000 } })`

#### 4. Paginación desde Backend
**Estado:** UI completa, backend pendiente  
**Pendiente:**
- [ ] Backend: Implementar paginación
  - `GET /api/vehicles?page=1&limit=12`
  - Devolver metadata: `{ data: [...], total, page, pages }`
- [ ] Frontend: Actualizar `Pagination` component
- [ ] Mostrar total de resultados

**Operación MongoDB:** `Vehicle.find().skip(skip).limit(limit)`

---

## 📅 Próximas Fases

### Fase 2 - Autenticación y Roles (v0.3.0)

**Objetivo:** Proteger rutas de administración

**Backend:**
- [ ] Implementar JWT o sessions
- [ ] Modelo `User` con Mongoose
- [ ] Middleware de autenticación
- [ ] Roles: `admin`, `user`, `guest`
- [ ] Endpoints de auth:
  - `POST /api/auth/register`
  - `POST /api/auth/login`
  - `POST /api/auth/logout`
  - `GET /api/auth/me`

**Frontend:**
- [ ] LoginView / RegisterView
- [ ] AuthService
- [ ] Context de usuario (localStorage)
- [ ] Rutas protegidas
- [ ] Mostrar/ocultar según rol

**Operaciones MongoDB:**
- `User.create()` - Registro
- `User.findOne({ email })` - Login
- `bcrypt.compare()` - Validar password

**Tiempo estimado:** 2 semanas

---

### Fase 3 - Funcionalidades Avanzadas (v0.4.0)

**Objetivo:** Features de producción

#### Sistema de Reservas Completo
- [ ] ReservationView (usuario)
- [ ] AdminReservationsView (admin)
- [ ] Estados: `pending`, `confirmed`, `cancelled`
- [ ] Notificaciones (opcional: email)

**Operaciones MongoDB:**
- `Reservation.create()` - Nueva reserva
- `Reservation.find({ status: 'pending' })` - Filtrar por estado
- `Reservation.findByIdAndUpdate()` - Cambiar estado

#### Gestión de Imágenes Mejorada
- [ ] Optimización de imágenes (sharp)
- [ ] Thumbnails automáticos
- [ ] CDN (Cloudinary o S3)
- [ ] Límite de tamaño y formato

#### Favoritos
- [ ] Modelo `Favorite` o campo en User
- [ ] Toggle favorito
- [ ] Vista "Mis Favoritos"

**Operación MongoDB:** `User.findByIdAndUpdate(id, { $push: { favorites: vehicleId } })`

**Tiempo estimado:** 3 semanas

---

### Fase 4 - Testing y Calidad (v0.5.0)

**Objetivo:** Código robusto y confiable

**Backend:**
- [ ] Unit tests con Jest
- [ ] Integration tests con Supertest
- [ ] Coverage > 80%
- [ ] Tests de Mongoose models
- [ ] Tests de API endpoints

**Frontend:**
- [ ] Unit tests de components (Jest + Testing Library)
- [ ] Tests de services
- [ ] Tests de utilities
- [ ] E2E tests (Playwright o Cypress)

**Infraestructura:**
- [ ] CI/CD con GitHub Actions
- [ ] Linting (ESLint)
- [ ] Pre-commit hooks (Husky)

**Tiempo estimado:** 2 semanas

---

### Fase 5 - Deploy y Producción (v1.0.0)

**Objetivo:** Aplicación en producción

**Backend:**
- [ ] Deploy en Railway / Render / Fly.io
- [ ] Variables de ambiente en cloud
- [ ] Logs estructurados (Winston)
- [ ] Monitoring (opcional: Sentry)
- [ ] Rate limiting
- [ ] HTTPS

**Frontend:**
- [ ] Deploy en Vercel / Netlify
- [ ] Build optimizado (minificación)
- [ ] PWA (opcional)
- [ ] Analytics (opcional)

**Database:**
- [ ] MongoDB Atlas en producción
- [ ] Backups automáticos
- [ ] Índices optimizados

**Tiempo estimado:** 1 semana

---

### Fase 6 - Features Premium (v2.0.0)

**Objetivo:** Funcionalidades de marketplace

#### Carrito de Compras
- [ ] Modelo `Cart`
- [ ] Agregar/remover items
- [ ] Persistencia (localStorage + DB)
- [ ] Checkout flow

#### Sistema de Pagos
- [ ] Integración Stripe / MercadoPago
- [ ] Webhooks
- [ ] Confirmación de pago
- [ ] Historial de transacciones

#### Chat en Vivo
- [ ] Socket.io para mensajería
- [ ] Chat entre comprador y vendedor
- [ ] Notificaciones en tiempo real

#### Recomendaciones
- [ ] Algoritmo de "vehículos similares"
- [ ] Basado en historial de búsqueda
- [ ] Machine learning (opcional)

**Tiempo estimado:** 6 semanas

---

## 🔮 Futuro (Backlog)

### Migración a React (Opcional)

Si el proyecto crece o el equipo domina los fundamentos:

**Frontend:**
- [ ] Migrar a React o Next.js
- [ ] Mantener misma arquitectura de services
- [ ] Reusar lógica de negocio
- [ ] Tailwind CSS (ya configurado)

**Mobile:**
- [ ] React Native
- [ ] Compartir services con web
- [ ] UI adaptada a móvil

**Backend:**
- [ ] Sin cambios necesarios (API REST es agnóstica)

---

## 📊 Métricas de Progreso

| Fase | Estado | Completado | Tiempo Est. |
|------|--------|------------|-------------|
| v0.1.0 - MVP | ✅ | 100% | Completado |
| v0.2.0 - Features Core | 🚧 | 50% | 2 semanas |
| v0.3.0 - Auth | ⏳ | 0% | 2 semanas |
| v0.4.0 - Advanced | ⏳ | 0% | 3 semanas |
| v0.5.0 - Testing | ⏳ | 0% | 2 semanas |
| v1.0.0 - Production | ⏳ | 0% | 1 semana |
| v2.0.0 - Premium | ⏳ | 0% | 6 semanas |

**Tiempo total estimado:** ~16 semanas (4 meses)

---

## 🎯 Prioridades por Aprendizaje MongoDB

Como el foco es **MongoDB**, priorizamos features que permitan practicar:

### Alta Prioridad (Operaciones Esenciales)
1. ✅ CRUD básico (`find`, `findById`, `create`, `update`, `delete`)
2. ✅ Filtros simples (`find({ category: 'SUV' })`)
3. 🚧 Filtros complejos (`$gte`, `$lte`, `$in`)
4. 🚧 Búsqueda de texto (`$text`, `$search`)
5. ⏳ Agregaciones (`aggregate()`)
6. ⏳ Population (referencias entre colecciones)

### Media Prioridad (Operaciones Avanzadas)
7. ⏳ Índices (`createIndex()`)
8. ⏳ Transacciones
9. ⏳ Geoqueries (búsqueda por ubicación)
10. ⏳ Time series (análisis temporal)

### Baja Prioridad (Optimización)
11. ⏳ Sharding
12. ⏳ Replicación
13. ⏳ Performance tuning

---

## 🤝 Contribución

Este roadmap es flexible y se ajusta según:
- Velocidad de aprendizaje del equipo
- Prioridades del proyecto
- Feedback de usuarios

Para sugerir cambios:
1. Crear issue en GitHub
2. Discutir en reunión de equipo
3. Actualizar este documento

---

**Última actualización:** 2025-11-20  
**Versión:** 1.0  
**Próxima revisión:** 2025-12-01
