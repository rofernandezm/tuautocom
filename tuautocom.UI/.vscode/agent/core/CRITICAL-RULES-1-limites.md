# ⚠️ REGLAS CRÍTICAS - Parte 1: Límites y Core

> **LÍMITE**: Máximo 300 líneas
> **Parte**: 1 de 2
> **Siguiente**: CRITICAL-RULES-2-convencion.md

---

## 🚨 LÍMITES DE ARCHIVOS (OBLIGATORIO)

### 📏 Regla de Longitud Máxima

**NUNCA crear o modificar archivos de documentación que excedan:**

```
LÍMITE MÁXIMO POR ARCHIVO: 300 LÍNEAS

TODOS los archivos de documentación:
├── core/*.md:      300 líneas máximo
├── guides/*.md:    300 líneas máximo
├── reference/*.md: 300 líneas máximo
├── INDEX*.md:      300 líneas máximo
├── README.md:      300 líneas máximo
└── sessions/*.md:  Sin límite (excepción)
```

### ⚠️ Qué Hacer Cuando un Archivo Crece

**SI un archivo está cerca del límite:**

1. ✅ **DETENTE** - No agregues más contenido
2. ✅ **FRACCIONA** inmediatamente en partes
3. ✅ **ACTUALIZA** referencias después de dividir
4. ✅ **NO consultes** - el límite es obligatorio

**Ejemplo de fraccionamiento:**
```
methodology.md (638L) → 3 partes:
- methodology-1-fundamentos.md (246L)
- methodology-2-patrones.md (271L)
- methodology-3-errores.md (150L)
```

### 🔍 Verificación Antes de Commit

**Siempre verificar longitud:**

```bash
# Verificar todos los archivos
find .vscode/agent -name "*.md" -type f ! -path "*/sessions/*" -exec wc -l {} \; | sort -rn

# TODOS deben ser <300L (excepto sessions/)
```

---

## 📦 REGLA DE MÓDULOS ES (CRÍTICO)

### ✅ Imports SIEMPRE con `.js`

```javascript
// ✅ CORRECTO - SIEMPRE así
import { Header } from './components/Header.js';
import { theme } from '../config/theme.js';

// ❌ INCORRECTO - NO funciona en navegador
import { Header } from './components/Header';
import { theme } from '../config/theme';
```

**Razón**: ES Modules nativos en navegador **REQUIEREN** extensión explícita.

**Si olvidas `.js`:**
- ❌ Error 404 en navegador
- ❌ "Failed to load module"
- ❌ Aplicación no funciona

---

## 🎨 REGLA DE COLORES (CRÍTICO)

### 🎯 Única Fuente de Verdad: `theme.js`

**NUNCA hardcodear colores. SIEMPRE usar `theme.js`:**

```javascript
// ❌ INCORRECTO - Hardcoded
element.style.backgroundColor = '#10231c';
element.className = 'bg-[#10231c]';

// ✅ CORRECTO - Desde theme.js
import { theme } from '../config/theme.js';
element.style.backgroundColor = theme.colors.primaryDark;

// ✅ CORRECTO - Clases de Tailwind (generadas desde theme.js)
element.className = 'bg-primary-dark text-primary-light';
```

**Para cambiar colores del proyecto:**
1. ✅ Editar **SOLO** `js/config/theme.js`
2. ✅ Ejecutar `pnpm build`
3. ✅ Todo se actualiza automáticamente

**Archivos generados automáticamente (NO editar):**
- ❌ `styles/output.css` - Generado por Tailwind
- ❌ `styles/temp.css` - Generado por SASS

---

## 📦 REGLA DE PACKAGE MANAGER (CRÍTICO)

### 📌 SOLO pnpm - NUNCA npm o yarn

```bash
# ✅ CORRECTO
pnpm install
pnpm add tailwindcss
pnpm run dev

# ❌ INCORRECTO - NO usar
npm install    # ❌
yarn install   # ❌
```

**Razón**: Consistencia con backend, workspaces, eficiencia.

**Si usas npm/yarn por error:**
- ❌ Lock files inconsistentes
- ❌ Problemas de dependencias
- ❌ Workspace no funciona

---

## 🌐 REGLA DE IDIOMA (CRÍTICO)

### 📝 Comunicación: SIEMPRE Español

```
✅ Respuestas al usuario: Español
✅ Explicaciones de código: Español
✅ Mensajes de error: Español
✅ Documentación de sesiones: Español
✅ Comentarios en código: Español
✅ Commits: Español
```

**Excepciones (usar inglés):**
```
❌ Nombres de variables/funciones/clases
❌ Código fuente JavaScript
❌ Nombres de archivos
❌ Comandos de terminal
❌ Documentación técnica de APIs externas
```

---

## 🔧 REGLA DE MODIFICACIÓN DE CÓDIGO (CRÍTICO)

### 📋 Proceso Obligatorio

**NUNCA modificar código sin seguir estos pasos:**

```
1. LEER archivo completo primero (read_file)
2. ENTENDER el patrón existente
3. PLANIFICAR el cambio específico
4. USAR replace_string_in_file con 3-5 líneas de contexto
5. EJECUTAR build (pnpm build)
6. VERIFICAR resultado (curl/grep o navegador)
7. SOLO ENTONCES continuar
```

**Contexto en replace_string_in_file:**

```javascript
// ❌ INCORRECTO - Puede fallar (múltiples matches)
oldString: "const x = 1;"

// ✅ CORRECTO - Contexto único
oldString: `
  function foo() {
    console.log('antes');
    const x = 1;
    console.log('después');
  }
`
```

---

## 📚 REGLA DE LECTURA OBLIGATORIA (CRÍTICO)

### 🧾 Antes de CUALQUIER Cambio

**TODO modelo LLM DEBE leer en este orden:**

```
1. core/AGENT.md          - Índice maestro
2. core/CRITICAL-RULES-1-limites.md - Límites y reglas core
3. core/CRITICAL-RULES-2-convencion.md - Convenciones
4. Módulo específico según tarea:
   - guides/methodology-*.md    - Si necesita proceso de trabajo
   - guides/architecture-*.md   - Si necesita patrones técnicos
   - guides/workflows-*.md      - Si necesita flujos prácticos
5. reference/CONTEXT.md   - Estado actual del proyecto
6. sessions/[última]      - Decisiones recientes
```

**Confirmar lectura:**
```
"He leído core/AGENT.md, core/CRITICAL-RULES-1-limites.md, 
core/CRITICAL-RULES-2-convencion.md y reference/CONTEXT.md. 
Entiendo las reglas críticas y procederé según los patrones establecidos."
```

---

**Continúa en**: `CRITICAL-RULES-2-convencion.md`
