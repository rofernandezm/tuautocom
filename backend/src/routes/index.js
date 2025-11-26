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

// GET route example
router.get('/json', (req, res) => {
    res.json({ message: 'Hello World!' });
});

// GET route example
router.get('/html', (req, res) => {
    res.send(`<!DOCTYPE html><html><body><h1>ESTO ES UN HTML</h1></body></html>`);
});

// GET route example
router.get('/dina', (req, res) => {
    res.send(`<!DOCTYPE html><html><body><h1>Fiu Fiu Dina</h1></body></html>`);
});

// POST route example
router.post('/', (req, res) => {
    res.json({ message: 'Data received', data: req.body });
});

export default router;