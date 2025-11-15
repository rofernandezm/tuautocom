/**
 * Vehicle Service
 * Maneja todas las operaciones relacionadas con vehículos
 * Conectado a backend MongoDB vía API REST
 */

import { apiClient } from './apiClient.js';

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
   * @private
   * @param {Object} vehicle - Vehículo desde MongoDB
   * @returns {Object} Vehículo formateado para UI
   */
  _mapVehicle(vehicle) {
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
      fuel: vehicle.specs?.fuel || 'N/A',
      transmission: vehicle.specs?.transmission || 'N/A',
      condition: vehicle.condition?.use || 'N/A',
      // Usar primera imagen o placeholder
      image: vehicle.images?.[0] || 'https://via.placeholder.com/400x300?text=Sin+Imagen',
      images: vehicle.images || [],
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
   * Obtiene todos los vehículos desde MongoDB
   * @returns {Promise<Array>}
   */
  async getAll() {
    try {
      const vehicles = await apiClient.get('/vehicles');
      return vehicles.map(v => this._mapVehicle(v));
    } catch (error) {
      console.error('⚠️ Error obteniendo vehículos desde API, usando mock data:', error);
      // Fallback a datos mock si hay error de conexión
      return this.mockVehicles;
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
      console.error(`⚠️ Error obteniendo vehículo ${id}:`, error);
      // Fallback a datos mock
      return this.mockVehicles.find(v => v.id === id) || null;
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
      console.error('❌ Error creando vehículo:', error);
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
      console.error(`❌ Error actualizando vehículo ${id}:`, error);
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
      console.error(`❌ Error eliminando vehículo ${id}:`, error);
      return false;
    }
  }

  /**
   * Obtiene vehículos destacados (primeros 8)
   * @returns {Promise<Array>}
   */
  async getFeatured() {
    const all = await this.getAll();
    return all.slice(0, 8);
  }

  /**
   * Obtiene vehículos más baratos (ordenados por precio)
   * @returns {Promise<Array>}
   */
  async getCheapest() {
    const all = await this.getAll();
    return all.sort((a, b) => a.price - b.price).slice(0, 8);
  }

  /**
   * Obtiene vehículos más visitados 
   * TODO: Implementar contador de visitas en backend
   * Por ahora retorna los más recientes
   * @returns {Promise<Array>}
   */
  async getMostVisited() {
    const all = await this.getAll();
    return all.slice(0, 8); // Placeholder
  }

  /**
   * Busca vehículos por término
   * @param {string} searchTerm - Término de búsqueda
   * @returns {Promise<Array>}
   */
  async search(searchTerm) {
    const all = await this.getAll();
    const term = searchTerm.toLowerCase();
    return all.filter(v => 
      v.title.toLowerCase().includes(term) ||
      v.brand.toLowerCase().includes(term) ||
      v.model.toLowerCase().includes(term) ||
      v.description.toLowerCase().includes(term)
    );
  }
}

// Exportar instancia única (Singleton)
export const vehicleService = new VehicleService();
