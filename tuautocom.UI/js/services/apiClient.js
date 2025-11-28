/**
 * API Client
 * Cliente centralizado para comunicación con backend
 * Maneja configuración, errores y transformación de respuestas
 * 
 * @class
 */

import { config } from '../config/config.js';

class ApiClient {
  constructor() {
    this.baseURL = config.apiUrl;
    this.timeout = 10000; // 10 segundos de timeout
  }

  /**
   * Ejecuta fetch con timeout
   * @private
   * @param {string} url - URL completa
   * @param {Object} options - Opciones de fetch
   * @returns {Promise<Response>}
   */
  async _fetchWithTimeout(url, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);
    
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new Error(`Timeout: La petición tardó más de ${this.timeout/1000} segundos`);
      }
      throw error;
    }
  }

  /**
   * Maneja errores HTTP
   * @private
   * @param {Response} response - Respuesta de fetch
   * @returns {Promise<any>} Datos parseados
   * @throws {Error} Si la respuesta no es exitosa
   */
  async _handleResponse(response) {
    if (!response.ok) {
      const error = await response.json().catch(() => ({ 
        message: response.statusText 
      }));
      throw new Error(error.message || `HTTP Error: ${response.status}`);
    }
    return response.json();
  }

  /**
   * GET request
   * @param {string} endpoint - Endpoint relativo (ej: '/vehicles')
   * @returns {Promise<any>}
   * 
   * @example
   * const vehicles = await apiClient.get('/vehicles');
   */
  async get(endpoint) {
    try {
      const response = await this._fetchWithTimeout(`${this.baseURL}${endpoint}`);
      return this._handleResponse(response);
    } catch (error) {
      console.error(`GET ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * POST request
   * @param {string} endpoint - Endpoint relativo
   * @param {Object} data - Datos a enviar
   * @returns {Promise<any>}
   * 
   * @example
   * const newVehicle = await apiClient.post('/vehicles', vehicleData);
   */
  async post(endpoint, data) {
    try {
      const response = await this._fetchWithTimeout(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return this._handleResponse(response);
    } catch (error) {
      console.error(`POST ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * PUT request
   * @param {string} endpoint - Endpoint relativo
   * @param {Object} data - Datos a actualizar
   * @returns {Promise<any>}
   * 
   * @example
   * const updated = await apiClient.put('/vehicles/123', vehicleData);
   */
  async put(endpoint, data) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return this._handleResponse(response);
    } catch (error) {
      console.error(`PUT ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * DELETE request
   * @param {string} endpoint - Endpoint relativo
   * @returns {Promise<any>}
   * 
   * @example
   * await apiClient.delete('/vehicles/123');
   */
  async delete(endpoint) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'DELETE'
      });
      return this._handleResponse(response);
    } catch (error) {
      console.error(`DELETE ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * POST request con FormData (para archivos)
   * ⚠️ No fijar Content-Type - el navegador lo hace automáticamente
   * 
   * @param {string} endpoint - Endpoint relativo
   * @param {FormData} formData - FormData con campos y archivos
   * @returns {Promise<any>}
   * 
   * @example
   * const formData = new FormData();
   * formData.append('data', JSON.stringify(vehicleData));
   * formData.append('images', file1);
   * formData.append('images', file2);
   * const result = await apiClient.postForm('/vehicles', formData);
   */
  async postForm(endpoint, formData) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        // ⚠️ NO incluir Content-Type: fetch lo establece automáticamente
        // esto es necesario para multipart/form-data boundaries
        body: formData
      });
      return this._handleResponse(response);
    } catch (error) {
      console.error(`POST FORM ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * PUT request con FormData (para actualizar con archivos)
   * ⚠️ No fijar Content-Type - el navegador lo hace automáticamente
   * 
   * @param {string} endpoint - Endpoint relativo
   * @param {FormData} formData - FormData con campos y archivos
   * @returns {Promise<any>}
   * 
   * @example
   * const formData = new FormData();
   * formData.append('data', JSON.stringify(vehicleData));
   * formData.append('images', newImageFile);
   * const result = await apiClient.putForm('/vehicles/123', formData);
   */
  async putForm(endpoint, formData) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'PUT',
        // ⚠️ NO incluir Content-Type: fetch lo establece automáticamente
        body: formData
      });
      return this._handleResponse(response);
    } catch (error) {
      console.error(`PUT FORM ${endpoint}:`, error);
      throw error;
    }
  }
}

// Exportar instancia única (Singleton)
export const apiClient = new ApiClient();
