# 🧠 LLM Guidelines - Parte 2: Proceso y Patrones

> **LÍMITE**: Máximo 300 líneas
> **Parte**: 2 de 3
> **Anterior**: llm-guidelines-1-intro.md
> **Siguiente**: llm-guidelines-3-practica.md

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
   - ¿He leído core/AGENT.md?
   - ¿He leído reference/CONTEXT.md?
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



---

**Continúa en**: `llm-guidelines-3-practica.md`
