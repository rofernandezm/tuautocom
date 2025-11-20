/**
 * CommentsSection Component
 * Sección de comentarios con formulario y lista
 * 
 * @class
 * @param {string} vehicleId - ID del vehículo
 */

import { commentService } from '../services/commentService.js';

export class CommentsSection {
  constructor(vehicleId) {
    this.vehicleId = vehicleId;
    this.comments = [];
  }

  /**
   * Inicializa cargando comentarios desde el backend
   * @async
   */
  async init() {
    try {
      this.comments = await commentService.getByVehicleId(this.vehicleId);
      console.log(`📝 ${this.comments.length} comentarios cargados para vehículo ${this.vehicleId}`);
    } catch (error) {
      console.error('Error cargando comentarios:', error);
      this.comments = [];
    }
  }

  /**
   * Renderiza la sección completa de comentarios
   * @returns {HTMLElement}
   */
  render() {
    const section = document.createElement('div');
    section.className = 'mt-8 px-4 py-3';
    
    section.innerHTML = `
      <h3 class="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-5">
        Comentarios
      </h3>
      
      <!-- Formulario de comentarios -->
      ${this._renderForm()}
      
      <!-- Lista de comentarios -->
      ${this._renderCommentsList()}
    `;

    this._attachEventListeners(section);
    return section;
  }

  /**
   * Renderiza el formulario para agregar comentarios
   * @private
   * @returns {string}
   */
  _renderForm() {
    return `
      <form data-comment-form class="flex flex-col gap-4 mb-8">
        <label class="block">
          <span class="text-primary-light text-sm font-medium leading-normal mb-1 block">Nombre</span>
          <input 
            type="text"
            name="name"
            placeholder="Tu nombre (opcional)"
            class="form-field-input w-full"
          />
        </label>
        
        <label class="block">
          <span class="text-primary-light text-sm font-medium leading-normal mb-1 block">Comentario</span>
          <textarea 
            name="text"
            required
            placeholder="Escribe tu comentario aquí..."
            rows="4"
            class="form-field-textarea w-full"
          ></textarea>
        </label>
        
        <button 
          type="submit"
          class="btn-primary self-start"
        >
          <span class="truncate">Publicar comentario</span>
        </button>
      </form>
    `;
  }

  /**
   * Renderiza la lista de comentarios
   * @private
   * @returns {string}
   */
  _renderCommentsList() {
    if (this.comments.length === 0) {
      return `
        <div class="text-primary-light text-sm font-normal leading-normal py-8 text-center">
          No hay comentarios aún. ¡Sé el primero en comentar!
        </div>
      `;
    }

    return `
      <div class="flex flex-col gap-4" data-comments-list>
        ${this.comments.map(comment => this._renderComment(comment)).join('')}
      </div>
    `;
  }

  /**
   * Renderiza un comentario individual
   * @private
   * @param {Object} comment - Datos del comentario
   * @returns {string}
   */
  _renderComment(comment) {
    return `
      <div class="comment-item pb-4 border-b border-solid border-b-primary-medium" data-comment-id="${comment.id}">
        <p class="text-white text-sm font-bold leading-normal mb-1">
          ${comment.name}
        </p>
        <p class="text-primary-light text-sm font-normal leading-normal">
          ${comment.text}
        </p>
      </div>
    `;
  }

  /**
   * Adjunta event listeners
   * @private
   * @param {HTMLElement} section
   */
  _attachEventListeners(section) {
    const form = section.querySelector('[data-comment-form]');
    
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        await this._handleSubmit(form, section);
      });
    }
  }

  /**
   * Maneja el envío del formulario de comentarios
   * @private
   * @param {HTMLFormElement} form
   * @param {HTMLElement} section
   */
  async _handleSubmit(form, section) {
    const formData = new FormData(form);
    const commentData = {
      name: formData.get('name') || '',
      text: formData.get('text'),
    };

    // Validar que hay texto
    if (!commentData.text || commentData.text.trim() === '') {
      alert('❌ Por favor escribe un comentario');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    try {
      // Deshabilitar botón y mostrar loading
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="truncate">Publicando...</span>';

      // Enviar comentario al backend
      const newComment = await commentService.create(this.vehicleId, commentData);
      
      // Agregar comentario a la lista local
      this.comments.push(newComment);

      // Limpiar formulario
      form.reset();

      // Re-renderizar lista de comentarios
      const commentsList = section.querySelector('[data-comments-list]');
      if (commentsList) {
        commentsList.outerHTML = this._renderCommentsList();
      } else {
        // Si no había comentarios antes, reemplazar mensaje vacío
        const emptyMessage = section.querySelector('.text-center');
        if (emptyMessage) {
          emptyMessage.outerHTML = this._renderCommentsList();
        }
      }

      console.log('✅ Comentario publicado correctamente');
      
    } catch (error) {
      console.error('❌ Error publicando comentario:', error);
      alert('❌ Error al publicar comentario. Por favor intenta nuevamente.');
    } finally {
      // Restaurar botón
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  }
}
