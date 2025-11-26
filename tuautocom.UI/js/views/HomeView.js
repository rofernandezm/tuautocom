/**
 * HomeView
 * Vista principal (Home) que compone los componentes extraídos del diseño Stitch
 * Sigue el patrón View: init() async (carga datos) + render() que devuelve HTMLElement
 */

import { Header } from '../components/Header.js';
import { HeroSection } from '../components/HeroSection.js';
import { VehicleCard } from '../components/VehicleCard.js';
import { Footer } from '../components/Footer.js';
import { VehicleCarousel } from '../components/VehicleCarousel.js';
import { vehicleService } from '../services/vehicleService.js';

export class HomeView {
  constructor() {
    this.container = null;
    this.featuredVehicles = [];
    this.cheapestVehicles = [];
    this.mostVisitedVehicles = [];
    // Elementos y bindings para búsqueda
    this._searchResultsSection = null;
    this._onSearchInputBound = (event) => this._onSearchInput(event);
    // Contenedor para contenido dinámico (carousels/grids)
    this._contentContainer = null;
  }

  /**
   * init - carga datos necesarios para la vista desde vehicleService
   * En esta fase usamos datos mock; en integración con backend
   * se reemplazará por llamadas a servicios reales.
   */
  async init() {
    try {
      this.featuredVehicles = await vehicleService.getFeatured();
      this.cheapestVehicles = await vehicleService.getCheapest();
      this.mostVisitedVehicles = await vehicleService.getMostVisited();
    } catch (error) {
      // Mensaje en español según AGENT.md
      console.error('Error al cargar los datos de HomeView:', error);
      this.featuredVehicles = [];
      this.cheapestVehicles = [];
      this.mostVisitedVehicles = [];
    }
  }

  /**
   * render - construye y retorna el HTMLElement de la vista
   * @returns {HTMLElement}
   */
  render() {
    this.container = document.createElement('div');
    this.container.className = 'relative flex flex-col min-h-screen w-full bg-primary-dark text-white';

    // Header
    const header = new Header({ logo: 'TuAutoCom', links: [ { label: 'Inicio', url: '#' }, { label: 'Catálogo', url: '#' }, { label: 'Contacto', url: '#' } ] });
    this.container.appendChild(header.render());

    // Escuchar búsquedas emitidas por Header
    // El Header emite un CustomEvent 'search-input' en document para búsqueda en tiempo real
    document.addEventListener('search-input', this._onSearchInputBound);

    // Hero
    const hero = new HeroSection({ title: 'Encuentra tu Auto Ideal', subtitle: 'Explora nuestra selección de vehículos nuevos y seminuevos', backgroundImage: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&h=400&fit=crop' });
    this.container.appendChild(hero.render());

    // Main content container
    const main = document.createElement('div');
    main.className = 'w-full max-w-7xl mx-auto px-5 py-10';

    // Crear contenedor para contenido dinámico (carousels/grids)
    this._contentContainer = document.createElement('div');
    this._contentContainer.className = 'w-full';
    main.appendChild(this._contentContainer);

    // Renderizar carousels iniciales
    this._renderCarousels(this._contentContainer);

    this.container.appendChild(main);

    // Footer
    const footer = new Footer({ copyrightYear: new Date().getFullYear(), copyrightText: 'TuAutoCom. Todos los derechos reservados.' });
    this.container.appendChild(footer.render());

    return this.container;
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
        // Si no hay query, ocultar sección de resultados
        if (this._searchResultsSection) {
          this._searchResultsSection.remove();
          this._searchResultsSection = null;
        }
        return;
      }

      // Obtener todos los vehículos y filtrar por título/descripcion
      const response = await vehicleService.getAll();
      const all = response.data || [];
      const q = query.toLowerCase();
      const results = all.filter(v => {
        const title = (v.title || '').toLowerCase();
        const desc = (v.description || '').toLowerCase();
        return title.includes(q) || desc.includes(q);
      });

      this._renderSearchResults(results, query);
    } catch (error) {
      // Mensaje en español según AGENT.md
      console.error('Error al procesar la búsqueda en tiempo real en HomeView:', error);
    }
  }

  /**
   * Renderiza o actualiza la sección de resultados de búsqueda
   * @private
   * @param {Array<Object>} results
   * @param {string} query
   */
  _renderSearchResults(results = [], query = '') {
    // Si ya existe una sección previa, removerla
    if (this._searchResultsSection && this._searchResultsSection.remove) {
      this._searchResultsSection.remove();
      this._searchResultsSection = null;
    }

    const section = document.createElement('section');
    section.className = 'my-6';

    const title = document.createElement('h3');
    title.className = 'text-xl font-bold mb-3';
    title.textContent = `Resultados para "${query}" (${results.length})`;
    section.appendChild(title);

    if (!results.length) {
      const empty = document.createElement('p');
      empty.className = 'text-sm text-primary-light';
      empty.textContent = 'No se encontraron vehículos que coincidan con la búsqueda.';
      section.appendChild(empty);
    } else {
      const grid = document.createElement('div');
      grid.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4';

      results.forEach(v => {
        const card = new VehicleCard(v);
        grid.appendChild(card.render());
      });

      section.appendChild(grid);
    }

    // Insertar la sección de resultados en el contenedor de contenido dinámico
    if (this._contentContainer) {
      this._contentContainer.innerHTML = '';  // Limpiar contenido anterior
      this._contentContainer.appendChild(section);
      this._searchResultsSection = section;
    }
  }

  /**
   * Renderiza los carousels normales (featured, cheapest, mostVisited)
   * @private
   * @param {HTMLElement} container
   */
  _renderCarousels(container) {
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Sección 1: Más vistos (carrusel)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    if (this.featuredVehicles.length > 0) {
      const featuredSection = document.createElement('section');
      featuredSection.className = 'my-6';
      const featuredTitle = document.createElement('h3');
      featuredTitle.className = 'text-xl font-bold mb-3';
      featuredTitle.textContent = 'Más vistos';
      featuredSection.appendChild(featuredTitle);
      const featuredCarousel = new VehicleCarousel({ items: this.featuredVehicles });
      featuredSection.appendChild(featuredCarousel.render());
      container.appendChild(featuredSection);
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Sección 2: Más baratos (carrusel)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    if (this.cheapestVehicles.length > 0) {
      const cheapestSection = document.createElement('section');
      cheapestSection.className = 'my-6';
      const cheapestTitle = document.createElement('h3');
      cheapestTitle.className = 'text-xl font-bold mb-3';
      cheapestTitle.textContent = 'Más baratos';
      cheapestSection.appendChild(cheapestTitle);
      const cheapestCarousel = new VehicleCarousel({ items: this.cheapestVehicles });
      cheapestSection.appendChild(cheapestCarousel.render());
      container.appendChild(cheapestSection);
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Sección 3: Más visitados (carrusel)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    if (this.mostVisitedVehicles.length > 0) {
      const visitedSection = document.createElement('section');
      visitedSection.className = 'my-6';
      const visitedTitle = document.createElement('h3');
      visitedTitle.className = 'text-xl font-bold mb-3';
      visitedTitle.textContent = 'Más visitados';
      visitedSection.appendChild(visitedTitle);
      const visitedCarousel = new VehicleCarousel({ items: this.mostVisitedVehicles });
      visitedSection.appendChild(visitedCarousel.render());
      container.appendChild(visitedSection);
    }
  }

  /**
   * destroy - limpiar recursos asociados a la vista
   */
  destroy() {
    // Remover listener de búsqueda en tiempo real
    document.removeEventListener('search-input', this._onSearchInputBound);

    if (this.container && this.container.remove) this.container.remove();
  }
}
