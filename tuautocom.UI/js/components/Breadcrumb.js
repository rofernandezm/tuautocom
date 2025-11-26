/**
 * Breadcrumb Component
 * Componente de navegación breadcrumb (migas de pan)
 * Muestra la ruta de navegación actual y permite volver a páginas anteriores
 * 
 * 📝 NOTA EDUCATIVA: Los breadcrumbs mejoran la UX mostrando dónde está
 * el usuario y permitiendo navegación rápida a secciones anteriores.
 * 
 * @class
 * @param {Array<Object>} items - Array de elementos del breadcrumb
 * @param {string} items[].label - Texto a mostrar
 * @param {string} [items[].href] - Hash de navegación (ej: '#catalog')
 * 
 * @example
 * const breadcrumb = new Breadcrumb([
 *   { label: 'Inicio', href: '#' },
 *   { label: 'Catálogo', href: '#catalog' },
 *   { label: 'Toyota Camry 2024' } // Último item sin href (página actual)
 * ]);
 * document.body.appendChild(breadcrumb.render());
 */
export class Breadcrumb {
  /**
   * @param {Array<Object>} items - Items del breadcrumb
   */
  constructor(items = []) {
    this.items = items;
  }

  /**
   * Renderiza el componente breadcrumb
   * @returns {HTMLElement}
   */
  render() {
    const nav = document.createElement('nav');
    nav.className = 'px-4 py-3';
    nav.setAttribute('aria-label', 'Breadcrumb');

    const ol = document.createElement('ol');
    ol.className = 'flex flex-wrap items-center gap-2 text-sm';

    this.items.forEach((item, index) => {
      const isLast = index === this.items.length - 1;
      
      const li = document.createElement('li');
      li.className = 'flex items-center gap-2';

      // Crear el elemento (link o span)
      if (item.href && !isLast) {
        // Item navegable (no es el último)
        const link = document.createElement('a');
        link.href = item.href;
        link.className = 'text-primary-light hover:text-white transition-colors duration-200';
        link.textContent = item.label;
        link.setAttribute('data-breadcrumb-link', item.href);
        li.appendChild(link);
      } else {
        // Item actual (último) o sin href
        const span = document.createElement('span');
        span.className = isLast ? 'text-white font-medium' : 'text-primary-light';
        span.textContent = item.label;
        if (isLast) {
          span.setAttribute('aria-current', 'page');
        }
        li.appendChild(span);
      }

      // Agregar separador (excepto en el último item)
      if (!isLast) {
        const separator = document.createElement('svg');
        separator.className = 'w-4 h-4 text-primary-light/50';
        separator.setAttribute('fill', 'none');
        separator.setAttribute('stroke', 'currentColor');
        separator.setAttribute('viewBox', '0 0 24 24');
        separator.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>';
        li.appendChild(separator);
      }

      ol.appendChild(li);
    });

    nav.appendChild(ol);
    this._attachEventListeners(nav);
    return nav;
  }

  /**
   * Adjunta event listeners para navegación con hash
   * 📝 NOTA: Previene recarga de página y usa hash routing
   * @private
   * @param {HTMLElement} nav
   */
  _attachEventListeners(nav) {
    const links = nav.querySelectorAll('[data-breadcrumb-link]');
    
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('data-breadcrumb-link');
        window.location.hash = href;
      });
    });
  }
}
