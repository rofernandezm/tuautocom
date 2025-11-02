# Agent Directory

Este directorio contiene la documentación interna del proyecto, instrucciones para agentes de IA y contexto de desarrollo.

## 📁 Estructura

```
.vscode/agent/
├── AGENT.md            # Instrucciones para agentes de IA
├── CONTEXT.md          # Contexto del proyecto
├── LLM-GUIDELINES.md   # 🆕 Metodología de razonamiento
├── README.md           # Este archivo
└── sessions/           # Historial de sesiones de desarrollo
    └── YYYY-MM-DD-descripcion.md
```

## 📄 Archivos

### **AGENT.md**
Instrucciones completas para agentes de IA:
- Patrones de código establecidos
- Estándares de desarrollo
- Arquitectura del proyecto
- Flujos de trabajo
- Ejemplos de código
- **🆕 Metodología de razonamiento sistemático** (Sección extendida)

### **LLM-GUIDELINES.md** 🆕
Guía de razonamiento para modelos LLM:
- Cómo pensar como Claude Sonnet 4.5
- Proceso paso a paso para cualquier tarea
- Patrones de respuesta estructurada
- Errores comunes y cómo evitarlos
- Checklist universal
- **Objetivo**: Uniformar calidad entre diferentes modelos (GPT-4, Grok, Claude, etc.)

### **CONTEXT.md**
Contexto y estado del proyecto:
- Decisiones técnicas tomadas
- Stack tecnológico
- Vistas planificadas
- Pendientes y TODOs

### **sessions/**
Historial de sesiones de desarrollo:
- Log detallado de cada sesión
- Decisiones tomadas en cada punto
- Cambios realizados
- Problemas encontrados y soluciones
- Continuidad entre sesiones

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

1. **`LLM-GUIDELINES.md`** - Cómo razonar y trabajar
   - Lee PRIMERO si eres GPT-4o-mini, Grok Fast, GPT-4.1, u otro modelo no-premium
   - Aprende la metodología de Claude Sonnet 4.5
   - Sigue el proceso sistemático documentado

2. **`AGENT.md`** - Qué hacer (patrones y estándares del proyecto)
   - Patrones de código específicos
   - Arquitectura y estructura
   - Estándares de nomenclatura
   - Sistema de tema centralizado

3. **`CONTEXT.md`** - Dónde estamos (estado actual)
   - Stack tecnológico
   - Componentes completados
   - Decisiones pendientes

4. **`sessions/[última].md`** - Qué acabamos de hacer
   - Contexto inmediato
   - Decisiones recientes
   - Próximos pasos

### Durante el Desarrollo

**Consultar constantemente:**
- `AGENT.md` → Para verificar patrones y estándares
- `LLM-GUIDELINES.md` → Para validar tu proceso de razonamiento

**Usar herramientas:**
- `read_file()` antes de modificar
- `replace_string_in_file()` con contexto suficiente
- `run_in_terminal("pnpm build")` después de cada cambio
- `curl` para verificar código servido

### Al Final de Cada Sesión

**Documentar:**
1. Crear archivo en `sessions/YYYY-MM-DD-descripcion.md`
2. Documentar decisiones tomadas
3. Listar cambios realizados
4. Incluir próximos pasos
5. Proponer actualizaciones a AGENT.md/CONTEXT.md si aplica

## 💡 Para Modelos LLM No-Premium

Si eres **GPT-4o-mini**, **Grok Fast**, **GPT-4.1**, o similar:

1. **Lee `LLM-GUIDELINES.md` COMPLETO** antes de tu primera tarea
2. Sigue el proceso paso a paso documentado
3. No te saltes la fase de análisis
4. Valida después de cada cambio
5. Explica tu razonamiento detalladamente

**Recuerda**: La diferencia no es capacidad técnica, es **metodología**. Siguiendo el proceso documentado, puedes lograr resultados de nivel Claude Sonnet 4.5.

## 📋 Checklist Rápido

```markdown
Al empezar:
- [ ] Leí LLM-GUIDELINES.md (si soy modelo no-premium)
- [ ] Leí AGENT.md
- [ ] Leí CONTEXT.md
- [ ] Leí última sesión
- [ ] Entiendo la tarea completamente

Durante trabajo:
- [ ] Leo antes de modificar
- [ ] Build después de cambios
- [ ] Verifico código servido
- [ ] Sigo patrones del proyecto

Al terminar:
- [ ] Build final sin errores
- [ ] Documenté en sessions/
- [ ] Propuse actualizaciones si aplican
```

## ⚠️ Importante

- Este directorio **NO** debe ser desplegado en producción
- Agregar a `.gitignore` si contiene información sensible
- Mantener actualizado al tomar decisiones importantes
