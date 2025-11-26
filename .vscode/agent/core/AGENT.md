# 🤖 Agent Instructions - TuAutoCom

> **Propósito**: Este documento sirve como índice maestro de la guía de desarrollo para mantener consistencia en arquitectura, tecnologías, patrones y estándares del proyecto TuAutoCom (Frontend + Backend).

---

## 📚 ESTRUCTURA DE LA DOCUMENTACIÓN

La documentación del agente está fraccionada en módulos especializados (cada uno <700 líneas) para facilitar la lectura por modelos LLM con límite de contexto.

**🎯 Directorio unificado**: `.vscode/agent/` en la raíz del proyecto para frontend + backend.

### 🔗 Enlaces a Módulos

**📌 Core (Obligatorio leer)**:
1. **[CRITICAL-RULES-1-limites.md](./CRITICAL-RULES-1-limites.md)** - Límites técnicos (NUNCA violar)
2. **[CRITICAL-RULES-2-convencion.md](./CRITICAL-RULES-2-convencion.md)** - Convenciones de código

**📚 Guías Compartidas** (aplican a todo el proyecto):
3. **[guides/shared/methodology-*.md](../guides/shared/)** (~640 líneas) - Metodología de razonamiento
   - Principios fundamentales
   - Proceso paso a paso
   - Patrones de razonamiento específicos
   - Errores comunes a evitar

4. **[guides/shared/llm-guidelines-*.md](../guides/shared/)** (~600 líneas) - Guidelines para modelos LLM
   - Cómo razonar como Claude Sonnet 4.5
   - Proceso sistemático
   - Uniformidad entre modelos

5. **[guides/shared/workflows-*.md](../guides/shared/)** (~560 líneas) - Flujos de trabajo prácticos
   - Configuración
   - Checklists
   - Troubleshooting

**🎨 Guías de Frontend**:
6. **[guides/frontend/architecture-*.md](../guides/frontend/)** (~630 líneas) - Arquitectura frontend
   - Stack: Vanilla JS + Tailwind CSS
   - Patrones de componentes
   - Estándares de código

**⚙️ Guías de Backend** (por documentar):
7. **[guides/backend/](../guides/backend/)** - Arquitectura backend
   - Stack: Node.js + Express + MongoDB
   - Patrones de API
   - Modelos Mongoose

**📖 Referencias**:
8. **[reference/frontend/CONTEXT.md](../reference/frontend/CONTEXT.md)** - Estado actual del frontend
9. **[reference/frontend/LEARNING-*.md](../reference/frontend/)** - Recursos educativos frontend
10. **[reference/backend/](../reference/backend/)** - Estado y recursos backend (por documentar)

---

## ⚠️ INSTRUCCIONES CRÍTICAS PARA EL AGENTE

### 📌 USO DE ESTE DOCUMENTO

1. **SIEMPRE consultar este documento** antes de implementar cualquier funcionalidad
2. **SIEMPRE proponer actualizaciones** cuando se tomen nuevas decisiones arquitectónicas
3. **SIEMPRE pedir confirmación** antes de actualizar este documento
4. **NUNCA ignorar** los patrones y estándares establecidos aquí
5. **NUNCA implementar** sin antes validar contra estas instrucciones

### 🧾 OBLIGATORIO PARA MODELOS LLM

Toda instancia de un modelo (LLM) que vaya a trabajar en este repositorio debe cumplir explícitamente las siguientes acciones antes de ejecutar cualquier cambio o propuesta de implementación:

- ✅ Leer y comprender completamente `core/AGENT.md` (este archivo - índice maestro)
- ✅ Leer y comprender `core/CRITICAL-RULES.md` (reglas obligatorias y límites)
- ✅ Leer los módulos específicos relevantes a la tarea:
  - `guides/methodology.md` - Metodología de trabajo
  - `guides/architecture.md` - Patrones técnicos
  - `guides/workflows.md` - Flujos prácticos
- ✅ Leer y comprender `guides/llm-guidelines.md` (metodología de razonamiento y verificación)
- ✅ Leer y comprender `reference/CONTEXT.md` (estado actual del proyecto y decisiones previas)
- ✅ Leer la última sesión disponible en `sessions/`
- ✅ Confirmar en español al usuario (o en el log de la sesión) que estas lecturas se realizaron y que el modelo seguirá las pautas

**Notas importantes:**
- Estas lecturas son obligatorias para cualquier modelo que realice cambios en el código o proponga implementaciones. No seguir estas lecturas se considera incumplimiento de las políticas del proyecto.
- Las excepciones al idioma (nombres de variables, código fuente, comandos de terminal, nombres de archivos) se mantienen como en la sección "IDIOMA DE COMUNICACIÓN".

Si el modelo no tiene acceso a alguno de los archivos locales mencionados, debe solicitar explícitamente al usuario acceso o una confirmación antes de proceder.

### 🌐 IDIOMA DE COMUNICACIÓN

**⚠️ IMPORTANTE**: Todo el diálogo y comunicación con el usuario debe ser en **ESPAÑOL**.

- ✅ Respuestas al usuario: **Español**
- ✅ Explicaciones de código: **Español**
- ✅ Mensajes de error/validación: **Español**
- ✅ Documentación de sesiones: **Español**
- ✅ Comentarios en código: **Español**
- ✅ Commits sugeridos: **Español**

**Excepciones** (usar inglés):
- ❌ Nombres de variables, funciones, clases (camelCase, PascalCase)
- ❌ Código fuente JavaScript
- ❌ Nombres de archivos
- ❌ Comandos de terminal
- ❌ Documentación técnica de APIs externas

### 🔄 Proceso de Actualización

```
1. Detectar nueva decisión/patrón durante desarrollo
2. Proponer actualización al AGENT.md (y módulo correspondiente)
3. Esperar confirmación del usuario
4. Actualizar documentos
5. Continuar con implementación siguiendo el nuevo estándar
```

### 📍 Ubicación y Recursos

- **Path**: `.vscode/agent/` (raíz del proyecto - UNIFICADO)
- **Punto de entrada**: `.vscode/agent/core/AGENT.md` (este archivo)
- **README**: `.vscode/agent/README.md` - Introducción y navegación
- **Reglas críticas**: `.vscode/agent/core/CRITICAL-RULES-*.md`
- **Guías compartidas**: `.vscode/agent/guides/shared/`
- **Guías frontend**: `.vscode/agent/guides/frontend/`
- **Guías backend**: `.vscode/agent/guides/backend/`
- **Referencias frontend**: `.vscode/agent/reference/frontend/`
- **Referencias backend**: `.vscode/agent/reference/backend/`
- **Historial**: `/docs/changelog/` - Log de sesiones de desarrollo

**Para recuperar contexto completo**: Leer archivo de sesión más reciente en `/docs/changelog/`

---

## 📋 RESUMEN RÁPIDO DEL PROYECTO

### Descripción
Aplicación web **monorepo** para catálogo de vehículos (compra/venta de autos):
- **Frontend**: Interfaz moderna con JavaScript vanilla y Tailwind CSS
- **Backend**: API REST con Node.js + Express + MongoDB

### Stack Tecnológico

**Frontend**:
- **JavaScript**: Vanilla JS con ES Modules (ES6+) - Sin frameworks
- **CSS**: Tailwind CSS v3.4+ con SASS
- **Package Manager**: pnpm
- **Servidor dev**: Python http.server o similar

**Backend**:
- **Runtime**: Node.js v18+
- **Framework**: Express v5.1+
- **Base de datos**: MongoDB Atlas + Mongoose ODM
- **Package Manager**: pnpm

### Arquitectura de Código

**Frontend** (`tuautocom.UI/`):
```
js/
├── config/        # Configuración (theme.js - colores centralizados)
├── components/    # Componentes reutilizables
├── views/         # Vistas/páginas completas
├── services/      # Comunicación con API
└── utils/         # Utilidades y helpers
```

**Backend** (`backend/`):
```
src/
├── config/        # Configuración (env.js, db.js)
├── models/        # Modelos Mongoose
├── controllers/   # Lógica de negocio
├── routes/        # Rutas API
└── middleware/    # Middlewares (auth, errors, upload)
```

### Patrones Principales

**Frontend**:
- **Componentes**: Clases con método `render()` que retorna `HTMLElement`
- **Vistas**: Clases con `init()` async y `render()` que compone componentes
- **Servicios**: Clases singleton para comunicación con API
- **Estilos**: Tailwind inline + SASS para custom CSS

**Backend**:
- **Controllers**: Funciones async para lógica de negocio
- **Models**: Esquemas Mongoose con validaciones
- **Routes**: Express router con prefijo `/api`
- **Middleware**: Error handling centralizado

---

## 💡 NOTA IMPORTANTE PARA EL AGENT AI

### Este documento es tu FUENTE DE VERDAD

1. **CONSULTA este documento** antes de cada implementación
2. **LEE el módulo específico** que necesites según la tarea
3. **SIGUE estrictamente** los patrones establecidos
4. **PROPÓN actualizaciones** cuando detectes nuevas decisiones
5. **PIDE CONFIRMACIÓN** antes de actualizar
6. **MANTÉN CONSISTENCIA** con lo documentado aquí

### Recuperar Contexto de Sesiones Anteriores

**Al inicio de cada sesión**:
1. Leer `.vscode/agent/README.md` para navegación completa
2. Leer `.vscode/agent/core/AGENT.md` (este archivo - índice maestro)
3. Leer `.vscode/agent/core/CRITICAL-RULES-*.md` (reglas obligatorias)
4. Leer `/docs/changelog/[última-sesión].md` (raíz del proyecto)
5. Según tarea, leer módulos específicos:
   - **Frontend**: `guides/frontend/` + `reference/frontend/CONTEXT.md`
   - **Backend**: `guides/backend/` + `reference/backend/`
   - **Metodología**: `guides/shared/methodology-*.md`
   - **LLM Guidelines**: `guides/shared/llm-guidelines-*.md` (modelos no-premium)

### Workflow de Actualización
```
Cambio detectado → Proponer actualización → Confirmar → Actualizar → Implementar
```

### Al Final de cada Sesión

**🎯 Comando Rápido para Cerrar Sesión:**
```
"Cierra sesion y documenta todo"
```

**Esto automáticamente ejecutará:**
1. ✅ Generar resumen completo de la sesión
2. ✅ Crear archivo en `/docs/changelog/YYYY-MM-DD-descripcion.md` (raíz del proyecto)
3. ✅ Documentar decisiones tomadas
4. ✅ Listar cambios realizados
5. ✅ Incluir próximos pasos sugeridos
6. ✅ Proponer actualizaciones a AGENT.md/módulos si aplica
7. ✅ Sugerir commits con los cambios

---

## 🔄 VERSIONADO DE ESTE DOCUMENTO

**v2.1.0** - 2025-11-02
- **BREAKING**: Reorganización en estructura de directorios (core/, guides/, reference/, sessions/)
- Creado INDEX.md como índice maestro de navegación
- Creado CRITICAL-RULES.md con límites de líneas y reglas obligatorias
- Archivos movidos a ubicaciones lógicas
- Razón: Mejor organización para LLMs y escalabilidad

**v2.0.0** - 2025-11-02
- **BREAKING**: Fraccionamiento de AGENT.md en múltiples módulos (<700 líneas cada uno)
- Creado sistema de índice maestro
- Módulos: methodology (~640L), architecture (~630L), workflows (~560L)
- Razón: Facilitar lectura por modelos LLM con límite de contexto (<1000 líneas recomendadas)

**v1.3.1** - 2025-11-02
- Agregado requisito obligatorio para modelos LLM (leer AGENT, LLM-GUIDELINES, CONTEXT)
- Definidas excepciones para uso de inglés

**v1.2.0** - 2025-10-18
- Implementado sistema de tema centralizado (`js/config/theme.js`)
- Agregado SASS para estilos custom
- Actualizado build pipeline

**v1.1.0** - 2025-10-18
- Actualizada estructura de directorios (agent movido a .vscode/)
- Agregadas instrucciones críticas

**v1.0.0** - 2025-10-18
- Versión inicial

---

**Última actualización**: 2025-11-02  
**Próxima revisión**: Después de validar fraccionamiento con diferentes modelos LLM

---

**Este documento debe evolucionar con el proyecto, pero siempre con confirmación explícita.**
