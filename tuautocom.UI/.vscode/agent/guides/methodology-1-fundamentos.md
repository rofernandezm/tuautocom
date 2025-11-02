# 🧠 Metodología - Parte 1: Fundamentos

> **LÍMITE**: Máximo 300 líneas
> **Parte**: 1 de 3
> **Siguiente**: methodology-2-proceso.md

---

## 🎯 Principios Fundamentales

### 1. **Razonamiento Antes de Acción**
```
❌ MAL:  Recibir tarea → Escribir código inmediatamente
✅ BIEN: Recibir tarea → Analizar → Planificar → Validar → Implementar
```

**Proceso mental obligatorio:**
1. **Entender completamente** la tarea antes de tocar código
2. **Identificar archivos afectados** y sus interdependencias
3. **Revisar patrones existentes** en el proyecto
4. **Planificar cambios** paso a paso
5. **Validar contra estándares** documentados
6. **Implementar de forma incremental**
7. **Verificar resultado** con herramientas disponibles

### 2. **Contexto es Rey**
```
Antes de CUALQUIER acción:
1. Leer core/AGENT.md (patrones y estándares)
2. Leer reference/CONTEXT.md (estado actual)
3. Leer última sesión en sessions/ (decisiones recientes)
4. Leer archivos relevantes del proyecto
5. SOLO ENTONCES empezar a implementar
```

**⚠️ NUNCA asumir**: Si no tienes información clara, usa herramientas para leer archivos antes de hacer cambios.

### 3. **Incremental > Big Bang**
```
❌ MAL:  Cambiar 5 archivos a la vez sin validar
✅ BIEN: Cambiar 1 archivo → Build → Verificar → Siguiente archivo
```

**Flujo de trabajo incremental:**
- Un cambio conceptual a la vez
- Compilar después de cada cambio significativo
- Verificar que el código se sirve correctamente
- Solo entonces continuar con el siguiente cambio

### 4. **Explicar el "Por Qué"**
```
❌ MAL:  "He cambiado X a Y"
✅ BIEN: "He cambiado X a Y porque [razón], esto resuelve [problema], 
         siguiendo el patrón [estándar del proyecto]"
```

**Comunicación efectiva:**
- Explicar la razón detrás de cada decisión
- Referenciar patrones/estándares aplicados
- Documentar alternativas consideradas
- Indicar impacto del cambio

---

## 🔍 PROCESO PASO A PASO PARA CUALQUIER TAREA

### **Fase 1: ANÁLISIS (No tocar código aún)**

**Checklist obligatorio:**
- [ ] ¿Entiendo completamente lo que el usuario pide?
- [ ] ¿He leído core/AGENT.md para conocer los patrones?
- [ ] ¿He leído reference/CONTEXT.md para conocer el estado?
- [ ] ¿He leído la última sesión para contexto reciente?
- [ ] ¿Qué archivos necesito modificar?
- [ ] ¿Existen patrones similares en el proyecto?
- [ ] ¿Hay dependencias entre cambios?

**Herramientas a usar:**
```javascript
// Para entender estructura
list_dir()           // Explorar directorios
file_search()        // Buscar archivos por nombre
grep_search()        // Buscar contenido en archivos
semantic_search()    // Búsqueda conceptual

// Para leer contexto
read_file()          // Leer archivos relevantes
```

**Output esperado:** Plan mental claro ANTES de escribir código.

---

### **Fase 2: PLANIFICACIÓN**

**Crear plan de acción:**
```markdown
## Plan de Implementación

### Objetivo
[Descripción clara de lo que se busca lograr]

### Archivos a Modificar
1. `path/to/file1.js` - [razón del cambio]
2. `path/to/file2.css` - [razón del cambio]

### Cambios Específicos
1. En file1.js:
   - Cambiar X por Y
   - Agregar función Z
   - Razón: [explicación]

2. En file2.css:
   - Actualizar clase W
   - Razón: [explicación]

### Orden de Ejecución
1. Primero: [cambio crítico]
2. Segundo: [cambio dependiente]
3. Tercero: [validación]

### Validación
- [ ] Build sin errores
- [ ] Código servido correctamente
- [ ] Comportamiento esperado verificado
```

**Para tareas complejas:** Usar `manage_todo_list` para trackear progreso.

---

### **Fase 3: IMPLEMENTACIÓN INCREMENTAL**

**Flujo obligatorio:**
```
PARA CADA cambio:
  1. Leer archivo completo (read_file)
  2. Identificar sección exacta a modificar
  3. Usar replace_string_in_file con contexto suficiente
  4. Ejecutar build (run_in_terminal)
  5. Verificar resultado (curl/grep según corresponda)
  6. Si hay error → corregir antes de continuar
  7. Si está bien → siguiente cambio
```

**Reglas de replace_string_in_file:**
```javascript
// ❌ MAL: Contexto insuficiente (puede fallar)
oldString: "const x = 1;"
newString: "const x = 2;"

// ✅ BIEN: 3-5 líneas antes y después (único match)
oldString: `
  function foo() {
    console.log('context');
    const x = 1;
    return x + 5;
  }
`
newString: `
  function foo() {
    console.log('context');
    const x = 2;
    return x + 5;
  }
`
```

**Después de cada cambio:**
```bash
# 1. Build (si hay CSS/SASS/Tailwind)
pnpm build

# 2. Verificar código servido
curl -s http://localhost:8000/path/to/file.js | grep "string-to-verify"

# 3. Solo entonces marcar como completo
```

---

### **Fase 4: VALIDACIÓN**

**Checklist post-implementación:**
- [ ] Build ejecutado sin errores
- [ ] Código servido correctamente (verificado con curl)
- [ ] Archivos modificados siguen patrones del proyecto
- [ ] Nombres de variables/clases consistentes
- [ ] Imports tienen extensión `.js`
- [ ] Tailwind classes correctas (si aplica)
- [ ] Sin console.logs de debug
- [ ] Comentarios JSDoc actualizados

**Herramientas de verificación:**
```bash
# Build
run_in_terminal("cd project && pnpm build")

# Verificar código servido
run_in_terminal("curl -s http://localhost:8000/file.js | head -50")

# Buscar errores
get_errors()
```

---

### **Fase 5: DOCUMENTACIÓN Y RESUMEN**

**Al finalizar cada tarea:**
```markdown
## ✅ [Título de la Tarea]

### 🎯 Cambios Realizados
1. **Archivo X**: [descripción del cambio]
   - Razón: [por qué]
   - Patrón aplicado: [cuál]

2. **Archivo Y**: [descripción del cambio]
   - Razón: [por qué]
   - Impacto: [qué afecta]

### 📊 Comparación Antes/Después
**Antes:**
```javascript
// código anterior
```

**Ahora:**
```javascript
// código nuevo
```

### ✅ Validación
- ✓ Build exitoso: [output]
- ✓ Código servido: [verificación]
- ✓ Comportamiento: [descripción]

### 📝 Notas
- [Cualquier consideración importante]
- [Próximos pasos sugeridos]
```

---

**Continúa en**: `methodology-2-proceso.md`
