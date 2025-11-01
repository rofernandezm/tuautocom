# TuAutoCom - Contexto del Proyecto

## 📋 Información General
- **Proyecto**: TuAutoCom UI (Frontend)
- **Tipo**: Aplicación web de catálogo de vehículos
- **Fecha inicio**: Octubre 18, 2025

## 🏗️ Arquitectura del Proyecto

### Estructura de directorios
```
[proyecto-raiz]/
├── backend/          # Servidor Node.js (existente)
└── tuautocom.UI/     # Frontend (en desarrollo) - SE MOVERÁ AQUÍ
```

### Stack Tecnológico Frontend

#### Decisiones Confirmadas ✅
1. **JavaScript**: Vanilla JS con ES Modules (ES6+)
2. **CSS Framework**: Tailwind CSS (instalación local, NO CDN)
3. **Arquitectura**: Component-based (módulos ES6)
4. **Diseños**: Desde Stitch (Google) - Tailwind embebido

#### Estructura Frontend
```
tuautocom.UI/
├── designs/          # Diseños raw de Stitch (temporal)
├── js/
│   ├── main.js      # Entry point
│   ├── components/  # Componentes reutilizables
│   ├── views/       # Vistas/páginas
│   ├── services/    # API calls
│   ├── config/      # Configuración
│   └── utils/       # Utilidades
├── styles/
│   ├── input.css    # Tailwind directives (source)
│   └── output.css   # CSS compilado (generado)
└── index.html
```

## 🎨 Diseño

### Paleta de Colores
- **Primary Dark**: `#10231c` (verde oscuro - fondo)
- **Primary Medium**: `#214a3c` (verde medio - elementos)
- **Primary Light**: `#8ecdb7` (verde claro/menta - texto secundario)
- **Text**: `white` (texto principal)

### Tipografía
- **Fuentes**: Inter, Noto Sans (Google Fonts)

### Componentes Identificados (Home)
1. Header - Navegación principal
2. HeroSection - Banner hero
3. CategoryFilters - Pills de categorías
4. VehicleCard - Tarjeta de vehículo
5. VehicleCarousel - Carrusel horizontal
6. Footer - Links y redes sociales

## 📄 Vistas Planificadas
- [ ] Home (diseño recibido ✅)
- [ ] Catálogo
- [ ] Detalle de vehículo
- [ ] Login/Registro
- [ ] Cargar vehículo
- [ ] (Pendiente definir más)

## 🔌 Backend
- **Stack**: Node.js
- **Ubicación**: Mismo proyecto raíz que frontend
- **API**: (Pendiente documentar endpoints)

## ⚙️ Decisiones Técnicas Pendientes

### ✅ Manejador de Paquetes
- **Seleccionado**: **pnpm** (Performant npm)
- **Razón**: Consistencia con backend (ya usa pnpm)
- **Beneficios**: 
  - Eficiencia en espacio (hard links)
  - Instalaciones más rápidas
  - Gestión estricta de dependencias
  - Workspace support (útil para monorepo futuro)

### 🤔 Otras Decisiones Pendientes
- [ ] Sistema de routing (Hash-based vs History API)
- [ ] Gestión de estado global (si es necesario)
- [ ] Build system / Bundler (Vite, esbuild, o solo Tailwind CLI)
- [ ] Testing framework

## 📝 Metodología de Trabajo
- **Enfoque**: Iterativo e incremental + Pedagógico
- **Flujo**: Diseño → Análisis → Decisión → Implementación → Validación
- **Principio**: No implementar sin confirmación previa
- **Estilo**: Explicar conceptos mientras se implementa (learning by doing)

## 📊 Progreso del Proyecto

### Sesiones de Desarrollo
1. **Sesión #001** (2025-10-18) - ✅ Setup Inicial Completo
   - Estructura del proyecto
   - Stack tecnológico (Tailwind + SASS)
   - Sistema de tema centralizado
   - Documentación completa

2. **Sesión #002** (2025-10-18) - � Header Component (En Progreso)
   - Header component creado con código educativo
   - Lecciones pedagógicas sobre ES Modules y patrones
   - Pendiente: Testing en navegador

### Componentes Implementados
- [x] **Header** - 🟡 Creado, pendiente de testing
- [ ] VehicleCard
- [ ] Footer
- [ ] HeroSection
- [ ] CategoryFilter
- [ ] SearchBar
- [ ] Button
- [ ] Modal

## �📚 Recursos

### Documentación
- **AGENT.md**: Instrucciones completas para agentes de IA, patrones de código
- **CONTEXT.md**: Este archivo - Contexto del proyecto
- **sessions/**: Historial detallado de cada sesión de desarrollo
- **sessions/**: Historial detallado de sesiones de desarrollo
  - `2025-10-18-setup-inicial.md` - Sesión #001: Configuración inicial ✅

### Diseños
- `designs/` directory - Diseños raw de Stitch

### Para Recuperar Contexto
1. Leer archivo de sesión más reciente en `sessions/`
2. Consultar `AGENT.md` para patrones y estándares
3. Revisar `CONTEXT.md` para estado actual

---
**Última actualización**: 2025-10-18
