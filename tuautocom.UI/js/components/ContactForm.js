/**
 * ContactForm Component
 * Formulario simple para contactar - emite 'submit' con datos cuando es válido
 *
 * @class
 * @example
 * const form = new ContactForm();
 * document.body.appendChild(form.render());
 * form.element.addEventListener('submit', (e) => console.log(e.detail));
 */
export class ContactForm {
  constructor() {
    this.element = null;
  }

  render() {
    const container = document.createElement('form');
    container.className = 'contact-form flex flex-col gap-3 max-w-md';
    container.innerHTML = `
      <label class="flex flex-col text-sm text-white">
        <span>Nombre</span>
        <input name="name" class="rounded-md px-3 py-2 bg-white/5 text-white" required />
      </label>
      <label class="flex flex-col text-sm text-white">
        <span>Email</span>
        <input name="email" type="email" class="rounded-md px-3 py-2 bg-white/5 text-white" required />
      </label>
      <label class="flex flex-col text-sm text-white">
        <span>Mensaje</span>
        <textarea name="message" class="rounded-md px-3 py-2 bg-white/5 text-white" rows="4" required></textarea>
      </label>
      <div class="flex justify-end">
        <button type="submit" class="bg-primary-medium text-white rounded-lg px-4 py-2">Enviar</button>
      </div>
    `;

    container.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(container);
      const data = {
        name: fd.get('name'),
        email: fd.get('email'),
        message: fd.get('message'),
      };

      // Emite evento con los datos del formulario
      const ev = new CustomEvent('submit', { detail: data });
      container.dispatchEvent(ev);
    });

    this.element = container;
    return container;
  }
}
