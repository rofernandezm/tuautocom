# 🎓 Guía de Aprendizaje: JavaScript Vanilla → ES Modules

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

## 7️⃣ Data Attributes

### ¿Qué son?

Atributos HTML personalizados que empiezan con `data-`:

```html
<button data-action="delete" data-id="123">Eliminar</button>
```

### Acceso en JavaScript

```javascript
// Vanilla JS
const btn = document.querySelector('[data-action="delete"]');
const action = btn.getAttribute('data-action'); // "delete"
const id = btn.getAttribute('data-id'); // "123"

// ES6 con dataset
const btn = document.querySelector('[data-action="delete"]');
const action = btn.dataset.action; // "delete"
const id = btn.dataset.id; // "123"
```

### ¿Por qué usarlos?

```html
<!-- ❌ Mezclar clases con funcionalidad -->
<button class="btn-delete" data-product="123">Eliminar</button>

<!-- ✅ Separar presentación de funcionalidad -->
<button class="btn btn-danger" data-action="delete" data-id="123">
  Eliminar
</button>
```

- Las clases son para estilos
- Los data-* son para funcionalidad
- Más mantenible y semántico

---

## 8️⃣ Arrow Functions

### Función tradicional

```javascript
function suma(a, b) {
  return a + b;
}

// Callback
element.addEventListener('click', function(e) {
  console.log(this); // this = element
});
```

### Arrow function

```javascript
const suma = (a, b) => a + b;

// Con bloque
const suma = (a, b) => {
  return a + b;
};

// Callback
element.addEventListener('click', (e) => {
  console.log(this); // this = contexto léxico (NO element)
});
```

### Diferencias clave

1. **Sintaxis más corta**
2. **Return implícito** (sin llaves)
3. **this léxico** (hereda this del contexto)

---

## 9️⃣ Operadores Modernos

### Optional Chaining (?.)

```javascript
// ❌ Vanilla JS
if (user && user.address && user.address.city) {
  console.log(user.address.city);
}

// ✅ ES2020
console.log(user?.address?.city);
// undefined si cualquier parte es null/undefined
```

### Nullish Coalescing (??)

```javascript
// ❌ Con OR (problema: 0 y '' son falsy)
const cantidad = valor || 10; // Si valor es 0, usa 10 😢

// ✅ Con ?? (solo null/undefined)
const cantidad = valor ?? 10; // Si valor es 0, usa 0 ✅
```

### Destructuring

```javascript
// Objetos
const user = { nombre: 'Juan', edad: 25 };
const { nombre, edad } = user;

// Arrays
const colores = ['rojo', 'verde', 'azul'];
const [primero, segundo] = colores;

// En parámetros
function saludar({ nombre, edad }) {
  return `Hola ${nombre}, tienes ${edad} años`;
}
```

---

## 🔟 Patrón de Componente

### Anatomía Completa

```javascript
// js/components/MiComponente.js

// 1. Importaciones
import { theme } from '../config/theme.js';
import { api } from '../services/api.js';

// 2. Clase del componente
export class MiComponente {
  
  // 3. Constructor - Estado inicial
  constructor(config = {}) {
    this.data = config.data || [];
    this.isLoading = false;
  }
  
  // 4. Método render - Genera HTML
  render() {
    const container = document.createElement('div');
    container.className = 'mi-componente';
    container.innerHTML = this._template();
    this._attachEventListeners(container);
    return container;
  }
  
  // 5. Template privado
  _template() {
    return `
      <div class="content">
        ${this._renderItems()}
      </div>
    `;
  }
  
  _renderItems() {
    return this.data.map(item => `
      <div class="item" data-id="${item.id}">
        ${item.name}
      </div>
    `).join('');
  }
  
  // 6. Event listeners
  _attachEventListeners(container) {
    const items = container.querySelectorAll('.item');
    items.forEach(item => {
      item.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        this._handleItemClick(id);
      });
    });
  }
  
  // 7. Event handlers
  _handleItemClick(id) {
    console.log(`Clicked item ${id}`);
  }
  
  // 8. Métodos públicos
  async loadData() {
    this.isLoading = true;
    this.data = await api.getData();
    this.isLoading = false;
  }
}
```

### Uso del componente

```javascript
// main.js
import { MiComponente } from './components/MiComponente.js';

const componente = new MiComponente({
  data: [{ id: 1, name: 'Item 1' }]
});

const element = componente.render();
document.getElementById('app').appendChild(element);
```

---

## 🎯 Comparación Lado a Lado

### Crear un Header

#### Vanilla JS (Antiguo)

```html
<!-- index.html -->
<script src="header.js"></script>
<script src="main.js"></script>
```

```javascript
// header.js
function createHeader(title) {
  return '<header><h1>' + title + '</h1></header>';
}

// main.js
document.addEventListener('DOMContentLoaded', function() {
  var header = createHeader('Mi App');
  document.body.innerHTML = header;
});
```

#### ES Modules (Moderno)

```html
<!-- index.html -->
<script type="module" src="main.js"></script>
```

```javascript
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

document.addEventListener('DOMContentLoaded', () => {
  const header = new Header('Mi App');
  document.body.appendChild(header.render());
});
```

---

## 📚 Recursos Adicionales

### Documentación Oficial
- [ES Modules - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Modules)
- [Classes - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Classes)
- [Template Literals - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Template_literals)

### Conceptos a Explorar
- Async/Await para APIs
- Promise y .then()/.catch()
- Spread operator (...)
- Rest parameters
- Module bundlers (Vite, Webpack)

---

## ✅ Checklist de Aprendizaje

- [ ] Entiendo export/import
- [ ] Sé crear clases con constructor
- [ ] Puedo usar template literals
- [ ] Conozco los array methods (map, filter, reduce)
- [ ] Uso data attributes para conectar HTML y JS
- [ ] Comprendo arrow functions y this
- [ ] Uso optional chaining (?.) y nullish coalescing (??)
- [ ] Puedo crear un componente completo
- [ ] Entiendo el flujo de render y event listeners

---

## 🎓 Ejercicio Práctico

Crea un componente `Button`:

```javascript
// components/Button.js
export class Button {
  constructor(config) {
    this.label = config.label;
    this.onClick = config.onClick;
    this.variant = config.variant || 'primary';
  }
  
  render() {
    // Tu código aquí
    // Debe retornar un <button> con event listener
  }
}

// Uso:
const btn = new Button({
  label: 'Click me',
  variant: 'primary',
  onClick: () => alert('¡Hola!')
});
```

**Reto**: Agrégale estados (loading, disabled) y estilos de Tailwind.

---

**¡Feliz aprendizaje! 🚀**
