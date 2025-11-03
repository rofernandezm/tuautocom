/**
 * SortTabs Component
 * Tabs para ordenamiento de catálogo de vehículos
 * 
 * @class
 * @param {Object} options - Opciones de configuración
 * @param {Function} options.onSort - Callback cuando se selecciona un ordenamiento
 * 
 * @example
 * const sortTabs = new SortTabs({
 *   onSort: (sortBy) => console.log('Ordenar por:', sortBy)
 * });
 */
export class SortTabs {
  constructor(options = {}) {
    this.onSort = options.onSort || (() => {});
    this.activeSort = 'priceAsc'; // Por defecto
    
    this.sortOptions = [
      { id: 'priceAsc', label: 'Precio (ascendente)' },
      { id: 'priceDesc', label: 'Precio (descendente)' },
      { id: 'newest', label: 'Más recientes' },
      { id: 'popular', label: 'Más populares' }
    ];
  }

  /**
   * Renderiza los tabs de ordenamiento
   * @returns {HTMLElement}
   */
  render() {
    const container = document.createElement('div');
    container.className = 'flex flex-col';
    
    container.innerHTML = `
      <h3 class="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
        Ordenar por
      </h3>
      <div class="flex gap-3 p-3 flex-wrap pr-4" data-tabs-container>
        ${this.sortOptions.map(option => `
          <div 
            class="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg pl-4 pr-4 cursor-pointer transition-all duration-200 ${
              option.id === this.activeSort 
                ? 'bg-[#8ecdb7] text-[#10231c]' 
                : 'bg-[#214a3c] text-white hover:bg-[#2a5c4a]'
            }"
            data-sort-id="${option.id}"
          >
            <p class="text-sm font-medium leading-normal">${option.label}</p>
          </div>
        `).join('')}
      </div>
    `;
    
    this._attachEventListeners(container);
    return container;
  }

  /**
   * Adjunta event listeners a los tabs
   * @private
   * @param {HTMLElement} element
   */
  _attachEventListeners(element) {
    const tabsContainer = element.querySelector('[data-tabs-container]');
    if (!tabsContainer) return;
    
    const tabs = tabsContainer.querySelectorAll('[data-sort-id]');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const sortId = tab.getAttribute('data-sort-id');
        this._setActiveTab(tabsContainer, sortId);
        this.onSort(sortId);
      });
    });
  }

  /**
   * Establece el tab activo visualmente
   * @private
   * @param {HTMLElement} container
   * @param {string} sortId
   */
  _setActiveTab(container, sortId) {
    this.activeSort = sortId;
    
    // Remover estado activo de todos los tabs
    const tabs = container.querySelectorAll('[data-sort-id]');
    tabs.forEach(tab => {
      const isActive = tab.getAttribute('data-sort-id') === sortId;
      if (isActive) {
        tab.className = 'flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg pl-4 pr-4 cursor-pointer transition-all duration-200 bg-[#8ecdb7] text-[#10231c]';
      } else {
        tab.className = 'flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg pl-4 pr-4 cursor-pointer transition-all duration-200 bg-[#214a3c] text-white hover:bg-[#2a5c4a]';
      }
    });
  }
}
