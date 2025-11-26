/**
 * Vehicle Service
 * Maneja todas las operaciones relacionadas con vehículos
 * Conectado a backend MongoDB vía API REST
 */

import { apiClient } from './apiClient.js';
import { config } from '../config/config.js';

class VehicleService {
  constructor() {
    // Categorías de vehículos (definidas en frontend para UI)
    this.categories = [
      { id: 'all', label: 'Todos' },
      { id: 'sedan', label: 'Sedán' },
      { id: 'suv', label: 'SUV' },
      { id: 'pickup', label: 'Pick-up' },
      { id: 'hatchback', label: 'Hatchback' },
      { id: 'coupe', label: 'Coupé' },
      { id: 'electric', label: 'Eléctricos' }
    ];

    // Datos mock para fallback cuando no hay conexión a backend
    this.mockVehicles = [
      { id: 'v1', category: 'sedan', brand: 'toyota', year: 2024, price: 29000, fuel: 'hybrid', mileage: 0, image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop', title: 'Toyota Camry 2024', description: 'Sedán ejecutivo con tecnología híbrida avanzada', badge: { text: 'Popular' } },
      { id: 'v2', category: 'suv', brand: 'ford', year: 2024, price: 45000, fuel: 'gasoline', mileage: 0, image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&h=300&fit=crop', title: 'Ford Explorer 2024', description: 'SUV espacioso ideal para familias', badge: { text: 'Nuevo' } },
    ];
  }

  /**
   * Mapea vehículo del backend al formato del frontend
   * Construye URLs completas para imágenes almacenadas en /uploads
   * 
   * @private
   * @param {Object} vehicle - Vehículo desde MongoDB
   * @returns {Object} Vehículo formateado para UI
   */
  _mapVehicle(vehicle) {
    // Convertir rutas relativas a URLs completas para imágenes
    const imageUrls = vehicle.images?.map(img => {
      // Si ya es una URL completa, dejar como está
      if (img.startsWith('http')) return img;
      // Si es una ruta relativa, construir URL completa
      return `${config.backendUrl}${img}`;
    }) || [];

    return {
      id: vehicle._id,
      title: vehicle.title,
      description: vehicle.description,
      category: vehicle.category,
      brand: vehicle.brand,
      model: vehicle.model,
      year: vehicle.year,
      price: vehicle.price,
      mileage: vehicle.mileage || 0,
      // 🔧 PRESERVAR objetos completos de specs y condition
      specs: vehicle.specs || {},
      condition: vehicle.condition || {},
      // Mantener campos legacy para compatibilidad
      fuel: vehicle.specs?.fuel || 'N/A',
      transmission: vehicle.specs?.transmission || 'N/A',
      // Usar primera imagen con URL completa o placeholder
      image: imageUrls[0] || 'https://via.placeholder.com/400x300?text=Sin+Imagen',
      images: imageUrls,
      // Badge condicional basado en condición
      badge: vehicle.condition?.use === 'new' 
        ? { text: 'Nuevo' } 
        : vehicle.price < 25000 
          ? { text: 'Económico' } 
          : null
    };
  }

  /**
   * Obtiene las categorías de vehículos
   * @returns {Promise<Array>}
   */
  async getCategories() {
    // Categorías son locales (definidas en frontend para UI)
    return Promise.resolve(this.categories);
  }

  /**
   * Obtiene vehículos desde MongoDB con paginación y filtros
   * @param {Object} options - Opciones de consulta
   * @param {number} [options.page=1] - Número de página
   * @param {number} [options.limit=12] - Vehículos por página
   * @param {string} [options.category] - Filtrar por categoría
   * @param {string} [options.brand] - Filtrar por marca
   * @param {number} [options.minPrice] - Precio mínimo
   * @param {number} [options.maxPrice] - Precio máximo
   * @param {number} [options.year] - Filtrar por año
   * @param {string} [options.search] - Búsqueda en título/descripción
   * @param {string} [options.condition] - Condición (new/used)
   * @returns {Promise<{data: Array, pagination: Object}>}
   */
  async getAll(options = {}) {
    try {
      const { page = 1, limit = 12, ...filters } = options;
      
      // Construir query params
      const queryParams = new URLSearchParams({ page, limit });
      
      // Agregar filtros si existen
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '' && value !== 'all') {
          queryParams.append(key, value);
        }
      });
      
      const response = await apiClient.get(`/vehicles?${queryParams}`);
      
      return {
        data: response.data.map(v => this._mapVehicle(v)),
        pagination: response.pagination
      };
    } catch (error) {
      console.error('Error obteniendo vehículos desde API:', error);
      return {
        data: [], // No usar datos mock - retornar array vacío
        pagination: { page: 1, limit: 12, total: 0, pages: 0 }
      };
    }
  }

  /**
   * Obtiene un vehículo por ID desde MongoDB
   * @param {string} id - MongoDB ObjectId
   * @returns {Promise<Object|null>}
   */
  async getById(id) {
    try {
      const vehicle = await apiClient.get(`/vehicles/${id}`);
      return this._mapVehicle(vehicle);
    } catch (error) {
      console.error(`Error obteniendo vehículo ${id}:`, error);
      return null; // No usar datos mock - retornar null si falla
    }
  }

  /**
   * Crea un nuevo vehículo en MongoDB con carga de imágenes
   * 📝 NOTA: Usa FormData para enviar archivos + datos JSON
   * 
   * @param {FormData} formData - FormData con 'data' (JSON) e 'images' (archivos)
   * @returns {Promise<Object>}
   * 
   * @example
   * const formData = new FormData();
   * formData.append('data', JSON.stringify(vehicleData));
   * formData.append('images', imageFile1);
   * formData.append('images', imageFile2);
   * const vehicle = await vehicleService.createWithFiles(formData);
   */
  async createWithFiles(formData) {
    try {
      // apiClient.postForm no fija Content-Type, permitiendo multipart/form-data
      const created = await apiClient.postForm('/vehicles', formData);
      return this._mapVehicle(created);
    } catch (error) {
      console.error('Error creando vehículo con imágenes:', error);
      throw error;
    }
  }

  /**
   * Crea un nuevo vehículo en MongoDB
   * @param {Object} vehicleData - Datos del vehículo
   * @returns {Promise<Object>}
   */
  async create(vehicleData) {
    try {
      const created = await apiClient.post('/vehicles', vehicleData);
      return this._mapVehicle(created);
    } catch (error) {
      console.error('Error creando vehículo:', error);
      throw error;
    }
  }

  /**
   * Actualiza un vehículo existente en MongoDB
   * @param {string} id - MongoDB ObjectId
   * @param {Object} vehicleData - Datos actualizados
   * @returns {Promise<Object>}
   */
  async update(id, vehicleData) {
    try {
      const updated = await apiClient.put(`/vehicles/${id}`, vehicleData);
      return this._mapVehicle(updated);
    } catch (error) {
      console.error(`Error actualizando vehículo ${id}:`, error);
      throw error;
    }
  }

  /**
   * Elimina un vehículo de MongoDB
   * @param {string} id - MongoDB ObjectId
   * @returns {Promise<boolean>}
   */
  async delete(id) {
    try {
      await apiClient.delete(`/vehicles/${id}`);
      return true;
    } catch (error) {
      console.error(`Error eliminando vehículo ${id}:`, error);
      return false;
    }
  }

  /**
   * Obtiene vehículos destacados desde MongoDB usando Aggregation Pipeline
   * 
   * Backend ejecuta:
   * - $match: condition.use='new' OR price < 30000
   * - $sort: createdAt DESC
   * - $limit: 8
   * 
   * @returns {Promise<Array>}
   */
  async getFeatured() {
    try {
      const featured = await apiClient.get('/vehicles/featured');
      return featured.map(v => this._mapVehicle(v));
    } catch (error) {
      console.error('Error obteniendo vehículos destacados:', error);
      return [];
    }
  }

  /**
   * Obtiene vehículos más baratos desde MongoDB usando Aggregation Pipeline
   * 
   * Backend ejecuta:
   * - $sort: price ASC
   * - $limit: 8
   * 
   * @returns {Promise<Array>}
   */
  async getCheapest() {
    try {
      const cheapest = await apiClient.get('/vehicles/cheapest');
      return cheapest.map(v => this._mapVehicle(v));
    } catch (error) {
      console.error('Error obteniendo vehículos más baratos:', error);
      return [];
    }
  }

  /**
   * Obtiene vehículos más recientes desde MongoDB usando Aggregation Pipeline
   * 
   * Backend ejecuta:
   * - $sort: createdAt DESC
   * - $limit: 8
   * 
   * @returns {Promise<Array>}
   */
  async getMostRecent() {
    try {
      const recent = await apiClient.get('/vehicles/recent');
      return recent.map(v => this._mapVehicle(v));
    } catch (error) {
      console.error('Error obteniendo vehículos más recientes:', error);
      return [];
    }
  }

  /**
   * Busca vehículos por término
   * @param {string} searchTerm - Término de búsqueda
   * @returns {Promise<Array>}
   */
  async search(searchTerm) {
    const response = await this.getAll({ search: searchTerm });
    return response.data || [];
  }
}

// Exportar instancia única (Singleton)
export const vehicleService = new VehicleService();
