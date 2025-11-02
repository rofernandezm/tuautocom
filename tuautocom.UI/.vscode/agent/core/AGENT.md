# 🤖 Agent Instructions - TuAutoCom Frontend

> **Propósito**: Este documento sirve como índice maestro de la guía de desarrollo para mantener consistencia en arquitectura, tecnologías, patrones y estándares del proyecto TuAutoCom Frontend.

---

## 📚 ESTRUCTURA DE LA DOCUMENTACIÓN

La documentación del agente está fraccionada en módulos especializados (cada uno <700 líneas) para facilitar la lectura por modelos LLM con límite de contexto:

### 🔗 Enlaces a Módulos

1. **[guides/methodology.md](../guides/methodology.md)** (~640 líneas) - Metodología de razonamiento y trabajo
   - Principios fundamentales
   - Proceso paso a paso
   - Patrones de razonamiento específicos
   - Errores comunes a evitar
   - Heurísticas de decisión
   - Templates de respuesta

2. **[guides/architecture.md](../guides/architecture.md)** (~630 líneas) - Arquitectura y patrones técnicos
   - Stack tecnológico
   - Diseño y estilos
   - Arquitectura de código
   - Patrones de componentes
   - Estándares de código

3. **[guides/workflows.md](../guides/workflows.md)** (~560 líneas) - Flujos de trabajo prácticos
   - Flujos de desarrollo
   - Configuración
   - Checklists
   - Troubleshooting
   - Recursos

4. **[CRITICAL-RULES.md](./CRITICAL-RULES.md)** (~300 líneas) - ⚠️ REGLAS OBLIGATORIAS
   - Límites de archivos (CRÍTICO)
   - Reglas de código y imports
   - Validación y commits

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

- **Path**: `.vscode/agent/core/AGENT.md` (este archivo - índice)
- **Índice general**: `.vscode/agent/INDEX.md` - Navegación completa
- **Reglas críticas**: `.vscode/agent/core/CRITICAL-RULES.md` - Límites y reglas obligatorias
- **Módulos**: 
  - `.vscode/agent/guides/methodology.md` - Metodología
  - `.vscode/agent/guides/architecture.md` - Arquitectura
  - `.vscode/agent/guides/workflows.md` - Workflows
  - `.vscode/agent/guides/llm-guidelines.md` - Guidelines LLM
- **Contexto**: `.vscode/agent/reference/CONTEXT.md` - Estado del proyecto
- **Aprendizaje**: `.vscode/agent/reference/LEARNING.md` - Recursos educativos
- **Historial**: `.vscode/agent/sessions/` - Log de sesiones de desarrollo

**Para recuperar contexto completo**: Leer archivo de sesión más reciente

---

## 📋 RESUMEN RÁPIDO DEL PROYECTO

### Descripción
Aplicación web frontend para catálogo de vehículos (compra/venta de autos). Interfaz moderna con JavaScript vanilla y Tailwind CSS, integrada con backend Node.js.

### Stack Tecnológico Core
- **JavaScript**: Vanilla JS con ES Modules (ES6+) - Sin frameworks
- **CSS**: Tailwind CSS v3.4+ con SASS
- **Package Manager**: pnpm
- **Servidor dev**: Python http.server o similar

### Arquitectura de Código
```
js/
├── config/        # Configuración (theme.js - colores centralizados)
├── components/    # Componentes reutilizables
├── views/         # Vistas/páginas completas
├── services/      # Comunicación con API
└── utils/         # Utilidades y helpers
```

### Patrones Principales
- **Componentes**: Clases con método `render()` que retorna `HTMLElement`
- **Vistas**: Clases con `init()` async y `render()` que compone componentes
- **Servicios**: Clases singleton para comunicación con API
- **Estilos**: Tailwind inline + SASS para custom CSS

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
1. Leer `INDEX.md` para navegación completa
2. Leer `core/AGENT.md` (este archivo - índice de instrucciones)
3. Leer `core/CRITICAL-RULES.md` (reglas obligatorias)
4. Leer `sessions/[última-sesión].md`
5. Leer módulo específico relevante (guides/methodology, architecture, workflows)
6. Revisar `reference/CONTEXT.md` para estado actual del proyecto

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
2. ✅ Crear archivo en `.vscode/agent/sessions/YYYY-MM-DD-descripcion.md`
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
