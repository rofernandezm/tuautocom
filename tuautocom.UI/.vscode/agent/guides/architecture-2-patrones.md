# 🏗️ Arquitectura - Parte 2: Patrones de Código

> **LÍMITE**: Máximo 300 líneas
> **Parte**: 2 de 3
> **Anterior**: architecture-1-stack.md
> **Siguiente**: architecture-3-componentes.md

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

**Continúa en**: `architecture-3-componentes.md`
