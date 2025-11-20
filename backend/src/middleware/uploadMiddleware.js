import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

/**
 * Configuración de multer para carga de imágenes
 * 
 * Almacena imágenes en public/uploads/
 * Permite múltiples archivos por request
 * Valida tipo MIME (solo imágenes)
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directorio para almacenar uploads
const uploadsDir = path.join(__dirname, '../../public/uploads');

// Crear directorio si no existe
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    // Generar nombre único: timestamp-nombreoriginal
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}-${uniqueSuffix}${ext}`);
  },
});

// Validar tipo de archivo (solo imágenes)
const fileFilter = (req, file, cb) => {
  const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Tipo de archivo no permitido: ${file.mimetype}. Solo se aceptan JPEG, PNG, GIF y WebP`), false);
  }
};

// Crear instancia de multer
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // Máximo 5MB por archivo
  },
});

/**
 * Middleware para manejar errores de multer
 * @param {Error} err - Error de multer
 * @param {Object} req - Request
 * @param {Object} res - Response
 * @param {Function} next - Siguiente middleware
 */
export function handleMulterError(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({ 
        error: 'El archivo es demasiado grande. Máximo 5MB por imagen.' 
      });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(413).json({ 
        error: 'Demasiados archivos. Máximo 10 imágenes.' 
      });
    }
    return res.status(400).json({ error: err.message });
  }
  
  if (err) {
    return res.status(400).json({ error: err.message });
  }
  
  next();
}
