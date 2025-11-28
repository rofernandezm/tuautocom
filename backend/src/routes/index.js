import { Router } from "express";
import vehiclesRouter from './vehicles.js';
import commentsRouter from './comments.js';
import reservationsRouter from './reservations.js';
import catalogsRouter from './catalogs.js';

const router = Router();

// Ruta base de vehículos
router.use('/vehicles', vehiclesRouter);

// Ruta base de comentarios
router.use('/comments', commentsRouter);

// Ruta base de reservas
router.use('/reservations', reservationsRouter);

// Ruta base de catálogos (categorías, marcas, etc.)
router.use('/catalogs', catalogsRouter);

export default router;