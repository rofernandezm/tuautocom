import { VehicleCard } from './VehicleCard.js';

/**
 * VehicleCarousel Component
 * Carrusel horizontal que renderiza `VehicleCard` para cada ítem.
 * Proporciona botones prev/next y permite scroll por arrastre.
 *
 * @class
 * @param {Object} options
 * @param {Array<Object>} [options.items=[]] - Array de objetos de vehículos (misma estructura que VehicleCard espera)
 *
 * @example
 * const c = new VehicleCarousel({ items: [{ id: 'v1', name: 'Auto', price: '$10k' }] });
 * document.body.appendChild(c.render());
 */
export class VehicleCarousel {
  constructor({ items = [] } = {}) {
    this.items = items;
    this._container = null;
  }

  render() {
    // Wrapper principal: con padding para los botones laterales
    const wrapper = document.createElement('div');
    wrapper.className = 'vehicle-carousel group relative px-16';

    // Contenedor de las cards con scroll
    const list = document.createElement('div');
    list.className = 'carousel-list flex gap-3 overflow-x-auto py-2';
    list.style.scrollBehavior = 'smooth';
    
    // Ocultar scrollbar visual pero mantener funcionalidad
    list.style.scrollbarWidth = 'none'; // Firefox
    list.style.msOverflowStyle = 'none'; // IE/Edge

    this.items.forEach((item) => {
      const cardWrapper = document.createElement('div');
      cardWrapper.className = 'flex-shrink-0';
      const card = new VehicleCard(item).render();
      cardWrapper.appendChild(card);
      list.appendChild(cardWrapper);
    });

    // Botón anterior (izquierda) - Rectangular, centrado verticalmente
    const prev = document.createElement('button');
    prev.className = 'carousel-prev opacity-0 group-hover:opacity-100 absolute left-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-20 bg-[#214a3c]/80 hover:bg-[#214a3c] text-white rounded-lg transition-opacity duration-300';
    prev.setAttribute('aria-label', 'Previous');
    prev.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
        <path d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
      </svg>
    `;
    prev.addEventListener('click', () => this._scrollBy(-1));

    // Botón siguiente (derecha) - Rectangular, centrado verticalmente
    const next = document.createElement('button');
    next.className = 'carousel-next opacity-0 group-hover:opacity-100 absolute right-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-20 bg-[#214a3c]/80 hover:bg-[#214a3c] text-white rounded-lg transition-opacity duration-300';
    next.setAttribute('aria-label', 'Next');
    next.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
        <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
      </svg>
    `;
    next.addEventListener('click', () => this._scrollBy(1));

    // Orden: lista, luego botones encima (absolutos)
    wrapper.appendChild(list);
    wrapper.appendChild(prev);
    wrapper.appendChild(next);

    // Habilitar arrastre con el ratón/touch
    this._enableDragScroll(list);

    this._container = wrapper;
    this._list = list;
    return wrapper;
  }

    _scrollBy(dir = 1) {
    if (!this._list) return;
    const child = this._list.querySelector('div');
    const step = child ? child.clientWidth + 12 : 252; // ancho card (240px) + gap (12px)
    this._list.scrollBy({ left: dir * step, behavior: 'smooth' });
  }

  _enableDragScroll(el) {
    let isDown = false;
    let startX, scrollLeft;
    el.addEventListener('mousedown', (e) => {
      isDown = true;
      el.classList.add('dragging');
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    });
    el.addEventListener('mouseleave', () => {
      isDown = false;
      el.classList.remove('dragging');
    });
    el.addEventListener('mouseup', () => {
      isDown = false;
      el.classList.remove('dragging');
    });
    el.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1; // scroll-fastness
      el.scrollLeft = scrollLeft - walk;
    });
    // touch events
    el.addEventListener('touchstart', (e) => {
      startX = e.touches[0].pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    });
    el.addEventListener('touchmove', (e) => {
      const x = e.touches[0].pageX - el.offsetLeft;
      const walk = (x - startX) * 1;
      el.scrollLeft = scrollLeft - walk;
    });
  }
}
