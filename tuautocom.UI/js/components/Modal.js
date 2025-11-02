/**
 * Modal Component
 * Overlay modal básico con open/close y cierre en backdrop o ESC
 *
 * @class
 * @param {Object} options
 * @param {HTMLElement|string} [options.content] - Contenido del modal (HTMLElement o HTML string)
 * @param {string} [options.ariaLabel='Modal']
 *
 * @example
 * const modal = new Modal({ content: '<p>Hola</p>' });
 * document.body.appendChild(modal.render());
 * modal.open();
 */
export class Modal {
  constructor({ content = '', ariaLabel = 'Modal' } = {}) {
    this.content = content;
    this.ariaLabel = ariaLabel;
    this._overlay = null;
  }

  /**
   * Renderiza el modal (overlay) y lo retorna. No lo abre automáticamente.
   * @returns {HTMLElement}
   */
  render() {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay fixed inset-0 z-50 hidden items-center justify-center bg-black/50';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-label', this.ariaLabel);

    const dialog = document.createElement('div');
    dialog.className = 'modal-dialog bg-white rounded-lg max-w-lg w-full p-4';

    if (typeof this.content === 'string') {
      dialog.innerHTML = this.content;
    } else if (this.content instanceof HTMLElement) {
      dialog.appendChild(this.content);
    }

    const closeBtn = document.createElement('button');
    closeBtn.className = 'modal-close absolute top-2 right-2 text-sm text-slate-600';
    closeBtn.innerHTML = 'Cerrar';
    closeBtn.addEventListener('click', () => this.close());

    dialog.appendChild(closeBtn);
    overlay.appendChild(dialog);

    this._overlay = overlay;
    this._attachEvents();
    return overlay;
  }

  _attachEvents() {
    if (!this._overlay) return;
    this._overlay.addEventListener('click', (e) => {
      if (e.target === this._overlay) this.close();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this._overlay && !this._overlay.classList.contains('hidden')) {
        this.close();
      }
    });
  }

  /**
   * Abre el modal
   */
  open() {
    if (!this._overlay) document.body.appendChild(this.render());
    this._overlay.classList.remove('hidden');
    this._overlay.classList.add('flex');
  }

  /**
   * Cierra el modal
   */
  close() {
    if (!this._overlay) return;
    this._overlay.classList.add('hidden');
    this._overlay.classList.remove('flex');
  }
}
