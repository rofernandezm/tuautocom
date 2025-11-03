/**
 * 🎓 COMPONENTE HEADER
 * 
 * CONCEPTOS CLAVE:
 * - ES Modules: export/import para modularidad
 * - Clases ES6: Encapsulación y organización
 * - Template Literals: Strings multi-línea con interpolación
 * - Data Attributes: Conexión HTML-JavaScript
 * - Tailwind CSS: Utility-first styling
 */

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1️⃣ IMPORTACIONES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Importamos el tema para usar colores centralizados
// En vez de hardcodear '#10231c', usamos theme.colors.primaryDark
import { theme } from '../config/theme.js';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2️⃣ CLASE DEL COMPONENTE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Componente Header - Barra de navegación principal
 * 
 * RESPONSABILIDADES:
 * - Mostrar logo y nombre de la app
 * - Navegación principal (links)
 * - Botón de login/registro
 * - Botón de búsqueda
 * 
 * USO:
 * ```javascript
 * import { Header } from './components/Header.js';
 * const header = new Header({ currentRoute: 'inicio' });
 * document.body.appendChild(header.render());
 * ```
 */
export class Header {
  
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 3️⃣ CONSTRUCTOR - Inicialización del componente
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  
  /**
   * @param {Object} config - Configuración del header
   * @param {string} config.currentRoute - Ruta activa actual ('inicio', 'catalogo', etc.)
   * @param {boolean} config.showSearch - Mostrar botón de búsqueda (default: true)
   * @param {Function} config.onNavigate - Callback para navegación
   */
  constructor(config = {}) {
    // 📝 NOTA EDUCATIVA: 
    // El operador ?? (nullish coalescing) retorna el valor de la derecha
    // solo si el de la izquierda es null o undefined
    
    this.currentRoute = config.currentRoute || 'inicio';
    this.showSearch = config.showSearch ?? true;
    this.onNavigate = config.onNavigate || null;
    
    // Enlaces de navegación
    // 📝 NOTA: Esto podría venir de una configuración externa
    this.navLinks = [
      { label: 'Inicio', route: 'home', hash: '#home' },
      { label: 'Catálogo', route: 'catalog', hash: '#catalog' },
      { label: 'Categorías', route: 'categories', hash: '#categories' },
      { label: 'Cargar vehículo', route: 'admin', hash: '#admin/vehicles/new' },
    ];
  }
  
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 4️⃣ MÉTODO RENDER - Genera el elemento HTML
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  
  /**
   * Renderiza el componente Header
   * @returns {HTMLElement} Elemento header listo para insertar en el DOM
   */
  render() {
    // 1. Crear el elemento contenedor
    const header = document.createElement('header');
    
    // 2. Agregar clases de Tailwind
    // 📝 NOTA EDUCATIVA: 
    // Estas clases vienen del diseño de Stitch
    // - flex: display flex
    // - items-center: align-items center
    // - justify-between: justify-content space-between
    // - whitespace-nowrap: texto no se rompe en múltiples líneas
    // - border-b: border-bottom
    // - px-10: padding horizontal 2.5rem
    // - py-3: padding vertical 0.75rem
    header.className = 'flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#214a3c] px-10 py-3';
    
    // 3. Inyectar el HTML interno usando template literals
    // 📝 NOTA EDUCATIVA:
    // Los template literals (backticks `) permiten:
    // - Multi-línea sin concatenación
    // - Interpolación con ${expresión}
    // - Más legible y mantenible
    header.innerHTML = `
      <!-- Logo y título -->
      <div class="flex items-center gap-4 text-white">
        ${this._renderLogo()}
        <h2 class="text-white text-lg font-bold leading-tight tracking-[-0.015em]">
          Auto Showcase
        </h2>
      </div>
      
      <!-- Navegación y acciones -->
      <div class="flex flex-1 justify-end gap-8">
        <!-- Links de navegación -->
        <nav class="flex items-center gap-9">
          ${this._renderNavLinks()}
        </nav>
        
        <!-- Botones de acción -->
        <div class="flex gap-2 relative">
          ${this._renderSearchInput()}
          ${this._renderAuthButton()}
          ${this.showSearch ? this._renderSearchButton() : ''}
        </div>
      </div>
    `;
    
    // 4. Agregar event listeners DESPUÉS de crear el HTML
    // 📝 NOTA EDUCATIVA:
    // Los event listeners se agregan después porque necesitamos
    // que los elementos existan en el DOM primero
    this._attachEventListeners(header);
    
    // 5. Retornar el elemento completo
    return header;
  }
  
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 5️⃣ MÉTODOS PRIVADOS - Organización interna
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  
  /**
   * Renderiza el logo SVG
   * 📝 NOTA: El SVG viene del diseño de Stitch
   */
  _renderLogo() {
    return `
      <div class="size-4">
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M39.5563 34.1455V13.8546C39.5563 15.708 36.8773 17.3437 32.7927 18.3189C30.2914 18.916 27.263 19.2655 24 19.2655C20.737 19.2655 17.7086 18.916 15.2073 18.3189C11.1227 17.3437 8.44365 15.708 8.44365 13.8546V34.1455C8.44365 35.9988 11.1227 37.6346 15.2073 38.6098C17.7086 39.2069 20.737 39.5564 24 39.5564C27.263 39.5564 30.2914 39.2069 32.7927 38.6098C36.8773 37.6346 39.5563 35.9988 39.5563 34.1455Z"
            fill="currentColor"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10.4485 13.8519C10.4749 13.9271 10.6203 14.246 11.379 14.7361C12.298 15.3298 13.7492 15.9145 15.6717 16.3735C18.0007 16.9296 20.8712 17.2655 24 17.2655C27.1288 17.2655 29.9993 16.9296 32.3283 16.3735C34.2508 15.9145 35.702 15.3298 36.621 14.7361C37.3796 14.246 37.5251 13.9271 37.5515 13.8519C37.5287 13.7876 37.4333 13.5973 37.0635 13.2931C36.5266 12.8516 35.6288 12.3647 34.343 11.9175C31.79 11.0295 28.1333 10.4437 24 10.4437C19.8667 10.4437 16.2099 11.0295 13.657 11.9175C12.3712 12.3647 11.4734 12.8516 10.9365 13.2931C10.5667 13.5973 10.4713 13.7876 10.4485 13.8519ZM37.5563 18.7877C36.3176 19.3925 34.8502 19.8839 33.2571 20.2642C30.5836 20.9025 27.3973 21.2655 24 21.2655C20.6027 21.2655 17.4164 20.9025 14.7429 20.2642C13.1498 19.8839 11.6824 19.3925 10.4436 18.7877V34.1275C10.4515 34.1545 10.5427 34.4867 11.379 35.027C12.298 35.6207 13.7492 36.2054 15.6717 36.6644C18.0007 37.2205 20.8712 37.5564 24 37.5564C27.1288 37.5564 29.9993 37.2205 32.3283 36.6644C34.2508 36.2054 35.702 35.6207 36.621 35.027C37.4573 34.4867 37.5485 34.1546 37.5563 34.1275V18.7877ZM41.5563 13.8546V34.1455C41.5563 36.1078 40.158 37.5042 38.7915 38.3869C37.3498 39.3182 35.4192 40.0389 33.2571 40.5551C30.5836 41.1934 27.3973 41.5564 24 41.5564C20.6027 41.5564 17.4164 41.1934 14.7429 40.5551C12.5808 40.0389 10.6502 39.3182 9.20848 38.3869C7.84205 37.5042 6.44365 36.1078 6.44365 34.1455L6.44365 13.8546C6.44365 12.2684 7.37223 11.0454 8.39581 10.2036C9.43325 9.3505 10.8137 8.67141 12.343 8.13948C15.4203 7.06909 19.5418 6.44366 24 6.44366C28.4582 6.44366 32.5797 7.06909 35.657 8.13948C37.1863 8.67141 38.5667 9.3505 39.6042 10.2036C40.6278 11.0454 41.5563 12.2684 41.5563 13.8546Z"
            fill="currentColor"
          />
        </svg>
      </div>
    `;
  }
  
  /**
   * Renderiza los links de navegación
   * 📝 NOTA EDUCATIVA:
   * - Usamos .map() para transformar el array de links en HTML
   * - .join('') convierte el array de strings en un solo string
   * - data-route es un atributo personalizado para identificar el link
   */
  _renderNavLinks() {
    return this.navLinks
      .map(link => {
        // Determinar si este link está activo
        const isActive = link.route === this.currentRoute;
        
        // 📝 NOTA: Podríamos agregar clases diferentes para el link activo
        const className = isActive 
          ? 'text-primary-light text-sm font-medium leading-normal'
          : 'text-white text-sm font-medium leading-normal';
        
        return `
          <a 
            href="${link.hash}" 
            class="${className}"
            data-route="${link.route}"
          >
            ${link.label}
          </a>
        `;
      })
      .join('');
  }
  
  /**
   * Renderiza el botón de autenticación
   */
  _renderAuthButton() {
    return `
      <button
        class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#214a3c] text-white text-sm font-bold leading-normal tracking-[0.015em]"
        data-action="auth"
      >
        <span class="truncate">Iniciar sesión/Registrarse</span>
      </button>
    `;
  }
  
  /**
   * Renderiza el input de búsqueda (oculto por defecto)
   */
  _renderSearchInput() {
    return `
      <div class="search-container hidden absolute right-0 top-12 flex items-center gap-2 bg-white p-2 rounded-lg z-50 shadow-lg">
        <div class="relative flex-1">
          <input
            type="text"
            placeholder="Buscar vehículo..."
            class="search-input w-full px-3 py-2 bg-white text-gray-900 text-sm rounded outline-none focus:ring-2 focus:ring-[#8ecdb7] focus:border-transparent pr-8"
            data-input="search"
          />
          <button
            class="search-clear absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 opacity-0 transition-opacity"
            data-action="search-clear"
            title="Limpiar búsqueda"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
              <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.34a8,8,0,0,1,11.32,11.32L139.31,128Z"/>
            </svg>
          </button>
        </div>
      </div>
    `;
  }

  /**
   * Renderiza el botón de búsqueda
   */
  _renderSearchButton() {
    return `
      <button
        class="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#214a3c] text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5"
        data-action="search"
      >
        <div class="text-white" data-icon="MagnifyingGlass" data-size="20px" data-weight="regular">
          <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
            <path
              d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"
            />
          </svg>
        </div>
      </button>
    `;
  }
  
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 6️⃣ EVENT LISTENERS - Interactividad
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  
  /**
   * Adjunta los event listeners al header
   * 📝 NOTA EDUCATIVA:
   * - querySelector busca el primer elemento que coincida
   * - querySelectorAll busca TODOS los elementos
   * - dataset.action accede al atributo data-action
   * - El operador ?. (optional chaining) evita errores si el elemento no existe
   */
  _attachEventListeners(header) {
    // 📝 NOTA EDUCATIVA: 
    // NO prevenimos el default de los links porque usamos hash routing (#home, #catalog)
    // El navegador cambiará el hash automáticamente y el evento hashchange se disparará
    // en main.js, donde está nuestro router
    
    // Los links ya tienen href="#home", href="#catalog", etc.
    // El navegador manejará el cambio de hash automáticamente
    // No necesitamos event listeners aquí
    
    // Event listeners para búsqueda
    const searchBtn = header.querySelector('[data-action="search"]');
    const searchContainer = header.querySelector('.search-container');
    const searchInput = header.querySelector('[data-input="search"]');
    
    if (searchBtn && searchContainer) {
      // Toggle del contenedor al hacer click en el botón de búsqueda
      searchBtn.addEventListener('click', () => {
        searchContainer.classList.toggle('hidden');
        
        // Si se muestra, enfocar el input
        if (!searchContainer.classList.contains('hidden')) {
          searchInput.focus();
        }
      });
    }
    
    if (searchInput) {
      // Búsqueda en tiempo real mientras se escribe
      searchInput.addEventListener('input', (e) => {
        this._handleSearchInput(e.target.value);
        // Mostrar/ocultar botón de clear
        const clearBtn = header.querySelector('[data-action="search-clear"]');
        if (clearBtn) {
          clearBtn.style.opacity = e.target.value ? '1' : '0';
        }
      });
      
      // Cerrar al presionar Escape
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          if (searchContainer) searchContainer.classList.add('hidden');
          searchInput.value = '';
          this._handleSearchInput(''); // Limpiar búsqueda
          // Ocultar botón de clear
          const clearBtn = header.querySelector('[data-action="search-clear"]');
          if (clearBtn) clearBtn.style.opacity = '0';
        }
      });
    }
    
    // Botón de clear
    const clearBtn = header.querySelector('[data-action="search-clear"]');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        this._handleSearchInput('');
        clearBtn.style.opacity = '0';
        searchInput.focus();
      });
    }
    
    // Event listener para botón de auth
    const authBtn = header.querySelector('[data-action="auth"]');
    authBtn?.addEventListener('click', () => this._handleAuth());
  }
  
  /**
   * Maneja la navegación
   * 📝 NOTA: Por ahora solo log, después implementaremos routing real
   */
  _handleNavigation(route) {
    console.log(`🔄 Navegando a: ${route}`);
    
    // Actualizar ruta actual
    this.currentRoute = route;
    
    // Si hay callback de navegación, ejecutarlo
    if (this.onNavigate && typeof this.onNavigate === 'function') {
      this.onNavigate(route);
    }
    
    // 📝 NOTA: Aquí después integraremos con el Router
  }
  
  /**
   * Maneja la búsqueda en tiempo real
   * 📝 NOTA: Emite un evento personalizado para búsqueda en tiempo real
   */
  _handleSearchInput(query = '') {
    // Emitir evento personalizado que HomeView puede escuchar
    const searchInputEvent = new CustomEvent('search-input', {
      detail: { query: query.toLowerCase() },
      bubbles: true,
      cancelable: true
    });
    
    document.dispatchEvent(searchInputEvent);
  }
  
  /**
   * Maneja el click en autenticación
   */
  _handleAuth() {
    console.log('👤 Login/Registro activado');
    // 📝 TODO: Implementar modal o página de login
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🎓 RESUMEN EDUCATIVO
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//
// CONCEPTOS APRENDIDOS:
// ✅ ES Modules: export/import
// ✅ Clases ES6: constructor, métodos, this
// ✅ Template Literals: backticks, interpolación
// ✅ Data Attributes: data-*, dataset
// ✅ Array methods: .map(), .join(), .forEach()
// ✅ Optional Chaining: ?.
// ✅ Nullish Coalescing: ??
// ✅ Event Delegation: addEventListener
// ✅ Tailwind CSS: utility classes
//
// FLUJO DEL COMPONENTE:
// 1. new Header() → Constructor inicializa estado
// 2. header.render() → Genera elemento HTML
// 3. _renderX() → Métodos privados generan sub-partes
// 4. _attachEventListeners() → Agrega interactividad
// 5. return header → Elemento listo para el DOM
//
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
