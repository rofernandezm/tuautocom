/**
 * SearchBar Component
 * Barra de búsqueda simple que emite un evento `search` con el query
 *
 * @class
 * @param {Object} [options]
 * @param {string} [options.placeholder='Buscar vehículos...'] - Texto placeholder
 *
 * @example
 * const sb = new SearchBar({ placeholder: 'Busca por marca o modelo' });
 * document.body.appendChild(sb.render());
 * sb.element.addEventListener('search', (e) => console.log(e.detail.query));
 */
export class SearchBar {
  constructor(options = {}) {
    this.placeholder = options.placeholder || 'Buscar vehículos...';
    this.element = null; // referencia al elemento montado
  }

  /**
   * Renderiza la barra de búsqueda
   * @returns {HTMLElement}
   */
  render() {
    const container = document.createElement('div');
    container.className = 'flex items-center gap-2';
    container.innerHTML = `
      <input type="search" class="searchbar-input rounded-lg px-3 py-2 bg-white/5 text-white placeholder:text-slate-300 outline-none" placeholder="${this.placeholder}" />
      <button class="searchbar-btn bg-primary-medium text-white rounded-lg px-3 py-2">Buscar</button>
    `;

    this._attachEventListeners(container);
    this.element = container;
    return container;
  }

  /**
   * Adjunta listeners al componente
   * @private
   * @param {HTMLElement} container
   */
  _attachEventListeners(container) {
    const input = container.querySelector('input');
    const btn = container.querySelector('button');

    const submit = () => {
      const query = input.value.trim();
      // Hacemos que el evento burbujee para que los contenedores padres puedan escucharlo
      const ev = new CustomEvent('search', { detail: { query }, bubbles: true });
      container.dispatchEvent(ev);
    };

    btn.addEventListener('click', submit);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') submit();
    });
    
    // Escuchar el evento nativo 'search' del input (cuando se presiona la X para limpiar)
    input.addEventListener('search', () => {
      submit(); // Emitir nuestro evento personalizado con el valor actualizado
    });
  }
}
