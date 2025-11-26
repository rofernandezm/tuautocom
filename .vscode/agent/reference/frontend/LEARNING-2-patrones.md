# 🎓 Guía de Aprendizaje - Parte 2: Patrones Avanzados

> **LÍMITE**: Máximo 300 líneas
> **Parte**: 2 de 2
> **Anterior**: LEARNING-1-fundamentos.md

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

## 📚 Recursos

Ver MDN Web Docs para: ES Modules, Classes, Template Literals, Async/Await, Promises

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

## 🎓 Ejercicio

Crea un componente `Button` con estados (loading, disabled) y estilos de Tailwind.

---

## 📖 NAVEGACIÓN

- **Parte 1**: [LEARNING-1-fundamentos.md](LEARNING-1-fundamentos.md) - Fundamentos ES Modules
- **Parte 2**: [LEARNING-2-patrones.md](LEARNING-2-patrones.md) - Patrones avanzados (este archivo)
- **Índice general**: [../INDEX.md](../INDEX.md)
- **Agente principal**: [../core/AGENT.md](../core/AGENT.md)

---

**¡Feliz aprendizaje! 🚀**
