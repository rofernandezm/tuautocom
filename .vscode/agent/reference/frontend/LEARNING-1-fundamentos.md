# 🎓 Guía de Aprendizaje - Parte 1: Fundamentos

> **LÍMITE**: Máximo 300 líneas
> **Parte**: 1 de 2
> **Siguiente**: LEARNING-2-patrones.md

---

## 📘 Introducción

Esta guía está diseñada para desarrolladores que conocen **JavaScript Vanilla** y quieren entender **ES Modules** (ECMA) y el desarrollo moderno con componentes.

---

## 1️⃣ JavaScript Vanilla (Lo que ya conoces)

### Forma Tradicional

```javascript
// ❌ Estilo antiguo con <script> tags

// utils.js
function formatPrice(price) {
  return '$' + price.toLocaleString();
}

// header.js
function createHeader() {
  var html = '<header>';
  html += '<h1>Mi App</h1>';
  html += '</header>';
  return html;
}

// main.js
document.addEventListener('DOMContentLoaded', function() {
  var headerHTML = createHeader();
  document.body.innerHTML = headerHTML;
});
```

```html
<!-- index.html -->
<script src="utils.js"></script>
<script src="header.js"></script>
<script src="main.js"></script>
```

### Problemas de este enfoque:

1. **Scope Global**: Todas las funciones son globales
2. **Orden crítico**: Los scripts deben cargarse en orden específico
3. **Sin encapsulación**: Todo puede ser accedido desde cualquier lugar
4. **Concatenación de strings**: Difícil de leer y mantener
5. **Sin tree-shaking**: Todo el código se descarga, se use o no

---

## 2️⃣ ES Modules (El nuevo estándar)

### Forma Moderna

```javascript
// ✅ Estilo moderno con ES Modules

// utils.js
export function formatPrice(price) {
  return `$${price.toLocaleString()}`;
}

// components/Header.js
export class Header {
  constructor(title) {
    this.title = title;
  }
  
  render() {
    const header = document.createElement('header');
    header.innerHTML = `<h1>${this.title}</h1>`;
    return header;
  }
}

// main.js
import { Header } from './components/Header.js';
import { formatPrice } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  const header = new Header('Mi App');
  document.body.appendChild(header.render());
});
```

```html
<!-- index.html -->
<script type="module" src="main.js"></script>
```

### Ventajas de ES Modules:

1. **Scope aislado**: Cada módulo tiene su propio scope
2. **Importaciones explícitas**: Sabes exactamente qué dependencias tiene cada archivo
3. **Encapsulación**: Solo lo que exportas es accesible
4. **Template literals**: Sintaxis limpia para strings multi-línea
5. **Tree-shaking**: Solo se carga el código que se usa

---

## 3️⃣ Palabras Clave: export e import

### Export (Exportar)

```javascript
// Named exports (puedes tener varios)
export const PI = 3.1416;
export function suma(a, b) {
  return a + b;
}
export class Calculadora {
  // ...
}

// También puedes exportar al final
const PI = 3.1416;
function suma(a, b) { return a + b; }
export { PI, suma };

// Default export (solo uno por archivo)
export default class App {
  // ...
}
```

### Import (Importar)

```javascript
// Importar named exports
import { PI, suma } from './math.js';

// Importar todo con alias
import * as math from './math.js';
console.log(math.PI); // 3.1416

// Importar default export
import App from './App.js';

// Combinar default y named
import App, { PI, suma } from './App.js';

// Importar con alias
import { suma as sumar } from './math.js';
```

---

## 4️⃣ Clases ES6 vs Funciones

### Vanilla JS (Funciones)

```javascript
// Función constructora
function Header(title) {
  this.title = title;
}

Header.prototype.render = function() {
  return '<header><h1>' + this.title + '</h1></header>';
};

// Uso
var header = new Header('Mi App');
var html = header.render();
```

### ES6 (Clases)

```javascript
// Clase moderna
class Header {
  constructor(title) {
    this.title = title;
  }
  
  render() {
    return `<header><h1>${this.title}</h1></header>`;
  }
}

// Uso
const header = new Header('Mi App');
const html = header.render();
```

### ¿Por qué clases?

1. **Sintaxis más clara**: Más fácil de leer y entender
2. **this automático**: No necesitas bind(), call(), apply()
3. **Herencia simple**: Palabra clave `extends`
4. **Métodos privados**: Convención con `_metodo()` o `#metodo()`
5. **Organización**: Todo relacionado está junto

---

## 5️⃣ Template Literals

### Concatenación Tradicional

```javascript
var nombre = 'Juan';
var edad = 25;

// ❌ Difícil de leer
var mensaje = 'Hola, mi nombre es ' + nombre + ' y tengo ' + edad + ' años';

// ❌ Multi-línea es horrible
var html = '<div class="card">' +
  '<h1>' + nombre + '</h1>' +
  '<p>Edad: ' + edad + '</p>' +
'</div>';
```

### Template Literals (Backticks)

```javascript
const nombre = 'Juan';
const edad = 25;

// ✅ Fácil de leer
const mensaje = `Hola, mi nombre es ${nombre} y tengo ${edad} años`;

// ✅ Multi-línea natural
const html = `
  <div class="card">
    <h1>${nombre}</h1>
    <p>Edad: ${edad}</p>
  </div>
`;

// ✅ Expresiones dentro
const precio = `Total: $${(100 * 1.16).toFixed(2)}`;
```

---

## 6️⃣ Array Methods Modernos

### map() - Transformar arrays

```javascript
// Vanilla JS
var numeros = [1, 2, 3, 4, 5];
var dobles = [];
for (var i = 0; i < numeros.length; i++) {
  dobles.push(numeros[i] * 2);
}

// ES6
const numeros = [1, 2, 3, 4, 5];
const dobles = numeros.map(n => n * 2);
// [2, 4, 6, 8, 10]
```

### Uso en componentes

```javascript
// Renderizar lista de items
const items = ['Inicio', 'Catálogo', 'Contacto'];

const html = items.map(item => `
  <li>${item}</li>
`).join('');

// Resultado:
// "<li>Inicio</li><li>Catálogo</li><li>Contacto</li>"
```

---

**Continúa en**: `LEARNING-2-patrones.md`
