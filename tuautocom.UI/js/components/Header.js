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
          TuAutoCom
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
   * Renderiza el logo (usando favicon)
   */
  _renderLogo() {
    return `
      <div class="size-8 rounded-lg overflow-hidden bg-white/10 p-1">
        <img 
          src="/assets/favicon_io/favicon-32x32.png" 
          alt="TuAutoCom Logo" 
          class="w-full h-full object-contain"
        />
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
