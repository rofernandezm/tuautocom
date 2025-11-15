/**
 * Inquiry Service
 * Maneja consultas y solicitudes de contacto sobre vehículos
 * 
 * @class
 */

import { apiClient } from './apiClient.js';

class InquiryService {
  /**
   * Envía una consulta sobre un vehículo
   * @param {Object} inquiryData - Datos de la consulta
   * @param {string} inquiryData.vehicleId - ID del vehículo consultado
   * @param {string} inquiryData.vehicleTitle - Título del vehículo
   * @param {string} inquiryData.name - Nombre del interesado
   * @param {string} inquiryData.email - Email del interesado
   * @param {string} inquiryData.phone - Teléfono del interesado
   * @param {string} inquiryData.message - Mensaje de consulta
   * @returns {Promise<Object>} Consulta creada
   * 
   * @example
   * const inquiry = await inquiryService.sendInquiry({
   *   vehicleId: 'v1',
   *   vehicleTitle: 'Toyota Camry 2024',
   *   name: 'Juan Pérez',
   *   email: 'juan@example.com',
   *   phone: '555-1234',
   *   message: 'Me interesa este vehículo'
   * });
   */
  async sendInquiry(inquiryData) {
    try {
      // Por ahora usar endpoint de comments como placeholder
      // TODO: Crear endpoint dedicado /api/inquiries en backend
      const commentData = {
        vehicleId: inquiryData.vehicleId,
        author: inquiryData.name,
        email: inquiryData.email,
        phone: inquiryData.phone,
        content: `${inquiryData.message}\n\nVehículo: ${inquiryData.vehicleTitle}`,
        rating: 5 // Placeholder
      };
      
      const result = await apiClient.post('/comments', commentData);
      return result;
    } catch (error) {
      console.error('Error enviando consulta:', error);
      throw error;
    }
  }

  /**
   * Obtiene todas las consultas (para admin)
   * @returns {Promise<Array>}
   */
  async getAll() {
    try {
      const inquiries = await apiClient.get('/comments');
      return inquiries;
    } catch (error) {
      console.error('Error obteniendo consultas:', error);
      return [];
    }
  }

  /**
   * Obtiene consultas de un vehículo específico
   * @param {string} vehicleId - ID del vehículo
   * @returns {Promise<Array>}
   */
  async getByVehicle(vehicleId) {
    try {
      const all = await this.getAll();
      return all.filter(inq => inq.vehicleId === vehicleId);
    } catch (error) {
      console.error(`Error obteniendo consultas del vehículo ${vehicleId}:`, error);
      return [];
    }
  }
}

// Exportar instancia única (Singleton)
export const inquiryService = new InquiryService();
