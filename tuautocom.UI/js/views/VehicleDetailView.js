/**
 * VehicleDetailView
 * Vista de detalle de un vehículo con carrusel de imágenes y especificaciones
 * Implementación del diseño "Ficha Detallada del Vehículo" de Stitch
 * 
 * @class
 * @param {string} vehicleId - ID del vehículo a mostrar
 */

import { Header } from '../components/Header.js';
import { Footer } from '../components/Footer.js';
import { ContactModal } from '../components/ContactModal.js';
import { CommentsSection } from '../components/CommentsSection.js';
import { vehicleService } from '../services/vehicleService.js';

export class VehicleDetailView {
  constructor(vehicleId) {
    this.vehicleId = vehicleId;
    this.vehicle = null;
    this.container = null;
    this.currentImageIndex = 0;
    this.specsExpanded = false; // Estado para toggle de especificaciones
    this.commentsSection = null; // Referencia a CommentsSection
  }

  /**
   * Inicializa la vista cargando datos del vehículo
   * @async
   */
  async init() {
    try {
      this.vehicle = await vehicleService.getById(this.vehicleId);
      if (!this.vehicle) {
        console.error(`Vehículo con ID ${this.vehicleId} no encontrado`);
      } else {
        // Inicializar CommentsSection
        this.commentsSection = new CommentsSection(this.vehicleId);
        await this.commentsSection.init();
      }
    } catch (error) {
      console.error('Error al cargar vehículo:', error);
      this.vehicle = null;
    }
  }

  /**
   * Renderiza la vista completa de detalle
   * @returns {HTMLElement}
   */
  render() {
    this.container = document.createElement('div');
    this.container.className = 'relative flex flex-col min-h-screen w-full bg-primary-dark text-white';

    // Header
    const header = new Header();
    this.container.appendChild(header.render());

    // Contenido principal
    if (!this.vehicle) {
      this._renderError();
    } else {
      this._renderContent();
    }

    // Footer
    const footer = new Footer({
      copyrightYear: new Date().getFullYear(),
      copyrightText: 'TuAutoCom. Todos los derechos reservados.'
    });
    this.container.appendChild(footer.render());

    return this.container;
  }

  /**
   * Renderiza mensaje de error si no se encuentra el vehículo
   * @private
   */
  _renderError() {
    const errorContainer = document.createElement('div');
    errorContainer.className = 'flex flex-1 items-center justify-center px-40 py-16';
    errorContainer.innerHTML = `
      <div class="text-center">
        <h2 class="text-white text-[32px] font-bold leading-tight mb-4">
          Vehículo no encontrado
        </h2>
        <p class="text-[#8ecdb7] text-lg mb-8">
          El vehículo que buscas no está disponible o no existe.
        </p>
        <a
          href="#catalog"
          class="inline-flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-[#019863] text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-[#017a4f] transition-colors"
        >
          Volver al catálogo
        </a>
      </div>
    `;
    this.container.appendChild(errorContainer);
  }

  /**
   * Renderiza el contenido de detalle del vehículo
   * @private
   */
  _renderContent() {
    const mainContainer = document.createElement('div');
    mainContainer.className = 'px-40 flex flex-1 justify-center py-5';

    const contentContainer = document.createElement('div');
    contentContainer.className = 'flex flex-col max-w-[960px] flex-1';

    // Botón volver al listado (mejora UX)
    contentContainer.innerHTML += `
      <div class="px-4 py-3">
        <button 
          data-action="back-to-list" 
          class="inline-flex items-center gap-2 rounded-lg bg-[#214a3c] px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-[#2f6a55] focus:outline-none focus:ring-2 focus:ring-[#8ecdb7] focus:ring-offset-2 transition-all duration-200"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          Volver al catálogo
        </button>
      </div>
    `;

    // Carrusel de imágenes
    contentContainer.appendChild(this._renderImageCarousel());

    // Título y precio
    contentContainer.innerHTML += `
      <h2 class="text-white tracking-light text-[28px] font-bold leading-tight px-4 text-left pb-3 pt-5">
        ${this.vehicle.title}
      </h2>
      <p class="text-primary-light text-sm font-normal leading-normal pb-3 pt-1 px-4">
        Desde $${this.vehicle.price.toLocaleString()}
      </p>
    `;

    // Badges
    if (this.vehicle.badge) {
      const badgesContainer = document.createElement('div');
      badgesContainer.className = 'flex gap-3 p-3 flex-wrap pr-4';
      badgesContainer.innerHTML = `
        <div class="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-primary-medium pl-4 pr-4">
          <p class="text-white text-sm font-medium leading-normal">${this.vehicle.badge.text}</p>
        </div>
      `;
      contentContainer.appendChild(badgesContainer);
    }

    // Descripción completa del vehículo (NUEVO)
    if (this.vehicle.description) {
      const descriptionContainer = document.createElement('div');
      descriptionContainer.className = 'px-4 py-3';
      descriptionContainer.innerHTML = `
        <p class="text-primary-light text-base font-normal leading-normal">
          ${this.vehicle.description}
        </p>
      `;
      contentContainer.appendChild(descriptionContainer);
    }

    // Especificaciones expandibles (MODIFICADO)
    contentContainer.appendChild(this._renderSpecifications());

    // Botón de acción
    const actionContainer = document.createElement('div');
    actionContainer.className = 'flex px-4 py-3 justify-start';
    actionContainer.innerHTML = `
      <button
        class="inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 bg-[#019863] text-white text-sm font-semibold shadow-md hover:bg-[#017a4f] focus:outline-none focus:ring-2 focus:ring-[#019863] focus:ring-offset-2 transition-all duration-200"
        data-action="request-info"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
        <span>Solicitar más información</span>
      </button>
    `;
    contentContainer.appendChild(actionContainer);

    // Sección de comentarios (NUEVO)
    if (this.commentsSection) {
      contentContainer.appendChild(this.commentsSection.render());
    }

    mainContainer.appendChild(contentContainer);
    this.container.appendChild(mainContainer);

    this._attachEventListeners();
  }

  /**
   * Renderiza el carrusel de imágenes con indicadores
   * Implementación simple con fade transitions (más confiable que slide)
   * Solo muestra controles e indicadores si hay más de una imagen
   * @private
   * @returns {HTMLElement}
   */
  _renderImageCarousel() {
    const carouselContainer = document.createElement('div');
    carouselContainer.className = '@container';
    
    // Obtener imágenes del vehículo
    // Si el vehículo tiene un array de imágenes, usarlo. Si no, crear array con imagen única
    if (this.vehicle.images && Array.isArray(this.vehicle.images) && this.vehicle.images.length > 0) {
      this.images = this.vehicle.images;
    } else if (this.vehicle.image) {
      this.images = [this.vehicle.image];
    } else {
      this.images = [];
    }

    const hasMultipleImages = this.images.length > 1;

    carouselContainer.innerHTML = `
      <div class="@[480px]:px-4 @[480px]:py-3">
        <div class="relative bg-primary-dark @[480px]:rounded-lg min-h-80" data-carousel-wrapper>
          <!-- Slides stack - todas las imágenes apiladas, solo una visible -->
          ${this.images.map((img, index) => `
            <div 
              class="absolute inset-0 transition-opacity duration-500 ease-in-out bg-contain bg-center bg-no-repeat"
              style="background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 25%), url('${img}'); opacity: ${index === 0 ? '1' : '0'};"
              data-carousel-item="${index}"
            ></div>
          `).join('')}

          ${hasMultipleImages ? `
            <!-- Controles prev/next (solo si hay múltiples imágenes) -->
            <button 
              data-carousel-prev 
              class="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/40 hover:bg-black/60 transition-colors"
              type="button"
              aria-label="Previous slide"
            >
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <button 
              data-carousel-next 
              class="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/40 hover:bg-black/60 transition-colors"
              type="button"
              aria-label="Next slide"
            >
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>

            <!-- Indicadores (solo si hay múltiples imágenes) -->
            <div class="absolute z-10 flex justify-center gap-2 left-0 right-0 bottom-5" data-carousel-indicators>
              ${this.images.map((_, index) => `
                <button
                  type="button"
                  class="w-3 h-3 rounded-full transition-all duration-300 ${index === 0 ? 'bg-white scale-110' : 'bg-white/50 hover:bg-white/75'}"
                  data-carousel-indicator="${index}"
                  aria-label="Slide ${index + 1}"
                ></button>
              `).join('')}
            </div>
          ` : ''}
        </div>
      </div>
    `;

    return carouselContainer;
  }

  /**
   * Renderiza el grid de especificaciones EXPANDIBLES con Vanilla JS
   * @private
   * @returns {HTMLElement}
   */
  _renderSpecifications() {
    const specsContainer = document.createElement('div');
    specsContainer.innerHTML = `
      <div class="px-4 py-3">
        <!-- Header con botón toggle -->
        <button 
          data-specs-toggle
          class="w-full flex items-center justify-between py-2 cursor-pointer group"
        >
          <h2 class="text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">
            Especificaciones
          </h2>
          <svg 
            data-specs-icon
            class="w-6 h-6 text-primary-light transition-transform duration-300 ${this.specsExpanded ? 'rotate-180' : ''}"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>

        <!-- Grid de especificaciones (colapsable) -->
        <div 
          data-specs-content
          class="grid grid-cols-2 overflow-hidden transition-all duration-300 ${this.specsExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}"
        >
          ${this._renderSpecRow('Marca', this.vehicle.brand?.charAt(0).toUpperCase() + this.vehicle.brand?.slice(1) || 'N/A')}
          ${this._renderSpecRow('Año', this.vehicle.year || 'N/A')}
          ${this._renderSpecRow('Tipo', this._formatType(this.vehicle.category))}
          ${this._renderSpecRow('Combustible', this._formatFuel(this.vehicle.fuel))}
          ${this._renderSpecRow('Kilometraje', `${this.vehicle.mileage.toLocaleString()} km`)}
          ${this._renderSpecRow('Precio', `$${this.vehicle.price.toLocaleString()}`)}
        </div>
      </div>
    `;
    return specsContainer;
  }

  /**
   * Renderiza una fila de especificación
   * @private
   * @param {string} label - Etiqueta
   * @param {string} value - Valor
   * @param {boolean} isLeft - Si es columna izquierda (para borde)
   * @returns {string}
   */
  _renderSpecRow(label, value, isLeft = false) {
    return `
      <div class="flex flex-col gap-1 border-t border-solid border-t-primary-medium py-4 ${isLeft ? 'pr-2' : 'pl-2'}">
        <p class="text-primary-light text-sm font-normal leading-normal">${label}</p>
        <p class="text-white text-sm font-normal leading-normal">${value}</p>
      </div>
    `;
  }

  /**
   * Formatea el tipo de vehículo
   * @private
   * @param {string} type
   * @returns {string}
   */
  _formatType(type) {
    const labels = {
      'sedan': 'Sedán',
      'suv': 'SUV',
      'pickup': 'Pick-up',
      'electric': 'Eléctrico',
      'hatchback': 'Hatchback',
      'coupe': 'Coupé'
    };
    return labels[type] || type;
  }

  /**
   * Formatea el tipo de combustible
   * @private
   * @param {string} fuel
   * @returns {string}
   */
  _formatFuel(fuel) {
    const labels = {
      'gasoline': 'Gasolina',
      'diesel': 'Diésel',
      'hybrid': 'Híbrido',
      'electric': 'Eléctrico'
    };
    return labels[fuel] || fuel;
  }

  /**
   * Adjunta event listeners
   * @private
   */
  _attachEventListeners() {
    // Indicadores del carrusel
    const indicators = this.container.querySelectorAll('[data-carousel-indicator]');
    indicators.forEach(indicator => {
      indicator.addEventListener('click', (e) => {
        const index = parseInt(e.target.getAttribute('data-carousel-indicator'), 10);
        this._changeImage(index);
      });
    });

    // Botón de solicitar información
    const requestBtn = this.container.querySelector('[data-action="request-info"]');
    if (requestBtn) {
      requestBtn.addEventListener('click', () => {
        this._handleRequestInfo();
      });
    }

    // Botones prev / next (solo existen si hay múltiples imágenes)
    const prevBtn = this.container.querySelector('[data-carousel-prev]');
    const nextBtn = this.container.querySelector('[data-carousel-next]');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => this._prevImage());
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => this._nextImage());
    }

    // Botón volver al listado
    const backBtn = this.container.querySelector('[data-action="back-to-list"]');
    if (backBtn) {
      backBtn.addEventListener('click', (e) => {
        // Navegación hash hacia catálogo
        e.preventDefault();
        window.location.hash = '#catalog';
      });
    }

    // Toggle de especificaciones (NUEVO - Vanilla JS, NO Alpine.js)
    const specsToggle = this.container.querySelector('[data-specs-toggle]');
    if (specsToggle) {
      specsToggle.addEventListener('click', () => this._toggleSpecifications());
    }
  }

  /**
   * Cambia la imagen del carrusel con fade transition
   * Implementación simple y confiable usando opacidad
   * @private
   * @param {number} index
   */
  _changeImage(index) {
    if (index === this.currentImageIndex) return;

    const items = this.container.querySelectorAll('[data-carousel-item]');
    const currentItem = items[this.currentImageIndex];
    const nextItem = items[index];

    if (!currentItem || !nextItem) return;

    // Fade out current, fade in next
    currentItem.style.opacity = '0';
    nextItem.style.opacity = '1';

    this.currentImageIndex = index;

    // Actualizar indicadores
    const indicators = this.container.querySelectorAll('[data-carousel-indicator]');
    indicators.forEach((indicator, i) => {
      if (i === index) {
        indicator.classList.remove('bg-white/50', 'hover:bg-white/75');
        indicator.classList.add('bg-white', 'scale-110');
      } else {
        indicator.classList.remove('bg-white', 'scale-110');
        indicator.classList.add('bg-white/50', 'hover:bg-white/75');
      }
    });
  }

  /**
   * Muestra la imagen anterior en el carrusel
   * @private
   */
  _prevImage() {
    const len = (this.images && this.images.length) || 1;
    const newIndex = (this.currentImageIndex - 1 + len) % len;
    this._changeImage(newIndex);
  }

  /**
   * Muestra la siguiente imagen en el carrusel
   * @private
   */
  _nextImage() {
    const len = (this.images && this.images.length) || 1;
    const newIndex = (this.currentImageIndex + 1) % len;
    this._changeImage(newIndex);
  }

  /**
   * Maneja la solicitud de información
   * @private
   */
    /**
   * Toggle del estado expandido/colapsado de especificaciones
   * Implementación con Vanilla JS (NO Alpine.js)
   * @private
   */
  _toggleSpecifications() {
    this.specsExpanded = !this.specsExpanded;
    
    const content = this.container.querySelector('[data-specs-content]');
    const icon = this.container.querySelector('[data-specs-icon]');
    
    if (!content || !icon) return;

    if (this.specsExpanded) {
      // Expandir
      content.classList.remove('max-h-0', 'opacity-0');
      content.classList.add('max-h-96', 'opacity-100');
      icon.classList.add('rotate-180');
    } else {
      // Colapsar
      content.classList.remove('max-h-96', 'opacity-100');
      content.classList.add('max-h-0', 'opacity-0');
      icon.classList.remove('rotate-180');
    }
  }

  /**
   * Maneja el click en el botón "Solicitar más información"
   * Abre el modal de contacto con la información del vehículo
   * @private
   */
  _handleRequestInfo() {
  // Abriendo modal de contacto para vehicle id: {{this.vehicle.id}}
    
    const modal = new ContactModal({
      vehicle: this.vehicle,
      onClose: () => {
        // Modal cerrado
      },
      onSubmit: (data) => {
        // Formulario enviado (data): handled by onSubmit callback
        // TODO: En integración con backend, enviar a API
      }
    });

    // Renderizar y agregar al body
    document.body.appendChild(modal.render());
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
