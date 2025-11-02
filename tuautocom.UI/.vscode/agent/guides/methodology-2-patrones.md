# 🧠 Metodología - Parte 2: Patrones

> **LÍMITE**: Máximo 300 líneas
> **Parte**: 2 de 3
> **Anterior**: methodology-1-fundamentos.md
> **Siguiente**: methodology-3-errores.md

---

## 🎓 PATRONES DE RAZONAMIENTO ESPECÍFICOS

### **Patrón 1: Modificar Componente Existente**

```
1. READ: Leer componente completo
2. UNDERSTAND: Identificar patrón usado (class, render(), etc.)
3. LOCATE: Encontrar sección exacta a modificar
4. CONTEXT: Leer 10-20 líneas alrededor
5. PLAN: Definir cambio específico
6. IMPLEMENT: replace_string_in_file con contexto
7. BUILD: pnpm build
8. VERIFY: curl + grep para validar
9. DOCUMENT: Explicar cambio
```

**Ejemplo real:**
```javascript
// Tarea: Cambiar botones de redondos a rectangulares

// 1. READ
read_file("VehicleCarousel.js", 1, 150)

// 2. UNDERSTAND
// - Patrón: Clase con render()
// - Botones creados en líneas 45-65
// - Usan Tailwind classes

// 3. LOCATE
// - prev button: línea 47
// - next button: línea 59

// 4. CONTEXT
read_file("VehicleCarousel.js", 40, 70)

// 5. PLAN
// Cambiar: w-12 h-12 rounded-full → w-10 h-20 rounded-lg

// 6. IMPLEMENT
replace_string_in_file({
  oldString: "// 5 líneas antes\nw-12 h-12 rounded-full\n// 5 líneas después",
  newString: "// 5 líneas antes\nw-10 h-20 rounded-lg\n// 5 líneas después"
})

// 7-9. BUILD, VERIFY, DOCUMENT
```

---

### **Patrón 2: Agregar Nuevo Componente**

```
1. RESEARCH: Buscar componentes similares existentes
2. PATTERN: Identificar patrón común (clase, exports, etc.)
3. STRUCTURE: Definir estructura del nuevo componente
4. VALIDATE: Confirmar con usuario si es necesario
5. CREATE: create_file() con código completo
6. INTEGRATE: Importar donde se necesite
7. BUILD: Compilar
8. TEST: Verificar en navegador
9. DOCUMENT: Actualizar CONTEXT.md
```

**Ejemplo real:**
```javascript
// Tarea: Crear SearchBar component

// 1. RESEARCH
grep_search("export class", "js/components/")
// Encontrar: Header.js, VehicleCard.js, Footer.js

// 2. PATTERN
read_file("js/components/Header.js", 1, 50)
// Identificar: class + constructor + render() + _private methods

// 3. STRUCTURE
/*
export class SearchBar {
  constructor(options) { }
  render() { return HTMLElement }
  _attachEventListeners(el) { }
}
*/

// 4. VALIDATE (si hay duda)
// "¿El SearchBar debe emitir eventos CustomEvent o usar callbacks?"

// 5. CREATE
create_file("js/components/SearchBar.js", contenido)

// 6-9. INTEGRATE, BUILD, TEST, DOCUMENT
```

---

### **Patrón 3: Integrar con Backend (Futuro)**

```
1. ENDPOINT: Documentar endpoint de API
2. SERVICE: Crear/actualizar servicio
3. ERROR: Implementar manejo de errores
4. LOADING: Agregar estados de carga
5. DATA: Validar estructura de datos
6. UI: Actualizar componente/vista
7. TEST: Probar con datos reales
8. FALLBACK: Implementar fallbacks
```

---

### **Patrón 4: Modificar Estilos (Tailwind/SASS)**

```
1. IDENTIFY: ¿Es Tailwind utility o custom CSS?

   SI Tailwind:
     - Modificar clases en componente JS
     - Build Tailwind
   
   SI Custom CSS:
     - ¿Está en input.scss o theme.js?
     - Modificar archivo source
     - Build SASS → Tailwind
   
   SI Colores:
     - SOLO modificar theme.js
     - Build automáticamente actualiza todo

2. BUILD: pnpm build
3. VERIFY: Revisar output.css generado
4. TEST: Verificar en navegador
```

---

## 📚 HEURÍSTICAS DE DECISIÓN

### Cuándo Usar Cada Herramienta

```javascript
// EXPLORAR estructura
list_dir("/path")              // Ver qué hay en un directorio
file_search("*.js")            // Buscar archivos por patrón

// BUSCAR código/texto
grep_search("class.*extends", true)  // Regex, exacto
semantic_search("vehicle card component")  // Conceptual

// LEER contenido
read_file("file.js", 1, 100)   // Leer sección específica
// Siempre leer ANTES de modificar

// MODIFICAR
replace_string_in_file()       // Único replace con contexto
// NUNCA modificar sin leer primero

// CREAR
create_file()                  // Nuevos archivos
// Seguir patrones existentes

// VALIDAR
run_in_terminal("pnpm build") // Compilar
get_errors()                   // Ver errores del editor
run_in_terminal("curl...")    // Verificar código servido

// ORGANIZAR (tareas complejas)
manage_todo_list("write", todos)  // Crear plan
manage_todo_list("read")          // Ver progreso
```

---

## 🎯 CHECKLIST UNIVERSAL PARA CUALQUIER TAREA

**Antes de empezar:**
- [ ] He leído core/AGENT.md, reference/CONTEXT.md, última sesión
- [ ] Entiendo completamente la tarea
- [ ] Tengo plan claro de qué archivos modificar
- [ ] He identificado patrones existentes a seguir

**Durante implementación:**
- [ ] Leo archivo completo antes de modificar
- [ ] Uso replace con 3-5 líneas de contexto
- [ ] Build después de cada cambio significativo
- [ ] Verifico código servido (curl/grep)
- [ ] Corrijo errores antes de continuar

**Después de implementar:**
- [ ] Build final sin errores
- [ ] Código sigue patrones del proyecto
- [ ] Imports tienen .js
- [ ] Sin console.logs de debug
- [ ] Documenté cambios con claridad
- [ ] Resumen visual/comparativo creado

---

## 💡 TIPS PARA MODELOS NO-PREMIUM

### GPT-4o-mini, Grok Fast, GPT-4.1, etc.

**1. Más Deliberación, Menos Velocidad**
```
❌ Responder rápido con suposiciones
✅ Tomarse tiempo para leer y entender
```

**2. Dividir Tareas Grandes**
```
Tarea: "Implementar carrusel completo"

❌ Intentar hacer todo de una vez
✅ Dividir:
   1. Crear componente básico
   2. Agregar navegación
   3. Agregar drag-scroll
   4. Styling final
   5. Integrar en vista
```

**3. Usar Herramientas Agresivamente**
```
❌ "Creo que el archivo es así..."
✅ read_file() para confirmar
✅ grep_search() para buscar
✅ semantic_search() para explorar
```

**4. Validar Constantemente**
```
Después de CADA cambio:
1. pnpm build
2. Verificar output
3. Solo entonces continuar
```

**5. Documentar el Razonamiento**
```
Explicar paso a paso:
- "Primero leo X para entender Y"
- "Identifico que el patrón es Z"
- "Por lo tanto, modifico W de esta forma"
- "Esto sigue el estándar A documentado en core/AGENT.md"
```

**6. No Adivinar, Confirmar**
```
❌ "Probablemente necesitas..."
✅ "He analizado X y Y, confirmo que necesitas..."
```

**7. Aprovechar el Contexto Acumulado**
```
Referirse a:
- Decisiones anteriores en sesiones
- Patrones ya establecidos
- Código similar exitoso
```

---

**Continúa en**: `methodology-3-errores.md`
