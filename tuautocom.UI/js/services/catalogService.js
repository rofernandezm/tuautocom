/**
 * Catalog Service
 * Maneja todas las operaciones relacionadas con catálogos de referencia
 * (categorías, marcas, transmisiones, combustibles, colores, etc.)
 * 
 * PROPÓSITO:
 * - Obtener datos de catálogos desde backend MongoDB
 * - Cachear datos en memoria para evitar múltiples requests
 * - Proporcionar fallback a datos mock si backend no responde
 * 
 * OPERACIONES MONGODB (via API):
 * - GET /api/catalogs → Obtiene todos los catálogos
 * - GET /api/catalogs/:type → Obtiene catálogo específico
 * - GET /api/catalogs/:type/items → Obtiene solo items de un catálogo
 */

import { apiClient } from './apiClient.js';

class CatalogService {
  constructor() {
    // Cache en memoria para evitar múltiples requests
    this.cache = new Map();
    
    // Versión del cache (incrementar cuando cambie el procesamiento de datos)
    // Esto invalida cache antiguo cuando actualizamos la lógica
    this.cacheVersion = 'v5'; // v5 = solo capitalización, backend ordena
    
    // Tiempo de vida del cache (5 minutos)
    this.cacheTTL = 5 * 60 * 1000;
    
    // Limpiar cache antiguo sin versión al inicializar
    this._cleanLegacyCache();
    
    // Datos mock como fallback si backend no está disponible
    this.mockData = {
      categories: [
        { id: 'sedan', label: 'Sedán', metadata: { order: 1, active: true } },
        { id: 'suv', label: 'SUV', metadata: { order: 2, active: true } },
        { id: 'pickup', label: 'Pick-up', metadata: { order: 3, active: true } },
        { id: 'electricos', label: 'Eléctricos', metadata: { order: 4, active: true } },
        { id: 'deportivos', label: 'Deportivos', metadata: { order: 5, active: true } }
      ],
      brands: [
        { id: 'ford', label: 'Ford', metadata: { order: 1, active: true } },
        { id: 'honda', label: 'Honda', metadata: { order: 2, active: true } },
        { id: 'toyota', label: 'Toyota', metadata: { order: 3, active: true } }
      ],
      transmissions: [
        { id: 'automatica', label: 'Automática', metadata: { order: 1, active: true } },
        { id: 'manual', label: 'Manual', metadata: { order: 2, active: true } }
      ],
      fuels: [
        { id: 'diesel', label: 'Diésel', metadata: { order: 1, active: true } },
        { id: 'electrico', label: 'Eléctrico', metadata: { order: 2, active: true } },
        { id: 'gasolina', label: 'Gasolina', metadata: { order: 3, active: true } }
      ]
    };
  }

  /**
   * Obtiene todos los catálogos disponibles
   * Operación MongoDB: GET /api/catalogs → Catalog.find()
   * 
   * @returns {Promise<Array>} Array de catálogos completos
   * @example
   * const catalogs = await catalogService.getAllCatalogs();
   * // [{ type: 'categories', items: [...], catalogMetadata: {...} }, ...]
   */
  async getAllCatalogs() {
    const cacheKey = `${this.cacheVersion}_all_catalogs`;
    
    if (this._isValidCache(cacheKey)) {
      return this.cache.get(cacheKey).data;
    }

    try {
      const response = await apiClient.get('/catalogs');
      
      if (response.success) {
        this._setCache(cacheKey, response.data);
        return response.data;
      }
      
      throw new Error('Response was not successful');
    } catch (error) {
      console.warn('Error al obtener catálogos:', error.message);
      return this._getMockCatalogs();
    }
  }

  /**
   * Obtiene un catálogo específico por tipo
   * Operación MongoDB: GET /api/catalogs/:type → Catalog.findOne({ type })
   * 
   * @param {string} type - Tipo de catálogo (categories, brands, etc.)
   * @returns {Promise<Object>} Catálogo completo con metadata
   * @example
   * const categoryCatalog = await catalogService.getCatalog('categories');
   * // { type: 'categories', items: [...], catalogMetadata: {...} }
   */
  async getCatalog(type) {
    const cacheKey = `${this.cacheVersion}_catalog_${type}`;
    
    if (this._isValidCache(cacheKey)) {
      return this.cache.get(cacheKey).data;
    }

    try {
      const response = await apiClient.get(`/catalogs/${type}`);
      
      if (response.success) {
        this._setCache(cacheKey, response.data);
        return response.data;
      }
      
      throw new Error('Response was not successful');
    } catch (error) {
      console.warn(`Error al obtener catálogo '${type}':`, error.message);
      return this._getMockCatalog(type);
    }
  }

  /**
   * Obtiene solo los items de un catálogo (sin metadata)
   * Operación MongoDB: GET /api/catalogs/:type/items → Catalog.getItems(type)
   * Los items se retornan ordenados alfabéticamente y con labels capitalizados
   * 
   * @param {string} type - Tipo de catálogo
   * @returns {Promise<Array>} Array de items del catálogo ordenados
   * @example
   * const categories = await catalogService.getItems('categories');
   * // [{ id: 'suv', label: 'SUV', metadata: {...} }, ...]
   */
  async getItems(type) {
    const cacheKey = `${this.cacheVersion}_items_${type}`;
    
    if (this._isValidCache(cacheKey)) {
      return this.cache.get(cacheKey).data;
    }

    try {
      const response = await apiClient.get(`/catalogs/${type}/items`);
      
      if (response.success) {
        const processedItems = this._processItems(response.data);
        this._setCache(cacheKey, processedItems);
        return processedItems;
      }
      
      throw new Error('Response was not successful');
    } catch (error) {
      console.warn(`Error al obtener items de '${type}':`, error.message);
      const mockItems = this.mockData[type] || [];
      return this._processItems(mockItems);
    }
  }

  /**
   * Obtiene categorías de vehículos
   * Atajo para getItems('categories')
   * 
   * @returns {Promise<Array>} Array de categorías
   */
  async getCategories() {
    return this.getItems('categories');
  }

  /**
   * Obtiene marcas de vehículos
   * Atajo para getItems('brands')
   * 
   * @returns {Promise<Array>} Array de marcas
   */
  async getBrands() {
    return this.getItems('brands');
  }

  /**
   * Obtiene tipos de transmisión
   * Atajo para getItems('transmissions')
   * 
   * @returns {Promise<Array>} Array de transmisiones
   */
  async getTransmissions() {
    return this.getItems('transmissions');
  }

  /**
   * Obtiene tipos de combustible
   * Atajo para getItems('fuels')
   * 
   * @returns {Promise<Array>} Array de combustibles
   */
  async getFuels() {
    return this.getItems('fuels');
  }

  /**
   * Obtiene colores disponibles
   * Atajo para getItems('colors')
   * 
   * @returns {Promise<Array>} Array de colores
   */
  async getColors() {
    return this.getItems('colors');
  }

  /**
   * Invalida el cache de un tipo específico o todo el cache
   * 
   * @param {string} [type] - Tipo de catálogo a invalidar (opcional)
   */
  clearCache(type = null) {
    if (type) {
      this.cache.delete(`${this.cacheVersion}_catalog_${type}`);
      this.cache.delete(`${this.cacheVersion}_items_${type}`);
    } else {
      this.cache.clear();
    }
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // MÉTODOS PRIVADOS - Procesamiento de datos
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  /**
   * Procesa items del catálogo: capitaliza labels
   * NOTA: El backend ya retorna los datos ordenados alfabéticamente
   * @private
   * @param {Array} items - Items a procesar
   * @returns {Array} Items procesados (solo capitalización)
   */
  _processItems(items) {
    if (!Array.isArray(items)) return [];
    
    // Solo capitalizar - el backend ya ordena alfabéticamente
    return items.map(item => ({
      ...item,
      label: this._capitalizeLabel(item.label)
    }));
  }

  /**
   * Capitaliza correctamente el label (Primera letra mayúscula)
   * @private
   * @param {string} label - Label a capitalizar
   * @returns {string} Label capitalizado
   * @example
   * _capitalizeLabel('toyota') // 'Toyota'
   * _capitalizeLabel('FORD') // 'Ford'
   * _capitalizeLabel('honda civic') // 'Honda Civic'
   */
  _capitalizeLabel(label) {
    if (!label || typeof label !== 'string') return label;
    
    return label
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // MÉTODOS PRIVADOS - Gestión de cache
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  /**
   * Limpia cache antiguo sin versión (keys que no empiezan con v5_)
   * @private
   */
  _cleanLegacyCache() {
    const keysToDelete = [];
    for (const key of this.cache.keys()) {
      if (!key.startsWith(`${this.cacheVersion}_`)) {
        keysToDelete.push(key);
      }
    }
    keysToDelete.forEach(key => this.cache.delete(key));
  }

  /**
   * Verifica si un item en cache es válido
   * @private
   * @param {string} key - Clave del cache
   * @returns {boolean} True si el cache es válido
   */
  _isValidCache(key) {
    if (!this.cache.has(key)) return false;
    
    const cached = this.cache.get(key);
    const now = Date.now();
    
    return (now - cached.timestamp) < this.cacheTTL;
  }

  /**
   * Guarda datos en cache con timestamp
   * @private
   * @param {string} key - Clave del cache
   * @param {any} data - Datos a guardar
   */
  _setCache(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  /**
   * Obtiene datos mock de todos los catálogos
   * @private
   * @returns {Array} Array de catálogos mock
   */
  _getMockCatalogs() {
    return Object.keys(this.mockData).map(type => ({
      type,
      items: this.mockData[type],
      catalogMetadata: {
        description: `${type} (mock data)`,
        allowMultiple: true,
        order: 0
      }
    }));
  }

  /**
   * Obtiene datos mock de un catálogo específico
   * @private
   * @param {string} type - Tipo de catálogo
   * @returns {Object} Catálogo mock
   */
  _getMockCatalog(type) {
    return {
      type,
      items: this.mockData[type] || [],
      catalogMetadata: {
        description: `${type} (mock data)`,
        allowMultiple: true,
        order: 0
      }
    };
  }
}

// Exportar como singleton
// 📝 NOTA EDUCATIVA:
// Creamos una única instancia del servicio que se comparte
// en toda la aplicación. Esto permite compartir el cache.
export const catalogService = new CatalogService();
