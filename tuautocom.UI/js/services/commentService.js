/**
 * Comment Service
 * Maneja todas las operaciones relacionadas con comentarios de vehículos
 * Conectado a backend MongoDB vía API REST
 */

import { apiClient } from './apiClient.js';

class CommentService {
  /**
   * Obtiene comentarios de un vehículo específico
   * @param {string} vehicleId - ID del vehículo
   * @returns {Promise<Array>}
   */
  async getByVehicleId(vehicleId) {
    try {
      const comments = await apiClient.get(`/comments/vehicle/${vehicleId}`);
      return comments.map(c => this._mapComment(c));
    } catch (error) {
      console.error(`❌ Error obteniendo comentarios del vehículo ${vehicleId}:`, error);
      // Retornar array vacío si hay error
      return [];
    }
  }

  /**
   * Crea un nuevo comentario para un vehículo
   * @param {string} vehicleId - ID del vehículo
   * @param {Object} commentData - Datos del comentario
   * @param {string} [commentData.name] - Nombre del usuario (opcional)
   * @param {string} commentData.text - Texto del comentario
   * @returns {Promise<Object>}
   */
  async create(vehicleId, commentData) {
    try {
      const payload = {
        vehicleId,
        name: commentData.name || 'Usuario Anónimo',
        text: commentData.text,
      };

      const created = await apiClient.post('/comments', payload);
      return this._mapComment(created);
    } catch (error) {
      console.error('❌ Error creando comentario:', error);
      throw error;
    }
  }

  /**
   * Mapea comentario del backend al formato del frontend
   * @private
   * @param {Object} comment - Comentario desde MongoDB
   * @returns {Object} Comentario formateado para UI
   */
  _mapComment(comment) {
    return {
      id: comment._id,
      vehicleId: comment.vehicleId,
      name: comment.name || 'Usuario Anónimo',
      text: comment.text,
      createdAt: comment.createdAt || new Date().toISOString(),
    };
  }
}

// Exportar instancia única (Singleton)
export const commentService = new CommentService();
