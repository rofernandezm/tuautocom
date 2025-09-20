import express from 'express';
import apiRouter from './routes/index.js';
import errorHandler from './middleware/errorHandler.js';

// Inicialización de la app
const app = express();

// Middlewares base
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api', apiRouter);

// Middleware de errores (debe ir después de las rutas)
app.use(errorHandler);

export default app;