/**
 * CatalogView
 * Vista del catálogo de vehículos con filtros avanzados, ordenamiento y paginación
 * Implementación del diseño "Catálogo con Filtros" de Stitch
 * 
 * @class
 */

import { Header } from '../components/Header.js';
import { FilterSidebar } from '../components/FilterSidebar.js';
import { SortTabs } from '../components/SortTabs.js';
import { VehicleCard } from '../components/VehicleCard.js';
import { Pagination } from '../components/Pagination.js';
import { Footer } from '../components/Footer.js';
import { vehicleService } from '../services/vehicleService.js';

export class CatalogView {
  constructor() {
    this.container = null;
    this.vehicles = [];
    this.filteredVehicles = [];
    this.currentPage = 1;
    this.itemsPerPage = 6;
    this.currentSort = 'priceAsc';
    this.currentFilters = {};
  }

  /**
   * Inicializa la vista cargando datos
   * @async
   */
  async init() {
    try {
      // Cargar todos los vehículos desde el servicio
      this.vehicles = await vehicleService.getAll();
      this.filteredVehicles = [...this.vehicles];
    } catch (error) {
      console.error('Error al cargar vehículos en CatalogView:', error);
      this.vehicles = [];
      this.filteredVehicles = [];
    }
  }

  /**
   * Renderiza la vista completa del catálogo
   * @returns {HTMLElement}
   */
  render() {
    this.container = document.createElement('div');
    this.container.className = 'relative flex flex-col min-h-screen w-full bg-primary-dark text-white';

    // Header
    const header = new Header({
      logo: 'TuAutoCom',
      links: [
        { label: 'Inicio', url: '#' },
        { label: 'Vehículos', url: '#catalog' },
        { label: 'Contacto', url: '#' }
      ]
    });
    this.container.appendChild(header.render());

    // Contenedor principal con sidebar + content
    const mainContainer = document.createElement('div');
    mainContainer.className = 'gap-1 px-6 flex flex-1 justify-center py-5';

    // Sidebar con filtros
    // 📝 NOTA: Pasamos todos los vehículos para que FilterSidebar extraiga valores únicos
    const sidebar = new FilterSidebar({
      vehicles: this.vehicles,
      onApply: (filters) => this._handleFilters(filters),
      onClear: () => this._handleClearFilters()
    });
    mainContainer.appendChild(sidebar.render());

    // Contenedor de contenido (catálogo)
    const contentContainer = document.createElement('div');
    contentContainer.className = 'flex flex-col max-w-[960px] flex-1';
    contentContainer.setAttribute('data-catalog-content', 'true');

    // Título y descripción
    contentContainer.innerHTML = `
      <div class="flex flex-wrap justify-between gap-3 p-4">
        <div class="flex min-w-72 flex-col gap-3">
          <p class="text-white tracking-light text-[32px] font-bold leading-tight">
            Vehículos Disponibles
          </p>
          <p class="text-[#8ecdb7] text-sm font-normal leading-normal">
            Explora nuestra selección de vehículos de alta calidad.
          </p>
        </div>
      </div>
    `;

    // Tabs de ordenamiento
    const sortTabs = new SortTabs({
      onSort: (sortBy) => this._handleSort(sortBy)
    });
    contentContainer.appendChild(sortTabs.render());

    // Grid de vehículos
    const gridSection = document.createElement('div');
    gridSection.setAttribute('data-vehicles-grid', 'true');
    this._renderVehiclesGrid(gridSection);
    contentContainer.appendChild(gridSection);

    // Paginación
    const totalPages = Math.ceil(this.filteredVehicles.length / this.itemsPerPage);
    const pagination = new Pagination({
      currentPage: this.currentPage,
      totalPages,
      onPageChange: (page) => this._handlePageChange(page)
    });
    const paginationSection = document.createElement('div');
    paginationSection.setAttribute('data-pagination-section', 'true');
    paginationSection.appendChild(pagination.render());
    contentContainer.appendChild(paginationSection);

    mainContainer.appendChild(contentContainer);
    this.container.appendChild(mainContainer);

    // Footer
    const footer = new Footer({
      copyrightYear: new Date().getFullYear(),
      copyrightText: 'TuAutoCom. Todos los derechos reservados.'
    });
    this.container.appendChild(footer.render());

    return this.container;
  }

  /**
   * Renderiza el grid de vehículos según página actual
   * @private
   * @param {HTMLElement} gridContainer
   * 
   * 📝 NOTA: Se establece min-height para mantener consistencia en la paginación
   * Altura calculada: 2 filas × ~400px (aprox altura de card) = 800px mínimo
   */
  _renderVehiclesGrid(gridContainer) {
    gridContainer.innerHTML = '';
    gridContainer.className = 'grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-3 p-4 min-h-[800px]';

    // Calcular vehículos de la página actual
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    const pageVehicles = this.filteredVehicles.slice(startIndex, endIndex);

    if (pageVehicles.length === 0) {
      gridContainer.innerHTML = '<p class="text-[#8ecdb7] text-center col-span-full p-8 min-h-[800px] flex items-center justify-center">No se encontraron vehículos con los filtros seleccionados.</p>';
      return;
    }

    pageVehicles.forEach(vehicle => {
      const card = new VehicleCard(vehicle);
      gridContainer.appendChild(card.render());
    });
  }

  /**
   * Maneja el cambio de página
   * @private
   * @param {number} page
   */
  _handlePageChange(page) {
    this.currentPage = page;
    this._updateCatalogContent();
  }

  /**
   * Maneja la aplicación de filtros
   * @private
   * @param {Object} filters
   */
  _handleFilters(filters) {
    this.currentFilters = filters;
    this.currentPage = 1; // Reset a primera página
    
    // Aplicar filtros a los vehículos
    this.filteredVehicles = this.vehicles.filter(vehicle => {
      // Filtro por marca
      if (filters.brand !== 'all' && vehicle.brand !== filters.brand) {
        return false;
      }
      
      // Filtro por tipo
      if (filters.type !== 'all' && vehicle.category !== filters.type) {
        return false;
      }
      
      // Filtro por año
      if (filters.year !== 'all' && vehicle.year !== parseInt(filters.year, 10)) {
        return false;
      }
      
      // Filtro por precio (rango)
      if (vehicle.price < filters.priceMin || vehicle.price > filters.priceMax) {
        return false;
      }
      
      // Filtro por combustible
      if (filters.fuel !== 'all' && vehicle.fuel !== filters.fuel) {
        return false;
      }
      
      // Filtro por kilometraje (máximo)
      if (vehicle.mileage > filters.mileage) {
        return false;
      }
      
      return true;
    });
    
    this._applySorting();
    this._updateCatalogContent();
  }

  /**
   * Maneja el limpiado de filtros
   * @private
   */
  _handleClearFilters() {
    this.currentFilters = {};
    this.currentPage = 1;
    this.filteredVehicles = [...this.vehicles];
    this._applySorting();
    this._updateCatalogContent();
  }

  /**
   * Maneja el cambio de ordenamiento
   * @private
   * @param {string} sortBy
   */
  _handleSort(sortBy) {
    this.currentSort = sortBy;
    this._applySorting();
    this._updateCatalogContent();
  }

  /**
   * Aplica el ordenamiento actual a los vehículos filtrados
   * @private
   */
  _applySorting() {
    switch (this.currentSort) {
      case 'priceAsc':
        this.filteredVehicles.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        this.filteredVehicles.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        this.filteredVehicles.sort((a, b) => b.year - a.year);
        break;
      case 'popular':
        // Ordenar por badge "Popular" primero, luego por precio
        this.filteredVehicles.sort((a, b) => {
          const aPopular = a.badge?.text === 'Popular' ? 1 : 0;
          const bPopular = b.badge?.text === 'Popular' ? 1 : 0;
          if (bPopular !== aPopular) return bPopular - aPopular;
          return a.price - b.price;
        });
        break;
    }
  }

  /**
   * Actualiza el contenido del catálogo (grid + paginación)
   * @private
   */
  _updateCatalogContent() {
    // Actualizar grid
    const gridContainer = this.container.querySelector('[data-vehicles-grid]');
    if (gridContainer) {
      this._renderVehiclesGrid(gridContainer);
    }

    // Actualizar paginación
    const totalPages = Math.ceil(this.filteredVehicles.length / this.itemsPerPage);
    const paginationSection = this.container.querySelector('[data-pagination-section]');
    if (paginationSection) {
      paginationSection.innerHTML = '';
      const pagination = new Pagination({
        currentPage: this.currentPage,
        totalPages,
        onPageChange: (page) => this._handlePageChange(page)
      });
      paginationSection.appendChild(pagination.render());
    }
  }

  /**
   * Limpia recursos de la vista
   */
  destroy() {
    if (this.container && this.container.remove) {
      this.container.remove();
    }
  }
}
