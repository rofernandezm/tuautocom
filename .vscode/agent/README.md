# Agent Directory

Este directorio contiene la documentación interna del proyecto, instrucciones para agentes de IA y contexto de desarrollo.

## 📁 Estructura

```
.vscode/agent/                        # 🎯 DIRECTORIO UNIFICADO DEL PROYECTO
├── README.md                         # Este archivo
│
├── core/                             # Instrucciones principales (PUNTO DE ENTRADA)
│   ├── AGENT.md                      # 🎯 INICIO - Índice maestro para modelos IA
│   └── CRITICAL-RULES-*.md           # Reglas obligatorias (2 partes)
│
├── guides/                           # Guías de desarrollo (fraccionadas <700L)
│   ├── shared/                       # 📚 Compartidas (Frontend + Backend)
│   │   ├── llm-guidelines-*.md       # Guidelines para LLMs (3 partes)
│   │   ├── methodology-*.md          # Metodología de trabajo (3 partes)
│   │   └── workflows-*.md            # Flujos prácticos (2 partes)
│   ├── frontend/                     # 🎨 Específicas de Frontend
│   │   └── architecture-*.md         # Arquitectura frontend (3 partes)
│   └── backend/                      # ⚙️ Específicas de Backend
│       └── (por agregar)
│
└── reference/                        # Referencias y contexto
    ├── frontend/                     # 🎨 Frontend (Vanilla JS + Tailwind)
    │   ├── CONTEXT.md                # Estado actual frontend
    │   └── LEARNING-*.md             # Recursos educativos (2 partes)
    └── backend/                      # ⚙️ Backend (Node.js + Express + MongoDB)
        └── (por agregar)
```

**Notas**:
- 🎯 **Directorio unificado**: Un solo `.vscode/agent/` para todo el proyecto
- 📚 **Guías compartidas**: LLM, metodología, workflows aplican a todo
- 🎨/⚙️ **Separación frontend/backend**: Arquitecturas específicas separadas
- 📝 **Sesiones**: Todas en `/docs/changelog/` (raíz del proyecto)

## 📄 Archivos Principales

### **core/AGENT.md** 🎯
Índice maestro y punto de entrada para modelos IA:
- Referencias a todos los módulos
- Instrucciones críticas
- Proceso de actualización
- Versionado del proyecto

### **core/CRITICAL-RULES-*.md** ⚠️
Reglas obligatorias del proyecto:
- Límites técnicos (líneas por archivo, etc.)
- Convenciones de código y nomenclatura
- Validación y commits

### **guides/shared/llm-guidelines-*.md** 🤖
Guía de razonamiento para modelos LLM:
- Cómo pensar como Claude Sonnet 4.5
- Proceso paso a paso para cualquier tarea
- Patrones de respuesta estructurada
- Errores comunes y cómo evitarlos
- **Objetivo**: Uniformar calidad entre diferentes modelos (GPT-4, Grok, Claude, etc.)

### **guides/shared/methodology-*.md** 📖
Metodología de trabajo del proyecto:
- Principios fundamentales
- Patrones de razonamiento
- Errores comunes a evitar

### **guides/frontend/architecture-*.md** 🎨
Arquitectura específica de frontend:
- Stack: Vanilla JS + Tailwind CSS
- Patrones de componentes
- Sistema de tema centralizado

### **reference/frontend/CONTEXT.md** 📍
Estado actual del frontend:
- Componentes implementados
- Decisiones técnicas tomadas
- Stack tecnológico
- Vistas planificadas
- Pendientes y TODOs

### **reference/backend/** ⚙️
(Por documentar: Node.js + Express + MongoDB)

### **Historial de Sesiones** → `/docs/changelog/`
Las sesiones ahora se documentan en `/docs/changelog/` (raíz del proyecto):
- Log detallado de cada sesión
- Decisiones tomadas en cada punto
- Cambios realizados
- Problemas encontrados y soluciones
- Continuidad entre sesiones
- Formato: `YYYY-MM-DD.md` o `YYYY-MM-DD-descripcion.md`

**Uso**: Cargar archivo de sesión más reciente para recuperar contexto completo.

## 🎯 Propósito

1. **Documentación centralizada**: Todo en un solo lugar
2. **Contexto para IA**: Facilitar trabajo con agentes de IA
3. **Historial preservado**: Decisiones y cambios documentados
4. **Continuidad**: Retomar trabajo fácilmente
5. **Clean architecture**: Separado del código fuente
6. **🆕 Uniformidad entre LLMs**: Mismo nivel de calidad independiente del modelo

## 🤖 Guía de Uso para Agentes de IA

### Al Inicio de Cada Sesión

**Orden de lectura obligatorio:**

1. **`core/AGENT.md`** 🎯 - Punto de entrada principal
   - Índice maestro del proyecto
   - Referencias a todos los módulos
   - Instrucciones críticas

2. **`core/CRITICAL-RULES-*.md`** ⚠️ - Reglas obligatorias
   - Límites técnicos (NUNCA violar)
   - Convenciones de código

3. **`guides/shared/llm-guidelines-*.md`** 🤖 - Cómo razonar y trabajar
   - Lee PRIMERO si eres modelo no-premium (GPT-4o-mini, Grok Fast, etc.)
   - Aprende la metodología de Claude Sonnet 4.5
   - Sigue el proceso sistemático documentado

4. **Guías específicas según tarea**:
   - **Frontend**: `guides/frontend/architecture-*.md` + `reference/frontend/CONTEXT.md`
   - **Backend**: `guides/backend/` + `reference/backend/` (por documentar)
   - **Metodología**: `guides/shared/methodology-*.md`
   - **Workflows**: `guides/shared/workflows-*.md`

5. **`/docs/changelog/[última].md`** 📝 - Sesión más reciente
   - Contexto inmediato
   - Decisiones recientes
   - Próximos pasos

### Durante el Desarrollo

**Consultar constantemente:**
- `core/AGENT.md` → Para verificar patrones y estándares
- `guides/llm-guidelines-*.md` → Para validar tu proceso de razonamiento
- `reference/CONTEXT.md` → Para verificar estado actual

**Usar herramientas:**
- `read_file()` antes de modificar
- `replace_string_in_file()` con contexto suficiente
- `run_in_terminal("pnpm build")` después de cada cambio
- `curl` para verificar código servido

### Al Final de Cada Sesión

**Documentar en `/docs/changelog/`** (raíz del proyecto):
1. Crear archivo `YYYY-MM-DD.md` o `YYYY-MM-DD-descripcion.md`
2. Documentar decisiones tomadas
3. Listar cambios realizados
4. Incluir próximos pasos
5. Proponer actualizaciones a `core/AGENT.md` o `reference/CONTEXT.md` si aplica

**Comando rápido**: "Cierra sesión y documenta todo"

## 💡 Para Modelos LLM No-Premium

Si eres **GPT-4o-mini**, **Grok Fast**, **GPT-4.1**, o similar:

1. **Lee `guides/llm-guidelines-*.md` COMPLETO** antes de tu primera tarea
2. Sigue el proceso paso a paso documentado
3. No te saltes la fase de análisis
4. Valida después de cada cambio
5. Explica tu razonamiento detalladamente

**Recuerda**: La diferencia no es capacidad técnica, es **metodología**. Siguiendo el proceso documentado, puedes lograr resultados de nivel Claude Sonnet 4.5.

## 📋 Checklist Rápido

```markdown
Al empezar:
- [ ] Leí core/AGENT.md (punto de entrada principal)
- [ ] Leí core/CRITICAL-RULES-*.md (reglas obligatorias)
- [ ] Leí guides/shared/llm-guidelines-*.md (si soy modelo no-premium)
- [ ] Leí guías específicas (frontend/ o backend/ según tarea)
- [ ] Leí reference/[frontend|backend]/CONTEXT.md
- [ ] Leí última sesión en /docs/changelog/
- [ ] Entiendo la tarea completamente

Durante trabajo:
- [ ] Leo antes de modificar
- [ ] Build después de cambios
- [ ] Verifico código servido
- [ ] Sigo patrones del proyecto

Al terminar:
- [ ] Build final sin errores
- [ ] Documenté en /docs/changelog/
- [ ] Propuse actualizaciones si aplican
```

## ⚠️ Importante

- Este directorio **NO** debe ser desplegado en producción
- Agregar a `.gitignore` si contiene información sensible
- Mantener actualizado al tomar decisiones importantes
- **Las sesiones se guardan en `/docs/changelog/`** (raíz del proyecto)

---

## 📖 Guía de Crecimiento Organizado

### 🗂️ Dónde Agregar Nuevos Archivos

**Regla General**: **NO agregar archivos al root** de `.vscode/agent/`

#### Para Nuevas Guías de Desarrollo
📁 **Ubicación según alcance**:
- `guides/shared/` - Guías aplicables a todo el proyecto (LLM, metodología, workflows)
- `guides/frontend/` - Guías específicas de frontend (arquitectura, componentes, estilos)
- `guides/backend/` - Guías específicas de backend (API, base de datos, autenticación)

**Convención de nombres**: 
- `<tema>-<numero>-<subtema>.md`
- Ejemplo: `testing-1-unit.md`, `api-2-authentication.md`
- Máximo 700 líneas por archivo (fragmentar si es mayor)

**Cuándo crear nueva guía**:
- ✅ Nueva metodología o proceso establecido
- ✅ Patrones de testing/deployment
- ✅ Workflows específicos de funcionalidad
- ❌ NO para notas temporales o decisiones puntuales

#### Para Referencias Técnicas
📁 **Ubicación según alcance**:
- `reference/frontend/` - Referencias de frontend (estado, aprendizaje, APIs usadas)
- `reference/backend/` - Referencias de backend (estado, modelos, queries MongoDB)

**Convención de nombres**:
- Mayúsculas para archivos principales: `CONTEXT.md`, `LEARNING.md`
- Minúsculas con guiones para específicos: `api-reference.md`, `mongodb-queries.md`
- Fragmentar si excede 700 líneas: `LEARNING-1-fundamentos.md`, `LEARNING-2-avanzado.md`

**Cuándo crear nueva referencia**:
- ✅ Documentación de APIs externas usadas
- ✅ Recursos educativos del equipo
- ✅ Glosario de términos del proyecto
- ❌ NO para bugs o issues (usar GitHub Issues)

#### Para Reglas Críticas
📁 **Ubicación**: `core/`

**Convención de nombres**:
- `CRITICAL-RULES-<numero>-<tema>.md`
- Ejemplo: `CRITICAL-RULES-3-testing.md`

**Cuándo crear nueva regla crítica**:
- ✅ Límites técnicos que romperían el proyecto
- ✅ Convenciones obligatorias del stack
- ✅ Seguridad o performance críticos
- ❌ NO para "buenas prácticas" (van en guides/)

#### Para Sesiones de Desarrollo
📁 **Ubicación**: `/docs/changelog/` (raíz del proyecto, NO aquí)

**Convención de nombres**:
- `YYYY-MM-DD.md` - Sesión general del día
- `YYYY-MM-DD-descripcion.md` - Múltiples sesiones en un día

**Cuándo crear**:
- ✅ Al final de cada sesión de desarrollo
- ✅ Al implementar una funcionalidad completa
- ✅ Al tomar decisiones arquitectónicas importantes

---

### 🧹 Mantenimiento Regular

**Cada 2 semanas**:
1. Revisar archivos en root de `.vscode/agent/`
2. Mover contenido relevante a subcarpetas apropiadas
3. Eliminar archivos obsoletos/duplicados
4. Verificar que `core/AGENT.md` apunte correctamente a todos los módulos
5. Verificar separación correcta frontend/backend

**Al superar 700 líneas**:
1. Fragmentar en múltiples archivos numerados
2. Actualizar referencias en `core/AGENT.md`
3. Mantener índice al inicio de cada fragmento

**Al alcanzar 20+ archivos en una carpeta**:
1. Considerar subcarpetas temáticas
2. Actualizar estructura en README.md
3. Mantener índice maestro actualizado

---

### ✅ Checklist de Nueva Documentación

```markdown
Antes de crear nuevo archivo:
- [ ] ¿Excede 700 líneas? → Fragmentar
- [ ] ¿Es temporal? → NO crear, usar comentario en código
- [ ] ¿Es regla crítica? → core/
- [ ] ¿Es guía compartida? → guides/shared/
- [ ] ¿Es guía de frontend? → guides/frontend/
- [ ] ¿Es guía de backend? → guides/backend/
- [ ] ¿Es referencia de frontend? → reference/frontend/
- [ ] ¿Es referencia de backend? → reference/backend/
- [ ] ¿Es sesión? → /docs/changelog/
- [ ] Actualicé core/AGENT.md con referencia
- [ ] Seguí convención de nombres
```
