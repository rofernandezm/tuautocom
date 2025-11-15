import express from 'express';
import cors from 'cors';
import apiRouter from './routes/index.js';
import errorHandler from './middleware/errorHandler.js';

// Inicialización de la app
const app = express();

// Habilitar CORS para permitir peticiones desde el frontend (puerto 8000)
app.use(cors({
  origin: 'http://localhost:8000',
  credentials: true
}));

// Middlewares base
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas de API
app.use('/api', apiRouter);

// Middleware de errores (debe ir después de las rutas)
app.use(errorHandler);

export default app;