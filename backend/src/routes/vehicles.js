import { Router } from "express";
import { 
  getVehicles, 
  getVehicleById, 
  createVehicle, 
  updateVehicle, 
  deleteVehicle,
  getFeaturedVehicles,
  getCheapestVehicles,
  getMostRecentVehicles
} from '../controllers/vehicleController.js';
import { upload, handleMulterError } from '../middleware/uploadMiddleware.js';

const router = Router();

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// RUTAS ESPECÍFICAS (deben ir ANTES de las rutas con parámetros)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// GET /api/vehicles/featured - Vehículos destacados (usando aggregation)
router.get('/featured', getFeaturedVehicles);

// GET /api/vehicles/cheapest - Vehículos más baratos (usando aggregation)
router.get('/cheapest', getCheapestVehicles);

// GET /api/vehicles/recent - Vehículos más recientes (usando aggregation)
router.get('/recent', getMostRecentVehicles);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// RUTAS GENÉRICAS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// GET /api/vehicles
router.get('/', getVehicles);

// GET /api/vehicles/:id
router.get('/:id', getVehicleById);

// POST /api/vehicles - Con soporte para múltiples imágenes
router.post('/', upload.array('images', 10), handleMulterError, createVehicle);

// PUT /api/vehicles/:id
router.put('/:id', updateVehicle);

// DELETE /api/vehicles/:id
router.delete('/:id', deleteVehicle);

export default router;