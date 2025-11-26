/**
 * Inquiry Service
 * Maneja consultas y solicitudes de contacto sobre vehículos
 * 
 * @class
 */

import { apiClient } from './apiClient.js';

class InquiryService {
  /**
   * Envía una consulta sobre un vehículo (guarda en colección reservas)
   * @param {Object} inquiryData - Datos de la consulta
   * @param {string} inquiryData.vehicleId - ID del vehículo consultado
   * @param {string} inquiryData.vehicleTitle - Título del vehículo
   * @param {string} inquiryData.name - Nombre del interesado
   * @param {string} inquiryData.email - Email del interesado
   * @param {string} inquiryData.phone - Teléfono del interesado
   * @param {string} inquiryData.message - Mensaje de consulta (opcional)
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
      // Separar nombre en firstName y lastName
      const nameParts = inquiryData.name.trim().split(' ');
      const authorFirstName = nameParts[0] || '';
      const authorLastName = nameParts.slice(1).join(' ') || nameParts[0]; // Si solo hay un nombre, repetir
      
      // Crear reserva en la colección "reservas"
      // Sin campo "status" - solo información para visualización
      const reservationData = {
        authorFirstName,
        authorLastName,
        email: inquiryData.email,
        phoneNumber: inquiryData.phone,
        vehicle: inquiryData.vehicleId,
        reservationDate: new Date().toISOString(),
        // Información adicional del vehículo (desnormalizada para visualización)
        vehicleTitle: inquiryData.vehicleTitle || '',
        vehicleId: inquiryData.vehicleId,
        // Mensaje opcional del usuario
        ...(inquiryData.message && { message: inquiryData.message })
      };
      
      const result = await apiClient.post('/reservations', reservationData);
      return result;
    } catch (error) {
      console.error('Error enviando consulta:', error);
      throw error;
    }
  }

  /**
   * Obtiene todas las consultas/reservas (para admin)
   * @returns {Promise<Array>}
   */
  async getAll() {
    try {
      const reservations = await apiClient.get('/reservations');
      return reservations;
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
