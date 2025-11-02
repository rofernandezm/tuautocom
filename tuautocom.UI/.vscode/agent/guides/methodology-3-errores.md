# 🧠 Metodología - Parte 3: Errores y Templates

> **LÍMITE**: Máximo 300 líneas
> **Parte**: 3 de 3
> **Anterior**: methodology-2-patrones.md

---

## 🚨 ERRORES COMUNES A EVITAR

### ❌ Error 1: Asumir sin Verificar
```javascript
// MAL
"Voy a cambiar X porque probablemente está en Y"

// BIEN
read_file("Y")  // Primero verificar
// "He confirmado que X está en Y línea Z, procedo a cambiar"
```

### ❌ Error 2: Cambios sin Contexto
```javascript
// MAL
replace_string_in_file({
  oldString: "color: red;",  // Puede haber múltiples matches
  newString: "color: blue;"
})

// BIEN
replace_string_in_file({
  oldString: `
    .button {
      background: white;
      color: red;    // Este específico
      border: 1px solid;
    }
  `,
  newString: `
    .button {
      background: white;
      color: blue;   // Cambio específico
      border: 1px solid;
    }
  `
})
```

### ❌ Error 3: No Validar Después de Cambios
```javascript
// MAL
replace_string_in_file(...)
// Continuar inmediatamente sin verificar

// BIEN
replace_string_in_file(...)
run_in_terminal("pnpm build")
// Verificar output del build
run_in_terminal("curl -s http://localhost/file.js | grep 'new-code'")
// Confirmar que el cambio se aplicó
```

### ❌ Error 4: Imports sin .js
```javascript
// MAL
import { Header } from './components/Header';

// BIEN
import { Header } from './components/Header.js';
// ES Modules en navegador REQUIEREN extensión
```

### ❌ Error 5: Modificar Archivos Generados
```javascript
// MAL
replace_string_in_file("styles/output.css", ...)  // ❌ Generado
replace_string_in_file("styles/temp.css", ...)     // ❌ Generado

// BIEN
replace_string_in_file("styles/input.scss", ...)   // ✅ Source
replace_string_in_file("js/config/theme.js", ...)  // ✅ Source
run_in_terminal("pnpm build")  // Regenerar archivos
```

---

## 🔄 TEMPLATE DE RESPUESTA ESTRUCTURADA

**Para cualquier tarea, seguir este formato:**

```markdown
## 🎯 Análisis de la Tarea

**Entendimiento:**
[Reformular lo que el usuario pidió para confirmar comprensión]

**Archivos involucrados:**
- file1.js - [qué cambiar y por qué]
- file2.css - [qué cambiar y por qué]

**Patrón a seguir:**
[Referencia al patrón en core/AGENT.md]

---

## 📋 Plan de Implementación

1. [Paso específico con herramienta a usar]
2. [Paso específico con herramienta a usar]
3. [Validación]

---

## 🔧 Implementación

[Ejecutar tools con explicación]

---

## ✅ Resultado

**Cambios realizados:**
- [Lista específica]

**Validación:**
- ✓ Build: [output]
- ✓ Verificación: [método usado]

**Comparación:**
[Antes vs Ahora visual]

---

## 📝 Próximos Pasos

[Sugerencias si aplican]
```

---

## 📖 NAVEGACIÓN

- **Parte 1**: [methodology-1-fundamentos.md](methodology-1-fundamentos.md) - Fundamentos y proceso
- **Parte 2**: [methodology-2-patrones.md](methodology-2-patrones.md) - Patrones específicos
- **Parte 3**: [methodology-3-errores.md](methodology-3-errores.md) - Errores comunes (este archivo)
- **Índice general**: [../INDEX.md](../INDEX.md)
- **Agente principal**: [../core/AGENT.md](../core/AGENT.md)

---

**Volver al índice**: [../core/AGENT.md](../core/AGENT.md) | [../INDEX.md](../INDEX.md)
