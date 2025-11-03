/**
 * ContactModal Component
 * Modal para consultar sobre un vehículo con formulario de contacto
 * Implementación del diseño "Modal Consultar Vehículo" de Stitch
 * 
 * @class
 * @param {Object} vehicleData - Datos del vehículo a consultar
 * @param {Function} onClose - Callback al cerrar el modal
 * @param {Function} onSubmit - Callback al enviar el formulario
 */

export class ContactModal {
  constructor(options = {}) {
    this.vehicle = options.vehicle || {};
    this.onClose = options.onClose || (() => {});
    this.onSubmit = options.onSubmit || (() => {});
    this.container = null;
    this.currentImageIndex = 0;
    
    // Obtener imágenes del vehículo (igual que VehicleDetailView)
    if (this.vehicle.images && Array.isArray(this.vehicle.images) && this.vehicle.images.length > 0) {
      this.images = this.vehicle.images;
    } else if (this.vehicle.image) {
      this.images = [this.vehicle.image];
    } else {
      this.images = [];
    }
  }

  /**
   * Renderiza el modal completo
   * @returns {HTMLElement}
   */
  render() {
    this.container = document.createElement('div');
    this.container.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm';
    this.container.setAttribute('data-modal', 'contact');

    this.container.innerHTML = `
      <div class="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-[#10231c] rounded-lg shadow-2xl m-4">
        <!-- Botón cerrar (X) -->
        <button 
          data-action="close-modal"
          class="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/40 hover:bg-black/60 transition-colors"
          aria-label="Cerrar modal"
        >
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>

        <div class="flex flex-col py-5">
          <!-- Carrusel de imágenes -->
          ${this._renderImageCarousel()}

          <!-- Título y precio -->
          <h1 class="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 text-left pb-3 pt-5">
            ${this.vehicle.title || 'Vehículo'}
          </h1>
          <p class="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
            $${(this.vehicle.price || 0).toLocaleString()}
          </p>

          <!-- Especificaciones -->
          <h3 class="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
            Especificaciones
          </h3>
          ${this._renderSpecifications()}

          <!-- Formulario de contacto -->
          <h3 class="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
            Contacto
          </h3>
          <form data-contact-form>
            <div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label class="flex flex-col min-w-40 flex-1">
                <p class="text-white text-base font-medium leading-normal pb-2">Nombre</p>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Tu nombre"
                  class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#2f6a55] bg-[#17352b] focus:border-[#8ecdb7] h-14 placeholder:text-[#8ecdb7] p-[15px] text-base font-normal leading-normal transition-colors"
                />
              </label>
            </div>
            <div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label class="flex flex-col min-w-40 flex-1">
                <p class="text-white text-base font-medium leading-normal pb-2">Email</p>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="tu@email.com"
                  class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#2f6a55] bg-[#17352b] focus:border-[#8ecdb7] h-14 placeholder:text-[#8ecdb7] p-[15px] text-base font-normal leading-normal transition-colors"
                />
              </label>
            </div>
            <div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label class="flex flex-col min-w-40 flex-1">
                <p class="text-white text-base font-medium leading-normal pb-2">Teléfono</p>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="Tu teléfono"
                  class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#2f6a55] bg-[#17352b] focus:border-[#8ecdb7] h-14 placeholder:text-[#8ecdb7] p-[15px] text-base font-normal leading-normal transition-colors"
                />
              </label>
            </div>
            <div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label class="flex flex-col min-w-40 flex-1">
                <p class="text-white text-base font-medium leading-normal pb-2">Mensaje</p>
                <textarea
                  name="message"
                  required
                  placeholder="Tu mensaje"
                  class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#2f6a55] bg-[#17352b] focus:border-[#8ecdb7] min-h-36 placeholder:text-[#8ecdb7] p-[15px] text-base font-normal leading-normal transition-colors"
                ></textarea>
              </label>
            </div>

            <!-- Botones -->
            <div class="flex justify-stretch">
              <div class="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-between">
                <button
                  type="submit"
                  class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#019863] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#017a4f] transition-colors"
                >
                  <span class="truncate">Enviar</span>
                </button>
                <button
                  type="button"
                  data-action="close-modal"
                  class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#214a3c] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#2f6a55] transition-colors"
                >
                  <span class="truncate">Cerrar</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    `;

    this._attachEventListeners();
    return this.container;
  }

  /**
   * Renderiza el carrusel de imágenes (versión mini para modal)
   * @private
   * @returns {string}
   */
  _renderImageCarousel() {
    if (!this.images || this.images.length === 0) {
      return '';
    }

    const hasMultipleImages = this.images.length > 1;

    return `
      <div class="@container">
        <div class="@[480px]:px-4 @[480px]:py-3">
          <div class="relative bg-[#10231c] @[480px]:rounded-lg min-h-[218px]" data-carousel-wrapper>
            <!-- Slides stack -->
            ${this.images.map((img, index) => `
              <div 
                class="absolute inset-0 transition-opacity duration-500 ease-in-out bg-contain bg-center bg-no-repeat"
                style="background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 25%), url('${img}'); opacity: ${index === 0 ? '1' : '0'};"
                data-carousel-item="${index}"
              ></div>
            `).join('')}

            ${hasMultipleImages ? `
              <!-- Indicadores (solo si hay múltiples imágenes) -->
              <div class="absolute z-10 flex justify-center gap-2 left-0 right-0 bottom-5" data-carousel-indicators>
                ${this.images.map((_, index) => `
                  <button
                    type="button"
                    class="w-2 h-2 rounded-full transition-all duration-300 ${index === 0 ? 'bg-white scale-110' : 'bg-white/50 hover:bg-white/75'}"
                    data-carousel-indicator="${index}"
                    aria-label="Slide ${index + 1}"
                  ></button>
                `).join('')}
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Renderiza el grid de especificaciones
   * @private
   * @returns {string}
   */
  _renderSpecifications() {
    return `
      <div class="p-4 grid grid-cols-2">
        ${this._renderSpecRow('Marca', this.vehicle.brand?.charAt(0).toUpperCase() + this.vehicle.brand?.slice(1) || 'N/A', true)}
        ${this._renderSpecRow('Año', this.vehicle.year || 'N/A')}
        ${this._renderSpecRow('Tipo', this._formatType(this.vehicle.category), true)}
        ${this._renderSpecRow('Combustible', this._formatFuel(this.vehicle.fuel))}
        ${this._renderSpecRow('Kilometraje', `${(this.vehicle.mileage || 0).toLocaleString()} km`, true)}
        ${this._renderSpecRow('Precio', `$${(this.vehicle.price || 0).toLocaleString()}`)}
      </div>
    `;
  }

  /**
   * Renderiza una fila de especificación
   * @private
   * @param {string} label
   * @param {string} value
   * @param {boolean} isLeft - Si es columna izquierda
   * @returns {string}
   */
  _renderSpecRow(label, value, isLeft = false) {
    return `
      <div class="flex flex-col gap-1 border-t border-solid border-t-[#2f6a55] py-4 ${isLeft ? 'pr-2' : 'pl-2'}">
        <p class="text-[#8ecdb7] text-sm font-normal leading-normal">${label}</p>
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
    return labels[type] || type || 'N/A';
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
    return labels[fuel] || fuel || 'N/A';
  }

  /**
   * Adjunta event listeners
   * @private
   */
  _attachEventListeners() {
    // Cerrar modal (backdrop + botones)
    this.container.addEventListener('click', (e) => {
      // Cerrar si click en backdrop (fondo oscuro)
      if (e.target === this.container) {
        this.close();
      }
    });

    // Botones cerrar
    const closeButtons = this.container.querySelectorAll('[data-action="close-modal"]');
    closeButtons.forEach(btn => {
      btn.addEventListener('click', () => this.close());
    });

    // Indicadores del carrusel
    const indicators = this.container.querySelectorAll('[data-carousel-indicator]');
    indicators.forEach(indicator => {
      indicator.addEventListener('click', (e) => {
        const index = parseInt(e.target.getAttribute('data-carousel-indicator'), 10);
        this._changeImage(index);
      });
    });

    // Submit del formulario
    const form = this.container.querySelector('[data-contact-form]');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this._handleSubmit(form);
      });
    }

    // ESC key para cerrar
    this._escKeyHandler = (e) => {
      if (e.key === 'Escape') {
        this.close();
      }
    };
    document.addEventListener('keydown', this._escKeyHandler);
  }

  /**
   * Cambia la imagen del carrusel
   * @private
   * @param {number} index
   */
  _changeImage(index) {
    if (index === this.currentImageIndex || !this.images || this.images.length === 0) return;

    const items = this.container.querySelectorAll('[data-carousel-item]');
    const currentItem = items[this.currentImageIndex];
    const nextItem = items[index];

    if (!currentItem || !nextItem) return;

    // Fade transition
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
   * Maneja el envío del formulario
   * @private
   * @param {HTMLFormElement} form
   */
  _handleSubmit(form) {
    const formData = new FormData(form);
    const data = {
      vehicle: {
        id: this.vehicle.id,
        title: this.vehicle.title,
        price: this.vehicle.price
      },
      contact: {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        message: formData.get('message')
      }
    };

    console.log('📧 Formulario enviado:', data);
    
    // Callback
    this.onSubmit(data);

    // Cerrar modal después de enviar
    this.close();

    // TODO: En integración con backend, enviar a API
    alert(`Gracias ${data.contact.name}!\n\nTu consulta sobre "${data.vehicle.title}" ha sido enviada.\nTe contactaremos pronto.`);
  }

  /**
   * Cierra el modal
   */
  close() {
    // Remover listener ESC
    if (this._escKeyHandler) {
      document.removeEventListener('keydown', this._escKeyHandler);
    }

    // Callback
    this.onClose();

    // Remover del DOM
    if (this.container && this.container.remove) {
      this.container.remove();
    }
  }

  /**
   * Destruye el modal
   */
  destroy() {
    this.close();
  }
}
