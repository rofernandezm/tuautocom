/**
 * FilterSidebar Component
 * Panel lateral con filtros avanzados para catálogo de vehículos
 * 
 * 📝 NOTA EDUCATIVA:
 * Los filtros son dinámicos - se extraen de los datos de vehículos del servicio.
 * Esto simula cómo MongoDB permitiría obtener valores únicos con aggregation pipeline.
 * 
 * @class
 * @param {Object} options - Opciones de configuración
 * @param {Array} options.vehicles - Array de vehículos para extraer valores de filtros
 * @param {Function} options.onApply - Callback cuando se aplican los filtros
 * @param {Function} options.onClear - Callback cuando se limpian los filtros
 * 
 * @example
 * const filters = new FilterSidebar({
 *   vehicles: vehicleService.getAll(),
 *   onApply: (filters) => console.log('Aplicar:', filters),
 *   onClear: () => console.log('Limpiar')
 * });
 */
export class FilterSidebar {
  constructor(options = {}) {
    this.vehicles = options.vehicles || [];
    this.onApply = options.onApply || (() => {});
    this.onClear = options.onClear || (() => {});
    
    // Extraer valores únicos de los vehículos para los filtros
    // 📝 NOTA: Esto simula una query de MongoDB como: db.vehicles.distinct('brand')
    this.filterOptions = this._extractFilterOptions();
    
    // Estado interno de filtros
    this.filters = {
      brand: 'all',
      year: 'all',
      priceMin: this.filterOptions.priceRange.min,
      priceMax: this.filterOptions.priceRange.max,
      type: 'all',
      fuel: 'all',
      mileage: this.filterOptions.mileageRange.max
    };
  }

  /**
   * Extrae valores únicos de los vehículos para construir opciones de filtros
   * @private
   * @returns {Object} Objeto con arrays de opciones para cada filtro
   * 
   * 📝 NOTA EDUCATIVA: MongoDB Equivalent
   * En MongoDB, esto sería similar a:
   * - db.vehicles.distinct('brand')
   * - db.vehicles.aggregate([{ $group: { _id: null, maxPrice: { $max: '$price' }}}])
   */
  _extractFilterOptions() {
    if (this.vehicles.length === 0) {
      return {
        brands: [],
        years: [],
        types: [],
        fuels: [],
        priceRange: { min: 10000, max: 100000 },
        mileageRange: { min: 0, max: 100000 }
      };
    }

    // Extraer valores únicos usando Set (elimina duplicados)
    const brands = [...new Set(this.vehicles.map(v => v.brand))].sort();
    const years = [...new Set(this.vehicles.map(v => v.year))].sort((a, b) => b - a); // Más reciente primero
    const types = [...new Set(this.vehicles.map(v => v.category))].sort();
    const fuels = [...new Set(this.vehicles.map(v => v.fuel))].sort();
    
    // Calcular rangos de precio y kilometraje
    const prices = this.vehicles.map(v => v.price);
    const mileages = this.vehicles.map(v => v.mileage);
    
    const priceRange = {
      min: Math.min(...prices),
      max: Math.max(...prices)
    };
    
    const mileageRange = {
      min: Math.min(...mileages),
      max: Math.max(...mileages)
    };

    return { brands, years, types, fuels, priceRange, mileageRange };
  }

  /**
   * Renderiza el panel de filtros laterales
   * @returns {HTMLElement}
   */
  render() {
    const container = document.createElement('div');
    container.className = 'flex flex-col w-80 bg-[#10231c]';
    
    container.innerHTML = `
      <h2 class="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        Filtros
      </h2>
      
      <!-- Filtro: Marca -->
      <div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label class="flex flex-col min-w-40 flex-1">
          <p class="text-white text-base font-medium leading-normal pb-2">Marca</p>
          <select 
            class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#2f6a55] bg-[#17352b] focus:border-[#2f6a55] h-14 placeholder:text-[#8ecdb7] p-[15px] pr-10 text-base font-normal leading-normal"
            data-filter="brand"
          >
            <option value="all">Todas las marcas</option>
            ${this.filterOptions.brands.map(brand => `
              <option value="${brand}">${brand.charAt(0).toUpperCase() + brand.slice(1)}</option>
            `).join('')}
          </select>
        </label>
      </div>
      
      <!-- Filtro: Año -->
      <div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label class="flex flex-col min-w-40 flex-1">
          <p class="text-white text-base font-medium leading-normal pb-2">Año</p>
          <select 
            class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#2f6a55] bg-[#17352b] focus:border-[#2f6a55] h-14 placeholder:text-[#8ecdb7] p-[15px] pr-10 text-base font-normal leading-normal"
            data-filter="year"
          >
            <option value="all">Todos los años</option>
            ${this.filterOptions.years.map(year => `
              <option value="${year}">${year}</option>
            `).join('')}
          </select>
        </label>
      </div>
      
      <!-- Filtro: Rango de precios -->
      <div class="relative flex w-full flex-col items-start justify-between gap-3 p-4">
        <p class="text-white text-base font-medium leading-normal w-full">Rango de precios</p>
        
        <!-- Inputs de rango de precio -->
        <div class="flex gap-2 w-full">
          <input 
            type="number" 
            placeholder="Min"
            min="${this.filterOptions.priceRange.min}"
            max="${this.filterOptions.priceRange.max}"
            step="1000"
            value="${this.filterOptions.priceRange.min}"
            data-filter="priceMin"
            class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#2f6a55] bg-[#17352b] focus:border-[#2f6a55] h-10 placeholder:text-[#8ecdb7] px-3 text-sm font-normal leading-normal"
          />
          <input 
            type="number" 
            placeholder="Max"
            min="${this.filterOptions.priceRange.min}"
            max="${this.filterOptions.priceRange.max}"
            step="1000"
            value="${this.filterOptions.priceRange.max}"
            data-filter="priceMax"
            class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#2f6a55] bg-[#17352b] focus:border-[#2f6a55] h-10 placeholder:text-[#8ecdb7] px-3 text-sm font-normal leading-normal"
          />
        </div>
        
        <!-- Visualización del rango -->
        <div class="flex justify-between w-full text-[#8ecdb7] text-xs">
          <span>$${this.filterOptions.priceRange.min.toLocaleString()}</span>
          <span>$${this.filterOptions.priceRange.max.toLocaleString()}</span>
        </div>
      </div>
      
      <!-- Filtro: Tipo de vehículo -->
      <div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label class="flex flex-col min-w-40 flex-1">
          <p class="text-white text-base font-medium leading-normal pb-2">Tipo de vehículo</p>
          <select 
            class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#2f6a55] bg-[#17352b] focus:border-[#2f6a55] h-14 placeholder:text-[#8ecdb7] p-[15px] pr-10 text-base font-normal leading-normal"
            data-filter="type"
          >
            <option value="all">Todos los tipos</option>
            ${this.filterOptions.types.map(type => `
              <option value="${type}">${this._formatTypeLabel(type)}</option>
            `).join('')}
          </select>
        </label>
      </div>
      
      <!-- Filtro: Combustible -->
      <div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label class="flex flex-col min-w-40 flex-1">
          <p class="text-white text-base font-medium leading-normal pb-2">Combustible</p>
          <select 
            class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#2f6a55] bg-[#17352b] focus:border-[#2f6a55] h-14 placeholder:text-[#8ecdb7] p-[15px] pr-10 text-base font-normal leading-normal"
            data-filter="fuel"
          >
            <option value="all">Todos los combustibles</option>
            ${this.filterOptions.fuels.map(fuel => `
              <option value="${fuel}">${this._formatFuelLabel(fuel)}</option>
            `).join('')}
          </select>
        </label>
      </div>
      
      <!-- Filtro: Kilometraje -->
      <div class="relative flex w-full flex-col items-start justify-between gap-3 p-4">
        <div class="flex w-full items-center justify-between">
          <p class="text-white text-base font-medium leading-normal">Kilometraje máximo</p>
          <p class="text-white text-sm font-normal leading-normal" data-mileage-value>${this.filterOptions.mileageRange.max.toLocaleString()} km</p>
        </div>
        
        <!-- Input de rango para kilometraje -->
        <input 
          type="range" 
          min="${this.filterOptions.mileageRange.min}"
          max="${this.filterOptions.mileageRange.max}"
          step="5000"
          value="${this.filterOptions.mileageRange.max}"
          data-filter="mileage"
          class="w-full h-2 bg-[#2f6a55] rounded-lg appearance-none cursor-pointer slider"
          style="accent-color: #019863;"
        />
      </div>
      
      <!-- Botones de acción -->
      <div class="flex justify-stretch">
        <div class="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-between">
          <button
            class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#214a3c] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#2a5c4a] transition-colors"
            data-action="clear"
          >
            <span class="truncate">Borrar filtros</span>
          </button>
          <button
            class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#019863] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#017a4f] transition-colors"
            data-action="apply"
          >
            <span class="truncate">Aplicar</span>
          </button>
        </div>
      </div>
    `;
    
    this._attachEventListeners(container);
    return container;
  }

  /**
   * Adjunta event listeners a los controles del sidebar
   * @private
   * @param {HTMLElement} element
   */
  _attachEventListeners(element) {
    // Listeners para selects
    const selects = element.querySelectorAll('select[data-filter]');
    selects.forEach(select => {
      select.addEventListener('change', (e) => {
        const filterName = e.target.getAttribute('data-filter');
        this.filters[filterName] = e.target.value;
      });
    });
    
    // Listeners para inputs de precio
    const priceMinInput = element.querySelector('[data-filter="priceMin"]');
    const priceMaxInput = element.querySelector('[data-filter="priceMax"]');
    
    if (priceMinInput) {
      priceMinInput.addEventListener('input', (e) => {
        this.filters.priceMin = parseInt(e.target.value) || 10000;
      });
    }
    
    if (priceMaxInput) {
      priceMaxInput.addEventListener('input', (e) => {
        this.filters.priceMax = parseInt(e.target.value) || 100000;
      });
    }
    
    // Listener para slider de kilometraje
    const mileageSlider = element.querySelector('[data-filter="mileage"]');
    const mileageDisplay = element.querySelector('[data-mileage-value]');
    
    if (mileageSlider) {
      mileageSlider.addEventListener('input', (e) => {
        const value = parseInt(e.target.value);
        this.filters.mileage = value;
        
        // Actualizar texto mostrado
        if (mileageDisplay) {
          mileageDisplay.textContent = `${value.toLocaleString()} km`;
        }
      });
    }
    
    // Listener para botón "Borrar filtros"
    const clearBtn = element.querySelector('[data-action="clear"]');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        this._resetFilters(element);
        this.onClear();
      });
    }
    
    // Listener para botón "Aplicar"
    const applyBtn = element.querySelector('[data-action="apply"]');
    if (applyBtn) {
      applyBtn.addEventListener('click', () => {
        this.onApply(this.filters);
      });
    }
  }

  /**
   * Resetea todos los filtros a sus valores por defecto
   * @private
   * @param {HTMLElement} element
   */
  _resetFilters(element) {
    // Reset estado interno usando valores dinámicos
    this.filters = {
      brand: 'all',
      year: 'all',
      priceMin: this.filterOptions.priceRange.min,
      priceMax: this.filterOptions.priceRange.max,
      type: 'all',
      fuel: 'all',
      mileage: this.filterOptions.mileageRange.max
    };
    
    // Reset selects en el DOM
    const selects = element.querySelectorAll('select[data-filter]');
    selects.forEach(select => {
      select.value = 'all';
    });
    
    // Reset inputs de precio
    const priceMinInput = element.querySelector('[data-filter="priceMin"]');
    const priceMaxInput = element.querySelector('[data-filter="priceMax"]');
    if (priceMinInput) priceMinInput.value = this.filterOptions.priceRange.min;
    if (priceMaxInput) priceMaxInput.value = this.filterOptions.priceRange.max;
    
    // Reset slider de kilometraje
    const mileageSlider = element.querySelector('[data-filter="mileage"]');
    const mileageDisplay = element.querySelector('[data-mileage-value]');
    if (mileageSlider) mileageSlider.value = this.filterOptions.mileageRange.max;
    if (mileageDisplay) mileageDisplay.textContent = `${this.filterOptions.mileageRange.max.toLocaleString()} km`;
  }

  /**
   * Formatea el label de tipo de vehículo
   * @private
   * @param {string} type
   * @returns {string}
   */
  _formatTypeLabel(type) {
    const labels = {
      'sedan': 'Sedán',
      'suv': 'SUV',
      'pickup': 'Pick-up',
      'electric': 'Eléctrico',
      'hatchback': 'Hatchback',
      'coupe': 'Coupé'
    };
    return labels[type] || type.charAt(0).toUpperCase() + type.slice(1);
  }

  /**
   * Formatea el label de combustible
   * @private
   * @param {string} fuel
   * @returns {string}
   */
  _formatFuelLabel(fuel) {
    const labels = {
      'gasoline': 'Gasolina',
      'diesel': 'Diésel',
      'hybrid': 'Híbrido',
      'electric': 'Eléctrico'
    };
    return labels[fuel] || fuel.charAt(0).toUpperCase() + fuel.slice(1);
  }
}
