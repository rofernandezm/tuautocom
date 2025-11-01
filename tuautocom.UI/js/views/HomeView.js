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

export class HomeView {
  constructor() {
    this.container = null;
    this.categories = [];
    this.vehicles = [];
  }

  /**
   * init - carga datos necesarios para la vista (puede ser async)
   * En esta fase usamos datos mock para demo; en integración con backend
   * se reemplazará por llamadas a servicios.
   */
  async init() {
    // Datos mock (temporal)
    this.categories = [
      { id: 'all', label: 'Todos' },
      { id: 'sedan', label: 'Sedán' },
      { id: 'suv', label: 'SUV' },
      { id: 'pickup', label: 'Pick-up' },
      { id: 'electric', label: 'Eléctricos' }
    ];

    this.vehicles = [
      { id: 'v1', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop', title: 'Toyota Camry 2024', description: 'Sedán ejecutivo con tecnología híbrida avanzada', badge: { text: 'Popular' } },
      { id: 'v2', image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&h=300&fit=crop', title: 'Ford Explorer 2024', description: 'SUV espacioso ideal para familias', badge: { text: 'Nuevo' } },
      { id: 'v3', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&h=300&fit=crop', title: 'Tesla Model 3', description: 'Sedán eléctrico con autopilot incluido', badge: { text: 'Eléctrico' } },
      { id: 'v4', image: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=400&h=300&fit=crop', title: 'Honda CR-V 2024', description: 'SUV compacto con excelente economía de combustible' }
    ];

    // Aquí podríamos await vehicleService.getFeatured() en el futuro
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

    // Vehicles grid
    const grid = document.createElement('div');
    grid.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8';
    this.vehicles.forEach(v => {
      const card = new VehicleCard({ ...v, onClick: (data) => alert(`Seleccionaste: ${data.title}`) });
      grid.appendChild(card.render());
    });
    main.appendChild(grid);

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
