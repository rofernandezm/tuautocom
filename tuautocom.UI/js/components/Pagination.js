/**
 * Pagination Component
 * Paginación numérica con botones prev/next
 * 
 * @class
 * @param {Object} options - Opciones de configuración
 * @param {number} options.currentPage - Página actual (por defecto: 1)
 * @param {number} options.totalPages - Total de páginas (por defecto: 5)
 * @param {Function} options.onPageChange - Callback cuando cambia la página
 * 
 * @example
 * const pagination = new Pagination({
 *   currentPage: 1,
 *   totalPages: 10,
 *   onPageChange: (page) => console.log('Ir a página:', page)
 * });
 */
export class Pagination {
  constructor(options = {}) {
    this.currentPage = options.currentPage || 1;
    this.totalPages = options.totalPages || 5;
    this.onPageChange = options.onPageChange || (() => {});
  }

  /**
   * Renderiza la paginación
   * @returns {HTMLElement}
   */
  render() {
    const container = document.createElement('div');
    container.className = 'flex items-center justify-center p-4';
    
    const pages = this._generatePageNumbers();
    
    container.innerHTML = `
      <!-- Botón Previous -->
      <button 
        class="flex size-10 items-center justify-center hover:bg-[#214a3c] hover:bg-opacity-50 rounded-full transition-colors ${this.currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}"
        data-action="prev"
        ${this.currentPage === 1 ? 'disabled' : ''}
      >
        <div class="text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="currentColor" viewBox="0 0 256 256">
            <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path>
          </svg>
        </div>
      </button>
      
      <!-- Números de página -->
      ${pages.map(page => {
        if (page === '...') {
          return '<span class="text-white text-sm flex size-10 items-center justify-center">...</span>';
        }
        const isActive = page === this.currentPage;
        return `
          <button
            class="text-sm ${isActive ? 'font-bold' : 'font-normal'} leading-normal tracking-[0.015em] flex size-10 items-center justify-center text-white rounded-full ${isActive ? 'bg-[#214a3c]' : 'hover:bg-[#214a3c] hover:bg-opacity-50'} transition-colors"
            data-page="${page}"
          >
            ${page}
          </button>
        `;
      }).join('')}
      
      <!-- Botón Next -->
      <button 
        class="flex size-10 items-center justify-center hover:bg-[#214a3c] hover:bg-opacity-50 rounded-full transition-colors ${this.currentPage === this.totalPages ? 'opacity-50 cursor-not-allowed' : ''}"
        data-action="next"
        ${this.currentPage === this.totalPages ? 'disabled' : ''}
      >
        <div class="text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="currentColor" viewBox="0 0 256 256">
            <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
          </svg>
        </div>
      </button>
    `;
    
    this._attachEventListeners(container);
    return container;
  }

  /**
   * Genera los números de página a mostrar (con elipsis si es necesario)
   * @private
   * @returns {Array<number|string>} Array con números de página o '...'
   */
  _generatePageNumbers() {
    const pages = [];
    const maxVisible = 5; // Máximo de números visibles
    
    if (this.totalPages <= maxVisible) {
      // Mostrar todas las páginas si son pocas
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Mostrar páginas con elipsis
      if (this.currentPage <= 3) {
        // Inicio: 1 2 3 4 ... 10
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(this.totalPages);
      } else if (this.currentPage >= this.totalPages - 2) {
        // Final: 1 ... 7 8 9 10
        pages.push(1);
        pages.push('...');
        for (let i = this.totalPages - 3; i <= this.totalPages; i++) pages.push(i);
      } else {
        // Medio: 1 ... 5 6 7 ... 10
        pages.push(1);
        pages.push('...');
        pages.push(this.currentPage - 1);
        pages.push(this.currentPage);
        pages.push(this.currentPage + 1);
        pages.push('...');
        pages.push(this.totalPages);
      }
    }
    
    return pages;
  }

  /**
   * Adjunta event listeners a los botones
   * @private
   * @param {HTMLElement} element
   */
  _attachEventListeners(element) {
    // Botón Previous
    const prevBtn = element.querySelector('[data-action="prev"]');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (this.currentPage > 1) {
          this.currentPage--;
          this.onPageChange(this.currentPage);
          this._updatePagination(element);
        }
      });
    }
    
    // Botón Next
    const nextBtn = element.querySelector('[data-action="next"]');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
          this.onPageChange(this.currentPage);
          this._updatePagination(element);
        }
      });
    }
    
    // Botones de números de página
    const pageButtons = element.querySelectorAll('[data-page]');
    pageButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const page = parseInt(btn.getAttribute('data-page'), 10);
        this.currentPage = page;
        this.onPageChange(page);
        this._updatePagination(element);
      });
    });
  }

  /**
   * Actualiza la paginación después de un cambio
   * @private
   * @param {HTMLElement} element
   */
  _updatePagination(element) {
    // Re-renderizar el componente con la nueva página
    const newElement = this.render();
    if (element.parentNode) {
      element.parentNode.replaceChild(newElement, element);
    }
  }
}
