import { Router } from "express";
import { getVehicles, getVehicleById, createVehicle, updateVehicle, deleteVehicle } from '../controllers/vehicleController.js';
import { upload, handleMulterError } from '../middleware/uploadMiddleware.js';

const router = Router();

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