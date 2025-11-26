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
import { SearchBar } from '../components/SearchBar.js';
import { vehicleService } from '../services/vehicleService.js';

export class CatalogView {
  constructor() {
    this.container = null;
    this.vehicles = [];
    this.filteredVehicles = [];
    this.currentPage = 1;
    this.itemsPerPage = 6;
    this.totalPages = 1;
    this.totalVehicles = 0;
    this.currentSort = 'priceAsc';
    this.currentFilters = {};
    this.searchQuery = ''; // Búsqueda actual
    // Binding para evento de búsqueda
    this._onSearchInputBound = (event) => this._onSearchInput(event);
  }

  /**
   * Inicializa la vista cargando datos desde backend con paginación
   * @async
   */
  async init() {
    try {
      // Cargar vehículos desde el backend con paginación
      const response = await vehicleService.getAll({
        page: this.currentPage,
        limit: this.itemsPerPage
      });
      
      this.vehicles = response.data;
      this.filteredVehicles = [...this.vehicles];
      this.totalPages = response.pagination.pages;
      this.totalVehicles = response.pagination.total;
      
  // Vehículos cargados: página ${this.currentPage}/${this.totalPages}, total: ${this.totalVehicles}
    } catch (error) {
      console.error('Error al cargar vehículos en CatalogView:', error);
      this.vehicles = [];
      this.filteredVehicles = [];
      this.totalPages = 1;
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

    // Escuchar búsquedas emitidas por Header
    document.addEventListener('search-input', this._onSearchInputBound);

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

    // Barra de búsqueda
    const searchBar = new SearchBar({ placeholder: 'Buscar por marca, modelo...' });
    const searchContainer = document.createElement('div');
    searchContainer.className = 'px-4 mb-4';
    searchContainer.appendChild(searchBar.render());
    
    // Escuchar evento de búsqueda
    searchContainer.addEventListener('search', (e) => this._handleSearch(e.detail.query));
    contentContainer.appendChild(searchContainer);

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

    // Paginación - Usa totalPages desde el backend
    const pagination = new Pagination({
      currentPage: this.currentPage,
      totalPages: this.totalPages,
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
   * Renderiza el grid de vehículos (ya vienen paginados del backend)
   * @private
   * @param {HTMLElement} gridContainer
   */
  _renderVehiclesGrid(gridContainer) {
    gridContainer.innerHTML = '';
    gridContainer.className = 'grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-3 p-4 min-h-[800px]';

    // Los vehículos ya vienen paginados del backend
    const pageVehicles = this.filteredVehicles;

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
   * Maneja el cambio de página - Recarga datos desde backend
   * @private
   * @param {number} page
   */
  async _handlePageChange(page) {
    this.currentPage = page;
    
    try {
      // Recargar vehículos desde backend con nueva página
      const response = await vehicleService.getAll({
        page: this.currentPage,
        limit: this.itemsPerPage
      });
      
      this.vehicles = response.data;
      this.filteredVehicles = [...this.vehicles];
      this.totalPages = response.pagination.pages;
      
  // Página ${page}: ${this.vehicles.length} vehículos cargados
    } catch (error) {
      console.error('Error al cambiar de página:', error);
    }
    
    this._updateCatalogContent();
  }

  /**
   * Maneja la aplicación de filtros - Envía al backend
   * @private
   * @param {Object} filters
   */
  async _handleFilters(filters) {
    this.currentFilters = filters;
    this.currentPage = 1; // Reset a primera página
    
    try {
      // Mapear filtros del frontend al formato del backend
      const backendFilters = {
        page: this.currentPage,
        limit: this.itemsPerPage,
        category: filters.type,
        brand: filters.brand,
        minPrice: filters.priceMin,
        maxPrice: filters.priceMax,
        year: filters.year,
        // fuel y mileage pueden añadirse después
      };
      
  // Aplicando filtros: ${JSON.stringify(backendFilters)}
      
      const response = await vehicleService.getAll(backendFilters);
      
      this.vehicles = response.data;
      this.filteredVehicles = [...this.vehicles];
      this.totalPages = response.pagination.pages;
      this.totalVehicles = response.pagination.total;
      
  // Filtros aplicados: ${this.totalVehicles} resultados
    } catch (error) {
      console.error('Error aplicando filtros:', error);
    }
    
    this._updateCatalogContent();
  }

  /**
   * Maneja el limpiado de filtros - Recarga desde backend sin filtros
   * @private
   */
  async _handleClearFilters() {
    this.currentFilters = {};
    this.currentPage = 1;
    
    try {
      const response = await vehicleService.getAll({
        page: this.currentPage,
        limit: this.itemsPerPage
      });
      
      this.vehicles = response.data;
      this.filteredVehicles = [...this.vehicles];
      this.totalPages = response.pagination.pages;
      this.totalVehicles = response.pagination.total;
      
  // Filtros limpiados, recargados todos los vehículos
    } catch (error) {
      console.error('Error limpiando filtros:', error);
    }
    
    this._updateCatalogContent();
  }

  /**
   * Maneja la búsqueda - Envía query al backend
   * @private
   * @param {string} query - Texto de búsqueda
   */
  async _handleSearch(query) {
    this.searchQuery = query;
    this.currentPage = 1;
    
    try {
      const response = await vehicleService.getAll({
        page: this.currentPage,
        limit: this.itemsPerPage,
        search: query,
        ...this.currentFilters // Mantener filtros activos
      });
      
      this.vehicles = response.data;
      this.filteredVehicles = [...this.vehicles];
      this.totalPages = response.pagination.pages;
      this.totalVehicles = response.pagination.total;
      
  // Búsqueda "${query}": ${this.totalVehicles} resultados
    } catch (error) {
      console.error('Error en búsqueda:', error);
    }
    
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
   * Handler del evento 'search-input' emitido por Header (búsqueda en tiempo real)
   * Filtra vehículos localmente por título y descripción
   * @private
   * @param {CustomEvent} event
   */
  async _onSearchInput(event) {
    try {
      const query = event?.detail?.query || '';
      this.searchQuery = query;
      
      if (!query) {
        // Si no hay query, restaurar vehículos filtrados originales
        this.filteredVehicles = [...this.vehicles];
        this._applySorting();
        this._updateCatalogContent();
        return;
      }

      // Filtrar vehículos por título y descripción
      const q = query.toLowerCase();
      this.filteredVehicles = this.vehicles.filter(v => {
        const title = (v.title || '').toLowerCase();
        const desc = (v.description || '').toLowerCase();
        return title.includes(q) || desc.includes(q);
      });

      // Aplicar ordenamiento
      this._applySorting();
      
      // Resetear a página 1 y actualizar vista
      this.currentPage = 1;
      this._updateCatalogContent();
    } catch (error) {
      console.error('Error al procesar la búsqueda en CatalogView:', error);
    }
  }

  /**
   * Limpia recursos de la vista
   */
  destroy() {
    // Remover listener de búsqueda
    document.removeEventListener('search-input', this._onSearchInputBound);
    
    if (this.container && this.container.remove) {
      this.container.remove();
    }
  }
}
