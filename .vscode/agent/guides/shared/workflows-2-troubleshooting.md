# 🚀 Workflows - Parte 2: Troubleshooting

> **LÍMITE**: Máximo 300 líneas
> **Parte**: 2 de 2
> **Anterior**: workflows-1-desarrollo.md

---

## 🆘 TROUBLESHOOTING

### CSS no se actualiza

**Síntoma:** Los cambios en estilos no se reflejan en el navegador.

**Soluciones:**
```bash
# 1. Verificar que el watch esté corriendo
pnpm dev

# 2. Si no está corriendo, forzar rebuild
pnpm build

# 3. Limpiar caché del navegador
# Ctrl+Shift+R (Chrome/Firefox) o Cmd+Shift+R (Mac)

# 4. Verificar que output.css esté linkeado en index.html
# <link rel="stylesheet" href="styles/output.css">

# 5. Verificar que no estés editando archivos generados
# ❌ output.css, temp.css (estos se regeneran)
# ✅ input.scss, theme.js (estos son los source)
```

---

### Módulos no se cargan

**Síntoma:** Errores en consola tipo "Failed to load module" o "404 Not Found".

**Soluciones:**
```bash
# 1. Verificar que uses .js en imports
# ✅ CORRECTO
import { Header } from './components/Header.js';

# ❌ INCORRECTO (no funciona en navegador)
import { Header } from './components/Header';

# 2. Verificar que el servidor esté corriendo
pnpm serve

# 3. Verificar la ruta del import (relativa o absoluta correcta)
# Desde views/HomeView.js:
import { Header } from '../components/Header.js';  # ✅

# 4. Verificar que el archivo existe
ls js/components/Header.js

# 5. Verificar que el módulo tenga export
# El archivo debe tener: export class Header { }
```

---

### Tailwind classes no funcionan

**Síntoma:** Las clases de Tailwind no aplican estilos.

**Soluciones:**
```bash
# 1. Verificar que el path esté en tailwind.config.js content
# Debe incluir: "./js/**/*.js"

# 2. Verificar que output.css esté linkeado en index.html
grep "output.css" index.html

# 3. Reconstruir CSS
pnpm build

# 4. Verificar que la clase exista en Tailwind
# https://tailwindcss.com/docs

# 5. Si usas clases custom del theme, verificar theme.js
cat js/config/theme.js

# 6. Para clases dinámicas, usar clases completas
# ❌ MAL: className = `bg-primary-${variant}`
# ✅ BIEN: className = variant === 'dark' ? 'bg-primary-dark' : 'bg-primary-light'
```

---

### Build falla con errores

**Síntoma:** `pnpm build` termina con errores.

**Soluciones:**
```bash
# 1. Ver el error específico
pnpm build 2>&1 | tee build-error.log

# 2. Si es error de SASS
# Verificar sintaxis en input.scss
sass --check styles/input.scss

# 3. Si es error de Tailwind
# Verificar tailwind.config.js sintaxis
node -c tailwind.config.js

# 4. Si es error de pnpm
# Reinstalar dependencias
rm -rf node_modules pnpm-lock.yaml
pnpm install

# 5. Verificar versiones de Node.js y pnpm
node --version  # Debe ser >= 18
pnpm --version  # Debe ser >= 8
```

---

### Componente no se renderiza

**Síntoma:** El componente no aparece en la página o aparece vacío.

**Soluciones:**
```javascript
// 1. Verificar que render() retorne HTMLElement
render() {
  const element = document.createElement('div');
  // ...
  return element;  // ✅ DEBE retornar
}

// 2. Verificar que el componente se agregue al DOM
const component = new MyComponent(data);
container.appendChild(component.render());  // ✅

// 3. Verificar datos del constructor
console.log('Component data:', this.data);  // Debug temporal

// 4. Verificar que las clases de Tailwind sean correctas
// Typos comunes: "flx" en vez de "flex", "bg-primay-dark" etc.

// 5. Verificar que el contenedor padre exista
const container = document.getElementById('app');
console.log('Container:', container);  // Debe existir
```

---

### Performance Issues

**Síntoma:** La aplicación se siente lenta o tarda en responder.

**Diagnóstico:**
```javascript
// 1. Verificar re-renders innecesarios
// Usar Performance tab en DevTools

// 2. Verificar event listeners no removidos
// Memory leaks por listeners no limpiados

// 3. Verificar cargas de imágenes
// Usar lazy loading o compresión

// 4. Verificar cantidad de elementos DOM
// Demasiados elementos simultáneos
```

**Soluciones:**
```javascript
// 1. Implementar destroy() en vistas y componentes
destroy() {
  // Remover event listeners
  this.element.removeEventListener('click', this.handleClick);
  // Limpiar timers
  clearInterval(this.interval);
  // Limpiar referencias
  this.data = null;
}

// 2. Usar delegation para eventos repetidos
// En vez de listener por card, uno en el contenedor
container.addEventListener('click', (e) => {
  const card = e.target.closest('.vehicle-card');
  if (card) {
    // Handle click
  }
});

// 3. Lazy load de imágenes
<img loading="lazy" src="...">

// 4. Virtualización para listas largas (futuro)
```

---

## 📚 RECURSOS Y REFERENCIAS

### Documentación Técnica
- [Tailwind CSS Docs](https://tailwindcss.com/docs) - Referencia completa de utilidades
- [MDN Web Docs - ES Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) - Guía de módulos JavaScript
- [MDN Web Docs - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) - API para peticiones HTTP
- [SASS Documentation](https://sass-lang.com/documentation) - Preprocesador CSS

### Diseños
- Diseños raw: `/designs/` (local en el proyecto)
- Stitch: https://stitch.withgoogle.com - Herramienta de diseño

### Proyecto
- Backend: `../backend/`
- Frontend legacy: `../frontend/`
- Actual: `tuautocom.UI/`

---

## 🎯 COMANDOS RÁPIDOS

### Setup Inicial
```bash
cd tuautocom.UI
pnpm install
```

### Desarrollo Diario
```bash
# Terminal 1: Watch SASS + Tailwind
pnpm dev

# Terminal 2: Servidor
pnpm serve

# Navegador: http://localhost:8000
```

### Build para Producción
```bash
pnpm build:prod
```

### Verificación
```bash
# Ver errores
pnpm build

# Limpiar y reinstalar
rm -rf node_modules pnpm-lock.yaml && pnpm install
```

---

## 💡 TIPS Y MEJORES PRÁCTICAS

### 1. Desarrollo Incremental
- Hacer un cambio a la vez
- Build después de cada cambio significativo
- Verificar en navegador antes de continuar

### 2. Uso de Consola
- Usar `console.log` temporal para debug
- Remover antes de commit
- Preferir breakpoints en DevTools para debug complejo

### 3. Manejo de Errores
- Siempre usar try/catch en operaciones async
- Proveer mensajes de error útiles al usuario
- Loggear errores técnicos en consola

### 4. Organización de Código
- Un componente = un archivo
- Mantener archivos bajo 300 líneas
- Extraer lógica compleja a utilidades

### 5. Naming Conventions
- Archivos: PascalCase para componentes/vistas, camelCase para servicios/utils
- Variables: camelCase
- Constantes: UPPER_SNAKE_CASE
- Clases: PascalCase
- Métodos privados: _camelCase

---

## 📖 NAVEGACIÓN

- **Parte 1**: [workflows-1-desarrollo.md](workflows-1-desarrollo.md) - Workflows de desarrollo
- **Parte 2**: [workflows-2-troubleshooting.md](workflows-2-troubleshooting.md) - Troubleshooting (este archivo)
- **Índice general**: [../INDEX.md](../INDEX.md)
- **Agente principal**: [../core/AGENT.md](../core/AGENT.md)

---

**Volver al índice**: [../core/AGENT.md](../core/AGENT.md) | [../INDEX.md](../INDEX.md)
