# 🚀 Workflows - Parte 1: Desarrollo

> **LÍMITE**: Máximo 300 líneas
> **Parte**: 1 de 2
> **Siguiente**: workflows-2-troubleshooting.md

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

**Patrón a seguir:**
```javascript
/**
 * NewComponent
 * Descripción del componente
 */
export class NewComponent {
  constructor(data) {
    this.data = data;
  }

  render() {
    const element = document.createElement('div');
    element.className = 'tailwind-classes';
    element.innerHTML = `...`;
    this._attachEventListeners(element);
    return element;
  }

  _attachEventListeners(element) {
    // Event listeners aquí
  }
}
```

---

### 2. Agregar una Nueva Vista

```bash
# 1. Crear archivo en /js/views/
touch js/views/NewView.js

# 2. Implementar init() y render()
# 3. Importar componentes necesarios
# 4. Conectar con router (cuando exista)
# 5. Probar navegación
```

**Patrón a seguir:**
```javascript
import { Header } from '../components/Header.js';
import { Footer } from '../components/Footer.js';
import { someService } from '../services/someService.js';

/**
 * NewView
 * Descripción de la vista
 */
export class NewView {
  constructor() {
    this.container = null;
  }

  async init() {
    // Cargar datos async
    this.data = await someService.getData();
  }

  render() {
    const view = document.createElement('div');
    view.className = 'relative flex min-h-screen w-full flex-col bg-primary-dark';
    
    // Componer con componentes
    const header = new Header();
    const footer = new Footer();
    
    view.appendChild(header.render());
    view.appendChild(this._renderContent());
    view.appendChild(footer.render());
    
    return view;
  }

  _renderContent() {
    // Contenido específico de la vista
    const content = document.createElement('div');
    content.innerHTML = `...`;
    return content;
  }

  destroy() {
    // Cleanup: remover listeners, timers, etc.
  }
}
```

---

### 3. Trabajar con Diseños de Stitch

```bash
# 1. Recibir HTML de Stitch → guardar en /designs/
# 2. Analizar estructura y componentes
# 3. Identificar patrones reutilizables
# 4. Extraer a componentes JS
# 5. Implementar en /js/components/ y /js/views/
# 6. Mantener diseño raw como referencia
```

**Proceso detallado:**

1. **Guardar diseño raw:**
   ```bash
   # Crear carpeta para el diseño
   mkdir designs/NombreVista
   # Guardar HTML de Stitch
   cp stitch-export.html designs/NombreVista/code.html
   ```

2. **Analizar componentes:**
   - Abrir `designs/NombreVista/code.html`
   - Identificar secciones reutilizables
   - Anotar clases de Tailwind usadas
   - Detectar patrones de estructura

3. **Extraer a componentes:**
   - Crear componentes para piezas reutilizables
   - Crear vista para la página completa
   - Mantener clases de Tailwind como están

4. **Implementar:**
   - Componentes → `js/components/`
   - Vista → `js/views/`
   - Importar y componer

---

### 4. Desarrollo con SASS y Tailwind

```bash
# Terminal 1: Watch mode (SASS + Tailwind simultáneamente)
cd tuautocom.UI
pnpm dev

# Terminal 2: Servidor de desarrollo
pnpm serve

# Navegador: http://localhost:8000
```

**El comando `pnpm dev` ejecuta:**
- `sass --watch` → Compila SCSS a CSS
- `tailwindcss --watch` → Procesa clases de Tailwind
- Ambos en paralelo con `concurrently`

**Flujo de desarrollo típico:**
1. Editar archivos JS o SCSS
2. El watch detecta cambios automáticamente
3. Build se ejecuta en background
4. Recargar navegador para ver cambios

---

### 5. Modificar Colores del Proyecto

```bash
# 1. Editar js/config/theme.js
# 2. Guardar cambios
# 3. Si estás en dev mode, recarga automáticamente
# 4. Si no, ejecutar: pnpm build
```

**Ejemplo de cambio de color:**
```javascript
// js/config/theme.js

export const theme = {
  colors: {
    primaryDark: '#10231c',     // ← Cambiar este valor
    primaryMedium: '#214a3c',   // ← O este
    primaryLight: '#8ecdb7',    // ← O este
  },
  fonts: {
    sans: ['Inter', 'Noto Sans', 'sans-serif'],
  }
};
```

**Impacto del cambio:**
- Tailwind genera nuevas clases (`bg-primary-dark`, etc.)
- SCSS actualiza CSS variables (`:root --color-primary-dark`)
- Componentes JS pueden importar nuevos valores

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

**Explicación de scripts:**
- `dev:sass` - Watch SCSS y compilar a CSS
- `dev:tailwind` - Watch clases Tailwind y compilar
- `dev` - Ejecutar ambos watches simultáneamente
- `build:sass` - Build SCSS una vez
- `build:tailwind` - Build Tailwind una vez
- `build` - Build completo (desarrollo)
- `build:prod` - Build con minificación (producción)
- `serve` - Servidor HTTP local

---

## 📋 CHECKLIST DE DESARROLLO

### Antes de Crear un Componente
- [ ] ¿Ya existe un componente similar?
- [ ] ¿Es realmente reutilizable o es específico de una vista?
- [ ] ¿Qué props/datos necesita?
- [ ] ¿Tiene eventos/interacciones?
- [ ] ¿Debe emitir CustomEvents o usar callbacks?

### Antes de Hacer Commit
- [ ] Código sigue los estándares establecidos
- [ ] Nombres de variables/funciones son descriptivos
- [ ] Comentarios JSDoc en funciones públicas
- [ ] Sin console.logs de debug
- [ ] **SASS y Tailwind CSS compilados** correctamente (`pnpm build`)
- [ ] Probado en navegador
- [ ] **theme.js actualizado** si cambiaron colores
- [ ] Imports tienen extensión `.js`
- [ ] No se modificaron archivos generados (`output.css`, `temp.css`)

### Antes de Integrar con Backend
- [ ] Endpoints documentados
- [ ] Manejo de errores implementado
- [ ] Loading states considerados
- [ ] Validación de datos del servidor
- [ ] Fallbacks para datos vacíos/errores
- [ ] Testing con datos mock primero

### Antes de Cerrar Sesión
- [ ] Documentar decisiones tomadas
- [ ] Listar cambios realizados
- [ ] Incluir próximos pasos
- [ ] Crear/actualizar archivo en `sessions/`
- [ ] Actualizar reference/CONTEXT.md si cambió el estado
- [ ] Proponer actualizaciones a core/AGENT.md si hay nuevos patrones

---

**Continúa en**: `workflows-2-troubleshooting.md`
