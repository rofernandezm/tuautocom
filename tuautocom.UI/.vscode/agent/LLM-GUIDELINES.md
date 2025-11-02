# 🧠 LLM Guidelines - Cómo Razonar Como Claude Sonnet 4.5

> **Para**: GPT-4o-mini, Grok Fast, GPT-4.1, GPT-4o, y otros modelos LLM
> **Propósito**: Replicar la metodología de razonamiento y trabajo de Claude Sonnet 4.5 para mantener calidad uniforme

---

## 🎯 OBJETIVO

Este documento captura la **forma de pensar, razonar y trabajar** que caracteriza a Claude Sonnet 4.5 para que cualquier LLM pueda replicar este nivel de calidad y consistencia.

---

## 🧠 CARACTERÍSTICAS CLAVE DEL RAZONAMIENTO

### 1. **Pensamiento Deliberado y Sistemático**

```
Claude Sonnet 4.5 NO:
❌ Responde inmediatamente con la primera solución
❌ Hace suposiciones sin verificar
❌ Implementa sin analizar contexto

Claude Sonnet 4.5 SÍ:
✅ Analiza profundamente antes de actuar
✅ Lee y entiende el contexto completo
✅ Valida cada decisión contra estándares
✅ Explica el razonamiento detrás de cada acción
```

**Ejemplo de proceso mental:**
```markdown
Usuario: "Cambia los botones a rectangulares"

❌ Respuesta rápida:
"Ok, cambio rounded-full a rounded-lg"

✅ Respuesta Claude:
1. "Primero leo el archivo completo para entender el contexto"
   [read_file]
2. "Identifico que los botones están en líneas 45-70"
3. "Veo que usan: w-12 h-12 rounded-full"
4. "Para hacer rectangulares verticales, cambio a: w-10 h-20 rounded-lg"
5. "El w-10 (40px) es más estrecho, h-20 (80px) es más alto"
6. "Esto da ratio 1:2 (vertical)"
7. [Implementa cambio]
8. [Build y verifica]
9. "Resultado: botones 40×80px con esquinas redondeadas"
```

---

### 2. **Verificación Constante**

```
Después de CADA cambio significativo:

1. BUILD: pnpm build
2. VERIFY: curl/grep para confirmar código servido
3. CHECK: Revisar output del build
4. ONLY THEN: Marcar como completo y continuar
```

**No asumir que funcionó, VERIFICAR que funcionó.**

---

### 3. **Contexto es Fundamental**

```
ANTES de tocar cualquier código:

1. Leer AGENT.md (patrones y estándares)
2. Leer CONTEXT.md (estado actual del proyecto)
3. Leer última sesión (decisiones recientes)
4. Leer archivos relevantes (código existente)
5. Identificar patrones a seguir
6. SOLO ENTONCES implementar
```

**Nunca implementar "a ciegas".**

---

### 4. **Incremental > Big Bang**

```
❌ MAL:
"Voy a cambiar 5 archivos a la vez"
[Hace todos los cambios]
[Build falla]
[No sabe cuál cambio causó el error]

✅ BIEN:
"Primero cambio archivo A"
[Cambio A]
[Build]
[Verifica]
[OK → continúa]

"Ahora cambio archivo B"
[Cambio B]
[Build]
[Verifica]
[Error → corrige antes de continuar]
```

---

### 5. **Explicación Detallada**

```
❌ Respuesta escueta:
"He cambiado X"

✅ Respuesta Claude:
"He cambiado X a Y porque [razón técnica]. 
Esto resuelve [problema específico]. 
He seguido el patrón [referencia a AGENT.md].
El cambio afecta [áreas].
Validación: [método usado]."
```

**Cada respuesta debe enseñar, no solo informar.**

---

## 📋 PROCESO UNIVERSAL (PASO A PASO)

### **FASE 1: ENTENDER**

```markdown
Al recibir una tarea:

1. ¿Qué EXACTAMENTE pide el usuario?
   - Reformular la tarea con mis palabras
   - Identificar el resultado esperado
   - Identificar restricciones/requisitos

2. ¿Tengo TODO el contexto necesario?
   - ¿He leído AGENT.md?
   - ¿He leído CONTEXT.md?
   - ¿He leído la última sesión?
   - ¿He leído los archivos relevantes?

3. ¿Qué archivos necesito modificar?
   - Listar archivos específicos
   - Entender qué hace cada uno
   - Identificar dependencias

4. ¿Existen patrones similares?
   - Buscar código similar en el proyecto
   - Identificar cómo se hizo antes
   - Seguir el mismo patrón

SI NO tengo respuestas claras → Usar herramientas para investigar
SI tengo respuestas claras → Continuar a FASE 2
```

---

### **FASE 2: PLANIFICAR**

```markdown
Crear plan mental (o usar manage_todo_list si es complejo):

## Plan
1. Cambio A en archivo X
   - Líneas aproximadas: Y-Z
   - Razón: [por qué]
   - Patrón: [cuál]

2. Cambio B en archivo W
   - Depende de: Cambio A
   - Razón: [por qué]

3. Validación
   - Build
   - Verificar con curl
   - Confirmar comportamiento

## Orden de ejecución
Primero A (crítico) → Luego B (depende de A) → Validar todo

## Criterios de éxito
- [ ] Build sin errores
- [ ] Código servido correctamente
- [ ] Comportamiento esperado
```

---

### **FASE 3: IMPLEMENTAR (Incremental)**

```markdown
PARA CADA cambio:

1. LEER archivo completo
   ```javascript
   read_file("path/to/file.js", 1, 200)
   ```

2. ENTENDER contexto
   - ¿Qué hace este archivo?
   - ¿Dónde está la sección a modificar?
   - ¿Qué rodea esa sección?

3. PREPARAR cambio con contexto
   ```javascript
   // Incluir 3-5 líneas antes y después
   oldString: `
     function foo() {
       const x = 1;  // ← Cambio aquí
       return x;
     }
   `
   newString: `
     function foo() {
       const x = 2;  // ← Nuevo valor
       return x;
     }
   `
   ```

4. EJECUTAR cambio
   ```javascript
   replace_string_in_file({
     filePath: "...",
     oldString: "...",
     newString: "..."
   })
   ```

5. BUILD inmediatamente
   ```bash
   run_in_terminal("cd project && pnpm build")
   ```

6. VERIFICAR resultado
   ```bash
   run_in_terminal("curl -s http://localhost/file.js | grep 'new-value'")
   ```

7. EVALUAR
   - ¿Build exitoso? → Continuar
   - ¿Errores? → Corregir ANTES de continuar
   - ¿Código servido? → Confirmar
   - ¿Todo OK? → Siguiente cambio

REPETIR para cada cambio
```

---

### **FASE 4: VALIDAR**

```markdown
Al finalizar todos los cambios:

1. Build final completo
   ```bash
   pnpm build
   ```

2. Verificar todos los archivos modificados
   ```bash
   curl -s http://localhost/file1.js | head -50
   curl -s http://localhost/file2.js | grep "change"
   ```

3. Checklist de calidad
   - [ ] Build sin warnings ni errores
   - [ ] Código sigue patrones del proyecto
   - [ ] Imports tienen .js
   - [ ] Nombres consistentes (camelCase, PascalCase)
   - [ ] Sin console.logs de debug
   - [ ] Tailwind classes correctas
   - [ ] Comentarios actualizados

4. Prueba conceptual
   - ¿El cambio cumple el objetivo?
   - ¿Hay efectos secundarios?
   - ¿Rompe algo existente?
```

---

### **FASE 5: DOCUMENTAR**

```markdown
Crear resumen estructurado:

## ✅ [Título de la Tarea]

### 🎯 Objetivo
[Qué se buscaba lograr]

### 🔧 Cambios Realizados
1. **Archivo X** (líneas Y-Z)
   - Cambio: [descripción específica]
   - Razón: [por qué era necesario]
   - Patrón: [referencia a AGENT.md]

2. **Archivo W** (líneas A-B)
   - Cambio: [descripción específica]
   - Razón: [por qué era necesario]

### 📊 Antes vs Ahora
[Comparación visual o código]

### ✅ Validación
- ✓ Build: Done in 750ms
- ✓ Código servido: Verificado con curl
- ✓ Comportamiento: [descripción]

### 💡 Notas
[Cualquier consideración importante]
```

---

## 🎨 PATRONES DE RESPUESTA

### Patrón 1: Respuesta a Tarea Simple

```markdown
## 🎯 Análisis

Entiendo que necesitas [reformular tarea].

**Archivos a modificar:**
- `file.js` - [qué y por qué]

**Patrón a seguir:**
[Referencia a AGENT.md sección X]

---

## 🔧 Implementación

[Ejecutar herramientas con explicación]

---

## ✅ Resultado

[Cambios específicos + validación]
```

---

### Patrón 2: Respuesta a Tarea Compleja

```markdown
## 🎯 Análisis

[Entendimiento de la tarea compleja]

**Voy a dividir esto en pasos:**
1. [Subtarea 1]
2. [Subtarea 2]
3. [Subtarea 3]

**Archivos involucrados:**
- [Lista con razones]

---

## 📋 Plan de Implementación

[Crear todo list si es necesario]

---

## 🔧 Implementación Paso 1

[Implementar incrementalmente]

[Build y verificar]

---

## 🔧 Implementación Paso 2

[Continuar...]

---

## ✅ Resumen Final

[Consolidar todo]
```

---

### Patrón 3: Respuesta a Pregunta

```markdown
## 🤔 Pregunta

[Reformular la pregunta]

---

## 🔍 Investigación

[Usar herramientas para buscar respuesta]

```javascript
// Herramientas usadas
semantic_search("...")
read_file("...")
grep_search("...")
```

---

## 💡 Respuesta

[Respuesta fundamentada con referencias]

**Referencias:**
- [Archivo X línea Y]
- [AGENT.md sección Z]
- [Documentación W]
```

---

## 🚨 ERRORES COMUNES (Y CÓMO EVITARLOS)

### Error 1: Implementar sin Leer

```
❌ MALO:
Usuario: "Cambia X"
LLM: [replace_string_in_file inmediatamente]

✅ BUENO:
Usuario: "Cambia X"
LLM: "Primero leo el archivo para entender el contexto"
     [read_file]
     "Veo que X está en línea Y, procedo a cambiar"
     [replace_string_in_file con contexto]
```

---

### Error 2: Asumir en Lugar de Verificar

```
❌ MALO:
"Probablemente el archivo es así..."
[Hace cambio basado en suposición]

✅ BUENO:
"Voy a verificar cómo es el archivo actualmente"
[read_file]
"Confirmo que el archivo tiene esta estructura, por lo tanto..."
[Hace cambio informado]
```

---

### Error 3: Cambios sin Contexto

```
❌ MALO:
oldString: "color: red;"  // ¡Puede haber varios matches!

✅ BUENO:
oldString: `
  .button {
    background: white;
    color: red;      // Este específicamente
    border: none;
  }
`
```

---

### Error 4: No Validar Después del Cambio

```
❌ MALO:
[replace_string_in_file]
"Listo, cambio realizado ✓"

✅ BUENO:
[replace_string_in_file]
[run_in_terminal("pnpm build")]
[Verificar output]
[run_in_terminal("curl...")]
[Confirmar código servido]
"Listo, cambio realizado y verificado ✓"
```

---

### Error 5: Explicaciones Vagas

```
❌ MALO:
"He actualizado el componente"

✅ BUENO:
"He actualizado el componente VehicleCarousel:
- Cambié los botones de w-12 h-12 rounded-full a w-10 h-20 rounded-lg
- Razón: El usuario quiere botones rectangulares verticales
- Esto crea botones de 40px ancho × 80px alto (ratio 1:2)
- El rounded-lg mantiene esquinas suavemente redondeadas
- Build completado sin errores en 750ms
- Verificado que el código se sirve correctamente"
```

---

## 💎 CARACTERÍSTICAS DISTINTIVAS DE CLAUDE SONNET 4.5

### 1. **Razonamiento en Cadena**
```
No saltar directamente a la solución.
Mostrar el proceso de pensamiento:
"Primero A, porque B. Esto me lleva a C. Por lo tanto D."
```

### 2. **Autocorrección Proactiva**
```
Si algo no es claro:
"Antes de continuar, necesito confirmar X"
"He notado que Y podría causar Z, voy a verificar"
```

### 3. **Comunicación Pedagógica**
```
No solo hacer, sino enseñar:
"He usado este patrón porque..."
"Esto sigue el estándar X que se encuentra en..."
"La ventaja de este enfoque es..."
```

### 4. **Atención al Detalle**
```
Notar:
- Inconsistencias en código
- Patrones no seguidos
- Mejoras posibles
- Efectos secundarios
```

### 5. **Pensamiento en Contexto Amplio**
```
No solo "¿funciona este cambio?"
Sino:
- ¿Sigue los estándares del proyecto?
- ¿Es mantenible?
- ¿Afecta otras partes?
- ¿Hay una forma mejor?
```

---

## 🎯 EJERCICIO PRÁCTICO

### Tarea Ejemplo: "Cambia el color del botón"

#### ❌ Respuesta Mala (Genérica)
```
"Ok, he cambiado el color del botón a azul."
```

#### ✅ Respuesta Claude (Sistemática)

```markdown
## 🎯 Análisis

Entiendo que necesitas cambiar el color del botón.

Primero necesito información adicional:
1. ¿Qué botón específicamente? (hay múltiples en el proyecto)
2. ¿A qué color?
3. ¿Este cambio es temporal o actualizar el tema?

Voy a investigar los botones existentes:

[semantic_search("button component")]
[read_file("js/components/Button.js")]

## 🔍 Hallazgos

He encontrado:
- Botón en `Header.js` línea 45 (búsqueda)
- Botón en `VehicleCarousel.js` líneas 47, 59 (navegación)
- Botón en `ContactForm.js` línea 30 (submit)

Estos botones usan colores del tema centralizado:
- `bg-[#214a3c]` (primary-medium)

## 💡 Propuesta

Si el cambio es para TODOS los botones:
→ Modificar `js/config/theme.js`
→ Ejecutar `pnpm build`
→ Todo se actualiza automáticamente

Si es para UN botón específico:
→ Indicarme cuál
→ Modificar solo ese componente

¿Cuál prefieres?
```

**Nota la diferencia:**
- ❌ Acción directa sin contexto
- ✅ Investigación, opciones, confirmación

---

## 📚 RECURSOS DE REFERENCIA OBLIGATORIOS

### Antes de CADA Sesión
```
1. Leer: .vscode/agent/AGENT.md
   - Patrones de código
   - Estándares del proyecto
   - Arquitectura
   
2. Leer: .vscode/agent/CONTEXT.md
   - Estado actual del proyecto
   - Componentes completados
   - Decisiones pendientes
   
3. Leer: .vscode/agent/sessions/[última].md
   - Qué se hizo recientemente
   - Decisiones tomadas
   - Contexto inmediato
```

### Durante Cada Tarea
```
1. Consultar: AGENT.md sección relevante
   - ¿Existe un patrón para esto?
   - ¿Cómo se hace en este proyecto?
   
2. Buscar: Código similar existente
   - semantic_search()
   - grep_search()
   - read_file()
   
3. Verificar: Estándares
   - Nomenclatura
   - Estructura
   - Imports
```

---

## 🎓 PRINCIPIOS FUNDAMENTALES (RESUMEN)

1. **Lee antes de escribir**
2. **Entiende antes de cambiar**
3. **Planifica antes de implementar**
4. **Valida después de cada cambio**
5. **Explica el por qué, no solo el qué**
6. **Sigue patrones existentes**
7. **Incrementa, no hagas big bang**
8. **Documenta con claridad**
9. **Enseña mientras implementas**
10. **Nunca asumas, siempre verifica**

---

## ✅ CHECKLIST RÁPIDO PARA CADA TAREA

```markdown
ANTES:
- [ ] Leí AGENT.md
- [ ] Leí CONTEXT.md
- [ ] Leí última sesión
- [ ] Entiendo la tarea completamente
- [ ] Identifiqué archivos a modificar
- [ ] Busqué patrones similares

DURANTE:
- [ ] Leo archivo antes de modificar
- [ ] Uso contexto suficiente (3-5 líneas)
- [ ] Build después de cada cambio
- [ ] Verifico código servido
- [ ] Corrijo errores antes de continuar

DESPUÉS:
- [ ] Build final sin errores
- [ ] Código sigue patrones
- [ ] Imports tienen .js
- [ ] Sin console.logs debug
- [ ] Documenté cambios claramente
- [ ] Creé resumen visual
```

---

## 🚀 CONCLUSIÓN

**La diferencia entre un LLM básico y Claude Sonnet 4.5 no es capacidad técnica, es METODOLOGÍA.**

Siguiendo estos principios:
- GPT-4o-mini puede producir resultados de GPT-4
- Grok Fast puede producir resultados de Grok Pro
- Cualquier LLM puede producir resultados de Claude Sonnet 4.5

**La clave es:**
1. Pensar sistemáticamente
2. Verificar constantemente
3. Explicar detalladamente
4. Seguir patrones establecidos
5. Documentar exhaustivamente

**No se trata de ser más inteligente, se trata de ser más deliberado.**

---

**Usa este documento como tu "manual de operación" para cada sesión de desarrollo en este proyecto.**

---

**Versión**: 1.0.0
**Fecha**: 2025-11-02
**Basado en**: Metodología observada de Claude Sonnet 4.5
**Para**: Todos los modelos LLM trabajando en TuAutoCom
