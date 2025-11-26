/**
 * CategoriesView
 * Vista de categorías con filtros y grid de vehículos
 * Movida desde HomeView para tener una página dedicada
 * 
 * @class
 */

import { Header } from '../components/Header.js';
import { CategoryFilters } from '../components/CategoryFilters.js';
import { VehicleCard } from '../components/VehicleCard.js';
import { Footer } from '../components/Footer.js';
import { vehicleService } from '../services/vehicleService.js';

export class CategoriesView {
  constructor() {
    this.container = null;
    this.categories = [];
    this.allVehicles = [];
    this.filteredVehicles = [];
    this.activeCategory = 'all';
    // Binding para evento de búsqueda
    this._onSearchInputBound = (event) => this._onSearchInput(event);
  }

  /**
   * Inicializa la vista cargando datos
   * @async
   */
  async init() {
    try {
  // Cargando datos para CategoriesView
      this.categories = await vehicleService.getCategories();
      
      // vehicleService.getAll() ahora retorna { data: [...], pagination: {...} }
      const response = await vehicleService.getAll();
      this.allVehicles = response.data || [];
      this.filteredVehicles = this.allVehicles;
      
  // Datos cargados
    } catch (error) {
      console.error('❌ Error al cargar datos de categorías:', error);
      this.categories = [];
      this.allVehicles = [];
      this.filteredVehicles = [];
    }
  }

  /**
   * Renderiza la vista completa
   * @returns {HTMLElement}
   */
  render() {
    this.container = document.createElement('div');
    this.container.className = 'relative flex flex-col min-h-screen w-full bg-[#10231c]';

    // Header
    const header = new Header();
    this.container.appendChild(header.render());

    // Escuchar búsquedas emitidas por Header
    document.addEventListener('search-input', this._onSearchInputBound);

    // Main content
    const main = document.createElement('main');
    main.className = 'w-full max-w-7xl mx-auto px-5 py-10';

    // Título de la página
    const title = document.createElement('h1');
    title.className = 'text-white text-4xl font-bold mb-8';
    title.textContent = 'Categorías de Vehículos';
    main.appendChild(title);

    // Category filters
    const filters = new CategoryFilters({
      categories: this.categories,
      activeCategory: this.activeCategory,
      onChange: (categoryId) => this._onFilterChange(categoryId)
    });
    main.appendChild(filters.render());

    // Grid de vehículos (contenedor dinámico)
    this._contentContainer = document.createElement('div');
    this._contentContainer.className = 'mt-8';
    main.appendChild(this._contentContainer);

    // Renderizar grid inicial
    this._renderVehicleGrid();

    this.container.appendChild(main);

    // Footer
    const footer = new Footer();
    this.container.appendChild(footer.render());

    return this.container;
  }

  /**
   * Maneja el cambio de categoría
   * @private
   * @param {string} categoryId
   */
  _onFilterChange(categoryId) {
  // Filtro cambiado: ${categoryId}
    this.activeCategory = categoryId;

    // Filtrar vehículos
    if (categoryId === 'all') {
      this.filteredVehicles = this.allVehicles;
    } else {
      this.filteredVehicles = this.allVehicles.filter(v => v.category === categoryId);
    }

  // ${this.filteredVehicles.length} vehículos filtrados

    // Re-renderizar grid
    this._renderVehicleGrid();
  }

  /**
   * Renderiza el grid de vehículos
   * @private
   */
  _renderVehicleGrid() {
    if (!this._contentContainer) return;

    // Limpiar contenedor
    this._contentContainer.innerHTML = '';

    // Mensaje si no hay vehículos
    if (this.filteredVehicles.length === 0) {
      const emptyMessage = document.createElement('div');
      emptyMessage.className = 'text-center py-16';
      emptyMessage.innerHTML = `
        <p class="text-white text-xl mb-2">No hay vehículos en esta categoría</p>
        <p class="text-[#8ecdb7] text-sm">Prueba seleccionando otra categoría</p>
      `;
      this._contentContainer.appendChild(emptyMessage);
      return;
    }

    // Grid de vehículos
    const grid = document.createElement('div');
    grid.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6';

    this.filteredVehicles.forEach(vehicle => {
      const card = new VehicleCard(vehicle);
      grid.appendChild(card.render());
    });

    this._contentContainer.appendChild(grid);
  }

  /**
   * Handler del evento 'search-input' emitido por Header (búsqueda en tiempo real)
   * @private
   * @param {CustomEvent} event
   */
  async _onSearchInput(event) {
    try {
      const query = event?.detail?.query || '';
      
      if (!query) {
        // Restaurar vehículos filtrados por categoría activa
        this._onFilterChange(this.activeCategory);
        return;
      }

      // Filtrar por búsqueda dentro de la categoría activa
      const baseVehicles = this.activeCategory === 'all' 
        ? this.allVehicles 
        : this.allVehicles.filter(v => v.category === this.activeCategory);

      const q = query.toLowerCase();
      this.filteredVehicles = baseVehicles.filter(v => {
        const title = (v.title || '').toLowerCase();
        const desc = (v.description || '').toLowerCase();
        return title.includes(q) || desc.includes(q);
      });

      this._renderVehicleGrid();
    } catch (error) {
      console.error('Error al procesar la búsqueda en CategoriesView:', error);
    }
  }

  /**
   * Destruye la vista
   */
  destroy() {
    // Remover listener de búsqueda
    document.removeEventListener('search-input', this._onSearchInputBound);
    
    // Limpiar referencias
    this.container = null;
    this._contentContainer = null;
  }
}
