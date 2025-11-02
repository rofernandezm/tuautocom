# 🤖 Agent Instructions - TuAutoCom Frontend

> **Propósito**: Este documento sirve como guía de desarrollo para mantener consistencia en arquitectura, tecnologías, patrones y estándares del proyecto TuAutoCom Frontend.

---

## ⚠️ INSTRUCCIONES CRÍTICAS PARA EL AGENTE

### 📌 USO DE ESTE DOCUMENTO

1. **SIEMPRE consultar este documento** antes de implementar cualquier funcionalidad
2. **SIEMPRE proponer actualizaciones** cuando se tomen nuevas decisiones arquitectónicas
3. **SIEMPRE pedir confirmación** antes de actualizar este documento
4. **NUNCA ignorar** los patrones y estándares establecidos aquí
5. **NUNCA implementar** sin antes validar contra estas instrucciones

### 🔄 Proceso de Actualización

```
1. Detectar nueva decisión/patrón durante desarrollo
2. Proponer actualización al AGENT.md
3. Esperar confirmación del usuario
4. Actualizar documento
5. Continuar con implementación siguiendo el nuevo estándar
```

### 📍 Ubicación y Recursos

- **Path**: `.vscode/agent/AGENT.md` (este archivo)
- **Contexto**: `.vscode/agent/CONTEXT.md` - Estado del proyecto
- **Historial**: `.vscode/agent/sessions/` - Log de sesiones de desarrollo
  - **Última sesión**: `sessions/2025-10-18-setup-inicial.md`
  
**Para recuperar contexto completo**: Leer archivo de sesión más reciente

- **Siempre usar** estos documentos como fuente de verdad

---

## 🧠 METODOLOGÍA DE RAZONAMIENTO Y TRABAJO

> **Objetivo**: Esta sección documenta el proceso de razonamiento sistemático que debe seguir cualquier LLM (GPT-4, Grok, Claude, etc.) para mantener consistencia y calidad en el desarrollo.

### 🎯 Principios Fundamentales

#### 1. **Razonamiento Antes de Acción**
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

#### 2. **Contexto es Rey**
```
Antes de CUALQUIER acción:
1. Leer AGENT.md (patrones y estándares)
2. Leer CONTEXT.md (estado actual)
3. Leer última sesión en sessions/ (decisiones recientes)
4. Leer archivos relevantes del proyecto
5. SOLO ENTONCES empezar a implementar
```

**⚠️ NUNCA asumir**: Si no tienes información clara, usa herramientas para leer archivos antes de hacer cambios.

#### 3. **Incremental > Big Bang**
```
❌ MAL:  Cambiar 5 archivos a la vez sin validar
✅ BIEN: Cambiar 1 archivo → Build → Verificar → Siguiente archivo
```

**Flujo de trabajo incremental:**
- Un cambio conceptual a la vez
- Compilar después de cada cambio significativo
- Verificar que el código se sirve correctamente
- Solo entonces continuar con el siguiente cambio

#### 4. **Explicar el "Por Qué"**
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

### 🔍 PROCESO PASO A PASO PARA CUALQUIER TAREA

#### **Fase 1: ANÁLISIS (No tocar código aún)**

**Checklist obligatorio:**
- [ ] ¿Entiendo completamente lo que el usuario pide?
- [ ] ¿He leído AGENT.md para conocer los patrones?
- [ ] ¿He leído CONTEXT.md para conocer el estado?
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

#### **Fase 2: PLANIFICACIÓN**

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

#### **Fase 3: IMPLEMENTACIÓN INCREMENTAL**

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

#### **Fase 4: VALIDACIÓN**

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

#### **Fase 5: DOCUMENTACIÓN Y RESUMEN**

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

### 🎓 PATRONES DE RAZONAMIENTO ESPECÍFICOS

#### **Patrón 1: Modificar Componente Existente**

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

#### **Patrón 2: Agregar Nuevo Componente**

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

#### **Patrón 3: Integrar con Backend (Futuro)**

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

#### **Patrón 4: Modificar Estilos (Tailwind/SASS)**

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

### 🚨 ERRORES COMUNES A EVITAR

#### ❌ Error 1: Asumir sin Verificar
```javascript
// MAL
"Voy a cambiar X porque probablemente está en Y"

// BIEN
read_file("Y")  // Primero verificar
// "He confirmado que X está en Y línea Z, procedo a cambiar"
```

#### ❌ Error 2: Cambios sin Contexto
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

#### ❌ Error 3: No Validar Después de Cambios
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

#### ❌ Error 4: Imports sin .js
```javascript
// MAL
import { Header } from './components/Header';

// BIEN
import { Header } from './components/Header.js';
// ES Modules en navegador REQUIEREN extensión
```

#### ❌ Error 5: Modificar Archivos Generados
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

### 📚 HEURÍSTICAS DE DECISIÓN

#### Cuándo Usar Cada Herramienta

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

### 🎯 CHECKLIST UNIVERSAL PARA CUALQUIER TAREA

**Antes de empezar:**
- [ ] He leído AGENT.md, CONTEXT.md, última sesión
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

### 💡 TIPS PARA MODELOS NO-PREMIUM

#### GPT-4o-mini, Grok Fast, GPT-4.1, etc.

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
- "Esto sigue el estándar A documentado en AGENT.md"
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

### 🔄 TEMPLATE DE RESPUESTA ESTRUCTURADA

**Para cualquier tarea, seguir este formato:**

```markdown
## 🎯 Análisis de la Tarea

**Entendimiento:**
[Reformular lo que el usuario pidió para confirmar comprensión]

**Archivos involucrados:**
- file1.js - [qué cambiar y por qué]
- file2.css - [qué cambiar y por qué]

**Patrón a seguir:**
[Referencia al patrón en AGENT.md]

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

## 📋 INFORMACIÓN DEL PROYECTO

### Descripción
Aplicación web frontend para catálogo de vehículos (compra/venta de autos). Interfaz moderna con JavaScript vanilla y Tailwind CSS, integrada con backend Node.js.

### Ubicación Final
```
[proyecto-raiz]/
├── backend/              # Node.js API (existente)
└── frontend/             # tuautocom.UI (este proyecto)
    ├── designs/          # Diseños raw de Stitch
    ├── js/               # Código fuente JavaScript
    ├── styles/           # Estilos CSS
    └── index.html
```

**Nota**: Actualmente en desarrollo en `/home/rodrigo/blds/nosql/project/tuautocom.UI/`, se moverá después.

---

## 🏗️ STACK TECNOLÓGICO

### Core
- **JavaScript**: Vanilla JS con ES Modules (ES6+)
  - No frameworks (React, Vue, Angular, etc.)
  - Módulos nativos del navegador
  - Sintaxis moderna: async/await, destructuring, arrow functions, etc.

- **CSS**: Tailwind CSS v3.4+ con SASS
  - Instalación local (NO CDN en producción)
  - PostCSS + Autoprefixer
  - SASS para estilos custom avanzados
  - Utility-first approach

- **Package Manager**: pnpm
  - Consistencia con backend
  - Eficiencia en espacio y velocidad

### Build Tools
- **SASS**: Preprocesador CSS para estilos custom
- **Tailwind CLI**: Compilación de clases de utilidad
- **Concurrently**: Ejecutar múltiples watchers en paralelo
- **Sin bundler**: ES Modules nativos (por ahora)
- **Servidor de desarrollo**: Python http.server o similar

### Build Pipeline
```
SCSS → (SASS) → temp.css → (Tailwind) → output.css
```

---

## 🎨 DISEÑO Y ESTILOS

### Sistema de Tema Centralizado

**⚠️ IMPORTANTE**: La paleta de colores está centralizada en un único archivo:

```javascript
// js/config/theme.js - ÚNICA FUENTE DE VERDAD
export const theme = {
  colors: {
    primaryDark: '#10231c',
    primaryMedium: '#214a3c',
    primaryLight: '#8ecdb7',
  }
};
```

**Este archivo es usado por:**
1. ✅ `tailwind.config.js` - Genera clases de Tailwind (bg-primary-dark, text-primary-light, etc.)
2. ✅ `styles/input.scss` - CSS variables (:root --color-primary-dark)
3. ✅ Componentes JS - Import directo (theme.colors.primaryDark)

**Para cambiar colores del proyecto:**
- Editar SOLO `js/config/theme.js`
- Ejecutar `pnpm build`
- Todo se actualiza automáticamente

### Uso de Colores en el Código

**En componentes JS:**
```javascript
import { theme } from '../config/theme.js';

// Usar valores directamente
element.style.backgroundColor = theme.colors.primaryDark;
```

**En templates HTML (clases de Tailwind):**
```javascript
// ✅ CORRECTO: Usar clases de Tailwind
element.className = 'bg-primary-dark text-primary-light';
```

**En SCSS custom:**
```scss
// Usar CSS variables
.my-component {
  background-color: var(--color-primary-dark);
  border-color: var(--color-primary-medium);
  
  &:hover {
    color: var(--color-primary-light);
  }
}
```
```

### Tipografía
- **Fuentes principales**: Inter, Noto Sans (Google Fonts)
- **Pesos disponibles**: 400, 500, 700, 900

### Origen de Diseños
- **Herramienta**: Stitch (stitch.withgoogle.com)
- **Formato**: HTML con clases de Tailwind
- **Proceso**: 
  1. Diseños raw → `/designs/`
  2. Análisis y extracción de componentes
  3. Implementación modular → `/js/components/` y `/js/views/`

---

## 📐 ARQUITECTURA DE CÓDIGO

### Estructura de Directorios

```
tuautocom.UI/
├── .vscode/                    # 🔧 VS Code configuration
│   ├── agent/                 # 📚 Agent documentation
│   │   ├── AGENT.md          # 🤖 Este archivo - Instrucciones del agente
│   │   ├── CONTEXT.md        # 📋 Contexto del proyecto
│   │   └── README.md
│   └── mcp.json              # Model Context Protocol config
│
├── designs/                    # 📁 Temporal - Diseños raw de Stitch
│   ├── README.md
│   └── code.html              # Diseño Home
│
├── js/
│   ├── main.js                # 🚀 Entry point de la aplicación
│   │
│   ├── config/
│   │   ├── config.js          # ⚙️ Configuración global (API URL, etc.)
│   │   └── theme.js           # 🎨 TEMA - Única fuente de verdad para colores
│   │
│   ├── components/            # 🧩 Componentes reutilizables
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   ├── VehicleCard.js
│   │   ├── VehicleCarousel.js
│   │   └── ...
│   │
│   ├── views/                 # 📄 Vistas/Páginas completas
│   │   ├── HomeView.js
│   │   ├── CatalogView.js
│   │   ├── VehicleDetailView.js
│   │   └── ...
│   │
│   ├── services/              # 🔌 Comunicación con API
│   │   ├── api.js             # Cliente HTTP base
│   │   ├── vehicleService.js
│   │   ├── authService.js
│   │   └── ...
│   │
│   └── utils/                 # 🛠️ Utilidades y helpers
│       ├── helpers.js
│       ├── validators.js
│       └── ...
│
├── styles/
│   ├── input.scss             # 📝 Source SASS (editar este)
│   ├── temp.css               # 🔄 Temporal (generado por SASS, no editar)
│   └── output.css             # 🎨 Final (generado por Tailwind, no editar)
│
├── .gitignore
├── index.html                 # 🏠 HTML principal
├── package.json               # 📦 Dependencias y scripts
├── pnpm-lock.yaml             # 🔒 Lock file de pnpm
├── postcss.config.js          # ⚙️ Configuración PostCSS
├── tailwind.config.js         # ⚙️ Configuración Tailwind (usa theme.js)
└── README.md                  # 📖 Documentación pública
```

---

## 🧩 PATRONES DE CÓDIGO

### 1. Componentes (Component Pattern)

**Estructura de un componente:**
```javascript
// js/components/VehicleCard.js

/**
 * VehicleCard Component
 * Tarjeta para mostrar información de un vehículo
 */

export class VehicleCard {
  constructor(vehicleData) {
    this.data = vehicleData;
  }

  /**
   * Renderiza el componente y retorna el elemento DOM
   * @returns {HTMLElement}
   */
  render() {
    const card = document.createElement('div');
    card.className = 'flex h-full flex-1 flex-col gap-4 rounded-lg min-w-60';
    
    card.innerHTML = `
      <div class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg"
           style="background-image: url('${this.data.image}')">
      </div>
      <div>
        <p class="text-white text-base font-medium leading-normal">
          ${this.data.title}
        </p>
        <p class="text-primary-light text-sm font-normal leading-normal">
          ${this.data.description}
        </p>
      </div>
    `;
    
    this._attachEventListeners(card);
    return card;
  }

  _attachEventListeners(element) {
    element.addEventListener('click', () => {
      console.log('Vehicle clicked:', this.data.id);
    });
  }
}
```

**Reglas:**
- ✅ Usar clases ES6
- ✅ Constructor recibe datos
- ✅ Método `render()` retorna HTMLElement
- ✅ Eventos en métodos privados (`_attachEventListeners`)
- ✅ Clases de Tailwind inline (no CSS separado para componentes)

---

### 2. Vistas (View Pattern)

**Estructura de una vista:**
```javascript
// js/views/HomeView.js

import { Header } from '../components/Header.js';
import { VehicleCarousel } from '../components/VehicleCarousel.js';
import { Footer } from '../components/Footer.js';
import { vehicleService } from '../services/vehicleService.js';

/**
 * Home View
 * Vista principal de la aplicación
 */

export class HomeView {
  constructor() {
    this.container = null;
  }

  async init() {
    // Cargar datos necesarios
    this.featuredVehicles = await vehicleService.getFeatured();
    this.cheapestVehicles = await vehicleService.getCheapest();
  }

  render() {
    const view = document.createElement('div');
    view.className = 'relative flex h-auto min-h-screen w-full flex-col bg-primary-dark';
    
    // Componer vista con componentes
    const header = new Header();
    const carousel = new VehicleCarousel(this.featuredVehicles);
    const footer = new Footer();
    
    view.appendChild(header.render());
    view.appendChild(this._renderHeroSection());
    view.appendChild(carousel.render());
    view.appendChild(footer.render());
    
    return view;
  }

  _renderHeroSection() {
    // Renderizar sección específica de la vista
    const hero = document.createElement('div');
    hero.className = '...';
    hero.innerHTML = `...`;
    return hero;
  }

  destroy() {
    // Limpieza: remover event listeners, timers, etc.
  }
}
```

**Reglas:**
- ✅ Una clase por vista/página
- ✅ Método `init()` async para cargar datos
- ✅ Método `render()` compone componentes
- ✅ Método `destroy()` para cleanup
- ✅ Importar componentes necesarios

---

### 3. Servicios (Service Pattern)

**Estructura de un servicio:**
```javascript
// js/services/vehicleService.js

import { api } from './api.js';

/**
 * Vehicle Service
 * Maneja todas las operaciones relacionadas con vehículos
 */

class VehicleService {
  /**
   * Obtiene vehículos destacados
   * @returns {Promise<Array>}
   */
  async getFeatured() {
    try {
      const response = await api.get('/vehicles/featured');
      return response.data;
    } catch (error) {
      console.error('Error fetching featured vehicles:', error);
      throw error;
    }
  }

  /**
   * Obtiene detalles de un vehículo
   * @param {string} id - ID del vehículo
   * @returns {Promise<Object>}
   */
  async getById(id) {
    const response = await api.get(`/vehicles/${id}`);
    return response.data;
  }

  /**
   * Busca vehículos por filtros
   * @param {Object} filters - Filtros de búsqueda
   * @returns {Promise<Array>}
   */
  async search(filters) {
    const response = await api.post('/vehicles/search', filters);
    return response.data;
  }
}

// Exportar instancia única (Singleton)
export const vehicleService = new VehicleService();
```

**Reglas:**
- ✅ Una clase por dominio/entidad
- ✅ Métodos async para llamadas API
- ✅ Manejo de errores con try/catch
- ✅ Documentación JSDoc
- ✅ Exportar como singleton
- ✅ Usar cliente HTTP centralizado (`api.js`)

---

### 4. Cliente HTTP Base

```javascript
// js/services/api.js

import { config } from '../config/config.js';

/**
 * HTTP Client
 * Cliente base para comunicación con API
 */

class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, { ...defaultOptions, ...options });
      
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  async get(endpoint, options = {}) {
    return this.request(endpoint, { method: 'GET', ...options });
  }

  async post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options,
    });
  }

  async put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options,
    });
  }

  async delete(endpoint, options = {}) {
    return this.request(endpoint, { method: 'DELETE', ...options });
  }
}

export const api = new ApiClient(config.apiUrl);
```

**Reglas:**
- ✅ Cliente centralizado (único punto de configuración)
- ✅ Métodos para cada verbo HTTP
- ✅ Manejo de errores unificado
- ✅ Headers por defecto
- ✅ Usar Fetch API nativo

---

## 📝 ESTÁNDARES DE CÓDIGO

### Nomenclatura

**Archivos:**
- Componentes: `PascalCase.js` → `VehicleCard.js`
- Servicios: `camelCase.js` → `vehicleService.js`
- Utilidades: `camelCase.js` → `helpers.js`
- Vistas: `PascalCaseView.js` → `HomeView.js`

**Variables y Funciones:**
- Variables/constantes: `camelCase`
- Clases: `PascalCase`
- Métodos privados: `_camelCase` (prefijo underscore)
- Constantes globales: `UPPER_SNAKE_CASE`

**CSS (Tailwind):**
- Usar clases de utilidad directamente
- Custom classes en `input.css` solo si es absolutamente necesario
- Preferir componentes JS sobre @apply en CSS

### Imports/Exports

```javascript
// ✅ CORRECTO: Named exports
export class VehicleCard { }
export const vehicleService = new VehicleService();

// ✅ CORRECTO: Imports con extensión .js
import { VehicleCard } from './components/VehicleCard.js';
import { vehicleService } from './services/vehicleService.js';

// ❌ INCORRECTO: Sin extensión (no funciona en navegador)
import { VehicleCard } from './components/VehicleCard';
```

### Comentarios y Documentación

```javascript
/**
 * Descripción breve del componente/función
 * 
 * @param {Type} paramName - Descripción del parámetro
 * @returns {Type} Descripción del retorno
 * @throws {Error} Cuándo puede lanzar error
 */
```

### Manejo de Errores

```javascript
// ✅ CORRECTO: Try/catch en operaciones async
async loadData() {
  try {
    const data = await vehicleService.getFeatured();
    this.renderData(data);
  } catch (error) {
    console.error('Error loading data:', error);
    this.renderError('No se pudieron cargar los datos');
  }
}

// ✅ CORRECTO: Validación de datos
render(data) {
  if (!data || !Array.isArray(data)) {
    console.warn('Invalid data provided to render');
    return this.renderEmpty();
  }
  // ... render logic
}
```

---

## 🎯 COMPONENTES IDENTIFICADOS

### Componentes Base (Reusables)
- [ ] `Header.js` - Navegación principal
- [ ] `Footer.js` - Footer con links y redes sociales
- [ ] `VehicleCard.js` - Tarjeta de vehículo
- [ ] `VehicleCarousel.js` - Carrusel horizontal
- [ ] `CategoryFilter.js` - Pills/badges de categorías
- [ ] `HeroSection.js` - Banner hero
- [ ] `SearchBar.js` - Barra de búsqueda
- [ ] `Button.js` - Botón reutilizable
- [ ] `Modal.js` - Modal genérico

### Vistas Planificadas
- [ ] `HomeView.js` - Página principal (diseño ✅)
- [ ] `CatalogView.js` - Listado de vehículos
- [ ] `VehicleDetailView.js` - Detalle de vehículo
- [ ] `LoginView.js` - Inicio de sesión
- [ ] `RegisterView.js` - Registro de usuario
- [ ] `UploadVehicleView.js` - Cargar vehículo

### Servicios Necesarios
- [ ] `api.js` - Cliente HTTP base
- [ ] `vehicleService.js` - CRUD de vehículos
- [ ] `authService.js` - Autenticación
- [ ] `categoryService.js` - Categorías
- [ ] `userService.js` - Gestión de usuarios

---

## 🚀 FLUJO DE TRABAJO

### 1. Agregar un Nuevo Componente

```bash
# 1. Crear archivo en /js/components/
touch js/components/NewComponent.js

# 2. Implementar siguiendo el patrón establecido
# 3. Exportar la clase
# 4. Importar donde se necesite
# 5. Probar en navegador
```

### 2. Agregar una Nueva Vista

```bash
# 1. Crear archivo en /js/views/
touch js/views/NewView.js

# 2. Implementar init() y render()
# 3. Importar componentes necesarios
# 4. Conectar con router (cuando exista)
# 5. Probar navegación
```

### 3. Trabajar con Diseños de Stitch

```bash
# 1. Recibir HTML de Stitch → guardar en /designs/
# 2. Analizar estructura y componentes
# 3. Identificar patrones reutilizables
# 4. Extraer a componentes JS
# 5. Implementar en /js/components/ y /js/views/
# 6. Mantener diseño raw como referencia
```

### 4. Desarrollo con SASS y Tailwind

```bash
# Terminal 1: Watch mode (SASS + Tailwind simultáneamente)
pnpm dev

# Terminal 2: Servidor de desarrollo
pnpm serve

# Navegador: http://localhost:8000
```

**El comando `pnpm dev` ejecuta:**
- `sass --watch` → Compila SCSS a CSS
- `tailwindcss --watch` → Procesa clases de Tailwind
- Ambos en paralelo con `concurrently`

### 5. Modificar Colores del Proyecto

```bash
# 1. Editar js/config/theme.js
# 2. Guardar cambios
# 3. Si estás en dev mode, recarga automáticamente
# 4. Si no, ejecutar: pnpm build
```

---

## ⚙️ CONFIGURACIÓN

### package.json Scripts

```json
{
  "scripts": {
    "dev:sass": "sass --watch styles/input.scss:styles/temp.css",
    "dev:tailwind": "pnpm exec tailwindcss -i ./styles/temp.css -o ./styles/output.css --watch",
    "dev": "concurrently \"pnpm:dev:sass\" \"pnpm:dev:tailwind\"",
    "build:sass": "sass styles/input.scss:styles/temp.css",
    "build:tailwind": "pnpm exec tailwindcss -i ./styles/temp.css -o ./styles/output.css",
    "build": "pnpm build:sass && pnpm build:tailwind",
    "build:prod": "pnpm build:sass && pnpm exec tailwindcss -i ./styles/temp.css -o ./styles/output.css --minify",
    "serve": "python3 -m http.server 8000"
  }
}
```

### tailwind.config.js

```javascript
import { theme } from './js/config/theme.js';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        'primary-dark': theme.colors.primaryDark,
        'primary-medium': theme.colors.primaryMedium,
        'primary-light': theme.colors.primaryLight,
      },
      fontFamily: {
        sans: theme.fonts.sans,
      },
    },
  },
  plugins: [],
}
```

### .gitignore

```
node_modules/
.pnpm-store/
.DS_Store
*.log
.env
styles/output.css
dist/
```

---

## 🔄 DECISIONES PENDIENTES

### Próximas Decisiones a Tomar
- [ ] **Router**: ¿Hash-based (#/) o History API?
- [ ] **State Management**: ¿Necesario? ¿Patrón Observer/PubSub?
- [ ] **Build System**: ¿Agregar Vite/esbuild más adelante?
- [ ] **Testing**: ¿Framework? (Vitest, Jest, etc.)
- [ ] **Validación de formularios**: ¿Librería o custom?

### Decisiones que DEBEN Confirmarse
⚠️ **IMPORTANTE**: No implementar ninguna de estas sin confirmación explícita:
- Nuevas dependencias/librerías
- Cambios en la estructura de carpetas
- Nuevos patrones de código
- Modificaciones a la arquitectura base

---

## 📋 CHECKLIST DE DESARROLLO

### Antes de Crear un Componente
- [ ] ¿Ya existe un componente similar?
- [ ] ¿Es realmente reutilizable o es específico de una vista?
- [ ] ¿Qué props/datos necesita?
- [ ] ¿Tiene eventos/interacciones?

### Antes de Hacer Commit
- [ ] Código sigue los estándares establecidos
- [ ] Nombres de variables/funciones son descriptivos
- [ ] Comentarios JSDoc en funciones públicas
- [ ] Sin console.logs de debug
- [ ] **SASS y Tailwind CSS compilados** correctamente (`pnpm build`)
- [ ] Probado en navegador
- [ ] **theme.js actualizado** si cambiaron colores

### Antes de Integrar con Backend
- [ ] Endpoints documentados
- [ ] Manejo de errores implementado
- [ ] Loading states considerados
- [ ] Validación de datos del servidor

---

## 🆘 TROUBLESHOOTING

### CSS no se actualiza
```bash
# Verificar que el watch esté corriendo
pnpm dev

# Forzar rebuild
pnpm build
```

### Módulos no se cargan
```bash
# Verificar que uses .js en imports
import { X } from './file.js'  # ✅
import { X } from './file'     # ❌

# Verificar que el servidor esté corriendo
pnpm serve
```

### Tailwind classes no funcionan
```bash
# Verificar que el path esté en tailwind.config.js content
# Verificar que output.css esté linkeado en index.html
# Reconstruir CSS
pnpm build
```

---

## 📚 RECURSOS Y REFERENCIAS

### Documentación
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [MDN Web Docs - ES Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [MDN Web Docs - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

### Diseños
- Diseños raw: `/designs/`
- Stitch: https://stitch.withgoogle.com

---

## 🔄 VERSIONADO DE ESTE DOCUMENTO

**v1.2.0** - 2025-10-18
- Implementado sistema de tema centralizado (`js/config/theme.js`)
- Agregado SASS para estilos custom
- Actualizado build pipeline (SASS → Tailwind)
- Documentado uso de colores en diferentes contextos

**v1.1.0** - 2025-10-18
- Actualizada estructura de directorios (agent movido a .vscode/)
- Agregadas instrucciones críticas para el agente
- Enfatizado proceso de actualización del documento

**v1.0.0** - 2025-10-18
- Versión inicial
- Stack tecnológico definido
- Patrones de código establecidos
- Arquitectura base documentada

---

**Última actualización**: 2025-10-18
**Próxima revisión**: Después de implementar los primeros 3 componentes

---

## 💡 NOTA IMPORTANTE PARA EL AGENT AI

### Este documento es tu FUENTE DE VERDAD

1. **CONSULTA este documento** antes de cada implementación
2. **SIGUE estrictamente** los patrones establecidos
3. **PROPÓN actualizaciones** cuando detectes nuevas decisiones
4. **PIDE CONFIRMACIÓN** antes de actualizar
5. **MANTÉN CONSISTENCIA** con lo documentado aquí

### Recuperar Contexto de Sesiones Anteriores

**Al inicio de cada sesión**:
1. Leer `.vscode/agent/sessions/[última-sesión].md`
2. Consultar este AGENT.md para patrones y estándares
3. Revisar CONTEXT.md para estado actual del proyecto

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
6. ✅ Proponer actualizaciones a AGENT.md/CONTEXT.md si aplica
7. ✅ Sugerir commits con los cambios

**Checklist Manual (si no usas el comando):**
- [ ] Documentar decisiones tomadas
- [ ] Listar cambios realizados
- [ ] Incluir próximos pasos
- [ ] Guardar en `.vscode/agent/sessions/YYYY-MM-DD-descripcion.md`
- [ ] Actualizar CONTEXT.md si cambió el estado del proyecto
- [ ] Actualizar AGENT.md si hay nuevos patrones/estándares

**Este documento debe evolucionar con el proyecto, pero siempre con confirmación explícita.**
