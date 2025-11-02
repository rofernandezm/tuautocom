/**
 * HomeView
 * Vista principal (Home) que compone los componentes extraídos del diseño Stitch
 * Sigue el patrón View: init() async (carga datos) + render() que devuelve HTMLElement
 */

import { Header } from '../components/Header.js';
import { HeroSection } from '../components/HeroSection.js';
import { CategoryFilters } from '../components/CategoryFilters.js';
import { VehicleCard } from '../components/VehicleCard.js';
import { Footer } from '../components/Footer.js';
import { VehicleCarousel } from '../components/VehicleCarousel.js';
import { vehicleService } from '../services/vehicleService.js';

export class HomeView {
  constructor() {
    this.container = null;
    this.categories = [];
    this.featuredVehicles = [];
    this.cheapestVehicles = [];
    this.mostVisitedVehicles = [];
  }

  /**
   * init - carga datos necesarios para la vista desde vehicleService
   * En esta fase usamos datos mock; en integración con backend
   * se reemplazará por llamadas a servicios reales.
   */
  async init() {
    try {
      this.categories = await vehicleService.getCategories();
      this.featuredVehicles = await vehicleService.getFeatured();
      this.cheapestVehicles = await vehicleService.getCheapest();
      this.mostVisitedVehicles = await vehicleService.getMostVisited();
    } catch (error) {
      console.error('Error loading HomeView data:', error);
      this.categories = [];
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

    // Hero
    const hero = new HeroSection({ title: 'Encuentra tu Auto Ideal', subtitle: 'Explora nuestra selección de vehículos nuevos y seminuevos', backgroundImage: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&h=400&fit=crop' });
    this.container.appendChild(hero.render());

    // Main content container
    const main = document.createElement('div');
    main.className = 'max-w-7xl mx-auto px-5 py-10';

    // Category filters
    const filters = new CategoryFilters({ categories: this.categories, activeCategory: 'all', onChange: (id) => console.log('Filtro:', id) });
    main.appendChild(filters.render());

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
      main.appendChild(featuredSection);
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
      main.appendChild(cheapestSection);
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
      main.appendChild(visitedSection);
    }

    this.container.appendChild(main);

    // Footer
    const footer = new Footer({ copyrightYear: new Date().getFullYear(), copyrightText: 'TuAutoCom. Todos los derechos reservados.' });
    this.container.appendChild(footer.render());

    return this.container;
  }

  /**
   * destroy - limpiar recursos asociados a la vista
   */
  destroy() {
    // Placeholder: remover listeners, timers, etc.
    if (this.container && this.container.remove) this.container.remove();
  }
}
