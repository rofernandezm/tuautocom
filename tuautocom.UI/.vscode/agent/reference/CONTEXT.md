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

## 🧾 Nota para modelos LLM

Este repositorio requiere que cualquier modelo LLM que participe en la edición o proposición de cambios:

- Lea `INDEX.md` para navegación completa de la documentación
- Lea `core/AGENT.md` (índice maestro) para conocer la estructura
- Lea `core/CRITICAL-RULES.md` (**OBLIGATORIO**) - Límites de líneas y reglas críticas
- Lea los módulos específicos según la tarea:
  - `guides/methodology.md` (~640L) - Metodología de razonamiento
  - `guides/architecture.md` (~630L) - Patrones y arquitectura técnica
  - `guides/workflows.md` (~560L) - Flujos de trabajo y troubleshooting
  - `guides/llm-guidelines.md` (~740L) - Guidelines para LLMs
- Lea `reference/CONTEXT.md` (este archivo) para conocer el estado actual del proyecto
- Lea `sessions/[última]` para decisiones recientes

**Nota**: La documentación está organizada en estructura de directorios (core/, guides/, reference/, sessions/) con módulos <700 líneas para facilitar la lectura por modelos LLM con límite de contexto.

El modelo debe confirmar en español que realizó estas lecturas antes de proceder con cualquier cambio. Si el modelo no tiene acceso a los archivos locales, debe solicitar la información al usuario.

## 📊 Progreso del Proyecto

### Sesiones de Desarrollo
1. **Sesión #001** (2025-10-18) - ✅ Setup Inicial Completo
   - Estructura del proyecto
   - Stack tecnológico (Tailwind + SASS)
   - Sistema de tema centralizado
   - Documentación completa

2. **Sesión #002** (2025-10-18) - ✅ Header Component
   - Header component creado con código educativo
   - Lecciones pedagógicas sobre ES Modules y patrones
   - Completado y documentado

3. **Sesión #003** (2025-10-21) - ✅ Documentación Global
   - Creación de `.github/copilot-instructions.md`
   - Documentación completa del monorepo
   - Guías para AI agents y desarrollo

4. **Sesión #004** (2025-11-01) - ✅ Componentes Core Completados
   - VehicleCard con hover effects y validación
   - HeroSection con background image y overlay
   - CategoryFilters con state management
   - Footer con enlaces y redes sociales
   - Test completo de integración creado

### Componentes Implementados
- [x] **Header** - ✅ Completo (navegación principal)
- [x] **VehicleCard** - ✅ Completo (tarjeta con eventos y validación)
- [x] **HeroSection** - ✅ Completo (banner hero responsive)
- [x] **CategoryFilters** - ✅ Completo (filtros interactivos con estado)
- [x] **Footer** - ✅ Completo (pie con iconos SVG)
- [ ] SearchBar
- [ ] Button
- [ ] Modal
- [ ] ContactForm
- [ ] VehicleCarousel

## �📚 Recursos

### Documentación
- **INDEX.md**: Índice maestro de navegación de toda la documentación
- **core/**:
  - **AGENT.md**: Índice de instrucciones para agentes de IA
  - **CRITICAL-RULES.md**: Reglas obligatorias y límites de archivos
- **guides/**:
  - **methodology.md**: Metodología de razonamiento y trabajo (~640L)
  - **architecture.md**: Arquitectura y patrones técnicos (~630L)
  - **workflows.md**: Flujos de trabajo prácticos (~560L)
  - **llm-guidelines.md**: Guías específicas para modelos LLM (~740L)
- **reference/**:
  - **CONTEXT.md**: Este archivo - Contexto del proyecto
  - **LEARNING.md**: Recursos educativos
- **sessions/**: Historial detallado de sesiones de desarrollo
  - `2025-10-18-setup-inicial.md` - Sesión #001: Configuración inicial ✅
  - `2025-10-18-implementacion-header.md` - Sesión #002: Header component ✅
  - `2025-11-01-componentes-core.md` - Sesión #004: VehicleCard, Hero, Filters, Footer ✅
  - `2025-11-02-fraccionamiento-documentacion.md` - Sesión #005: Fraccionamiento docs ✅
  - `2025-11-02-reorganizacion-estructura.md` - Sesión #006: Reorganización directorios ✅

### Diseños
- `designs/` directory - Diseños raw de Stitch

### Tests
- `test-vehiclecard.html` - Test individual de VehicleCard
- `test-all-components.html` - Test completo de todos los componentes integrados

### Para Recuperar Contexto
1. Leer `INDEX.md` para navegación completa
2. Leer archivo de sesión más reciente en `sessions/`
3. Consultar `core/AGENT.md` (índice maestro) para estructura de documentación
4. Leer `core/CRITICAL-RULES.md` para reglas obligatorias
5. Leer módulo específico relevante (guides/methodology, architecture, workflows)
6. Revisar `reference/CONTEXT.md` (este archivo) para estado actual

---
**Última actualización**: 2025-11-02 (Reorganización en estructura de directorios)
