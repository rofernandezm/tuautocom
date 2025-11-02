# 🗂️ ÍNDICE MAESTRO - Parte 1: Navegación

> **LÍMITE**: Máximo 300 líneas
> **Parte**: 1 de 2
> **Siguiente**: INDEX-2-referencias.md

---

## 📍 INICIO RÁPIDO

### Para Modelos LLM (Lectura Obligatoria)

**Leer en este orden:**

1. ✅ **[core/AGENT.md](./core/AGENT.md)** (230L) - Índice de instrucciones
2. ✅ **[core/CRITICAL-RULES-*.md](./core/)** (~600L total) - Reglas obligatorias (2 partes)
3. ✅ **Módulo específico según tarea**:
   - [guides/methodology-*.md](./guides/) - Para entender proceso de trabajo (3 partes)
   - [guides/architecture-*.md](./guides/) - Para patrones técnicos (3 partes)
   - [guides/workflows-*.md](./guides/) - Para flujos prácticos (2 partes)
4. ✅ **[reference/CONTEXT.md](./reference/CONTEXT.md)** (192L) - Estado del proyecto
5. ✅ **[sessions/[última]](./sessions/)** - Decisiones recientes

### Para Desarrolladores

- **Inicio**: [README.md](./README.md) - Introducción al proyecto
- **Referencia rápida**: [core/CRITICAL-RULES-1-limites.md](./core/CRITICAL-RULES-1-limites.md)
- **Estado actual**: [reference/CONTEXT.md](./reference/CONTEXT.md)

---

## 📂 ESTRUCTURA DE DIRECTORIOS

```
.vscode/agent/
├── INDEX-1-navegacion.md      # 🗂️ Este archivo - Navegación
├── INDEX-2-referencias.md     # 📖 Rutas y estadísticas
├── README.md                  # 📖 Introducción rápida
│
├── core/                     # 📌 Directivas Core (OBLIGATORIAS)
│   ├── AGENT.md             # Índice de instrucciones (230L)
│   ├── CRITICAL-RULES-1-limites.md    # Límites y reglas core (~280L)
│   └── CRITICAL-RULES-2-convencion.md # Convenciones código (~280L)
│
├── guides/                   # 📚 Guías de Trabajo (fraccionadas <300L)
│   ├── methodology-1-fundamentos.md   # Fundamentos metodología
│   ├── methodology-2-patrones.md      # Patrones de razonamiento
│   ├── methodology-3-errores.md       # Errores comunes
│   ├── architecture-1-stack.md        # Stack y diseño
│   ├── architecture-2-patrones.md     # Patrones de código
│   ├── architecture-3-componentes.md  # Componentes y config
│   ├── workflows-1-desarrollo.md      # Workflows desarrollo
│   ├── workflows-2-troubleshooting.md # Troubleshooting
│   ├── llm-guidelines-1-intro.md      # LLM intro/razonamiento
│   ├── llm-guidelines-2-proceso.md    # LLM proceso/patrones
│   └── llm-guidelines-3-practica.md   # LLM práctica
│
├── reference/                # 📖 Documentación Referencia
│   ├── CONTEXT.md           # Contexto proyecto (192L)
│   ├── LEARNING-1-fundamentos.md      # Aprendizaje fundamentos
│   └── LEARNING-2-patrones.md         # Aprendizaje patrones
│
└── sessions/                 # 📝 Historial Sesiones
    └── 9 sesiones documentadas
```

---

## 📌 CORE - Directivas Obligatorias

### [core/AGENT.md](./core/AGENT.md) (230 líneas)
**Índice maestro de instrucciones para el agente**

- 📚 Enlaces a todos los módulos
- ⚠️ Instrucciones críticas
- 🧾 Requisitos obligatorios para LLMs
- 🌐 Política de idioma
- 🔄 Proceso de actualización
- 📋 Resumen rápido del proyecto

**Cuándo leer**: SIEMPRE primero, inicio de toda sesión.

---

### [core/CRITICAL-RULES-1-limites.md](./core/CRITICAL-RULES-1-limites.md) (~280 líneas)
**Límites de archivos y reglas core**

- 🚨 **Límites de archivos** (300L máximo)
- 📦 **Regla de módulos ES** (imports con `.js`)
- 🎨 **Regla de colores** (solo `theme.js`)
- 📦 **Package manager** (solo pnpm)
- 🌐 **Idioma** (español con excepciones)
- 🔧 **Modificación de código** (proceso obligatorio)
- 📚 **Lectura obligatoria** (qué leer antes de cambios)

**Cuándo leer**: SIEMPRE segundo, después de AGENT.md.

---

### [core/CRITICAL-RULES-2-convencion.md](./core/CRITICAL-RULES-2-convencion.md) (~280 líneas)
**Convenciones de código y documentación**

- 🚫 **Archivos generados** (nunca modificar)
- 🔄 **Validación** (checklist post-cambio)
- 📝 **Documentación** (convenciones)
- 🎯 **Commits** (formato obligatorio)

**Cuándo leer**: Después de CRITICAL-RULES-1, antes de implementar.

---

## 📚 GUIDES - Guías de Trabajo (Fraccionadas)

### Metodología (3 partes, ~600L total)

**[guides/methodology-1-fundamentos.md](./guides/methodology-1-fundamentos.md)**
- 🎯 Principios fundamentales
- 🔍 Proceso paso a paso (5 fases)

**[guides/methodology-2-patrones.md](./guides/methodology-2-patrones.md)**
- 🎓 Patrones de razonamiento específicos
- 📚 Heurísticas de decisión
- 🎯 Checklist universal

**[guides/methodology-3-errores.md](./guides/methodology-3-errores.md)**
- 🚨 Errores comunes a evitar
- 💡 Tips para modelos no-premium
- 🔄 Templates de respuesta

**Cuándo leer**: Al iniciar cualquier tarea de implementación.

---

### Arquitectura (3 partes, ~600L total)

**[guides/architecture-1-stack.md](./guides/architecture-1-stack.md)**
- 📋 Información del proyecto
- 🏗️ Stack tecnológico
- 🎨 Sistema de diseño y estilos
- 📐 Estructura de directorios

**[guides/architecture-2-patrones.md](./guides/architecture-2-patrones.md)**
- 🧩 Patrones de código (componentes, vistas, servicios)
- 📝 Estándares de código

**[guides/architecture-3-componentes.md](./guides/architecture-3-componentes.md)**
- 🎯 Componentes identificados
- ⚙️ Configuración
- 🔄 Decisiones pendientes

**Cuándo leer**: Al crear/modificar componentes o trabajar con estilos.

---

### Workflows (2 partes, ~500L total)

**[guides/workflows-1-desarrollo.md](./guides/workflows-1-desarrollo.md)**
- 🚀 Flujos de trabajo (agregar componente, vista, etc.)
- ⚙️ Configuración (package.json scripts)
- 📋 Checklists de desarrollo

**[guides/workflows-2-troubleshooting.md](./guides/workflows-2-troubleshooting.md)**
- 🆘 Troubleshooting (CSS, módulos, Tailwind, build, etc.)
- 📚 Recursos y referencias
- 🎯 Comandos rápidos
- 💡 Tips y mejores prácticas

**Cuándo leer**: Al encontrar un error o problema.

---

### LLM Guidelines (3 partes, ~680L total)

**[guides/llm-guidelines-1-intro.md](./guides/llm-guidelines-1-intro.md)**
- 🎯 Objetivo y características clave
- 🧠 Características del razonamiento efectivo
- 🚨 Errores comunes

**[guides/llm-guidelines-2-proceso.md](./guides/llm-guidelines-2-proceso.md)**
- 📋 Proceso universal paso a paso
- 🎨 Patrones de respuesta

**[guides/llm-guidelines-3-practica.md](./guides/llm-guidelines-3-practica.md)**
- 🎯 Ejercicio práctico
- 📚 Recursos obligatorios
- ✅ Checklist rápido

**Cuándo leer**: Si eres un modelo LLM, complemento a methodology.

---

**Continúa en**: `INDEX-2-referencias.md`
