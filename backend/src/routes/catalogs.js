import express from 'express';
import {
  getAllCatalogs,
  getCatalogByType,
  getCatalogItems,
  createCatalog,
  updateCatalog,
  addCatalogItem,
  updateCatalogItem,
  deleteCatalogItem,
  deleteCatalog
} from '../controllers/catalogController.js';

const router = express.Router();

/**
 * Catalog Routes
 * 
 * ENDPOINTS:
 * GET    /api/catalogs              - Obtener todos los catálogos
 * GET    /api/catalogs/:type        - Obtener catálogo por tipo
 * GET    /api/catalogs/:type/items  - Obtener solo items de un catálogo
 * POST   /api/catalogs              - Crear nuevo catálogo
 * PUT    /api/catalogs/:id          - Actualizar catálogo completo
 * DELETE /api/catalogs/:id          - Eliminar catálogo
 * 
 * POST   /api/catalogs/:type/items         - Agregar item a catálogo
 * PUT    /api/catalogs/:type/items/:itemId - Actualizar item
 * DELETE /api/catalogs/:type/items/:itemId - Eliminar item
 */

// Rutas principales de catálogos
router.get('/', getAllCatalogs);
router.post('/', createCatalog);

// Rutas específicas por tipo (deben ir antes de /:id para evitar conflictos)
router.get('/:type', getCatalogByType);
router.get('/:type/items', getCatalogItems);

// Rutas de gestión de items
router.post('/:type/items', addCatalogItem);
router.put('/:type/items/:itemId', updateCatalogItem);
router.delete('/:type/items/:itemId', deleteCatalogItem);

// Rutas de gestión de catálogos completos por ID
router.put('/:id', updateCatalog);
router.delete('/:id', deleteCatalog);

export default router;
