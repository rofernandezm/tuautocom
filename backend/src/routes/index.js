import { Router } from "express";

const router = Router();

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