/**
 * Button Component
 * Botón reutilizable pequeño que permite label y estado disabled
 *
 * @class
 * @param {Object} options
 * @param {string} options.label - Texto del botón
 * @param {boolean} [options.disabled=false] - Estado inicial
 *
 * @example
 * const btn = new Button({ label: 'Enviar' });
 * document.body.appendChild(btn.render());
 * btn.element.addEventListener('click', () => console.log('clicked'));
 */
export class Button {
  constructor({ label, disabled = false } = {}) {
    this.label = label || 'Button';
    this.disabled = !!disabled;
    this.element = null;
  }

  /**
   * Renderiza el botón
   * @returns {HTMLElement}
   */
  render() {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'inline-flex items-center justify-center rounded-lg px-3 py-2 bg-primary-medium text-white font-bold disabled:opacity-50';
    btn.textContent = this.label;
    btn.disabled = this.disabled;

    this.element = btn;
    return btn;
  }

  /**
   * Cambia el estado disabled
   * @param {boolean} value
   */
  setDisabled(value) {
    this.disabled = !!value;
    if (this.element) this.element.disabled = this.disabled;
  }
}
