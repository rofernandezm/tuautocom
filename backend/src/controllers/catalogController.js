import { Catalog } from '../models/Catalog.js';

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
