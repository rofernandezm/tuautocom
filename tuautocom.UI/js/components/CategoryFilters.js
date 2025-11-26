/**
 * 🎓 COMPONENTE CATEGORYFILTERS
 * 
 * CONCEPTOS CLAVE:
 * - Pills/badges para filtrado visual de categorías
 * - Componente interactivo que maneja selección
 * - Estado interno para categoría activa
 * - Event delegation para eficiencia
 */

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1️⃣ IMPORTACIONES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { theme } from '../config/theme.js';
import { catalogService } from '../services/catalogService.js';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2️⃣ CLASE DEL COMPONENTE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * CategoryFilters Component
 * Pills/badges para filtrar vehículos por categoría
 * 
 * RESPONSABILIDADES:
 * - Mostrar categorías disponibles como pills
 * - Manejar selección de categoría
 * - Indicar visualmente la categoría activa
 * - Notificar cambios mediante callback
 * 
 * @class
 * @param {Object} config - Configuración del componente
 * @param {Array<Object>} config.categories - Array de categorías
 * @param {string} config.categories[].id - ID único de la categoría
 * @param {string} config.categories[].label - Texto a mostrar
 * @param {string} [config.activeCategory] - ID de categoría activa inicial
 * @param {Function} [config.onChange] - Callback cuando cambia selección
 * 
 * @example
 * const filters = new CategoryFilters({
 *   categories: [
 *     { id: 'suv', label: 'SUV' },
 *     { id: 'sedan', label: 'Sedán' },
 *     { id: 'pickup', label: 'Pick-up' }
 *   ],
 *   activeCategory: 'suv',
 *   onChange: (categoryId) => console.log('Categoría seleccionada:', categoryId)
 * });
 * 
 * document.body.appendChild(filters.render());
 */
export class CategoryFilters {
  
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 3️⃣ CONSTRUCTOR
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  
  /**
   * @param {Object} config - Configuración del componente
   */
  constructor(config = {}) {
    // Categorías: se cargarán desde el backend mediante catalogService
    // 📝 NOTA EDUCATIVA:
    // Ya no usamos datos hardcoded. Las categorías vienen de MongoDB.
    this.categories = config.categories || [];
    
    // Estado interno: categoría actualmente seleccionada
    // 📝 NOTA EDUCATIVA:
    // null significa "todas las categorías" o "sin filtro"
    this.activeCategory = config.activeCategory || null;
    
    // Callback para notificar cambios
    this.onChange = config.onChange;
    
    // Flag para indicar si las categorías han sido cargadas
    this.categoriesLoaded = false;
    
    // Si se proporcionaron categorías, marcar como cargadas
    if (this.categories.length > 0) {
      this.categoriesLoaded = true;
    }
  }
  
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 4️⃣ MÉTODO RENDER
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  
  /**
   * Renderiza el componente de filtros como un HTMLElement
   * @returns {HTMLElement} El elemento del filtro renderizado
   */
  render() {
    // Contenedor principal
    const container = document.createElement('div');
    container.className = 'flex gap-3 p-3 flex-wrap pr-4';
    container.setAttribute('data-filters', 'true');
    
    // 📝 NOTA EDUCATIVA:
    // flex-wrap permite que las pills se envuelvan a la siguiente línea
    // si no caben en el ancho disponible (responsive)
    
    // Si no hay categorías cargadas, mostrar loading
    if (!this.categoriesLoaded || this.categories.length === 0) {
      container.innerHTML = '<p class="text-white text-sm">Cargando categorías...</p>';
      return container;
    }
    
    // Generar una pill por cada categoría
    this.categories.forEach(category => {
      const pill = this._createPill(category);
      container.appendChild(pill);
    });
    
    // Adjuntar event listeners usando event delegation
    // 📝 NOTA EDUCATIVA:
    // En lugar de agregar un listener a cada pill, agregamos uno solo
    // al contenedor. Esto es más eficiente.
    this._attachEventListeners(container);
    
    return container;
  }
  
  /**
   * Carga categorías desde el backend y re-renderiza
   * 📝 NOTA EDUCATIVA:
   * Este método es async porque consulta la API de MongoDB
   * 
   * @returns {Promise<void>}
   */
  async loadCategories() {
    try {
      this.categories = await catalogService.getCategories();
      this.categoriesLoaded = true;
    } catch (error) {
      console.error('Error al cargar categorías:', error);
      this.categoriesLoaded = false;
    }
  }
  
  /**
   * Re-renderiza el componente con las categorías actualizadas
   * 📝 NOTA EDUCATIVA:
   * Útil después de loadCategories() para actualizar la UI
   * 
   * @param {HTMLElement} container - Contenedor a actualizar
   */
  updateRender(container) {
    if (!container) return;
    
    // Limpiar contenido actual
    container.innerHTML = '';
    
    if (!this.categoriesLoaded || this.categories.length === 0) {
      container.innerHTML = '<p class="text-white text-sm">Cargando categorías...</p>';
      return;
    }
    
    // Regenerar pills
    this.categories.forEach(category => {
      const pill = this._createPill(category);
      container.appendChild(pill);
    });
    
    // Re-adjuntar event listeners
    this._attachEventListeners(container);
  }
  
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 5️⃣ MÉTODOS PRIVADOS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  
  /**
   * Crea una pill individual para una categoría
   * @private
   * @param {Object} category - Datos de la categoría
   * @returns {HTMLElement} Elemento de la pill
   */
  _createPill(category) {
    const pill = document.createElement('div');
    
    // Determinar si esta pill está activa
    const isActive = this.activeCategory === category.id;
    
    // Clases base
    const baseClasses = 'flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg pl-4 pr-4 cursor-pointer transition-all duration-200';
    
    // Clases condicionales según estado
    // 📝 NOTA EDUCATIVA:
    // Usamos diferentes colores para indicar el estado activo/inactivo
    const stateClasses = isActive 
      ? 'bg-[#8ecdb7] text-[#10231c]'  // Activo: fondo claro, texto oscuro
      : 'bg-[#214a3c] text-white hover:bg-[#2a5c4a]'; // Inactivo: fondo medio, texto blanco
    
    pill.className = `${baseClasses} ${stateClasses}`;
    
    // Agregar data attribute para identificación
    pill.setAttribute('data-category-id', category.id);
    
    // Contenido
    pill.innerHTML = `
      <p class="text-sm font-medium leading-normal">
        ${category.label}
      </p>
    `;
    
    return pill;
  }
  
  /**
   * Adjunta event listeners al contenedor
   * @private
   * @param {HTMLElement} container - Contenedor de las pills
   */
  _attachEventListeners(container) {
    // Event delegation: un solo listener para todas las pills
    // 📝 NOTA EDUCATIVA:
    // Capturamos clicks en el contenedor y verificamos si el click
    // fue en una pill usando el data-attribute
    container.addEventListener('click', (event) => {
      // Encontrar el elemento pill clickeado
      const pill = event.target.closest('[data-category-id]');
      
      if (!pill) return; // Click fuera de una pill
      
      const categoryId = pill.getAttribute('data-category-id');
      
      // Actualizar estado interno
      // 📝 NOTA EDUCATIVA:
      // Si se clickea la misma categoría, se deselecciona (toggle)
      this.activeCategory = this.activeCategory === categoryId ? null : categoryId;
      
      // Re-renderizar para actualizar estilos
      this._updatePillStyles(container);
      
      // Notificar cambio mediante callback
      if (typeof this.onChange === 'function') {
        this.onChange(this.activeCategory);
      }
    });
  }
  
  /**
   * Actualiza los estilos de las pills según el estado activo
   * @private
   * @param {HTMLElement} container - Contenedor de las pills
   */
  _updatePillStyles(container) {
    // Obtener todas las pills
    const pills = container.querySelectorAll('[data-category-id]');
    
    pills.forEach(pill => {
      const categoryId = pill.getAttribute('data-category-id');
      const isActive = this.activeCategory === categoryId;
      
      // Actualizar clases según estado
      if (isActive) {
        pill.className = 'flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg pl-4 pr-4 cursor-pointer transition-all duration-200 bg-[#8ecdb7] text-[#10231c]';
      } else {
        pill.className = 'flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg pl-4 pr-4 cursor-pointer transition-all duration-200 bg-[#214a3c] text-white hover:bg-[#2a5c4a]';
      }
    });
  }
  
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 6️⃣ MÉTODOS PÚBLICOS - API del componente
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  
  /**
   * Obtiene la categoría actualmente seleccionada
   * @returns {string|null} ID de la categoría activa o null
   */
  getActiveCategory() {
    return this.activeCategory;
  }
  
  /**
   * Establece programáticamente la categoría activa
   * @param {string|null} categoryId - ID de la categoría a activar
   */
  setActiveCategory(categoryId) {
    this.activeCategory = categoryId;
    // Nota: Necesitarías una referencia al contenedor para actualizar
    // En una implementación real, considerarías re-renderizar o mantener referencia
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🎓 NOTAS ADICIONALES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/*
📚 CONCEPTOS APLICADOS:

1. **Estado Interno (State)**:
   - this.activeCategory mantiene el estado del componente
   - Permite toggle: click en activo = deseleccionar

2. **Event Delegation**:
   - Un solo listener en el contenedor
   - Identifica pills con data-category-id
   - Más eficiente que múltiples listeners

3. **Estilos Condicionales**:
   - Diferentes clases según estado activo/inactivo
   - Transiciones suaves con transition-all

4. **Callback Pattern**:
   - onChange notifica al exterior sobre cambios
   - Permite integración con otros componentes

5. **Responsive con flex-wrap**:
   - Pills se ajustan automáticamente
   - Se envuelven en múltiples líneas si es necesario

6. **API Pública**:
   - getActiveCategory() para leer estado
   - setActiveCategory() para modificar estado
   - loadCategories() para cargar desde backend
   - updateRender() para re-renderizar tras carga

7. **Integración Backend**:
   - Usa catalogService para obtener datos de MongoDB
   - Operación MongoDB: Catalog.find({ type: 'categories' })
   - Cache automático en catalogService (5 minutos)
   - Fallback a datos mock si backend no responde

📝 USO CON BACKEND:

// Opción 1: Pre-cargar categorías antes de renderizar
const filters = new CategoryFilters({ onChange: handleChange });
await filters.loadCategories();
const element = filters.render();
document.body.appendChild(element);

// Opción 2: Renderizar primero, cargar después
const filters = new CategoryFilters({ onChange: handleChange });
const element = filters.render();
document.body.appendChild(element);
await filters.loadCategories();
filters.updateRender(element);

📝 MEJORAS FUTURAS:
- Agregar iconos a las categorías desde MongoDB
- Permitir selección múltiple
- Animaciones al cambiar selección
- Contador de items por categoría desde backend
*/
