import { Catalog } from '../models/Catalog.js';

/**
 * Catalog Controller
 * Maneja todas las operaciones relacionadas con catálogos de referencia
 * 
 * OPERACIONES MONGODB:
 * - getAllCatalogs: Catalog.find() → Obtiene todos los catálogos
 * - getCatalogByType: Catalog.findOne({ type }) → Obtiene un catálogo específico
 * - createCatalog: new Catalog().save() → Crea un nuevo catálogo
 * - updateCatalog: catalog.save() → Actualiza un catálogo existente
 * - deleteCatalog: Catalog.findByIdAndDelete() → Elimina un catálogo
 */

/**
 * Obtiene todos los catálogos disponibles
 * Operación MongoDB: Catalog.find()
 * 
 * @route GET /api/catalogs
 * @returns {Array} Array de todos los catálogos
 */
export const getAllCatalogs = async (req, res, next) => {
  try {
    const catalogs = await Catalog.find().sort({ 'catalogMetadata.order': 1 });
    
    res.json({
      success: true,
      count: catalogs.length,
      data: catalogs
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Obtiene un catálogo específico por tipo
 * Operación MongoDB: Catalog.findOne({ type })
 * 
 * @route GET /api/catalogs/:type
 * @param {string} type - Tipo de catálogo (categories, brands, etc.)
 * @returns {Object} Catálogo solicitado
 */
export const getCatalogByType = async (req, res, next) => {
  try {
    const { type } = req.params;
    
    const catalog = await Catalog.getByType(type);
    
    if (!catalog) {
      return res.status(404).json({
        success: false,
        message: `Catalog type '${type}' not found`
      });
    }
    
    res.json({
      success: true,
      data: catalog
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Obtiene solo los items de un catálogo (sin metadata)
 * Operación MongoDB: Catalog.getItems(type)
 * 
 * @route GET /api/catalogs/:type/items
 * @param {string} type - Tipo de catálogo
 * @returns {Array} Array de items del catálogo
 */
export const getCatalogItems = async (req, res, next) => {
  try {
    const { type } = req.params;
    
    const items = await Catalog.getItems(type);
    
    res.json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Crea un nuevo catálogo
 * Operación MongoDB: new Catalog().save()
 * 
 * @route POST /api/catalogs
 * @body {Object} catalogData - Datos del catálogo a crear
 * @returns {Object} Catálogo creado
 */
export const createCatalog = async (req, res, next) => {
  try {
    const catalogData = req.body;
    
    // Validar datos requeridos
    if (!catalogData.type) {
      return res.status(400).json({
        success: false,
        message: 'Catalog type is required'
      });
    }
    
    const catalog = new Catalog(catalogData);
    await catalog.save();
    
    res.status(201).json({
      success: true,
      message: 'Catalog created successfully',
      data: catalog
    });
  } catch (error) {
    // Manejo de error de duplicado
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: `Catalog type '${req.body.type}' already exists`
      });
    }
    next(error);
  }
};

/**
 * Actualiza un catálogo existente
 * Operación MongoDB: Catalog.findByIdAndUpdate()
 * 
 * @route PUT /api/catalogs/:id
 * @param {string} id - ID del catálogo
 * @body {Object} updates - Datos a actualizar
 * @returns {Object} Catálogo actualizado
 */
export const updateCatalog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const catalog = await Catalog.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );
    
    if (!catalog) {
      return res.status(404).json({
        success: false,
        message: 'Catalog not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Catalog updated successfully',
      data: catalog
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Agrega un item a un catálogo existente
 * Operación MongoDB: catalog.addItem() → catalog.save()
 * 
 * @route POST /api/catalogs/:type/items
 * @param {string} type - Tipo de catálogo
 * @body {Object} itemData - Datos del item a agregar
 * @returns {Object} Catálogo actualizado
 */
export const addCatalogItem = async (req, res, next) => {
  try {
    const { type } = req.params;
    const itemData = req.body;
    
    const catalog = await Catalog.getByType(type);
    
    if (!catalog) {
      return res.status(404).json({
        success: false,
        message: `Catalog type '${type}' not found`
      });
    }
    
    await catalog.addItem(itemData);
    
    res.json({
      success: true,
      message: 'Item added successfully',
      data: catalog
    });
  } catch (error) {
    if (error.message.includes('already exists')) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
    next(error);
  }
};

/**
 * Actualiza un item de un catálogo
 * Operación MongoDB: catalog.updateItem() → catalog.save()
 * 
 * @route PUT /api/catalogs/:type/items/:itemId
 * @param {string} type - Tipo de catálogo
 * @param {string} itemId - ID del item a actualizar
 * @body {Object} updates - Datos a actualizar
 * @returns {Object} Catálogo actualizado
 */
export const updateCatalogItem = async (req, res, next) => {
  try {
    const { type, itemId } = req.params;
    const updates = req.body;
    
    const catalog = await Catalog.getByType(type);
    
    if (!catalog) {
      return res.status(404).json({
        success: false,
        message: `Catalog type '${type}' not found`
      });
    }
    
    await catalog.updateItem(itemId, updates);
    
    res.json({
      success: true,
      message: 'Item updated successfully',
      data: catalog
    });
  } catch (error) {
    if (error.message.includes('not found')) {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
    next(error);
  }
};

/**
 * Elimina (desactiva) un item de un catálogo
 * Operación MongoDB: catalog.removeItem() → catalog.save()
 * 
 * @route DELETE /api/catalogs/:type/items/:itemId
 * @param {string} type - Tipo de catálogo
 * @param {string} itemId - ID del item a eliminar
 * @returns {Object} Catálogo actualizado
 */
export const deleteCatalogItem = async (req, res, next) => {
  try {
    const { type, itemId } = req.params;
    
    const catalog = await Catalog.getByType(type);
    
    if (!catalog) {
      return res.status(404).json({
        success: false,
        message: `Catalog type '${type}' not found`
      });
    }
    
    await catalog.removeItem(itemId);
    
    res.json({
      success: true,
      message: 'Item removed successfully',
      data: catalog
    });
  } catch (error) {
    if (error.message.includes('not found')) {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
    next(error);
  }
};

/**
 * Elimina un catálogo completo
 * Operación MongoDB: Catalog.findByIdAndDelete()
 * 
 * @route DELETE /api/catalogs/:id
 * @param {string} id - ID del catálogo
 * @returns {Object} Mensaje de confirmación
 */
export const deleteCatalog = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const catalog = await Catalog.findByIdAndDelete(id);
    
    if (!catalog) {
      return res.status(404).json({
        success: false,
        message: 'Catalog not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Catalog deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
