# ⚠️ REGLAS CRÍTICAS - Parte 2: Convenciones

> **LÍMITE**: Máximo 300 líneas
> **Parte**: 2 de 2
> **Anterior**: CRITICAL-RULES-1-limites.md

---

## 🚫 REGLA DE ARCHIVOS GENERADOS (CRÍTICO)

### ⚠️ NUNCA Modificar Archivos Generados

**Archivos que NO se deben editar:**

```
❌ styles/output.css      - Generado por Tailwind
❌ styles/temp.css        - Generado por SASS
❌ node_modules/          - Instalado por pnpm
❌ pnpm-lock.yaml         - Generado por pnpm
```

**Si necesitas cambiar estilos:**

```
✅ Editar styles/input.scss        - Source SASS
✅ Editar js/config/theme.js       - Colores del tema
✅ Modificar clases en componentes - Tailwind utilities
```

**Luego ejecutar:**
```bash
pnpm build  # Regenera output.css
```

---

## 🔄 REGLA DE VALIDACIÓN (CRÍTICO)

### ✅ Después de CADA Cambio

**Checklist obligatorio:**

```
[ ] Build ejecutado sin errores (pnpm build)
[ ] Código servido correctamente verificado
[ ] Imports tienen extensión .js
[ ] Colores desde theme.js (no hardcoded)
[ ] Sin console.logs de debug
[ ] Archivos dentro de límites de líneas (300L)
[ ] Documentación actualizada si aplica
```

**Comandos de validación:**

```bash
# 1. Build
pnpm build

# 2. Ver errores
get_errors()

# 3. Verificar servido (si servidor corriendo)
curl -s http://localhost:8000/js/main.js | head -20

# 4. Verificar longitud de archivos modificados
wc -l archivo-modificado.md
```

---

## 📝 REGLA DE DOCUMENTACIÓN (CRÍTICO)

### 🗂️ Al Crear Nuevos Archivos

**Si necesitas crear un nuevo archivo de documentación:**

1. ✅ **Verificar límites ANTES de crear** (300L máx)
2. ✅ **Ubicación correcta**:
   - Directivas → `core/`
   - Guías → `guides/`
   - Referencia → `reference/`
   - Sesiones → `sessions/`
3. ✅ **Actualizar INDEX*.md** después de crear
4. ✅ **Actualizar referencias** en otros archivos
5. ✅ **Nombrar consistentemente**:
   - kebab-case: `methodology-1-fundamentos.md`
   - Descriptivo: `architecture-2-patrones.md`
6. ✅ **Fraccionar si excede 300L** en partes numeradas

---

## 🎯 REGLA DE COMMITS (CRÍTICO)

### 📋 Convención de Commits

**Formato obligatorio:**

```bash
<tipo>(<scope>): <descripción>

[cuerpo opcional]

[footer opcional con BREAKING CHANGE si aplica]
```

**Tipos permitidos:**
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Cambios de formato (no afectan código)
- `refactor`: Refactorización de código
- `test`: Agregar o modificar tests
- `chore`: Cambios en build, deps, etc.

**Ejemplos:**
```bash
# Bueno
feat(components): agregar VehicleCard con hover effects
docs: fraccionar archivos a máximo 300 líneas
fix(carousel): corregir scroll infinito en navegación

# Malo
"agregado componente"  # ❌ Sin tipo
"fix"                  # ❌ Sin descripción
```

---

## ⚡ QUICK REFERENCE

### 🎯 Checklist Rápido Antes de Commit

```
✅ Archivos dentro de 300 líneas
✅ Imports con .js
✅ Colores desde theme.js
✅ Sin archivos generados modificados
✅ pnpm build sin errores
✅ Sin console.logs de debug
✅ Documentación actualizada
✅ Commit message con formato correcto
✅ Referencias actualizadas si moviste archivos
```

### 🚨 Señales de Alerta

**SI ves esto, DETENTE:**
- ❌ Archivo .md con >300 líneas (excepto sessions/)
- ❌ Import sin `.js`
- ❌ Color hardcoded (`#10231c` en código)
- ❌ `npm install` o `yarn` en comandos
- ❌ Modificando `output.css` o `temp.css`
- ❌ Console.log en código para commit

**Acción:** Corregir ANTES de continuar.

---

## 📖 NAVEGACIÓN

- **Parte 1**: [CRITICAL-RULES-1-limites.md](CRITICAL-RULES-1-limites.md) - Límites y reglas core
- **Parte 2**: [CRITICAL-RULES-2-convencion.md](CRITICAL-RULES-2-convencion.md) - Convenciones (este archivo)
- **Índice general**: [../INDEX-1-navegacion.md](../INDEX-1-navegacion.md)
- **Agente principal**: [AGENT.md](AGENT.md)

---

## 📚 Ver También

- [AGENT.md](./AGENT.md) - Índice maestro de instrucciones
- [../guides/methodology-1-fundamentos.md](../guides/methodology-1-fundamentos.md) - Metodología de trabajo
- [../guides/architecture-1-stack.md](../guides/architecture-1-stack.md) - Patrones técnicos
- [../INDEX-1-navegacion.md](../INDEX-1-navegacion.md) - Índice completo del proyecto

---

**Última actualización**: 2025-11-02  
**Versión**: 2.0.0 (300L máx)

---

**⚠️ ESTAS REGLAS SON OBLIGATORIAS Y NO NEGOCIABLES**
