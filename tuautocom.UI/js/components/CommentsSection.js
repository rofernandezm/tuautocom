/**
 * CommentsSection Component
 * Sección de comentarios con formulario y lista
 * Colección MongoDB: comentarios
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
   * Inicializa cargando comentarios desde MongoDB
   * Operación: Comment.find({ vehicle: vehicleId })
   * @async
   */
  async init() {
    try {
      this.comments = await commentService.getByVehicleId(this.vehicleId);
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
    section.className = 'mt-8 px-4 py-6 bg-primary-medium rounded-lg';
    
    section.innerHTML = `
      <h3 class="text-white text-2xl font-bold leading-tight tracking-[-0.015em] pb-6 border-b border-primary-light/30">
        💬 Comentarios (${this.comments.length})
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
      <form data-comment-form class="flex flex-col gap-4 mt-6 mb-8 p-4 bg-primary-dark rounded-lg border border-primary-light/20">
        <label class="block">
          <span class="text-primary-light text-sm font-semibold leading-normal mb-2 block">Nombre (opcional)</span>
          <input 
            type="text"
            name="name"
            placeholder="Tu nombre"
            class="w-full px-4 py-3 bg-form-bg text-white rounded-lg border border-form-border focus:border-form-border-focus focus:outline-none transition-colors"
          />
        </label>
        
        <label class="block">
          <span class="text-primary-light text-sm font-semibold leading-normal mb-2 block">Comentario *</span>
          <textarea 
            name="text"
            required
            placeholder="Escribe tu comentario aquí..."
            rows="4"
            class="w-full px-4 py-3 bg-form-bg text-white rounded-lg border border-form-border focus:border-form-border-focus focus:outline-none transition-colors resize-none"
          ></textarea>
        </label>
        
        <button 
          type="submit"
          class="self-start px-6 py-3 bg-success hover:bg-success-hover text-white font-bold rounded-lg transition-colors"
        >
          <span class="truncate">📝 Publicar comentario</span>
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
        <div class="text-center py-8 px-4 bg-primary-dark rounded-lg border-2 border-dashed border-primary-light/30 mt-6">
          <p class="text-white text-lg font-semibold mb-2">No hay comentarios aún</p>
          <p class="text-primary-light text-sm">¡Sé el primero en comentar sobre este vehículo!</p>
        </div>
      `;
    }

    return `
      <div class="flex flex-col gap-4 mt-6" data-comments-list>
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
    const date = new Date(comment.createdAt);
    const formattedDate = date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    return `
      <div class="comment-item p-4 bg-primary-dark rounded-lg border border-primary-light/20" data-comment-id="${comment.id}">
        <div class="flex items-start justify-between mb-2">
          <p class="text-white text-base font-bold">
            ${comment.name}
          </p>
          <p class="text-primary-light text-xs font-mono">
            ${formattedDate}
          </p>
        </div>
        <p class="text-white text-sm leading-relaxed">
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
      console.warn('Por favor escribe un comentario');
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

  // Comentario publicado correctamente (no logging)
      
    } catch (error) {
      console.error('Error publicando comentario:', error);
    } finally {
      // Restaurar botón
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  }
}
