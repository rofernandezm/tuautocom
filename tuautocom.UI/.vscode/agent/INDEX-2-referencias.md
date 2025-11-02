# 🗂️ ÍNDICE MAESTRO - Parte 2: Referencias y Mantenimiento

> **LÍMITE**: Máximo 300 líneas
> **Parte**: 2 de 2
> **Anterior**: INDEX-1-navegacion.md

---

## 📖 REFERENCE - Documentación de Referencia

### [reference/CONTEXT.md](./reference/CONTEXT.md) (192 líneas)
**Contexto y estado actual del proyecto**

**Contenido**:
- 📋 Información general
- 🏗️ Arquitectura del proyecto
- 🎨 Diseño (paleta, tipografía)
- 📄 Vistas planificadas
- 🔌 Backend
- ⚙️ Decisiones técnicas
- 📝 Metodología de trabajo
- 📊 Progreso del proyecto
- 📚 Recursos

**Cuándo leer**: Al inicio de cada sesión (después de core/).

---

### Learning (2 partes, ~580L total)

**[reference/LEARNING-1-fundamentos.md](./reference/LEARNING-1-fundamentos.md)**
- JavaScript Vanilla vs ES Modules
- Export/Import
- Clases ES6
- Template Literals
- Array Methods

**[reference/LEARNING-2-patrones.md](./reference/LEARNING-2-patrones.md)**
- Data Attributes
- Arrow Functions
- Operadores Modernos
- Patrón de Componente
- Comparaciones lado a lado

**Cuándo leer**: Si necesitas aprender conceptos del stack.

---

## 📝 SESSIONS - Historial de Desarrollo

### Sesiones Disponibles (9 total)

1. **2025-10-18-setup-inicial.md** - Setup inicial del proyecto
2. **2025-10-18-implementacion-header.md** - Header component
3. **2025-11-01-componentes-core.md** - VehicleCard, HeroSection, etc.
4. **2025-11-02-carousel-optimization-llm-methodology.md** - Optimización carousel
5. **2025-11-02-idioma-comunicacion.md** - Política de idioma
6. **2025-11-02-llm-compliance.md** - Requisitos LLMs
7. **2025-11-02-session-closure.md** - Cierre de sesión
8. **2025-11-02-fraccionamiento-documentacion.md** - Fraccionamiento AGENT.md
9. **2025-11-02-reorganizacion-estructura.md** - Reorganización directorios

**Cuándo leer**: La sesión más reciente siempre (para contexto actual).

---

## 🎯 RUTAS DE LECTURA RECOMENDADAS

### 🚀 Ruta 1: Nuevo LLM en el Proyecto

```
1. INDEX-1-navegacion.md - Vista general
2. core/AGENT.md - Índice de instrucciones
3. core/CRITICAL-RULES-1-limites.md - Reglas core
4. core/CRITICAL-RULES-2-convencion.md - Convenciones
5. reference/CONTEXT.md - Estado actual
6. sessions/[última] - Decisiones recientes
7. guides/methodology-1-fundamentos.md - Proceso de trabajo
```

**Tiempo estimado**: 10-15 minutos de lectura

---

### 🔧 Ruta 2: Implementar Nueva Funcionalidad

```
1. core/AGENT.md - Confirmar directivas
2. core/CRITICAL-RULES-1-limites.md - Verificar límites
3. guides/methodology-1-fundamentos.md - Proceso paso a paso
4. guides/architecture-1-stack.md - Patrones a seguir
5. reference/CONTEXT.md - Estado actual
6. guides/workflows-1-desarrollo.md - Comandos y flujos
```

**Tiempo estimado**: 15-20 minutos de lectura

---

### 🐛 Ruta 3: Resolver Problema/Bug

```
1. core/CRITICAL-RULES-1-limites.md - Verificar si viola regla
2. guides/workflows-2-troubleshooting.md - Troubleshooting
3. guides/architecture-2-patrones.md - Ver patrón correcto
4. reference/CONTEXT.md - Info relacionada
5. sessions/[relevante] - Ver si se solucionó antes
```

**Tiempo estimado**: 5-10 minutos de lectura

---

### 📝 Ruta 4: Actualizar Documentación

```
1. core/CRITICAL-RULES-1-limites.md - Verificar límites líneas
2. core/AGENT.md - Ver estructura actual
3. INDEX-1-navegacion.md - Actualizar referencias
4. reference/CONTEXT.md - Actualizar si aplica
5. sessions/[crear nueva] - Documentar cambio
```

**Tiempo estimado**: 10 minutos

---

## 📊 ESTADÍSTICAS DE DOCUMENTACIÓN

### Conteo de Líneas por Categoría

```
CORE (directivas obligatorias):
├── AGENT.md                      230L  ✅ <300
├── CRITICAL-RULES-1-limites.md   ~280L ✅ <300
└── CRITICAL-RULES-2-convencion.md ~280L ✅ <300

GUIDES (guías de trabajo):
├── methodology (3 partes)        ~600L ✅ cada <300
├── architecture (3 partes)       ~600L ✅ cada <300
├── workflows (2 partes)          ~500L ✅ cada <300
└── llm-guidelines (3 partes)     ~680L ✅ cada <300

REFERENCE (referencia):
├── CONTEXT.md                    192L  ✅ <300
└── LEARNING (2 partes)           ~580L ✅ cada <300

INDEX (navegación):
├── INDEX-1-navegacion.md         ~280L ✅ <300
└── INDEX-2-referencias.md        ~280L ✅ <300

SESSIONS (sin límite):
└── 9 sesiones documentadas
```

**Total documentación**: ~4,200 líneas distribuidas en ~20 archivos <300L cada uno

---

## 🔄 MANTENIMIENTO DE ESTE ÍNDICE

### Cuándo Actualizar INDEX

**Este archivo debe actualizarse cuando:**

- ✅ Se crea un nuevo archivo en core/, guides/, o reference/
- ✅ Se mueve un archivo a diferente ubicación
- ✅ Se divide un archivo en múltiples módulos
- ✅ Se crea una nueva sesión importante
- ✅ Cambia la estructura de directorios
- ✅ Se agrega una nueva ruta de lectura recomendada

**Proceso:**
1. Hacer cambios en estructura
2. Actualizar INDEX-1 e INDEX-2 inmediatamente
3. Verificar que todos los enlaces funcionen
4. Commit con mensaje: `docs: actualizar INDEX - [razón]`

---



---

## 💡 NOTA FINAL

Este índice está diseñado para facilitar la navegación de modelos LLM con límites de contexto. Cada documento está optimizado para ser leído de forma independiente pero coherente con el resto del sistema.

**Si algo no está claro o falta información**, consulta:
1. [core/CRITICAL-RULES-1-limites.md](./core/CRITICAL-RULES-1-limites.md) - Para reglas específicas
2. [reference/CONTEXT.md](./reference/CONTEXT.md) - Para estado actual
3. [sessions/[última]](./sessions/) - Para decisiones recientes

---

## 📖 NAVEGACIÓN

- **Parte 1**: [INDEX-1-navegacion.md](INDEX-1-navegacion.md) - Navegación general
- **Parte 2**: [INDEX-2-referencias.md](INDEX-2-referencias.md) - Referencias (este archivo)
- **Agente principal**: [core/AGENT.md](core/AGENT.md)

---

**Mantenido por**: Agente automatizado  
**Versión**: 3.0.0 (300L máx)  
**Última actualización**: 2025-11-02
